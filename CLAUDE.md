# CLAUDE.md

Notes for agents working on joshuajyu.com. `README.md` is the human-facing overview. This file holds the rules, the deployment details and how the moving parts work.

This repo is **public**: never commit secrets, tokens, account IDs or personal contact details beyond what the site itself shows.

## Rules

- **Worktrees are managed by Orca.** Don't create, remove or switch worktrees or branches yourself. This worktree is on `dev`, and `main` is checked out in a separate worktree.
- **`archive-v1` is locked.** It's the read-only v1 site. Never push to it.
- **Work on `dev`.** Commit and push there freely: `dev` pushes only update the preview.
- **`main` is production.** A push to it deploys joshuajyu.com within a minute or two. Only ship when the user asks to in that turn. Ship with a squash, never a PR or a regular merge (see [Shipping](#shipping)).
- **Leave the DNS zone alone** apart from the site's own records: email routing and sending (MX, SPF, DKIM, `send.*`), DMARC and Cloudflare Tunnel records are unrelated to the site.
- **Don't change Cloudflare settings** (Workers Builds, Access, domains) unless asked. The user manages the dashboard; explain the steps instead.

## Commands

pnpm is pinned via `packageManager`. If `pnpm` isn't on PATH, prefix with `corepack pnpm`.

```sh
pnpm dev                  # Astro dev server, http://localhost:4321
pnpm build                # static build → dist/
pnpm preview              # build + `wrangler dev`, http://localhost:8787 (closest to production)
pnpm exec tsc --noEmit    # type check
```

`pnpm preview` applies `_redirects`, the 404 handling and the asset routing the Worker uses, so test those there rather than on `pnpm dev`.

## Shipping

`dev` reaches `main` as a single squash commit. `main` is in another worktree, so build the commit without checking it out:

```sh
git fetch origin
# Sanity check: origin/main's tree should equal the dev commit that was last shipped.
NEW=$(git commit-tree "dev^{tree}" -p origin/main -m "feat: …")
git push origin "${NEW}:refs/heads/main"
```

Always brace `"${NEW}"`: in zsh, `$NEW:r…` is parsed as a variable modifier.

After pushing (to `dev` or `main`):

1. Wait for the GitHub check run **Workers Builds: joshuajyu-com** on that commit (`gh api repos/{owner}/{repo}/commits/<sha>/check-runs`).
2. Check the live site against a local `pnpm build`. Page scripts are inlined into `index.html`, so compare the HTML and the `/_astro/*` asset hashes. Apostrophes are HTML-encoded (`&#39;`), so grep accordingly.

## Deployment

Cloudflare **Workers Builds** connects the GitHub repo to the Worker `joshuajyu-com` (static assets only, no script). `joshuajyu.com` is a Custom Domain on it.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `pnpm run build` |
| Deploy command | `npx wrangler deploy` |
| Non-production deploy command | `npx wrangler preview` (open beta; requires the `previews` block in `wrangler.jsonc`, even if empty) |
| Build variable | `NODE_VERSION`, matching `.nvmrc` (don't rely on the build image's default) |

- **Production:** joshuajyu.com, and also the Worker's `workers.dev` URL.
- **Previews:** every other branch deploys to `<branch>-joshuajyu-com.<subdomain>.workers.dev`, behind Cloudflare Access.
- **Worker name:** the `name` in `wrangler.jsonc` must match the Worker in the dashboard.
- **Routing:**
  - `www` redirects to the apex through a zone redirect rule.
  - `public/_redirects` sends `/work` and `/contact` to `/#work` and `/#contact` (301). Cloudflare keeps the fragment; this has been verified live.
  - Unknown paths get `404.astro` with status 404 (`not_found_handling: "404-page"`).

### Open housekeeping

- [ ] The production `workers.dev` URL is public; only preview URLs are behind Access. Options:
  - put it behind Access too, or
  - set `"workers_dev": false` with `"preview_urls": true`. Preview URLs follow `workers_dev` by default, so test that previews still work before keeping it.
- [ ] Delete the `construction-page` branch. It held the old construction page, and its Pages project is already gone.
- [ ] Check the site on real Safari and a real phone. The 64px backdrop blur over a 30fps canvas hasn't been tested on low-end devices.
- [ ] No Open Graph image (`og:image`) yet, so link previews have no picture.

## Layout

```
src/
  layouts/Base.astro      <head>; inline script applies saved theme + background choice before first paint
  pages/index.astro       the single page
  pages/404.astro         not-found page
  components/             Header (side rail), Stepper, Intro, Education, Work, Contact, Greeting,
                          Quote, AppearanceMenu, Lava, ContactIcon, ExternalIcon, Footer, …
  data/                   education, work, contact, greeting words, lava config
  scripts/pages.ts        active page, page:active / page:inactive events, stepper state, reveal direction
  scripts/quotes.ts       typewriter quotes
  scripts/greeting.ts     slot reel + part of day
  scripts/lava.ts         background renderer
  styles/global.css       theme tokens, glass utility, motion, slot reel, typewriter
  styles/lava.css         background layer and grain
public/_redirects
wrangler.jsonc
```

Content changes (education, work tiles, contact links, adjectives) belong in `src/data/`. Types live there too: `tsc` can't import types from `.astro` files.

## How it works

### Theme and appearance menu

- **Colours:** CSS variables in `global.css`.
  - Dark is Kanagawa **Dragon**, with the `dragonOrange` accent.
  - Light is Kanagawa Paper **Canvas**, with a deepened Lotus-blue accent (`#375282`).
  - The light `--border` is darkened (`#a8a69d`) so borders stay visible over the background.
- **Contrast:** colour changes must keep WCAG text contrast with up to three lava blobs stacked under the glass. Check this with a script rather than by eye.
- **Appearance menu:** the paintbrush button, top right (`AppearanceMenu.astro`). It's a native `popover`.
  - **Theme:** a sun/moon pair. It follows the system by default. Picking a theme saves `localStorage.theme`; picking the one that matches the system clears the saved choice.
  - **Dynamic background:** a `role=switch`. Off adds `html.no-lava`, which hides the layer and stops the renderer, and saves `localStorage.lava = "off"`.

### Paged scrolling and animations

- **Snapping:** each `section.page` fills the viewport, with native CSS scroll snap and no wheel hijacking.
  - Snap is `mandatory` at ≥ 768×640 and `proximity` below that.
  - The footer has a fixed height (`--footer-h`), and the last page is shortened by that much, so Contact and the footer share the final screen.
  - Overscroll bounce is disabled on the home page.
- **Active page:** `pages.ts` uses an IntersectionObserver with `rootMargin: -50% 0px -50% 0px`, so the page crossing the middle of the viewport gets `.is-active` and fires `page:active`. The page it replaces fires `page:inactive`.
- **Reveals:** `[data-reveal]` children stagger in by `--reveal-index` (80ms steps) and fade out on leave, so they animate again on return.
- **Direction:** every inactive page gets `data-side="above"` or `"below"`, and the active page keeps the side it was entered from.
  - Pages above hide at −1.5rem, so content leaves upwards.
  - Entering from above reverses the stagger, using `--reveal-last`, which `pages.ts` computes per page.
- **Stepper:** each step's `data-state` (complete/current/upcoming) drives the dot, the segment fill and the blurb expanding (`grid-template-rows` 0fr ↔ 1fr). The current link gets `aria-current="step"`.
- **Without motion:** hidden states apply only under `.js` and `prefers-reduced-motion: no-preference`.
- **Page height:** keep each section within about 650px so it fits a 1280×720 screen without an extra scroll step.

### Frosted glass

- **One utility:** the `@utility glass` in `global.css` (`--glass-tint`, `--glass-blur`, `--glass-saturate`) styles everything glass. That covers the rail, work tiles, education card, contact table, footer, and the appearance button and panel.
- **No fading ancestors:** a glass element must not sit inside an element with opacity < 1, or `backdrop-filter` stops seeing the page. That's why `data-reveal` goes on the tile itself, not on a wrapper.

### Lava background

- **Rendering:** `lava.ts` draws eight blobs onto one canvas at 1/6 resolution, stretched to the viewport, capped at 30fps. The config is in `src/data/lava.ts`.
- **Motion:** each blob bubbles in place: it swells (16–26s), wobbles, turns slowly, and cycles through four theme colours (12s hold, 6s OKLab blend). The cycles are desynchronised, so the page is never one colour.
- **Colours:** `--lava-1..4` and `--lava-opacity` come from the theme tokens and are re-read on theme change. On a cold load the script retries until the CSS variables are valid.
- **Compositing:** each blob is composited once at its strength, so overlaps stay within the contrast budget.
- **Fallbacks:** with reduced motion it draws one still frame; without JS the plain background shows.
- **Taste notes:** the user iterated on this a lot. It should be subtle bubbling, not drifting, and on-palette. Ask before changing the look.

### Greeting slot reel

- **The line:** "I hope you have a [adjective] [part of day]!". `partOfDay` uses the viewer's local hour.
- **The reel:** an 8-facet `preserve-3d` drum in the accent colour, in a bezel window about 2.3 lines tall, with no glass.
  - Facets are flat-shaded with `color-mix(… black (1 − cos θ) · 85%)`, driven by the registered `@property --angle`.
  - `.slot-sizer` holds every adjective in one grid cell, so CSS sizes the width; no JS measuring.
- **Spinning:** it spins once on the Intro's first activation, and again on click, tap or Enter.
  - The script picks a result that isn't on a visible facet and puts it on the landing facet, then re-letters the other facets. No facet ever shows a duplicate.
  - The adjectives in `data/greeting.ts` must start with a consonant sound ("a ___").
  - The Intro quote waits for the spin through the `delay` prop on `Quote`.

### Typewriter quotes

- **Typing:** `quotes.ts` types a section's quote (24ms per character, with pauses after punctuation and an accent caret) after the page's other reveals finish. The citation fades in afterwards.
- **Once per quote:** each quote types only once. Leaving mid-quote completes it out of sight; leaving before the first character resets it, so passing through doesn't count as a visit.
- **Layout and access:** characters are laid out up front (no reflow), and screen readers get a visually hidden full copy.

### Astro gotcha

`compressHTML: false` in `astro.config.mjs`: Astro 7's compressor drops whitespace next to inline elements ("at <a>Ada</a>" renders as "atAda"). Inside JSX expressions, keep an `<a>`'s contents on one line to avoid stray whitespace inside the link.
