import { defineConfig } from "astro/config";
import { remarkYouTube } from "./src/plugins/remark-youtube.mjs";

export default defineConfig({
  site: "https://mkreder.com",
  markdown: {
    remarkPlugins: [remarkYouTube]
  }
});
