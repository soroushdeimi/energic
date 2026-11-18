import { expect, test } from "@playwright/test";

const SHAREHOLDER_COUNT = 4;
const RESIDENT_COUNT = 12;

test.describe("companies page", () => {
  test("renders the strategic partners heading", async ({ page }) => {
    const response = await page.goto("/companies");
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { name: "سهامداران و شرکای استراتژیک" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "سهامداران اصلی" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "شرکت‌های مستقر" })).toBeVisible();
  });

  test("shows the correct number of shareholder logos, each with a link where it has a URL", async ({
    page,
  }) => {
    await page.goto("/companies");
    const shareholderLogos = page.locator('#shareholders img[alt^="لوگوی"]');
    await expect(shareholderLogos).toHaveCount(SHAREHOLDER_COUNT);

    // Every shareholder logo must be a real, loaded image.
    for (let i = 0; i < SHAREHOLDER_COUNT; i++) {
      const logo = shareholderLogos.nth(i);
      await expect(logo).toBeVisible();
      const src = await logo.getAttribute("src");
      expect(src).toBeTruthy();
      const imgResponse = await page.request.get(src as string);
      expect(imgResponse.status()).toBe(200);
    }

    // Shareholders that have a URL are wrapped in an external link.
    const linkedShareholders = page.locator('#shareholders a[target="_blank"]');
    await expect(linkedShareholders).toHaveCount(2);
    for (const link of await linkedShareholders.all()) {
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^https:\/\//);
    }
  });

  test("shows the correct number of resident companies and links the ones with a URL", async ({
    page,
  }) => {
    await page.goto("/companies");
    const residentCards = page.locator('section[aria-labelledby="resident-companies-heading"] h3');
    await expect(residentCards).toHaveCount(RESIDENT_COUNT);

    // Resident companies with a website expose an external link.
    const residentLinks = page.locator(
      'section[aria-labelledby="resident-companies-heading"] a[target="_blank"]',
    );
    const linkCount = await residentLinks.count();
    expect(linkCount).toBe(7);
    for (const link of await residentLinks.all()) {
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^https:\/\//);
    }
  });

  test("the 'your team here' CTA links to /contact", async ({ page }) => {
    await page.goto("/companies");
    const cta = page.getByRole("link", { name: "درخواست استقرار" });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/contact");
    await cta.click();
    await expect(page).toHaveURL(/\/contact$/);
  });
});
