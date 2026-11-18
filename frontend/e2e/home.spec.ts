import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("desktop renders hero, features, mission, roadmap, workspace, investor and virtual tour", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    // Hero
    await expect(
      page.getByRole("heading", { name: "هاب تخصصی مشاوره مهندسی، توسعه فناوری و اقتصاد کربن" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "مشاهده فضا" }).first()).toBeVisible();

    // Features bar (4 labels, desktop variant visible)
    for (const label of [
      "شبکه‌سازی میان دانشگاه و صنعت",
      "زیرساخت رشد",
      "ارتباطات راهبردی",
      "تمرکز بر نوآوری",
    ]) {
      await expect(
        page.locator("p:visible, span:visible", { hasText: label }).first(),
      ).toBeVisible();
    }

    // Mission
    await expect(page.getByRole("heading", { name: "ماموریت انرژیک" }).first()).toBeVisible();

    // Roadmap
    await expect(
      page.getByRole("heading", { name: "همراه راهبردی در تمامی مراحل توسعه صنعتی" }),
    ).toBeVisible();
    await expect(
      page
        .locator("li:visible", {
          hasText: "فضای استقرار تخصصی برای شرکت‌های فناور و هسته‌های پیشرو",
        })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator("li:visible", { hasText: "عارضه‌یابی ناترازی‌های فرآیندی در صنایع سنگین" })
        .first(),
    ).toBeVisible();

    // Partners heading
    await expect(
      page.getByRole("heading", { name: /شبکه ارتباطات راهبردی/ }).first(),
    ).toBeVisible();

    // Workspace: 6 visible images with Persian alt
    const workspaceImages = page.locator("figure:visible img");
    await expect(workspaceImages).toHaveCount(6);

    // Investor: 6 benefit items (desktop variant visible)
    for (const label of [
      "افزایش اعتبار و دیده‌شدن",
      "پشتیبانی برای جذب سرمایه",
      "نشست‌های اختصاصی سرمایه‌گذاران",
      "مسیرهای تخصصی رشد",
      "تامین نیازهای فناورانه",
      "ارتباط با شرکای استراتژیک",
    ]) {
      await expect(page.locator("p:visible", { hasText: label }).first()).toBeVisible();
    }

    // Virtual tour
    await expect(
      page.getByRole("heading", { name: "تور مجازی دیجیتال انرژیک" }).first(),
    ).toBeVisible();
  });

  test("mobile renders hero and stacked workspace gallery", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "هاب تخصصی مشاوره مهندسی، توسعه فناوری و اقتصاد کربن" }),
    ).toBeVisible();
    // Mobile workspace gallery: 6 visible figures
    const figures = page.locator("figure:visible");
    await expect(figures).toHaveCount(6);
    // Every workspace image has a non-empty Persian alt
    for (const fig of await figures.all()) {
      const alt = await fig.locator("img").getAttribute("alt");
      expect(alt).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(2);
    }
  });
});
