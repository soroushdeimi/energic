import { expect, test } from "@playwright/test";

test("mobile hamburger opens the menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const burger = page.getByRole("button", { name: "باز کردن منو" });
  await expect(burger).toBeVisible();
  await burger.click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await expect(page.locator("#mobile-nav").getByRole("link", { name: "تماس با ما" })).toBeVisible();
});
