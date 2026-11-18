# GitHub Pages preview

The frontend is published as a static export at the project path `/energic/`
(e.g. `https://<user>.github.io/energic/`).

## How it works

- `frontend/next.config.ts` switches to static export mode when
  `GITHUB_PAGES=true` is set: `output: "export"`, `trailingSlash: true`,
  `basePath: "/energic"` and `images.unoptimized: true`.
  Without the flag the app keeps its ordinary server mode (including the
  `/_tokens` rewrite, which is skipped in static mode).
- Build command: `pnpm build:static` (runs `GITHUB_PAGES=true next build`),
  producing `frontend/out/`.
- `.github/workflows/pages.yml` builds on pushes to `main` and on
  `workflow_dispatch` with pinned pnpm and the existing lockfile, then
  uploads `frontend/out` and deploys via GitHub Pages.

## Backend limitations (preview only)

The Pages preview is a **static** site: there is no Django runtime, no
database and no API.

- All page content is rendered from the typed fixtures in
  `frontend/src/fixtures/` (same shapes as the API contract), so every page
  renders without `localhost:8000`.
- The lead/contact form has no real backend on Pages. It must not fake
  success: submissions cannot be stored and the form stays in its
  unavailable state until the real API is wired up.
- `next/image` runs unoptimized (no `/_next/image` server route); images are
  served as static files under `/energic/`.
