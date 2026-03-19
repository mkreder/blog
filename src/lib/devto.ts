import Parser from "rss-parser";
import { site } from "../data/site";
import type { ExternalPost } from "../types";

const parser = new Parser();
const devtoFeedUrl = `https://dev.to/feed/${site.devtoUsername}`;

export async function getDevtoPosts(limit = 6): Promise<ExternalPost[]> {
  try {
    const feed = await parser.parseURL(devtoFeedUrl);
    return (feed.items ?? []).slice(0, limit).map((item) => ({
      title: item.title ?? "Untitled post",
      description:
        item.contentSnippet?.slice(0, 180) ??
        "Read the full article on dev.to.",
      url: item.link ?? `https://dev.to/${site.devtoUsername}`,
      publishedAt: item.isoDate ?? new Date().toISOString(),
      source: "dev.to",
      tags: normalizeCategories(item.categories)
    }));
  } catch (error) {
    console.warn("Unable to fetch dev.to feed.", error);
    return [];
  }
}

function normalizeCategories(categories: string[] | undefined) {
  return (categories ?? [])
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 4);
}
