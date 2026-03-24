import { getCollection } from "astro:content";

type LegacyRedirect = {
  params: {
    year: string;
    month: string;
    day: string;
    slug: string;
  };
  props: {
    destination: string;
  };
};

export async function getLegacyPostRedirects(): Promise<LegacyRedirect[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft && Boolean(data.legacySourceUrl));

  return posts.flatMap((post) => {
    const legacyUrl = post.data.legacySourceUrl;

    if (!legacyUrl) {
      return [];
    }

    const segments = new URL(legacyUrl).pathname.split("/").filter(Boolean);

    if (segments.length !== 4) {
      return [];
    }

    const [year, month, day, slug] = segments;

    return [
      {
        params: { year, month, day, slug },
        props: {
          destination: `/blog/${post.id}/`
        }
      }
    ];
  });
}
