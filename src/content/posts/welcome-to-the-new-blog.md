---
title: Welcome to the New Blog
description: Why the site moved away from WordPress and back to markdown in git.
publishedAt: 2026-03-19
tags:
  - blog
  - astro
  - markdown
featured: true
---

The new site is designed around a simple publishing model:

- write posts in markdown
- review changes in git
- preview locally before publishing
- keep ownership of the content and the code

This removes the friction of maintaining a WordPress installation while still leaving room for
syndication to places like dev.to.

## How publishing works

New first-party posts live under `src/content/posts`. Each file uses frontmatter for dates,
descriptions, tags, and whether the post should be featured on the homepage.

## What happens to the old blog

The goal is to import WordPress content into markdown so the site has a single durable archive.
The included import script is set up for a WordPress XML export and writes converted posts into
the same content collection.
