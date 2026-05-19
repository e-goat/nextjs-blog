# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build (also triggers Contentlayer generation)
npm run preview   # Build + start production server
npm run lint      # ESLint
npm run format    # Prettier (formats all files in place)
```

There are no tests in this project.

## Architecture

Personal blog for Martin Duchev, live at mduchev.xyz. Built on **Next.js 13 App Router** with **Contentlayer** as the content layer and **Tailwind CSS** for styling.

### Content pipeline

MDX files in `content/` are processed by Contentlayer at build time into typed TypeScript modules consumed via `@/.contentlayer/generated`. Two document types are defined in `contentlayer.config.js`:

- **Post** — `content/posts/*.mdx` — requires `title`, `date`; optional `description`, `tags[]`
- **Page** — `content/pages/*.mdx` — requires `title`; optional `description`

Both get computed `slug` (full path) and `slugAsParams` (path without document-type prefix) fields. Syntax highlighting via `rehype-highlight` and heading anchors via `rehype-slug` are applied during MDX processing.

### Routing

- `/` — `app/page.tsx` — lists all posts sorted by date descending
- `/posts/[...slug]` — `app/posts/[...slug]/page.tsx` — individual post pages
- `/[...slug]` — `app/[...slug]/page.tsx` — static pages (e.g. `/about`)

### Styling conventions

- Prose content uses Tailwind Typography (`prose dark:prose-invert`)
- Dark mode via `class` strategy; default theme is dark
- Global dark background: `bg-indigo-950`; hover states use `indigo-900/50`
- Font: JetBrains Mono Bold (self-hosted woff2 in `app/webfonts/`)
- Max content width: `max-w-2xl` centered with `px-4`

### MDX components

Custom components available inside MDX (registered in `components/mdx-components.tsx`): `Image`, `Link`, `FaGithub`, `CiLinkedin`. Add new globally available MDX components there.

### Prettier config

4-space indent, no semicolons, double quotes, trailing commas (ES5). Run `npm run format` before committing UI changes.
