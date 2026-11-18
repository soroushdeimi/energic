import { expect, test } from "@playwright/test";

const ADDRESS = "ولیعصر، دانشگاه صنعتی امیرکبیر، دانشکده مهندسی نفت، طبقه اول، مرکز نوآوری انرژیک";
const PHONE = "021-66460043";
const EMAIL = "energyinnovationcenter1@gmail.com";
const MAP_URL = "https://www.google.com/maps?q=35.7036957,51.4065566";

test.describe("contact page (archived section)", () => {
  test("renders the archived heading and contact details", async ({ page }) => {
    const response = await page.goto("contact/");
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { name: "با ما در ارتباط باشید" })).toBeVisible();

    // Three detail labels, each present in the visible layout.
    await expect(page.getByText("آدرس حضوری").filter({ visible: true }).first()).toBeVisible();
    await expect(page.getByText("تلفن تماس").filter({ visible: true }).first()).toBeVisible();
    await expect(page.getByText("پست الکترونیک").filter({ visible: true }).first()).toBeVisible();

    // Original Persian address text.
    await expect(page.getByText(ADDRESS).filter({ visible: true }).first()).toBeVisible();
  });

  test("links the phone, email and map to the real destinations", async ({ page }) => {
    await page.goto("contact/");

    const phoneLink = page.getByRole("link", { name: PHONE }).filter({ visible: true });
    await expect(phoneLink.first()).toBeVisible();
    await expect(phoneLink.first()).toHaveAttribute("href", "tel:02166460043");

    const emailLink = page.getByRole("link", { name: EMAIL }).filter({ visible: true });
    await expect(emailLink.first()).toBeVisible();
    await expect(emailLink.first()).toHaveAttribute("href", `mailto:${EMAIL}`);

    const mapLink = page
      .getByRole("link", { name: "مشاهده نقشه در Google Maps" })
      .filter({ visible: true });
    await expect(mapLink.first()).toBeVisible();
    await expect(mapLink.first()).toHaveAttribute("href", MAP_URL);
    await expect(mapLink.first()).toHaveAttribute("target", "_blank");
  });

  test("serves the three contact icons", async ({ page }) => {
    await page.goto("contact/");
    for (const name of ["location", "phone", "email"]) {
      const img = page
        .locator(`img[src$="/icons/contact/${name}.svg"]`)
        .filter({ visible: true })
        .first();
      await expect(img).toBeVisible();
      const src = await img.getAttribute("src");
      expect(src).toBeTruthy();
      const res = await page.request.get(src as string);
      expect(res.status()).toBe(200);
    }
  });
});
