#!/usr/bin/env node
/**
 * Downloads images referenced as /images/legacy/wp/* from the WordPress site.
 * Tries multiple known upload paths on mkreder.com.
 */
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

const OUT = "public/images/legacy/wp";
await mkdir(OUT, { recursive: true });

// All filenames needed
const files = [
  // cisl2011
  "100_2885.jpg", "100_2896.jpg", "100_2897.jpg", "100_2901.jpg",
  "100_2909.jpg", "100_2918.jpg", "100_2922.jpg",
  // cisl-2013
  "2013-10-16-13.08.44.jpg", "20131016_130746.jpg",
  // cisl2014
  "2014-10-14-10.21.22-1.jpg", "2014-10-14-10.23.00-1.jpg",
  "2014-10-14-10.32.48-1.jpg", "2014-10-14-12.50.08.jpg",
  "2014-10-14-13.07.36.jpg", "2014-10-14-13.25.55.jpg",
  "2014-10-14-17.19.45.jpg", "2014-10-14-17.20.42.jpg",
  // red-hat-linux-6-2
  "cropped-screenshot-rh62-virtual-machine-4-1.png",
  "screenshot-rh62-virtual-machine-2.png",
  "screenshot-rh62-virtual-machine-3.png",
  "screenshot-rh62-virtual-machine-4.png",
  // trying-to-run-old-red-hat-version-in-kvm-failed
  "screenshot-rh62-virtual-machine-1.png",
  "screenshot-rh62-virtual-machine.png",
  // a-una-forma-distinta
  "screenshot-matias40flame-1-1.png",
  "screenshot-matias40flame-3-1.png",
  "screenshot-matias40flame-2.png",
];

// Known upload paths to try
const bases = [
  "https://mkreder.com/wp-content/uploads/2021/07/",
  "https://mkreder.com/wp-content/uploads/2014/10/",
  "https://mkreder.com/wp-content/uploads/2014/08/",
  "https://mkreder.com/wp-content/uploads/2013/10/",
  "https://mkreder.com/wp-content/uploads/2013/08/",
  "https://mkreder.com/wp-content/uploads/2011/09/",
  "https://mkreder.com/wp-content/uploads/2017/06/",
  "https://mkreder.com/wp-content/uploads/2020/02/",
  "https://mkreder.com/wp-content/uploads/2012/06/",
];

for (const file of files) {
  const dest = join(OUT, file);
  if (existsSync(dest)) {
    console.log(`[skip] ${file}`);
    continue;
  }

  let found = false;
  for (const base of bases) {
    try {
      const res = await fetch(base + file);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        await writeFile(dest, buf);
        console.log(`[ok]   ${file} (${(buf.length / 1024).toFixed(0)}KB) from ${base}`);
        found = true;
        break;
      }
    } catch {}
  }
  if (!found) {
    console.log(`[FAIL] ${file} - not found on any path`);
  }
}

console.log("\nDone!");
