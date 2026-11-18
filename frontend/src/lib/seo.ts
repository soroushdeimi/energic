/**
 * Shared SEO constants and env-aware URL helpers.
 *
 * The production site is the real customer domain `https://energiccenter.ir`.
 * The GitHub Pages export (basePath `/energic`) is a *visual preview only*:
 * its pages carry `noindex,follow` and their canonical URLs still point at
 * the corresponding production page. See `infra/seo.md` for the full policy.
 */

/** Real production origin. Override with NEXT_PUBLIC_SITE_URL if it changes. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://energiccenter.ir";

/**
 * Origin of the GitHub Pages preview. Known for this repo
 * (`https://soroushdeimi.github.io`); override with NEXT_PUBLIC_PREVIEW_ORIGIN
 * if the preview is hosted elsewhere.
 */
export const PREVIEW_ORIGIN =
  process.env.NEXT_PUBLIC_PREVIEW_ORIGIN ?? "https://soroushdeimi.github.io";

/** Base path of the static GitHub Pages preview ("" in production/server mode). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** True when building/serving the static GitHub Pages preview. */
export const IS_PREVIEW = BASE_PATH !== "";

export const SITE_NAME = "مرکز نوآوری انرژیک";
export const SITE_NAME_EN = "Energic Innovation Center";

/** Absolute, resolvable URL of the shared OG/Twitter image on production. */
export const OG_IMAGE = `${SITE_URL}/logos/footer-logo.png`;

/**
 * URL of the OG/Twitter image as served by the *active* origin.
 *
 * Production/server mode: the absolute production URL
 * (`https://energiccenter.ir/logos/footer-logo.png`).
 *
 * Pages preview: the real preview origin plus the base path
 * (`https://soroushdeimi.github.io/energic/logos/footer-logo.png`) — the exact
 * URL where the asset is deployed, so shared cards load. The URL is absolute
 * so Next.js does not re-prefix it.
 */
export function ogImageUrl(): string {
  return IS_PREVIEW ? `${PREVIEW_ORIGIN}${BASE_PATH}/logos/footer-logo.png` : OG_IMAGE;
}

/**
 * `metadataBase` for the active build.
 *
 * The origin of the site being built: the preview origin for the Pages export,
 * the production origin for server mode. All metadata URLs (canonical, og:url,
 * og:image) are emitted as absolute URLs, so `metadataBase` mainly serves as
 * the base Next.js resolves any relative metadata value against — and, in the
 * preview, keeps the production canonical/og:url URLs "external" so the
 * preview's `trailingSlash: true` is not applied to them.
 */
export function metadataBase(): URL {
  // The origin of the site being built. In the Pages preview this is the
  // preview origin, which also keeps the *production* canonical/og:url URLs
  // "external" so Next.js does not re-apply the preview's `trailingSlash: true`
  // to them (production prefers no trailing slash on sub-routes). In server
  // mode it is the production origin (and `trailingSlash` is not set there).
  return new URL(IS_PREVIEW ? PREVIEW_ORIGIN : SITE_URL);
}

/**
 * Absolute canonical URL of a site route on the production domain.
 *
 * Production prefers URLs *without* a trailing slash for sub-routes:
 * `https://energiccenter.ir/about/` 308-redirects to `/about`. The root is the
 * bare origin `https://energiccenter.ir` (Next.js normalizes the root
 * canonical to the origin; both root forms return 200 directly). (The GitHub
 * Pages export keeps its own `trailingSlash: true` for internal
 * navigation/filesystem — only these production canonical URLs drop the slash.)
 */
export function canonicalUrl(path: string): string {
  const p = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${SITE_URL}${p}`;
}

/**
 * Robots meta for the active build.
 *
 * Production: indexable. Pages preview: noindex,follow — the preview must not
 * be indexed, but links on it should still pass value to production URLs.
 */
export function pageRobots() {
  return IS_PREVIEW ? { index: false, follow: true } : { index: true, follow: true };
}
