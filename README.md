# Martin Duchev's Blog

Personal blog built with Next.js and Contentlayer.

Live at [mduchev.xyz](mduchev.xyz)

## Tech Stack

- **Next.js 13** (App Router)
- **Contentlayer** for MDX content management
- **Tailwind CSS** with Typography plugin
- **TypeScript**
- **next-themes** for dark mode
- **rehype-highlight** for code syntax highlighting

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run preview` | Build and start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Content

Posts live in `content/posts/` as MDX files with frontmatter:

```yaml
---
title: "Post Title"
description: Short description
date: "2025-06-02"
tags: ["Tag1", "Tag2"]
---
```

Pages live in `content/pages/`.
