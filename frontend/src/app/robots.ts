import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt.
 *
 * The Sitemap line always points at the production root URL. On GitHub Pages
 * this file is served at the project path (`/energic/robots.txt`), which is
 * NOT the host-root crawler policy — crawlers read `https://<user>.github.io/robots.txt`.
 * That limitation is documented in `infra/seo.md`; the preview relies on the
 * per-page `noindex,follow` meta instead. In ordinary server mode this file
 * IS the host-root policy.
 *
 * No `Disallow: /` — crawlers must be able to see the preview pages so the
 * `noindex` meta is honoured.
 *
 * `force-static` keeps the route a plain static file in both server mode and
 * the static export (Next 15 metadata routes are dynamic by default).
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/tokens", "/_tokens", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
