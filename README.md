# mkreder blog

This project is a static blog for `mkreder.com` built with Astro.

The main goal is to keep the site simple to own:

- write new posts in markdown
- keep content in git
- preview locally before publishing
- preserve old WordPress posts without keeping WordPress alive
- surface newer external posts from dev.to

## How it works

The site has two content sources:

1. Local markdown posts you own inside this repo
2. External syndicated posts fetched from dev.to at build time

The site itself is fully static. Astro turns the markdown and templates into HTML during build.

## Project structure

Important paths:

- `src/pages`
  Site routes such as home, blog index, about, and certifications.
- `src/layouts`
  Shared page layout and global styling.
- `src/components`
  Reusable UI pieces like post cards.
- `src/content/posts`
  First-party blog content written in markdown.
- `src/content/posts/legacy-imported`
  WordPress posts imported from the XML export.
- `src/data/site.ts`
  Site metadata, social links, and certification data.
- `scripts/import-wordpress.mjs`
  Import script for WordPress export files.
- `public/images/legacy`
  Downloaded images referenced by imported WordPress posts.

## Local posts

New posts live under `src/content/posts`.

Each markdown file uses frontmatter like:

```md
---
title: My Post
description: Short summary for listings and metadata
publishedAt: 2026-03-19
tags:
  - aws
  - ai
featured: true
draft: false
---
```

Key fields:

- `title`: post title
- `description`: short summary used in cards and metadata
- `publishedAt`: publish date shown on the site
- `tags`: post tags
- `featured`: whether the post can be featured on the homepage
- `draft`: if `true`, the post stays in git but is hidden from the site
- `legacySourceUrl`: original WordPress URL for migrated posts
- `canonicalUrl`: optional canonical URL if needed later

## WordPress migration

The old blog can be exported from WordPress as XML and imported into this repo.

Current importer behavior:

- reads published posts from the XML export
- creates markdown files in `src/content/posts/legacy-imported`
- preserves title, description, publish date, tags, and original URL
- can optionally download referenced media into `public/images/legacy`
- rewrites imported post content to local image paths when media is downloaded

Run import only:

```bash
node ./scripts/import-wordpress.mjs /path/to/export.xml
```

Run import plus media download:

```bash
node ./scripts/import-wordpress.mjs /path/to/export.xml src/content/posts/legacy-imported --download-media
```

Notes:

- the XML includes attachment metadata and image URLs, but not the binary files themselves
- media download depends on the original URLs still being reachable
- some third-party or dead external images may remain unresolved

## dev.to integration

The homepage also tries to fetch posts from:

```text
https://dev.to/feed/mkreder
```

That logic lives in `src/lib/devto.ts`.

If the feed is reachable during build, recent dev.to posts appear on the homepage.
If it is not reachable, the site still builds and falls back cleanly.

## About and certifications

The profile section is intentionally short and employment-oriented rather than a full resume.

Profile and certification data live in:

- `src/data/site.ts`
- `src/pages/about.astro`
- `src/pages/certifications.astro`

Credly URLs can be added later in `src/data/site.ts`.

## Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run dev
```

Build the site:

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

Run Astro checks:

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run check
```

## Publishing workflow

Typical workflow for a new post:

1. Create a markdown file in `src/content/posts`
2. Add frontmatter and content
3. Run the dev server and review locally
4. Commit changes
5. Push to GitHub
6. Deploy from GitHub using your chosen hosting platform

Typical workflow for legacy updates:

1. Export WordPress XML
2. Re-run the import script
3. Review imported posts and images
4. Hide low-value posts with `draft: true`
5. Commit and push

## Content curation

Not every imported post needs to stay visible.

The recommended approach is:

- keep technical posts public
- keep community/history posts if they support your professional story
- hide low-signal or off-topic posts with `draft: true`

This keeps the archive in git without forcing every post onto the public site.

## Current limitations

- `updatedAt` for imported posts should be improved to use the real WordPress modified date
- imported WordPress HTML is preserved as-is; it is not fully converted into cleaner markdown blocks
- external media that no longer exists cannot be recovered automatically
- dev.to feed rendering depends on network access during build

## Summary

This repo is the source of truth for the blog.

You own:

- the site code
- the markdown content
- the legacy imported archive
- the local media files for migrated posts

That is the main architectural choice here: simple, static, git-backed publishing with no CMS dependency.
