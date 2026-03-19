#!/usr/bin/env node
/**
 * Downloads WordPress gallery images from the live site
 * and outputs a JSON mapping of post -> gallery -> local paths
 */
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join, basename } from "path";

const POSTS = [
  {
    slug: "fedora-day-bsas-2014",
    url: "https://mkreder.com/2014/12/15/fedora-day-bsas-2014/"
  },
  {
    slug: "hummingboard",
    url: "https://mkreder.com/2016/06/19/hummingboard/"
  },
  {
    slug: "flisol-2014",
    url: "https://mkreder.com/2014/05/07/flisol-2014/"
  }
];

const OUT_DIR = join(process.cwd(), "public/images/legacy/galleries");

async function fetchImageUrls(postUrl) {
  // We'll use the WP page and parse img tags from gallery sections
  const res = await fetch(postUrl);
  const html = await res.text();

  // Find all gallery blocks and their images
  const galleries = [];
  const galleryRegex = /<div[^>]*class="[^"]*gallery[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;

  // Simpler approach: just find all img src in uploads
  const imgRegex = /src="(https?:\/\/mkreder\.com\/wp-content\/uploads\/[^"?]+)/g;
  const allImages = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const url = match[1];
    if (!allImages.includes(url)) {
      allImages.push(url);
    }
  }
  return allImages;
}

async function downloadImage(url, destDir) {
  const filename = basename(url);
  const dest = join(destDir, filename);
  if (existsSync(dest)) {
    console.log(`  [skip] ${filename}`);
    return filename;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`  [fail] ${filename} (${res.status})`);
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buffer);
    console.log(`  [ok]   ${filename} (${(buffer.length / 1024).toFixed(0)}KB)`);
    return filename;
  } catch (err) {
    console.log(`  [err]  ${filename}: ${err.message}`);
    return null;
  }
}

async function main() {
  for (const post of POSTS) {
    console.log(`\n=== ${post.slug} ===`);
    console.log(`Fetching: ${post.url}`);

    const imageUrls = await fetchImageUrls(post.url);
    console.log(`Found ${imageUrls.length} images`);

    const destDir = join(OUT_DIR, post.slug);
    await mkdir(destDir, { recursive: true });

    const downloaded = [];
    for (const url of imageUrls) {
      const filename = await downloadImage(url, destDir);
      if (filename) downloaded.push(filename);
    }

    console.log(`Downloaded: ${downloaded.length}/${imageUrls.length}`);
  }
}

main().catch(console.error);
