import { defineConfig, devices } from "@playwright/test";

/**
 * SEO checks against the static GitHub Pages preview.
 *
 * Serve `frontend/out` under `/energic/` first (e.g.
 * `node scripts/serve-static.mjs 8445`), then:
 *   E2E_BASE_URL=http://localhost:8445/energic/ pnpm exec playwright test -c playwright.seo.config.ts
 */
export default defineConfig({
  testDir: "./e2e",
  testMatch: "seo.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:8445/energic/",
    trace: "on-first-retry",
  },
  projects: [{ name: "desktop", use: { ...devices["Desktop Chrome"] } }],
});
