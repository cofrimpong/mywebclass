# MyWebClass.org — Eleventy starter

This repository contains a clean, production-ready Eleventy (11ty) scaffolding for the site "MyWebClass.org" using Nunjucks templates.

Quick start

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production (minifies HTML):

```bash
npm run build:prod
```

Notes about GitHub Pages and paths

- The templates use a `site.baseUrl` global that defaults to `.` which makes links relative. When deploying to GitHub Pages project pages you may set the `BASEURL` environment variable to your repo path (for example `/username/repo-name/`) or leave it as `.` to keep relative links.
- Example production build with a custom base URL:

```bash
BASEURL="/username/repo-name" ELEVENTY_ENV=production npm run build
```

Project structure (important files)

- `src/pages/index.njk` — Home page
- `src/pages/gallery.njk` — Gallery listing
- `src/pages/gallery/first.njk` — Sample gallery detail page
- `src/layouts/base.njk` — Global layout (SEO meta block)
- `src/components/card.njk` — Small reusable component
- `src/styles/` — Empty folder reserved for Bauhaus, Minimalism, Neo-Futurism demos
- `src/assets/css/global.css` — Main global CSS (empty placeholder)

Eleventy config

- Input directory: `src`
- Output directory: `_site`
- Passthrough copy for `src/assets` → `_site/assets`
- HTML is minified when `ELEVENTY_ENV=production`
