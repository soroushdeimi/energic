import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo";

/**
 * Sitemap of the six public production pages.
 *
 * The URLs are always the *production* canonical URLs (energiccenter.ir),
 * even when this file is served from the GitHub Pages preview: the preview is
 * noindex and must not advertise its own URLs for indexing. Tokens and 404
 * are intentionally excluded.
 *
 * `force-static` keeps the route a plain static file in both server mode and
 * the static export (Next 15 metadata routes are dynamic by default).
 */
export const dynamic = "force-static";

const routes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/capabilities", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/companies", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/coworking", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // No `lastModified`: we have no true content-modification timestamp yet.
  // Fabricating one (e.g. build time) would mark unchanged pages as modified
  // on every build, so it is omitted until real tracked/CMS dates exist.
  return routes.map((route) => ({
    url: canonicalUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
