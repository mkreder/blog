# mkreder blog

Static Astro site for `mkreder.com`.

## Goals

- publish first-party posts from markdown in git
- preview locally before publishing
- keep old WordPress posts in the same archive after import
- surface external dev.to posts automatically
- include a concise employment-oriented profile and certifications

## Local development

```bash
npm install
npm run dev
```

## Content model

- Local posts live in `src/content/posts`
- Imported WordPress posts can be generated into `src/content/posts/legacy-imported`
- The homepage also pulls recent articles from `https://dev.to/feed/<username>`

## WordPress migration

Export the old site from WordPress as XML, then run:

```bash
npm run import:wordpress -- ./path/to/export.xml
```

That will create markdown files with frontmatter in `src/content/posts/legacy-imported`.

## Profile data

- Update site metadata and certification details in `src/data/site.ts`
- Add Credly links per certification when you want public badge URLs exposed
