# Logan West — Portfolio

Personal portfolio site for Logan West, Product Manager. Built with [Next.js](https://nextjs.org) and the [Magic Portfolio](https://once-ui.com/products/magic-portfolio) template by [Once UI](https://once-ui.com).

Live: https://logan-portfolio-xzmm.vercel.app

## Development

```
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # Biome lint
```

## Where things live

| What | Where |
| --- | --- |
| Site config (URL, theme, SEO, routes) | `src/resources/once-ui.config.ts` |
| Page content (home, about, gallery, socials) | `src/resources/content.tsx` |
| Blog posts | `src/app/blog/posts/*.mdx` |
| Work projects | `src/app/work/projects/*.mdx` |
| Images, resume | `public/` |

The `.mdx` file name becomes the page URL (e.g. `glide-ski-tuning.mdx` → `/work/glide-ski-tuning`).

Keep images under ~2560px on the long edge; Next.js resizes them per device, but huge originals still slow builds and the image optimizer.

## Deployment

Deployed on Vercel from the `main` branch.

## License

Template distributed under CC BY-NC 4.0 — the footer attribution link to Once UI is required. See `LICENSE`.
