# joshuajyu.com

The source for my personal website, [joshuajyu.com](https://joshuajyu.com).

It's a single page in four sections: Intro, Education, Work and Contact. You scroll from one section to the next, each one animating in as it arrives. A few small touches give it some personality:

- a slowly bubbling, lava-lamp background behind frosted-glass panels
- a little slot machine in the intro that spins up an adjective for your day (click it to spin again)
- a pull quote on each section that types itself out
- light and dark themes based on [Kanagawa](https://github.com/rebelot/kanagawa.nvim) (Dragon) and [Kanagawa Paper](https://github.com/thesimonho/kanagawa-paper) (Canvas)

All of the motion respects your system's reduced-motion setting, and the page still reads fine without JavaScript.

The previous version (Next.js on EC2) is kept on the [`archive-v1`](https://github.com/joshuajyu/joshuajyu.com/tree/archive-v1) branch.

## Built with

- [Astro](https://astro.build): static output, almost no client-side JavaScript
- [Tailwind CSS](https://tailwindcss.com) 4 and TypeScript
- [Doto](https://fontsource.org/fonts/doto) for the wordmark, and [Bootstrap Icons](https://icons.getbootstrap.com) for the contact logos
- [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) for hosting

## Running it locally

You'll need Node 22 (see `.nvmrc`) and pnpm (pinned in `package.json`; `corepack enable` sets it up).

```sh
pnpm install
pnpm dev        # dev server at http://localhost:4321
pnpm build      # static site in dist/
pnpm preview    # build, then serve it the way Cloudflare does at http://localhost:8787
```

## Where things live

- `src/components/`: each section of the page, plus the pieces they're built from
- `src/data/`: the content (education, work, contact) and a few settings, so most edits don't touch markup
- `src/scripts/`: the small amount of browser code (page transitions, the slot machine, quotes, background)
- `src/styles/`: theme colours, the glass effect and the animations

## Deployment

Every push to `main` builds and deploys the site automatically through Cloudflare Workers Builds. Other branches get their own private preview deployment, so changes can be checked before they go live.

## License

[MIT](./LICENSE)
