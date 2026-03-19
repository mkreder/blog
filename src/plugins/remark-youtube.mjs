import { visit } from "unist-util-visit";

const ytRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;

/**
 * Remark plugin: converts bare YouTube URLs in markdown paragraphs to embeds.
 */
export function remarkYouTube() {
  return (tree) => {
    visit(tree, "paragraph", (node, index, parent) => {
      if (node.children.length !== 1) return;
      const child = node.children[0];

      if (child.type === "text") {
        const match = child.value.trim().match(ytRegex);
        if (match) {
          parent.children[index] = { type: "html", value: embed(match[1]) };
        }
        return;
      }

      if (child.type === "link") {
        const match = child.url.match(ytRegex);
        if (match) {
          parent.children[index] = { type: "html", value: embed(match[1]) };
        }
      }
    });

    // Also handle YouTube URLs inside raw HTML blocks from WordPress imports.
    visit(tree, "html", (node, index, parent) => {
      const match = node.value.match(ytRegex);
      if (!match) return;

      // Replace the entire HTML block with an embed
      parent.children[index] = { type: "html", value: embed(match[1]) };
    });
  };
}

function embed(id) {
  return `<div class="yt-embed"><iframe src="https://www.youtube.com/embed/${id}" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
}
