import { expect, test } from "@playwright/test";

const GALLERY_COUNT = 9;
const AMENITY_COUNT = 5;

test.describe("coworking page", () => {
  test("renders the coworking heading and description", async ({ page }) => {
    const response = await page.goto("/coworking");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "فضای کار اشتراکی انرژیک" })).toBeVisible();
    await expect(
      page.getByText("نمایی از فضاهای کاری طراحی‌شده برای تمرکز، همکاری و رشد"),
    ).toBeVisible();
  });

  test("shows the correct number of gallery images, each with an alt", async ({ page }) => {
    await page.goto("/coworking");
    const gallerySection = page.locator('section[aria-label="گالری فضاهای کاری"]');
    // Count unique images by src (mobile + desktop render the same set).
    const images = gallerySection.locator("img");
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(GALLERY_COUNT);

    // Every gallery image must have a non-empty alt and a loadable src.
    const srcs = new Set<string>();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      expect(alt).toBeTruthy();
      const src = await img.getAttribute("src");
      expect(src).toBeTruthy();
      srcs.add(src as string);
    }
    // The set of distinct gallery images must match the fixture count.
    expect(srcs.size).toBe(GALLERY_COUNT);
    for (const src of srcs) {
      const imgResponse = await page.request.get(src);
      expect(imgResponse.status()).toBe(200);
    }
  });

  test("shows the correct number of amenities with labels", async ({ page }) => {
    await page.goto("/coworking");
    const amenitySection = page.locator('section[aria-label="امکانات فضای کار"]');
    const labels = [
      "دسترسی مرکزی",
      "مبلمان ارگونومیک",
      "پذیرایی رایگان",
      "کد پستی شرکتی",
      "اینترنت فیبر نوری",
    ];
    // Only the tiles for the active breakpoint are visible (mobile vs desktop).
    const visibleTiles = amenitySection.locator("article").filter({ visible: true });
    await expect(visibleTiles).toHaveCount(AMENITY_COUNT);
    for (const label of labels) {
      await expect(visibleTiles.getByText(label)).toBeVisible();
    }
  });

  test("the virtual tour button is present and clickable", async ({ page }) => {
    await page.goto("/coworking");
    const tourButton = page.getByRole("button", { name: "شروع تور مجازی" });
    await expect(tourButton.first()).toBeVisible();
    // Clicking must not throw or navigate away.
    const urlBefore = page.url();
    await tourButton.first().click();
    expect(page.url()).toBe(urlBefore);
  });
});
