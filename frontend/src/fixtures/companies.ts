import type { CompaniesData } from "@/lib/api";

/**
 * Typed fixture for GET /api/companies/ (contract: prompts/00-shared.md).
 * Content and logos are taken verbatim from design-archive/pages/companies/index.html.
 * Replace with getCompanies() from "@/lib/api" once the backend endpoint is live.
 */
export const companiesFixture: CompaniesData = {
  shareholders: [
    {
      name: "پیشگامان توسعه کارمایه آپادانا",
      logo: "/logos/apadana.png",
      url: "",
    },
    {
      name: "کربن بارد",
      logo: "/logos/carbonbared.png",
      url: "https://carbonbared.co/",
    },
    {
      name: "مهندسی و توسعه اقتصادی سدید",
      logo: "/logos/sadid.png",
      url: "",
    },
    {
      name: "سرمایه‌گذاری صنعت نفت",
      logo: "/logos/3-orig.png",
      url: "https://oiicgroup.com/",
    },
  ],
  residents: [
    { name: "کربن بارد", logo: "", url: "https://carbonbared.co" },
    { name: "ماهد انرژی پارس", logo: "", url: "https://mahedenergy.com" },
    { name: "توسعه و تأمین انرژی تیوان", logo: "", url: "https://www.t1energy.ir" },
    { name: "بهین انرژی سپهر تابان", logo: "", url: "https://www.best-energy.ir" },
    { name: "توکا انرژی پارس", logo: "", url: "https://tepcoenergy.com" },
    { name: "تیوا انرژی شمس", logo: "", url: "https://tiva-energy.com" },
    { name: "طراحی الگوریتم انرژی", logo: "", url: "https://eneral.ir" },
    { name: "راگا صنعت شریف", logo: "", url: "" },
    { name: "فراز پیشه سبلان", logo: "", url: "" },
    { name: "برندینگ و خلاقیت آورا", logo: "", url: "" },
    { name: "تجارت صنعت نیکان فراز", logo: "", url: "" },
    { name: "پیشرو صنعت پرهام", logo: "", url: "" },
  ],
};
