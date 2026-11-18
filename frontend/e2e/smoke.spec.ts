import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/about", "/capabilities", "/companies", "/contact", "/coworking"];

test.describe("site smoke", () => {
  for (const route of ROUTES) {
    test(`${route} loads with header and footer`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
      await expect(page.locator('nav[aria-label="منوی اصلی"]')).toBeAttached();
    });
  }

  test("tokens page renders design tokens", async ({ page }) => {
    const response = await page.goto("/_tokens");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "توکن‌های طراحی" })).toBeVisible();
    await expect(page.getByText("#00a950")).toBeVisible();
  });
});
