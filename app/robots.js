import { SITE_URL } from "@/lib/content";

/**
 * robots.txt, which the site also did not have — so it was being crawled on
 * defaults, with no pointer to a sitemap.
 *
 * Everything is allowed. There is nothing on this site that should not be
 * indexed, and a Disallow written "just in case" is how pages quietly stop
 * appearing in search.
 */
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
