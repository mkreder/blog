#!/usr/bin/env node
/**
 * Replaces [gallery ids="..."] shortcodes in markdown files
 * with local image references based on downloaded gallery images.
 */
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const CONTENT = "src/content/posts/legacy-imported";

// Fedora Day galleries: mapped from the WordPress page order
const fedoraDay = {
  file: "fedora-day-bsas-2014.md",
  galleries: [
    { // Organizational dinner (3 images, IDs 1208,1209,1204)
      ids: "1208,1209,1204",
      images: [
        "img_20141213_132135658.jpg",
        "img_20141213_132151036-150x150-1.jpg",
        "img_20141213_132133528.jpg"
      ]
    },
    { // Fedora Day (52 images)
      ids: "1306,1302,1298,1294,1290,1286,1282,1278,1274,1271,1266,1262,1258,1254,1250,1238,1230,1223,1231,1226,1215,1197,1195,1192,1188,1183,1180,1175,1172,1168,1163,1159,1155,1152,1145,1148,1142,1133,1124,1121,1116,1112,1105,1101,1097,1090,1060,1041,1034,1022,1018,1010",
      images: [
        "img-20141213-wa0043-1024x575-1.jpg",
        "img-20141213-wa0041-1024x575-1.jpeg",
        "img-20141213-wa0040-1024x576-1.jpg",
        "img-20141213-wa0036-1024x575-1.jpg",
        "img-20141213-wa0031-1024x575-1.jpeg",
        "img-20141213-wa0029-1024x575-1.jpeg",
        "img-20141213-wa0027-1024x576-1.jpg",
        "img-20141213-wa0026-1024x576-1.jpg",
        "img-20141213-wa0024-1024x576-1.jpg",
        "img-20141213-wa0023.jpg",
        "img-20141213-wa0022-576x1024-1.jpg",
        "img-20141213-wa0015-1024x575-1.jpeg",
        "img-20141213-wa0010-1024x575-1.jpeg",
        "img-20141213-wa0006-1024x575-1.jpeg",
        "img-20141213-wa0002-1024x575-1.jpeg",
        "img_20141213_155140456-1024x575-1.jpg",
        "img_20141213_154515082-1024x575-1.jpg",
        "img_20141213_143900467.jpg",
        "img_20141213_154515082.jpg",
        "img_20141213_152638491-1024x575-1.jpg",
        "img_20141213_143502094.jpg",
        "img_20141213_122019370-150x150-1.jpg",
        "img_20141213_115137685-1024x575-1.jpg",
        "img_20141213_111725881.jpg",
        "img_20141213_111250356.jpg",
        "img_20141213_105537791-1024x575-1.jpg",
        "img_20141213_105527662.jpg",
        "img_20141213_104740326-575x1024-1.jpg",
        "img_20141213_104644612.jpg",
        "img_20141213_102227480.jpg",
        "img_20141213_101501891-1024x575-1.jpg",
        "img_20141213_092244405-575x1024-1.jpg",
        "img_20141213_173604-1024x576-1.jpg",
        "img_20141213_165501.jpg",
        "img_20141213_153130.jpg",
        "img_20141213_162700-1024x689-1.jpg",
        "img_20141213_153130-150x150-1.jpg",
        "img_20141213_143824.jpg",
        "img_20141213_143604-1024x576-1.jpg",
        "img_20141213_140334.jpg",
        "img_20141213_135839-1024x576-1.jpg",
        "img_20141213_135659-1024x576-1.jpg",
        "img_20141212_180223.jpg",
        "img_20141212_175742.jpg",
        "img_20141212_173017.jpg",
        "img_20141211_193039-1-150x150-1.jpg",
        "cropped-img_20141212_175742-150x150-1.jpg",
        "20141213_165447-1024x576-1.jpg",
        "20141213_111237.jpg",
        "20141213_111224.jpg",
        "20141213_101131.jpg",
        "20141213_101118.jpg"
      ]
    },
    { // Release Party (9 images)
      ids: "1311,1247,1240,1084,1077,1072,1053,1047,1043",
      images: [
        "img-20141213-wa0046.jpg",
        "img_20141213_204435305.jpg",
        "img_20141213_195010227-150x150-1.jpg",
        "img_20141210_224526774-1024x575-1.jpg",
        "img_20141210_224514669-1024x575-1.jpg",
        "img_20141210_224449913.jpg",
        "20141213_192048-1024x576-1.jpg",
        "20141213_192047-150x150-1.jpg",
        "20141213_191436-150x150-1.jpg"
      ]
    }
  ]
};

async function fixFile(config) {
  const filePath = join(CONTENT, config.file);
  let content = await readFile(filePath, "utf-8");

  for (const gallery of config.galleries) {
    const shortcode = `[gallery ids="${gallery.ids}"]`;
    const base = `/images/legacy/galleries/${config.file.replace('.md', '')}/`;
    const imgMarkdown = gallery.images
      .map(f => `![Fedora Day](${base}${f})`)
      .join("\n\n");

    content = content.replace(shortcode, imgMarkdown);
  }

  await writeFile(filePath, content, "utf-8");
  console.log(`Updated: ${config.file}`);
}

// Fix FLISOL - images are lost, remove gallery shortcodes
async function fixFlisol() {
  const filePath = join(CONTENT, "flisol-2014.md");
  let content = await readFile(filePath, "utf-8");
  content = content.replace(/\[gallery ids="[^"]+"\]/g, "*Photos from this event are no longer available.*");
  await writeFile(filePath, content, "utf-8");
  console.log("Updated: flisol-2014.md (images unavailable)");
}

await fixFile(fedoraDay);
await fixFlisol();
console.log("Done!");
