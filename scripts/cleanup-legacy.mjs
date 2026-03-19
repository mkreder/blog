#!/usr/bin/env node
/**
 * Cleans up WordPress artifacts from legacy-imported markdown files.
 */
import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const DIR = "src/content/posts/legacy-imported";

let totalChanges = 0;

async function cleanFile(filePath) {
  const original = await readFile(filePath, "utf-8");
  let content = original;
  const changes = [];

  // 1. Remove WordPress block comments: <!-- wp:xxx --> and <!-- /wp:xxx -->
  const wpBlocks = content.match(/<!--\s*\/?wp:\w[^>]*-->/g);
  if (wpBlocks) {
    content = content.replace(/<!--\s*\/?wp:\w[^>]*-->\n?/g, "");
    changes.push(`removed ${wpBlocks.length} wp:block comments`);
  }

  // 2. Remove language switching comments: <!--:en-->, <!--:es-->, <!--:-->
  const langComments = content.match(/<!--:(?:en|es)?-->/g);
  if (langComments) {
    content = content.replace(/<!--:(?:en|es)?-->\n?/g, "");
    changes.push(`removed ${langComments.length} language switching comments`);
  }

  // 3. Remove empty <p></p> tags
  const emptyP = content.match(/<p>\s*<\/p>/g);
  if (emptyP) {
    content = content.replace(/<p>\s*<\/p>\n?/g, "");
    changes.push(`removed ${emptyP.length} empty <p> tags`);
  }

  // 4. Remove WordPress gallery figure wrappers, keep images inside
  // Pattern: <figure class="wp-block-gallery...">...<img.../>...</figure>
  if (content.includes("wp-block-gallery")) {
    // Extract img src from gallery blocks and replace with markdown images
    content = content.replace(
      /<figure class="wp-block-gallery[^"]*"[^>]*>([\s\S]*?)<\/figure>/g,
      (match, inner) => {
        const imgs = [];
        const imgRe = /src="([^"]+)"/g;
        let m;
        while ((m = imgRe.exec(inner)) !== null) {
          // Remove ?w=xxx query param
          const src = m[1].replace(/\?w=\d+/, "");
          imgs.push(`![](/images/legacy/wp/${encodeURI(src.split("/").pop())})`);
        }
        return imgs.length > 0 ? imgs.join("\n\n") : "";
      }
    );
    changes.push("converted wp-block-gallery to markdown images");
  }

  // 5. Clean up standalone wp-block-embed figure wrappers (non-YouTube)
  if (content.includes("wp-block-embed")) {
    content = content.replace(
      /<figure class="wp-block-embed[^"]*"[^>]*>[\s\S]*?<\/figure>/g,
      ""
    );
    changes.push("removed wp-block-embed wrappers");
  }

  // 6. Clean up WordPress image blocks: <figure class="wp-block-image..."><img.../></figure>
  if (content.includes("wp-block-image")) {
    content = content.replace(
      /<figure class="wp-block-image[^"]*"[^>]*>\s*<img[^>]*src="([^"]+)"[^>]*\/?>\s*(?:<figcaption[^>]*>([^<]*)<\/figcaption>)?\s*<\/figure>/g,
      (match, src, caption) => {
        const cleanSrc = src.replace(/\?w=\d+/, "");
        const alt = caption || "";
        return `![${alt}](${cleanSrc})`;
      }
    );
    changes.push("converted wp-block-image to markdown images");
  }

  // 7. Remove <div class="blocks-gallery-grid/item"> wrappers, keep content
  content = content.replace(/<div class="blocks-gallery[^"]*">/g, "");
  content = content.replace(/<li class="blocks-gallery-item">/g, "");

  // 8. Remove orphaned </li>, </div>, </figure> from gallery cleanup
  // (only if they're on their own line with nothing else)
  content = content.replace(/^\s*<\/(?:li|figure)>\s*$/gm, "");

  // 9. Remove old image_block divs, keep the img inside
  if (content.includes("image_block")) {
    content = content.replace(
      /<div class="image_block"[^>]*>\s*([\s\S]*?)\s*<\/div>/g,
      "$1"
    );
    changes.push("unwrapped image_block divs");
  }

  // 10. Remove MsoNormal (Word artifact) styling
  if (content.includes("MsoNormal")) {
    content = content.replace(/ class="MsoNormal"/g, "");
    content = content.replace(/ style="font-family:arial[^"]*"/g, "");
    changes.push("removed Word artifacts");
  }

  // 11. Clean up multiple consecutive blank lines (max 2)
  content = content.replace(/\n{4,}/g, "\n\n\n");

  if (content !== original) {
    await writeFile(filePath, content, "utf-8");
    totalChanges++;
    const name = filePath.split("/").pop();
    console.log(`[fixed] ${name}: ${changes.join(", ")}`);
  }
}

async function main() {
  const files = (await readdir(DIR)).filter(f => f.endsWith(".md"));
  console.log(`Scanning ${files.length} files...\n`);

  for (const file of files) {
    await cleanFile(join(DIR, file));
  }

  console.log(`\nDone. ${totalChanges} files updated.`);
}

main().catch(console.error);
