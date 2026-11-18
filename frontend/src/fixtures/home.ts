import type { PageDetail } from "@/lib/api";

/**
 * Typed fixture for the home page.
 *
 * Shape mirrors the shared API contract (GET /api/pages/home/). When the
 * backend (agent 4) is ready, `getPage("home")` returns the same shape and the
 * components only need the data source swapped — not the markup.
 *
 * All copy is taken verbatim from design-archive/pages/home/index.html.
 */
export const homeFixture: PageDetail = {
  slug: "home",
  seo: {
    title: "مرکز نوآوری انرژیک | Energic Innovation Center",
    description: "هاب تخصصی مشاوره مهندسی، توسعه فناوری و اقتصاد کربن — مرکز نوآوری انرژیک",
    og_image: "/images/hero-sculpture-desktop.webp",
  },
  sections: [
    {
      key: "hero",
      data: {
        title: "هاب تخصصی مشاوره مهندسی، توسعه فناوری و اقتصاد کربن",
        subtitle:
          "مرجع ارائه خدمات مشاوره مهندسی، امکان‌سنجی‌های فنی-اقتصادی و توسعه فناوری‌های کم‌کربن در صنایع مادر؛ با تمرکز بر عارضه‌یابی فرآیندی، کاهش آلایندگی و خلق دارایی‌های مالی در بازار کربن و انرژی",
        cta: { label: "مشاهده فضا", href: "/coworking" },
        imageMobile: "/images/hero-sculpture-mobile.webp",
        imageDesktop: "/images/hero-sculpture-desktop.webp",
      },
    },
    {
      key: "features",
      data: {
        items: [
          { label: "شبکه‌سازی میان دانشگاه و صنعت", icon: "/icons/feature-networking-shape.svg" },
          { label: "زیرساخت رشد", icon: "/icons/feature-infrastructure.svg" },
          { label: "ارتباطات راهبردی", icon: "/icons/feature-strategic.svg" },
          { label: "تمرکز بر نوآوری", icon: "/icons/feature-innovation.svg" },
        ],
      },
    },
    {
      key: "mission",
      data: {
        title: "ماموریت انرژیک",
        body: "مرکز نوآوری انرژیک، کانون استقرار و هم‌آفرینی شرکت‌های فناور، دانش‌بنیان و هسته‌های تخصصی دانشگاهی در زنجیره ارزش نفت، گاز و انرژی است. این مرکز با تمرکز راهبردی بر توسعه فناوری‌های سبز، اقتصاد چرخشی و تجاری‌سازی در حوزه دی‌اکسید کربن، بستری زیرساختی را برای حل چالش‌های کلان صنایع مادر فراهم می‌آورد. همچنین انرژیک، با ارائه فضای کار اشتراکی، فرآیند هم‌افزایی را تسهیل کرده تا نوآوری‌های عمیق مهندسی به عنوان ابزاری عملیاتی برای بهبود عملکرد و تحول در صنایع بزرگ به‌کار گرفته شوند.",
      },
    },
    {
      key: "roadmap",
      data: {
        title: "همراه راهبردی در تمامی مراحل توسعه صنعتی",
        cards: [
          {
            icon: "/icons/card-startup.svg",
            items: [
              "فضای استقرار تخصصی برای شرکت‌های فناور و هسته‌های پیشرو",
              "امکانات کامل اداری و کارگاهی متناسب با نیازهای مهندسی",
              "همجواری و شبکه هم‌افزایی با شرکت‌های بزرگ و شرکای راهبردی",
              "دسترسی به زیرساخت‌های تست، عارضه‌یابی و توسعه بازار",
            ],
          },
          {
            icon: "/icons/card-carbon.svg",
            items: [
              "توسعه فناوری‌های کم‌کربن و مدیریت زنجیره ارزش پایین‌دستی کربن دی‌اکسید",
              "مشاوره تخصصی جهت ورود به بازارهای داخلی و بین‌المللی اعتبار کربن",
              "اخذ گواهی‌های بهینه‌سازی مصرف انرژی و خلق منافع مالی از بورس انرژی",
              "بازطراحی سیستم‌های یوتیلیتی و بهینه‌سازی مصرف آب و انرژی در صنایع",
            ],
          },
          {
            icon: "/icons/card-engineering.svg",
            items: [
              "عارضه‌یابی ناترازی‌های فرآیندی در صنایع سنگین",
              "مشاوره فنی، ارزیابی لایسنس‌ها و انتقال فناوری‌های فرآیندی",
              "مدیریت پروژه از فاز مهندسی تا نظارت بر ساخت و تأمین",
              "مطالعات امکان‌سنجی جامع و مدل‌سازی اقتصادی پروژه‌ها",
            ],
          },
        ],
      },
    },
    {
      key: "partners",
      data: {
        title: "شبکه ارتباطات راهبردی و همکاران کلیدی",
        // Only the partner logos that exist in the design archive are rendered.
        // The remaining 13 logo files are absent from the archive (see report).
        logos: [
          { name: "دانشگاه شریف", logo: "/logos/sadid.webp" },
          { name: "شرکت ۳", logo: "/logos/3-orig.webp" },
          { name: "Carbonbared", logo: "/logos/carbonbared.webp" },
          { name: "شرکت آپادانا", logo: "/logos/apadana.webp" },
        ],
      },
    },
    {
      key: "workspace",
      data: {
        title: "فضای کاری ممتاز",
        images: [
          { src: "/images/gallery-1.webp", alt: "فضای کار اشتراکی انرژیک" },
          { src: "/images/gallery-2.webp", alt: "میزهای کار در مرکز نوآوری انرژیک" },
          { src: "/images/gallery-3.webp", alt: "فضای جلسات و همکاری" },
          { src: "/images/gallery-4.webp", alt: "محیط کاری مدرن انرژیک" },
          { src: "/images/gallery-5.webp", alt: "فضای استراحت و کار اشتراکی" },
          { src: "/images/gallery-6.webp", alt: "نمای فضای کار انرژیک" },
        ],
      },
    },
    {
      key: "investor",
      data: {
        title: "توسعه سرمایه‌گذاری و تأمین مالی پروژه‌های انرژی",
        body: "انـرژیک با شناسایی و مدل‌سازی دقیق فرصت‌های سرمایه‌گذاری، بستری امن و سودآور برای مشارکت هلدینگ‌های صنعتی، سهام‌داران عمده و ارگان‌های سرمایه‌گذار در پروژه‌های کلان انرژی فراهم می‌آورد",
        cta: { label: "آشنایی با سرمایه‌گذاران", href: "/companies" },
        background: "/images/investor-bg.webp",
        items: [
          { icon: "/icons/investor-promotion.svg", label: "افزایش اعتبار و دیده‌شدن" },
          { icon: "/icons/investor-startup.svg", label: "پشتیبانی برای جذب سرمایه" },
          { icon: "/icons/investor-business.svg", label: "نشست‌های اختصاصی سرمایه‌گذاران" },
          { icon: "/icons/investor-future.svg", label: "مسیرهای تخصصی رشد" },
          { icon: "/icons/investor-creative.svg", label: "تامین نیازهای فناورانه" },
          { icon: "/icons/investor-personal.svg", label: "ارتباط با شرکای استراتژیک" },
        ],
      },
    },
    {
      key: "virtualTour",
      data: {
        title: "تور مجازی دیجیتال انرژیک",
        body: "پیش از حضور، فضای کار اشتراکی، امکانات تخصصی و محیط نوآوری انرژیک را از نزدیک تجربه کنید.",
        cta: "شروع تور مجازی",
      },
    },
  ],
};
