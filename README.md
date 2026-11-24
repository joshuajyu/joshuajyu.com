# joshuajyu.com

Source for my personal website, [joshuajyu.com](https://joshuajyu.com) — a single static page (Intro → Work → Contact) built with [Astro](https://astro.build) and served from a [Cloudflare Worker](https://developers.cloudflare.com/workers/static-assets/) with static assets.

v1 (Next.js on EC2) lives on the read-only [`archive-v1`](https://github.com/joshuajyu/joshuajyu.com/tree/archive-v1) branch.

## Stack

| | |
| --- | --- |
| Framework | Astro 7, static output (no adapter, ~zero client JS) |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite` |
| Language | TypeScript |
| Font | Doto (wordmark), self-hosted via `@fontsource/doto` |
| Colours | [Kanagawa](https://github.com/rebelot/kanagawa.nvim) Dragon (dark, `dragonOrange` accent) + [Kanagawa Paper](https://github.com/thesimonho/kanagawa-paper) Canvas (light, deep Lotus blue accent), as CSS variables in `global.css` |
| Hosting | Cloudflare Worker `joshuajyu-com`, static assets only, deployed by Workers Builds |
| Tooling | Node ≥ 22.23.4 (`.nvmrc`), pnpm (pinned via `packageManager`) |

## Development

```sh
nvm use            # Node from .nvmrc
corepack enable    # or prefix pnpm commands with `corepack pnpm`
pnpm install
pnpm dev           # Astro dev server (http://localhost:4321)
pnpm build         # static site → dist/
pnpm preview       # build, then serve dist/ with `wrangler dev` (http://localhost:8787)
```

`pnpm preview` is the closest thing to production locally: it applies `_redirects`, the 404 handling and the asset routing that the Worker uses.

### Layout

```
src/
  layouts/Base.astro      <head>, inline theme script (no flash of wrong theme)
  pages/index.astro       the single page
  pages/404.astro         served for unknown paths (not_found_handling: "404-page")
  components/             Header (side rail), Stepper, Intro, Work, Contact, Footer, …
  data/work.ts            work/project cards
  data/contact.ts         contact links
  scripts/pages.ts        marks the page in view as active (animations, nav state)
  styles/global.css       Tailwind, theme colours, motion
public/
  _redirects              /work → /#work, /contact → /#contact (301)
wrangler.jsonc            Worker config (name must match the Worker in Cloudflare)
```

### Behaviour notes

- **Appearance menu:** the paintbrush button in the top-right corner (`AppearanceMenu.astro`) opens a glass panel. It uses the native `popover` attribute, so it closes on Esc or a click outside. It has two controls:
  - **Theme:** a light/dark pair (sun and moon). It follows the system by default. Picking one saves it to `localStorage` (`theme`), and picking the one that matches the system clears the saved choice, so the page follows the system again.
  - **Dynamic background:** a switch for the lava. Off adds `no-lava` to `<html>`, which hides the layer and stops the renderer's loop, and saves `lava=off`.

  The inline script in `Base.astro` applies both saved choices before first paint, so neither flashes on load.
- **Paged scrolling:** each section (`section.page`) fills the viewport, and the browser scroll-snaps between them using native CSS scroll snap, not wheel hijacking, so trackpad, touch, keyboard and assistive tech still scroll normally. Snapping is `mandatory` on screens ≥ 768×640 and `proximity` on smaller ones, where a page (e.g. Work on a phone) can be taller than the screen. The footer has a fixed height (`--footer-h`) and the last page is shortened by that much, so Contact + footer share the final screen with no extra snap stop. Overscroll bounce is disabled on the home page so it doesn't fight snapping.
- **Ambient background:** eight blobs drawn by `src/scripts/lava.ts` onto one canvas at 1/6 resolution, stretched to the viewport. The blobs are blurry, so this looks identical to full resolution at a fraction of the cost. Config (blobs, lobe shapes, timings, colour cycle) is in `src/data/lava.ts`, and layout and grain are in `src/styles/lava.css`. Each blob bubbles in place:
  - **Swell:** it grows from about 55–60% to full size and brightens, then sinks back (16–26s).
  - **Wobble:** it drifts a little around its centre.
  - **Turn:** a very slow rotation keeps its gently lumpy shape from reading as a circle.
  - **Colour:** it steps through the theme's four lava colours (12s hold, 6s blend in OKLab). Blobs are spread across the cycle so the page always shows a mix.

  Colours (`--lava-1..4`) and strength (`--lava-opacity`) are read from the theme tokens in `global.css`, and are re-read when the theme changes. Each blob is drawn at full colour offscreen, then composited once at its strength, so overlapping lobes never exceed what the text-contrast checks assume (up to three blobs stacked). Rendering is capped at 30fps. With reduced motion it draws a single still frame. Without JavaScript the plain background shows.
- **Frosted glass:** one `glass` utility in `global.css` (`--glass-tint`, `--glass-blur`, `--glass-saturate`) styles the desktop rail, work tiles, contact table, footer, and the appearance button and panel. Change those variables to change all of them. Glass elements must not sit inside an element that fades (opacity < 1), or the browser stops blurring what's behind them, which is why work tiles carry `data-reveal` themselves.
- **Navigation:** at ≥ 1024px a fixed left rail has the wordmark centred at the top and a vertical section stepper (Intro → Work → Contact; the current step expands to show a short blurb, the others collapse) centred below. Below that, the wordmark sits at the top of the first page and scrolls away with it, and there is no stepper. The appearance menu floats in the top-right corner at all sizes. The rail is `position: fixed`, not a sticky top bar, so it isn't repositioned while the page snaps.
- **Page animations:** `pages.ts` gives the page crossing the middle of the viewport `.is-active`. Its `data-reveal` children stagger in (`--reveal-index`) and fade out when you leave, so they animate again on return. The stepper moves to the matching step: each step gets `data-state` (complete/current/upcoming), which drives the dot, the accent fill of the line segment below it, and the blurb expanding/collapsing (`grid-template-rows` 0fr ↔ 1fr). The current link gets `aria-current="step"`. The hidden state only applies when JS is running and `prefers-reduced-motion` is not `reduce`, so content is always visible otherwise. Smooth anchor scrolling has the same reduced-motion guard.
- **Fitting a page:** keep each section's content within ~650px tall so it fits a 1280×720 screen without an extra in-page scroll step.
- **Whitespace:** `compressHTML` is off in `astro.config.mjs`. Astro 7's compiler drops line-break whitespace next to inline elements when compressing (`at <a>Ada</a>` renders as "atAda").

## Deployment

Cloudflare **Workers Builds** connects this GitHub repo to the `joshuajyu-com` **Worker**. The old construction page is a separate **Pages project** with the same name; the two don't clash, but take care which one you're editing or deleting.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `pnpm run build` |
| Deploy command (production) | `npx wrangler deploy` |
| Preview deploy command (non-production branches) | `npx wrangler preview` (open beta; names the preview after the git branch) |
| Build variable | `NODE_VERSION=22.23.5` (also in `.nvmrc`; don't rely on the image default) |

- A push to `main` triggers a production deploy.
- A push to any other branch or a PR gets a Preview deployment named after the branch (e.g. `dev`).
- Work happens on `dev` and reaches `main` as a squash merge.

> **Status:** v2 is on `main` and Workers Builds is being connected. `joshuajyu.com` still points at the old `joshuajyu-com` **Pages project** (Direct Upload, construction page) until cutover.

### To verify after the first deploy

- [ ] `/work` and `/contact` redirect to `/#work` and `/#contact` **with the fragment intact** on the deployed Worker (confirmed locally with `wrangler dev`). If the fragment is dropped, remove `public/_redirects` and use Astro's `redirects` config instead, which emits meta-refresh pages.
- [ ] Unknown paths return the custom 404 page with status 404.
- [ ] The `dev` branch preview URL works and sits behind Cloudflare Access.

### Cutover (Pages → Worker)

The old `joshuajyu-com` Pages project was created by Direct Upload and can't be switched to Git integration, so the site moves to the new `joshuajyu-com` Worker:

1. Verify the Worker's production deploy on its `*.workers.dev` URL, and the `dev` preview URL.
2. Remove `joshuajyu.com` from the `joshuajyu-com` **Pages project**, then add it as a **Custom Domain** on the `joshuajyu-com` **Worker** (Settings → Domains & Routes).
3. Lock down `workers.dev`:
   - Enable Cloudflare Access for **Preview URLs** (Settings → Domains & Routes). All Workers preview URLs on the account share the auto-created "Cloudflare Workers Preview URLs" policy.
   - Preferred: add `"workers_dev": false` **and** `"preview_urls": true` to `wrangler.jsonc`. Preview URLs follow `workers_dev` by default, and Cloudflare's docs don't confirm this combination (or its interaction with Access), so **test it first**. Fallback: keep `workers_dev` on and put it behind Access too.
   - The `joshuajyu-com.pages.dev` Bulk Redirect can stay until the old Pages project is deleted.
4. Confirm `joshuajyu.com`, `www.joshuajyu.com` (an existing zone redirect rule to the apex), the `workers.dev` URL and preview URLs all behave as expected. Then delete the old `joshuajyu-com` **Pages project** (not the Worker of the same name), its Bulk Redirect entry, and the `construction-page` branch.

Leave the zone's other DNS records alone (email routing/sending, DMARC, tunnels). They're unrelated to the site.

## License

[MIT](./LICENSE)
