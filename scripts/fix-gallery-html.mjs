#!/usr/bin/env node
/**
 * Second-pass cleanup: extracts all img src from remaining HTML gallery
 * fragments and converts to clean markdown image references.
 */
import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const DIR = "src/content/posts/legacy-imported";

async function fixFile(filePath) {
  const original = await readFile(filePath, "utf-8");
  let content = original;

  // Find lines that have a mix of markdown images and leftover HTML <figure>/<img> tags
  // Pattern: any line containing <figure><img src="..." or </li><figure> etc.
  content = content.replace(/^.*<figure>.*$/gm, (line) => {
    // Extract ALL image sources from this line (both markdown ![](src) and HTML <img src="">)
    const images = [];

    // Get markdown images already there
    const mdImgRe = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let m;
    while ((m = mdImgRe.exec(line)) !== null) {
      images.push(m[2].replace(/\?w=\d+/, ""));
    }

    // Get HTML img src
    const htmlImgRe = /src="([^"]+)"/g;
    while ((m = htmlImgRe.exec(line)) !== null) {
      const src = m[1].replace(/\?w=\d+/, "");
      if (!images.includes(src)) {
        images.push(src);
      }
    }

    if (images.length === 0) return "";

    // Convert all to clean local paths
    return images.map(src => {
      const filename = src.split("/").pop();
      // Use /images/legacy/wp/ for all gallery images
      return `![](/images/legacy/wp/${filename})`;
    }).join("\n\n");
  });

  // Clean up any remaining orphaned HTML tags from galleries
  content = content.replace(/<\/?(figure|ul|li|div)[^>]*>/g, "");

  // Clean up multiple consecutive blank lines
  content = content.replace(/\n{4,}/g, "\n\n\n");

  if (content !== original) {
    await writeFile(filePath, content, "utf-8");
    console.log(`[fixed] ${filePath.split("/").pop()}`);
    return true;
  }
  return false;
}

async function main() {
  const files = (await readdir(DIR)).filter(f => f.endsWith(".md"));
  let count = 0;
  for (const file of files) {
    if (await fixFile(join(DIR, file))) count++;
  }
  console.log(`\nDone. ${count} files updated.`);
}

main().catch(console.error);
