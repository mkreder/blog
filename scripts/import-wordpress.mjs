import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { XMLParser } from "fast-xml-parser";

const args = process.argv.slice(2);
const positional = [];
const options = new Set();

for (const arg of args) {
  if (arg.startsWith("--")) {
    options.add(arg);
  } else {
    positional.push(arg);
  }
}

const [inputPath, outputDirArg = "src/content/posts/legacy-imported"] = positional;
const shouldDownloadMedia = options.has("--download-media");
const mediaDirArg = "public/images/legacy";
const reportPathArg = "tmp/wordpress-import-report.json";

if (!inputPath) {
  console.error(
    "Usage: npm run import:wordpress -- <wordpress-export.xml> [output-dir] [--download-media]"
  );
  process.exit(1);
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  parseTagValue: false,
  removeNSPrefix: false
});

const rootDir = process.cwd();
const xml = await fs.readFile(path.resolve(rootDir, inputPath), "utf8");
const parsed = parser.parse(xml);
const outputDir = path.resolve(rootDir, outputDirArg);
const mediaDir = path.resolve(rootDir, mediaDirArg);
const reportPath = path.resolve(rootDir, reportPathArg);

const channel = parsed?.rss?.channel;
const items = asArray(channel?.item);
const attachments = buildAttachmentMap(items);
const posts = items.filter((item) => item["wp:post_type"] === "post");
const report = {
  importedPosts: 0,
  downloadedAssets: [],
  missingAssets: [],
  attachmentCount: items.filter((item) => item["wp:post_type"] === "attachment").length
};

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(path.dirname(reportPath), { recursive: true });

if (shouldDownloadMedia) {
  await fs.mkdir(mediaDir, { recursive: true });
}

for (const item of posts) {
  const status = item["wp:status"] ?? "";
  if (status !== "publish") {
    continue;
  }

  const title = sanitizeText(item.title ?? "Untitled");
  const slug = slugify(item["wp:post_name"] || title);
  const description = sanitizeExcerpt(
    item["excerpt:encoded"] || item["content:encoded"] || ""
  );
  const publishedAt =
    item["wp:post_date"]?.split(" ")[0] ?? new Date().toISOString().slice(0, 10);
  const updatedAt = item["wp:post_date_gmt"]?.split(" ")[0];
  const tags = collectTerms(item.category);
  const legacySourceUrl = item.link;
  const originalBody = normalizeBody(item["content:encoded"] || "");
  const assetUrls = findAssetUrls(originalBody, attachments, channel?.link);
  const replacements = shouldDownloadMedia
    ? await downloadAssets(assetUrls, mediaDir, report)
    : buildRemoteReplacements(assetUrls, attachments);
  const body = rewriteBodyAssetUrls(originalBody, replacements);

  const frontmatterLines = [
    "---",
    `title: ${yamlEscape(title)}`,
    `description: ${yamlEscape(description)}`,
    `publishedAt: ${publishedAt}`,
    ...(updatedAt ? [`updatedAt: ${updatedAt}`] : []),
    "tags:",
    ...(tags.length > 0 ? tags.map((tag) => `  - ${tag}`) : ["  - legacy"]),
    ...(legacySourceUrl ? [`legacySourceUrl: ${legacySourceUrl}`] : []),
    "---",
    ""
  ];

  const filePath = path.join(outputDir, `${slug}.md`);
  await fs.writeFile(filePath, `${frontmatterLines.join("\n")}${body}\n`, "utf8");
  report.importedPosts += 1;
}

await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log(
  `Imported ${report.importedPosts} WordPress posts into ${path.relative(rootDir, outputDir)}.`
);
console.log(`Migration report written to ${path.relative(rootDir, reportPath)}.`);

function asArray(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function collectTerms(categories) {
  return asArray(categories)
    .filter((entry) => entry.domain === "post_tag" || entry.domain === "category")
    .map((entry) => slugify(sanitizeText(entry["#text"] ?? "")))
    .filter(Boolean)
    .slice(0, 8);
}

function sanitizeText(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function sanitizeExcerpt(value) {
  const plain = String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plain.slice(0, 180) || "Imported from WordPress.";
}

function slugify(value) {
  return sanitizeText(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeBody(value) {
  return String(value)
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function yamlEscape(value) {
  return JSON.stringify(String(value));
}

function buildAttachmentMap(items) {
  const map = {};

  for (const item of items) {
    if (item["wp:post_type"] !== "attachment") {
      continue;
    }

    const urls = [
      item["wp:attachment_url"],
      item.guid?.["#text"],
      typeof item.guid === "string" ? item.guid : null
    ].filter(Boolean);

    for (const url of urls) {
      map[url] = item["wp:attachment_url"] || url;
      map[decodeHtml(url)] = item["wp:attachment_url"] || url;
      try {
        const parsedUrl = new URL(url);
        map[parsedUrl.pathname] = item["wp:attachment_url"] || url;
      } catch {}
    }
  }

  return map;
}

function findAssetUrls(body, attachments, siteUrl) {
  const results = new Set();
  const matches = body.matchAll(
    /(?:src|href)=["']([^"']+\.(?:png|jpe?g|gif|svg|webp|avif|pdf)(?:\?[^"']*)?)["']/gi
  );

  for (const match of matches) {
    results.add(decodeHtml(match[1]));
  }

  if (siteUrl) {
    for (const candidate of Array.from(results)) {
      if (candidate.startsWith("/")) {
        results.add(new URL(candidate, siteUrl).toString());
      }
    }
  }

  return Array.from(results);
}

function buildRemoteReplacements(assetUrls, attachments) {
  const replacements = new Map();

  for (const assetUrl of assetUrls) {
    const canonicalUrl = resolveAttachmentUrl(stripQueryAndHash(assetUrl), attachments);
    if (canonicalUrl) {
      replacements.set(stripQueryAndHash(assetUrl), canonicalUrl);
    }
  }

  return replacements;
}

async function downloadAssets(assetUrls, mediaDir, report) {
  const replacements = new Map();
  const seenCanonicalUrls = new Map();

  for (const assetUrl of assetUrls) {
    const canonicalUrl = resolveAttachmentUrl(stripQueryAndHash(assetUrl), attachments);
    if (!canonicalUrl) {
      report.missingAssets.push(assetUrl);
      continue;
    }

    if (seenCanonicalUrls.has(canonicalUrl)) {
      replacements.set(assetUrl, seenCanonicalUrls.get(canonicalUrl));
      continue;
    }

    try {
      const localPath = await downloadAsset(canonicalUrl, mediaDir);
      const publicPath = `/${path
        .relative(path.resolve(rootDir, "public"), localPath)
        .replaceAll(path.sep, "/")}`;
      replacements.set(stripQueryAndHash(assetUrl), publicPath);
      seenCanonicalUrls.set(canonicalUrl, publicPath);
      report.downloadedAssets.push({ source: canonicalUrl, target: publicPath });
    } catch (error) {
      report.missingAssets.push({ source: canonicalUrl, error: String(error) });
    }
  }

  return replacements;
}

function resolveAttachmentUrl(assetUrl, attachments) {
  return (
    attachments[assetUrl] ||
    attachments[decodeHtml(assetUrl)] ||
    safelyResolvePath(assetUrl, attachments)
  );
}

function safelyResolvePath(assetUrl, attachments) {
  try {
    const parsedUrl = new URL(assetUrl);
    return attachments[parsedUrl.pathname];
  } catch {
    return attachments[assetUrl];
  }
}

async function downloadAsset(sourceUrl, mediaDir) {
  const parsedUrl = new URL(sourceUrl);
  const relativePath = parsedUrl.pathname
    .replace(/^\/wp-content\/uploads\//, "")
    .replace(/^\/+/, "");
  const localPath = path.join(mediaDir, relativePath);

  await fs.mkdir(path.dirname(localPath), { recursive: true });

  try {
    await fs.access(localPath);
    return localPath;
  } catch {}

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${sourceUrl}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await fs.writeFile(localPath, Buffer.from(arrayBuffer));
  return localPath;
}

function rewriteBodyAssetUrls(body, replacements) {
  return body.replace(
    /((?:src|href)=["'])([^"']+\.(?:png|jpe?g|gif|svg|webp|avif|pdf)(?:\?[^"']*)?)(["'])/gi,
    (full, prefix, rawUrl, suffix) => {
      const decodedUrl = decodeHtml(rawUrl);
      const bareUrl = stripQueryAndHash(decodedUrl);
      const queryAndHash = decodedUrl.slice(bareUrl.length);
      const replacement = replacements.get(bareUrl);
      if (!replacement) {
        return full;
      }

      return `${prefix}${replacement}${queryAndHash}${suffix}`;
    }
  );
}

function decodeHtml(value) {
  return String(value)
    .replaceAll("&amp;", "&")
    .replaceAll("&#038;", "&");
}

function encodeHtml(value) {
  return String(value).replaceAll("&", "&amp;");
}

function stripQueryAndHash(value) {
  return String(value).split(/[?#]/, 1)[0];
}
