import { expect, test } from "@playwright/test";

test.describe("about page", () => {
  test("desktop renders glance, innovation, mission, outlook and values", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto("/about");
    expect(response?.status()).toBe(200);

    // Glance: 4 cards
    await expect(page.getByRole("heading", { name: "انرژیک در یک نگاه" })).toBeVisible();
    for (const title of [
      "پیشگام نوآوری انرژی",
      "پیوند صنعت و دانشگاه",
      "توسعه راهکارهای فناورانه",
      "خلق آینده پایدار",
    ]) {
      await expect(page.getByRole("heading", { name: title, level: 3 }).first()).toBeVisible();
    }

    // Innovation: 4 items
    for (const title of [
      "اعتبار سنجی و ارزیابی فناوری",
      "مسیرهای مشارکت استراتژیک",
      "منتورینگ حرفه‌ای",
      "از نمونه اولیه تا اجرای پایلوت",
    ]) {
      await expect(page.locator("p:visible", { hasText: title }).first()).toBeVisible();
    }

    // Mission: 2 cards
    await expect(page.getByRole("heading", { name: "مأموریت ما" }).first()).toBeVisible();
    await expect(
      page
        .getByRole("heading", { name: "مطالعات امکان‌سنجی و مدیریت زنجیره ارزش کربن دی‌اکسید" })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .getByRole("heading", { name: "مشاوره فنی و انتقال فناوری در حوزه صنایع فرایندی" })
        .first(),
    ).toBeVisible();

    // Outlook
    await expect(page.getByRole("heading", { name: "چشم‌انداز ما" }).first()).toBeVisible();

    // Values: 4 cards
    await expect(page.getByRole("heading", { name: "ارزش‌های اصلی ما" })).toBeVisible();
    for (const title of ["خلاقیت", "همکاری", "رشد", "تعالی"]) {
      await expect(page.getByRole("heading", { name: title, level: 3 }).first()).toBeVisible();
    }
  });

  test("mobile renders glance cards and mission", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: "انرژیک در یک نگاه" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "پیشگام نوآوری انرژی" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "مأموریت ما" }).first()).toBeVisible();
  });
});
