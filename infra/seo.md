# SEO policy

This document is the single source of truth for how the site is indexed, and
how the **GitHub Pages preview** differs from the **production** deployment.

## Two deployments, one policy

| | Production | GitHub Pages preview |
|---|---|---|
| Origin | `https://energiccenter.ir` | `https://soroushdeimi.github.io/energic/` |
| Build | `pnpm build` (server mode) | `pnpm build:static` (`GITHUB_PAGES=true`, `basePath=/energic`, `output: export`) |
| Indexing | `index, follow` | `noindex, follow` |
| Canonical | production preferred URL (root = bare origin, sub-routes no trailing slash) | same production preferred URL (unchanged) |
| OG image | `https://energiccenter.ir/logos/footer-logo.png` | `https://soroushdeimi.github.io/energic/logos/footer-logo.png` (the real deployed preview asset) |

The preview is a **visual preview only**. It is *not* a domain migration and
must never be treated as the canonical host. Every preview page therefore:

- carries `noindex, follow` (crawlers may still follow links to production),
- keeps its `canonical` pointing at the corresponding **production** page, so
  any link equity flows to `energiccenter.ir`, not the preview.

`noindex` is applied via the per-page `robots` meta (see
`frontend/src/lib/seo.ts` → `pageRobots()`), which is env-aware: it emits
`noindex, follow` when `NEXT_PUBLIC_BASE_PATH` is set (preview) and
`index, follow` otherwise (production/server mode).

## Preview OG image uses the real preview origin

The preview origin is **known** for this repo: `https://soroushdeimi.github.io`
(configurable via `NEXT_PUBLIC_PREVIEW_ORIGIN`). The preview OG/Twitter image
is therefore the exact deployed asset URL
`https://soroushdeimi.github.io/energic/logos/footer-logo.png` (verified
HTTP 200, `image/png`). In production the same helper emits
`https://energiccenter.ir/logos/footer-logo.png`. The production host is never
used as a stand-in for the preview.

## Canonical URLs match the production preferred form

Production serves sub-routes **without** a trailing slash
(`https://energiccenter.ir/about/` 308-redirects to `/about`), and the live
site's own canonical tags use that form (root = bare origin
`https://energiccenter.ir`, sub-routes e.g. `https://energiccenter.ir/about`).
`canonicalUrl()` emits exactly those URLs, and the sitemap and per-page
JSON-LD use the same final URLs. The GitHub Pages export keeps its own
`trailingSlash: true` for internal navigation and filesystem layout — only the
production canonical URLs drop the slash. (In the preview, `metadataBase` is
the preview origin, so Next.js does not re-apply the preview's trailing slash
to the external production canonicals.)

## sitemap.xml

- Always lists **only the six public production routes**
  (`/`, `/about`, `/capabilities`, `/companies`, `/coworking`, `/contact`).
- URLs are the production canonical URLs (root keeps its slash, sub-routes use
  the no-trailing-slash preferred form), even when served from the preview —
  the preview must not advertise its own (noindex) URLs for indexing.
- `tokens` and `404` are excluded.
- `force-static` keeps it a plain static file in both server mode and the
  static export (Next 15 metadata routes are dynamic by default).

## robots.txt

- `Sitemap:` always points at the **production** root
  (`https://energiccenter.ir/sitemap.xml`).
- There is **no `Disallow: /`** — crawlers must be able to reach the preview
  pages so the `noindex` meta is honoured.
- `tokens`, `_tokens` and `api/` are disallowed.

### Known limitation (documented, not a bug)

On GitHub Pages the file is served at the **project path**
(`/energic/robots.txt`), which is *not* the host-root crawler policy — crawlers
read `https://<user>.github.io/robots.txt`. A project-scoped Pages
`robots.txt` cannot control the host root. The preview therefore relies on the
per-page `noindex` meta for its indexing behaviour, and the `Sitemap:` line
points at production. In ordinary server mode this file *is* the host-root
policy and works as written.

## 404 behaviour

- **Production / server mode:** unknown paths return a real HTTP `404`
  (`not-found.tsx`, `noindex`).
- **GitHub Pages:** a direct request to `/404.html` returns HTTP `200` (GitHub
  Pages behaviour); the page still carries `noindex`. Unknown paths are served
  the `404.html` content. We do **not** claim an actual unknown-path `200`.

## JSON-LD (schema.org)

- The center is an **`Organization`** — it is *not* classified as a university
  and no ratings/reviews are fabricated.
- Amirkabir University of Technology and its Petroleum Engineering Faculty are
  modelled as **separate** `CollegeOrUniversity` entities only because the
  center is physically located inside the faculty (a real, archived fact).
- Per-page `WebPage` / `AboutPage` / `ContactPage` + `BreadcrumbList`.
- All blocks are plain `JSON.stringify` (no script serialization injection).

## What is intentionally NOT done

- No public DNS / domain changes, no Search Console actions.
- No runtime `app/api` proxy or real lead form (incompatible with the static
  export) — the contact page keeps the archived address/phone/email/map.
- No fake `hreflang` / unsupported English locales.
- No `Disallow: /` in robots.
