import { SITE_URL, LOCALES } from "@/lib/content";
import { blogs } from "@/lib/blogs";

/**
 * The sitemap, which the site did not have.
 *
 * It matters most right now: moving to a new domain means every URL search
 * engines know about changes, and a sitemap on the new host is the fastest way
 * to tell them what the new set is. Every entry carries its `alternates`, so
 * the English and Hebrew copies of a page are declared as translations of each
 * other rather than as duplicates.
 *
 * `lastModified` is deliberately absent. There is no build timestamp worth
 * quoting here — stamping every URL with "whenever this was last deployed"
 * tells a crawler that the whole site changed every time a typo was fixed,
 * which is worse than saying nothing.
 */
export default function sitemap() {
  const alternates = (path) => ({
    languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
  });

  const paths = ["", "/blog", ...blogs.map((p) => `/blog/${p.id}`)];

  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: alternates(path),
      // The home page outranks the blog index, which outranks a single post.
      priority: path === "" ? 1 : path === "/blog" ? 0.6 : 0.4,
    })),
  );
}
