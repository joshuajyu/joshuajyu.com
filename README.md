# joshuajyu.com

Source for my personal website, [joshuajyu.com](https://joshuajyu.com) — a single static page (Intro → Education → Work → Contact) built with [Astro](https://astro.build) and served from a [Cloudflare Worker](https://developers.cloudflare.com/workers/static-assets/) with static assets.

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
  components/             Header (side rail), Stepper, Intro, Education, Work, Contact,
                          Greeting (slot reel), Quote, AppearanceMenu, Lava, Footer, …
  data/                   content and config: education, work, contact, greeting words, lava
  scripts/pages.ts        marks the page in view as active (animations, nav state)
  scripts/quotes.ts       typewriter quotes
  scripts/greeting.ts     slot reel + part of day
  scripts/lava.ts         ambient background renderer
  styles/global.css       Tailwind, theme colours, glass, motion
  styles/lava.css         background layer and grain
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
- **Navigation:** at ≥ 1024px a fixed left rail has the wordmark centred at the top and a vertical section stepper (Intro → Education → Work → Contact; the current step expands to show a short blurb, the others collapse) centred below. Below that, the wordmark sits at the top of the first page and scrolls away with it, and there is no stepper. The appearance menu floats in the top-right corner at all sizes. The rail is `position: fixed`, not a sticky top bar, so it isn't repositioned while the page snaps.
- **Page animations:** `pages.ts` gives the page crossing the middle of the viewport `.is-active`. Its `data-reveal` children stagger in (`--reveal-index`) and fade out when you leave, so they animate again on return. The animation follows the scroll direction: every other page gets `data-side="above"` or `"below"`, and the active page keeps the side it was entered from. Scrolling down, content rises in top to bottom and the page you leave slides out upwards. Scrolling back up, it drops in from above and staggers bottom to top (`--reveal-last`, set by `pages.ts`). The stepper moves to the matching step: each step gets `data-state` (complete/current/upcoming), which drives the dot, the accent fill of the line segment below it, and the blurb expanding/collapsing (`grid-template-rows` 0fr ↔ 1fr). The current link gets `aria-current="step"`. The hidden state only applies when JS is running and `prefers-reduced-motion` is not `reduce`, so content is always visible otherwise. Smooth anchor scrolling has the same reduced-motion guard.
- **Greeting slot reel:** in the intro's "I hope you have a [nice] [day]!", the time word follows the viewer's local clock (morning, afternoon, evening or night). The adjective sits on a small slot machine set into the line (`Greeting.astro`, `greeting.ts`, word list in `src/data/greeting.ts`, "Greeting slot reel" in `global.css`):
  - **The reel:** an 8-sided, flat-shaded 3D drum (CSS `preserve-3d`, one word per accent-coloured facet) in a bezelled window. Each facet is darkened by `1 − cos θ` of its tilt from the viewer, so it reads angular rather than bulged, with crisp seams between facets. The roll animates a registered `@property --angle`, which drives both the rotation and the shading.
  - **Spinning:** it rolls a few turns with an overshooting ease on the Intro's first arrival, and again on click, tap or Enter. Facets out of view are re-lettered first, and the result goes on the landing facet. A ↻ badge shows on hover or focus.
  - **Layout:** a ~2.3-line window shows the facets above and below the current word. Its line gets extra vertical margin to make room. Every adjective sits invisibly in one grid cell (`.slot-sizer`), so the browser sizes the reel to the widest word itself, with no JS measuring, and that cell also provides the text baseline.

  Adjectives all start with a consonant, so "a ___" always reads right. The Intro quote waits for the spin (`delay` prop on `Quote`). With reduced motion the word swaps instantly; without JavaScript it reads "a nice day".
- **Typewriter quotes:** `quotes.ts` types each pull quote out left to right, with an accent-coloured caret and pauses after punctuation. It starts the first time its page becomes active (`page:active` from `pages.ts`), after the page's other reveals finish, and the citation fades in afterwards. Each quote types only once: if the visitor leaves mid-quote, it is completed out of sight and simply shown on return. Leaving before the first character (e.g. passing through on the way to another section) doesn't count, so it still types on the first real visit. Characters are laid out up front and revealed in turn, so nothing reflows. Screen readers get a visually hidden full copy. With reduced motion or without JavaScript, the quote just shows.
- **Fitting a page:** keep each section's content within ~650px tall so it fits a 1280×720 screen without an extra in-page scroll step.
- **Whitespace:** `compressHTML` is off in `astro.config.mjs`. Astro 7's compiler drops line-break whitespace next to inline elements when compressing (`at <a>Ada</a>` renders as "atAda").

## Deployment

Deploys are continuous: Cloudflare **Workers Builds** connects this GitHub repo to the `joshuajyu-com` **Worker**, which serves `joshuajyu.com` as a Custom Domain.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `pnpm run build` |
| Deploy command (production) | `npx wrangler deploy` |
| Preview deploy command (other branches) | `npx wrangler preview` (open beta; needs the `previews` block in `wrangler.jsonc`) |
| Build variable | `NODE_VERSION=22.23.5` (also in `.nvmrc`; don't rely on the image default) |

| Branch | Deploys to |
| --- | --- |
| `main` | Production: [joshuajyu.com](https://joshuajyu.com) (also `joshuajyu-com.joshuajyu.workers.dev`) |
| `dev` (or any other branch) | Preview: `https://<branch>-joshuajyu-com.joshuajyu.workers.dev`, behind Cloudflare Access |

Each build reports back to GitHub as the **Workers Builds: joshuajyu-com** check on the pushed commit. Failed builds show up there and in the Worker's **Deployments** tab.

### Shipping

Work happens on `dev`. Pushing `dev` updates its preview, where changes can be checked before they reach the live site. To ship, `dev` is squash-merged into `main` as one commit, with no PR, and that push deploys to production. Because `main` is checked out in a separate worktree, the squash can be done from `dev` without switching branches:

```sh
git fetch origin
NEW=$(git commit-tree "dev^{tree}" -p origin/main -m "feat: …")
git push origin "${NEW}:refs/heads/main"
```

Then wait for the check to pass and confirm the change on joshuajyu.com.

### Routing

- `www.joshuajyu.com` redirects to the apex via a zone redirect rule.
- `/work` and `/contact` redirect (301) to `/#work` and `/#contact` with the fragment intact (`public/_redirects`).
- Unknown paths return the custom 404 page with status 404 (`not_found_handling: "404-page"`).

### Open housekeeping

- [ ] The production `workers.dev` URL is still public (only preview URLs are behind Access). Either put it behind Access too, or try `"workers_dev": false` with `"preview_urls": true` in `wrangler.jsonc`. Preview URLs follow `workers_dev` by default, so test that previews still work before keeping it.
- [ ] Delete the `construction-page` branch (the old construction page; the Pages project it deployed to is gone).

Leave the zone's other DNS records alone (email routing/sending, DMARC, tunnels). They're unrelated to the site.

## License

[MIT](./LICENSE)
