import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { site } from "../data/site";

export const prerender = true;

function renderUrl(loc: string, lastmod?: Date) {
  const lastmodTag = lastmod ? `<lastmod>${lastmod.toISOString()}</lastmod>` : "";

  return `<url><loc>${loc}</loc>${lastmodTag}</url>`;
}

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  const staticPages = [
    renderUrl(new URL("/", site.url).toString()),
    renderUrl(new URL("/about/", site.url).toString()),
    renderUrl(new URL("/blog/", site.url).toString()),
    renderUrl(new URL("/talks/", site.url).toString())
  ];

  const postPages = posts.map((post) => {
    const canonicalUrl = post.data.canonicalUrl ?? new URL(`/blog/${post.id}/`, site.url).toString();
    const lastModified = post.data.updatedAt ?? post.data.publishedAt;

    return renderUrl(canonicalUrl, lastModified);
  });

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    [...staticPages, ...postPages].join("") +
    "</urlset>";

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
