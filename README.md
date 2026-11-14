# Logan West — Portfolio

Personal portfolio site for Logan West, Product Manager. Built with [Next.js](https://nextjs.org) and the [Magic Portfolio](https://once-ui.com/products/magic-portfolio) template by [Once UI](https://once-ui.com).

Live: https://logan-portfolio-xzmm.vercel.app

## Development

```
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # Biome lint
npm run optimize-images  # shrink oversized photos in public/images
```

## Adding content

**New blog post**
1. Copy `templates/blog-post.mdx` to `src/app/blog/posts/<slug>.mdx` (the file name is the URL).
2. Put any images in `public/images/blog/`.
3. Fill in the frontmatter and write the post.

**New project**
1. Copy `templates/project.mdx` to `src/app/work/projects/<slug>.mdx`.
2. Put images in `public/images/projects/<slug>/`.

**Photos (gallery or homepage carousel)**
1. Drop the file in `public/images/gallery/` or `public/images/home/`.
2. Add it to `gallery.images` or `home.carousel` in `src/resources/content.tsx`, with a short `alt` description. In the gallery, set `orientation` to `vertical` for portrait photos.

**Then:** run `npm run optimize-images` (shrinks anything over 2560px) and `npm run build`.
The build checks every post and project and stops with a clear message if a title, summary, or date is missing, or an image path doesn't exist.

## Where things live

| What | Where |
| --- | --- |
| Site config (URL, theme, SEO, routes) | `src/resources/once-ui.config.ts` |
| Page content (home, about, gallery, socials) | `src/resources/content.tsx` |
| Blog posts | `src/app/blog/posts/*.mdx` |
| Work projects | `src/app/work/projects/*.mdx` |
| Content templates | `templates/` |
| Images | `public/images/{home,gallery,blog,projects/<slug>}` |
| Resume | `public/resume.pdf` |

The `.mdx` file name becomes the page URL (e.g. `glide-ski-tuning.mdx` → `/work/glide-ski-tuning`).

## Deployment

Deployed on Vercel from the `main` branch: every push to `main` goes live.
Visitor stats: Vercel dashboard → project → Analytics / Speed Insights.

## License

Template distributed under CC BY-NC 4.0 — the footer attribution link to Once UI is required. See `LICENSE`.
