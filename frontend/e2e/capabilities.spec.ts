import { expect, test } from "@playwright/test";

const CAPABILITY_TITLES = [
  "مطالعات امکان‌سنجی جامع و مدیریت زنجیره ارزش پایین‌دستی کربن‌دی‌اکسید",
  "خدمات مشاوره فنی و انتقال فناوری‌های مشابه در حوزه صنایع فرآیندی",
  "توانایی اجرای پروژه‌ها از فاز مهندسی تا نظارت بر ساخت و تأمین",
  "مشاوره تخصصی جهت ورود به بازارهای داخلی و بین‌المللی اعتبار کربن",
  "اخذ گواهی‌های بهینه سازی مصرف انرژی و خلق منافع مالی از بورس انرژی",
  "عارضه‌‌یابی ناترازی‌های فرآیندی و بهینه‌سازی مصرف آب و انرژی در صنایع سنگین",
];

test.describe("capabilities page", () => {
  test("desktop renders hero and all six capability cards", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto("/capabilities");
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { name: "توانمندی‌های تخصصی", level: 1 })).toBeVisible();
    // 4 category cards
    for (const label of [
      "تحلیل و تصمیم‌سازی",
      "مهندسی و اجرا",
      "فناوری و نوآوری",
      "پایداری و خلق ارزش",
    ]) {
      await expect(page.locator("p:visible", { hasText: label }).first()).toBeVisible();
    }
    // 6 capability cards (desktop variant visible)
    for (const title of CAPABILITY_TITLES) {
      await expect(page.locator("h2:visible", { hasText: title }).first()).toBeVisible();
    }
    // 6 card images
    await expect(page.locator("article:visible img[alt='']").first()).toBeAttached();
  });

  test("mobile renders hero and all six capability cards", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/capabilities");
    await expect(page.getByRole("heading", { name: "توانمندی‌های تخصصی" }).first()).toBeVisible();
    // 6 capability cards (mobile variant visible)
    for (const title of CAPABILITY_TITLES) {
      await expect(page.locator("h2:visible", { hasText: title }).first()).toBeVisible();
    }
  });
});
