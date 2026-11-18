import type { PageDetail } from "@/lib/api";
import { homeFixture } from "@/fixtures/home";
import { aboutFixture } from "@/fixtures/about";
import { capabilitiesFixture } from "@/fixtures/capabilities";

/**
 * Content access layer for the core pages.
 *
 * Until the backend (agent 4) is ready these return typed fixtures that mirror
 * the shared API contract. When the API is live, swap the bodies for
 * `getPage("home")` / `getPage("about")` / `getPage("capabilities")` — the page
 * components consume the same `PageDetail` shape and need no changes.
 */
export function getHomeContent(): PageDetail {
  return homeFixture;
}

export function getAboutContent(): PageDetail {
  return aboutFixture;
}

export function getCapabilitiesContent(): PageDetail {
  return capabilitiesFixture;
}

/** Return the data object of the first section with the given key. */
export function sectionData<T>(page: PageDetail, key: string): T {
  const section = page.sections.find((s) => s.key === key);
  if (!section) {
    throw new Error(`Missing section "${key}" in page "${page.slug}"`);
  }
  return section.data as T;
}
