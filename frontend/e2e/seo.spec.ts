import { expect, test } from "@playwright/test";
import { serializeJsonLd } from "../src/components/seo/JsonLd";

/**
 * SEO checks for the static GitHub Pages preview (basePath `/energic`).
 *
 * Run against a static server that serves `frontend/out` under `/energic/`
 * (see playwright.static.config.ts / the run script). The preview is
 * noindex; canonicals point at the real production domain.
 */

const PROD = "https://energiccenter.ir";
const BASE = "/energic";
const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:8445/energic/";
/** Origin + base path with no trailing slash, for raw request.get() calls. */
const ROOT = BASE_URL.replace(/\/$/, "");

// The six public production routes (tokens and 404 are excluded on purpose).
const PAGES: { path: string; canonical: string; title: string }[] = [
  { path: "/", canonical: `${PROD}/`, title: "مرکز نوآوری انرژیک | Energic Innovation Center" },
  { path: "about/", canonical: `${PROD}/about/`, title: "درباره ما | مرکز نوآوری انرژیک" },
  {
    path: "capabilities/",
    canonical: `${PROD}/capabilities/`,
    title: "توانمندی‌های تخصصی | مرکز نوآوری انرژیک",
  },
  {
    path: "companies/",
    canonical: `${PROD}/companies/`,
    title: "شرکت‌ها و سهامداران | مرکز نوآوری انرژیک",
  },
  {
    path: "coworking/",
    canonical: `${PROD}/coworking/`,
    title: "فضای کار اشتراکی | مرکز نوآوری انرژیک",
  },
  { path: "contact/", canonical: `${PROD}/contact/`, title: "تماس و آدرس | مرکز نوآوری انرژیک" },
];

function metaContent(html: string, selector: string): string | null {
  const re = new RegExp(`<meta[^>]+(?:name|property|rel)=["']${selector}["'][^>]*>`, "i");
  const tag = html.match(re)?.[0] ?? "";
  return tag.match(/content=["']([^"']*)["']/)?.[1] ?? null;
}

function linkHref(html: string, rel: string): string | null {
  const re = new RegExp(`<link[^>]+rel=["']${rel}["'][^>]*>`, "i");
  const tag = html.match(re)?.[0] ?? "";
  return tag.match(/href=["']([^"']*)["']/)?.[1] ?? null;
}

function jsonLdBlocks(html: string): unknown[] {
  const blocks: unknown[] = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    blocks.push(JSON.parse(m[1]!));
  }
  return blocks;
}

/** Strip the `/energic` base from the preview origin to get the bare origin. */
function previewOrigin(baseURL: string): string {
  const url = new URL(baseURL);
  return `${url.protocol}//${url.host}`;
}

test.describe("SEO — static preview", () => {
  const seenTitles = new Set<string>();
  const seenDescriptions = new Set<string>();

  for (const page of PAGES) {
    test(`${page.path} has unique title, description, canonical, noindex and OG`, async ({
      page: p,
      request,
    }) => {
      // Build the URL explicitly: `goto("/")` would resolve to the origin
      // root, not the `/energic` base path.
      const url = page.path === "/" ? `${ROOT}/` : new URL(page.path, BASE_URL).toString();
      const response = await p.goto(url);
      expect(response?.status()).toBe(200);
      const html = await p.content();

      const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]?.trim();
      expect(title, "title present").toBeTruthy();
      expect(title).toBe(page.title);
      expect(seenTitles.has(title!), "title must be unique across pages").toBe(false);
      seenTitles.add(title!);

      const description = metaContent(html, "description");
      expect(description, "description present").toBeTruthy();
      expect(description!.length).toBeGreaterThan(20);
      expect(seenDescriptions.has(description!), "description must be unique").toBe(false);
      seenDescriptions.add(description!);

      // Exactly one canonical, pointing at the real production URL.
      const canonicals = [...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)].map(
        (m) => m[0].match(/href=["']([^"']*)["']/)?.[1],
      );
      expect(canonicals, "exactly one canonical").toHaveLength(1);
      expect(canonicals[0]).toBe(page.canonical);

      // Preview pages are noindex,follow.
      const robots = metaContent(html, "robots");
      expect(robots, "robots meta present").toBeTruthy();
      expect(robots).toContain("noindex");
      expect(robots).toContain("follow");

      // OG + Twitter cards with an absolute image URL.
      expect(metaContent(html, "og:title"), "og:title").toBeTruthy();
      expect(metaContent(html, "og:description"), "og:description").toBeTruthy();
      expect(metaContent(html, "og:url"), "og:url").toBe(page.canonical);
      const ogImage = metaContent(html, "og:image");
      expect(ogImage, "og:image").toBeTruthy();
      expect(ogImage).toMatch(/^https:\/\//);
      expect(metaContent(html, "twitter:card"), "twitter:card").toBeTruthy();
      expect(metaContent(html, "twitter:image"), "twitter:image").toBe(ogImage);

      // The OG image path must resolve on the preview origin (basePath /energic).
      const ogPath = new URL(ogImage!).pathname;
      expect(ogPath).toBe(`${BASE}/logos/footer-logo.png`);
      const imgRes = await request.get(`${previewOrigin(BASE_URL)}${ogPath}`);
      expect(imgRes.status(), "og image resolvable on preview").toBe(200);

      // All JSON-LD blocks must be valid, parseable JSON.
      const blocks = jsonLdBlocks(html);
      expect(blocks.length, "at least one JSON-LD block").toBeGreaterThan(0);
      for (const block of blocks) {
        expect(block).toHaveProperty("@context", "https://schema.org");
      }
    });
  }

  test("tokens page is noindex with no canonical", async ({ page }) => {
    const response = await page.goto("tokens/");
    expect(response?.status()).toBe(200);
    const html = await page.content();
    expect(metaContent(html, "robots")).toContain("noindex");
    expect(linkHref(html, "canonical"), "tokens has no canonical").toBeNull();
  });

  test("sitemap.xml is valid and lists only the six production routes", async ({ request }) => {
    const res = await request.get(`${ROOT}/sitemap.xml`);
    expect(res.status()).toBe(200);
    const xml = await res.text();
    expect(xml).toContain("<urlset");

    const locs = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toHaveLength(6);
    for (const loc of locs) {
      expect(loc).toMatch(new RegExp(`^${PROD}/`));
      expect(loc).not.toContain("localhost");
      expect(loc).not.toContain("tokens");
      expect(loc).not.toContain("404");
    }
    expect(locs).toContain(`${PROD}/`);
    expect(locs).toContain(`${PROD}/contact/`);
  });

  test("robots.txt is valid, points at production sitemap, no Disallow: /", async ({ request }) => {
    const res = await request.get(`${ROOT}/robots.txt`);
    expect(res.status()).toBe(200);
    const txt = await res.text();
    expect(txt).toContain(`Sitemap: ${PROD}/sitemap.xml`);
    expect(txt).not.toMatch(/Disallow:\s*\/\s*$/m);
    expect(txt).toContain("Disallow: /tokens");
  });

  test("a genuinely missing path returns 404", async ({ request }) => {
    const res = await request.get(`${ROOT}/this-does-not-exist-xyz/`);
    expect(res.status()).toBe(404);
  });

  test("404.html is noindex", async ({ request }) => {
    const res = await request.get(`${ROOT}/404.html`);
    // GitHub Pages serves /404.html with 200; the page itself is noindex.
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(metaContent(html, "robots")).toContain("noindex");
  });

  test("JSON-LD serialization is safe against script injection", () => {
    // A value containing a closing script tag must not be able to terminate
    // the inline <script> element.
    const payload = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "x</script><script>alert(1)</script>",
    };
    const serialized = serializeJsonLd(payload);
    // No literal closing/opening script sequence survives in the payload.
    expect(serialized).not.toContain("</script>");
    expect(serialized).not.toContain("<script>");
    // It must still parse back to exactly the original value.
    expect(JSON.parse(serialized)).toEqual(payload);
  });
});
