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

/** Base path of the static GitHub Pages preview ("" in production/server mode). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** True when building/serving the static GitHub Pages preview. */
export const IS_PREVIEW = BASE_PATH !== "";

export const SITE_NAME = "مرکز نوآوری انرژیک";
export const SITE_NAME_EN = "Energic Innovation Center";

/** Absolute, resolvable URL of the shared OG/Twitter image. */
export const OG_IMAGE = `${SITE_URL}/logos/footer-logo.png`;

/**
 * URL of the OG/Twitter image as served by the *active* origin.
 *
 * Production/server mode: the absolute production URL
 * (`https://energiccenter.ir/logos/footer-logo.png`).
 *
 * Pages preview: the same origin plus the base path
 * (`https://energiccenter.ir/energic/logos/footer-logo.png`). The preview
 * origin is unknown at build time, so the production origin is used as a
 * stand-in; what matters is the path `/energic/logos/footer-logo.png`, which
 * is exactly where the asset is served on the preview origin, so shared cards
 * actually load. The URL is absolute so Next.js does not re-prefix it.
 */
export function ogImageUrl(): string {
  return IS_PREVIEW ? `${SITE_URL}${BASE_PATH}/logos/footer-logo.png` : OG_IMAGE;
}

/**
 * `metadataBase` for the active build.
 *
 * Both builds use the production origin. All metadata URLs (canonical, og:url,
 * og:image) are emitted as absolute URLs, so `metadataBase` only serves as the
 * base Next.js resolves any relative metadata value against. The preview's
 * OG image carries the base path explicitly (see `ogImageUrl`).
 */
export function metadataBase(): URL {
  return new URL(SITE_URL);
}

/** Absolute canonical URL of a site route on the production domain. */
export function canonicalUrl(path: string): string {
  const p = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
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
