import type { PageDetail } from "@/lib/api";

/**
 * Typed fixture for the capabilities page (GET /api/pages/capabilities/).
 * Copy taken verbatim from design-archive/pages/capabilities/index.html.
 */
export const capabilitiesFixture: PageDetail = {
  slug: "capabilities",
  seo: {
    title: "توانمندی‌های تخصصی | مرکز نوآوری انرژیک",
    description:
      "انرژیک، بازوی مهندسی و مشاوره تخصصی شما در توسعه پروژه‌های کربن، انرژی و صنایع فرآیندی",
    og_image: "/images/capabilities/capability-01.webp",
  },
  sections: [
    {
      key: "hero",
      data: {
        title: "توانمندی‌های تخصصی",
        subtitle:
          "انرژیک، بازوی مهندسی و مشاوره تخصصی شما در توسعه پروژه‌های کربن، انرژی و صنایع فرآیندی",
        categories: [
          { label: "تحلیل و تصمیم‌سازی", icon: "/icons/capabilities/analysis.svg" },
          { label: "مهندسی و اجرا", icon: "/icons/capabilities/worker.svg" },
          { label: "فناوری و نوآوری", icon: "/icons/capabilities/technology.svg" },
          { label: "پایداری و خلق ارزش", icon: "/icons/capabilities/save-water.svg" },
        ],
      },
    },
    {
      key: "capabilities",
      data: {
        items: [
          {
            number: "01",
            image: "/images/capabilities/capability-01.webp",
            imageMobile: "/images/capabilities/mobile/capability-01.webp",
            title: "مطالعات امکان‌سنجی جامع و مدیریت زنجیره ارزش پایین‌دستی کربن‌دی‌اکسید",
            description:
              "این مرکز با تسلط بر ابزارهای تحلیل فنی-اقتصادی، توانایی کاملی در ارزیابی بازار، فرآیند و سودآوری پروژه‌های پایین‌دستی دی‌اکسید کربن دارد.",
          },
          {
            number: "02",
            image: "/images/capabilities/capability-02.webp",
            imageMobile: "/images/capabilities/mobile/capability-02.webp",
            title: "خدمات مشاوره فنی و انتقال فناوری‌های مشابه در حوزه صنایع فرآیندی",
            description:
              "انرژیک به عنوان بازوی مشاوره مهندسی، آمادگی دارد خدمات تخصصی در زمینه ارزیابی لایسنس‌ها، مقایسه فناوری‌های جذب و فرآوری گازها و مدیریت ریسک‌های تکنولوژی را به کارفرمایان ارائه دهد. این خدمات شامل تدوین اسناد فنی، پروپوزال‌ها و صحه‌گذاری بر ادعاهای فنی سازندگان داخلی و خارجی است تا از هدررفت منابع مالی کارفرما در انتخاب فناوری‌های اشتباه جلوگیری شود.",
          },
          {
            number: "03",
            image: "/images/capabilities/capability-03.webp",
            imageMobile: "/images/capabilities/mobile/capability-03.webp",
            title: "توانایی اجرای پروژه‌ها از فاز مهندسی تا نظارت بر ساخت و تأمین",
            description:
              "این مرکز ظرفیت قابلیت اجرایی لازم برای هدایت پروژه‌های صنعتی را از مراحل اولیه مهندسی (پایه و تفصیلی) تا نظارت بر زنجیره تأمین قطعات و ساخت تخصصی دارد.",
          },
          {
            number: "04",
            image: "/images/capabilities/capability-04.webp",
            imageMobile: "/images/capabilities/mobile/capability-04.webp",
            title: "مشاوره تخصصی جهت ورود به بازارهای داخلی و بین‌المللی اعتبار کربن",
            description:
              "با توجه به الزامات ملی و بین‌المللی و همچنین شکل‌گیری مکانیزم‌های نوین، انرژیک خدمات مشاوره‌ای ویژه‌ای را برای ثبت پروژه‌های کاهش انتشار گازهای گلخانه‌ای در نهادهای معتبر بین‌المللی و پلتفرم‌های داخلی ارائه می‌دهد.",
          },
          {
            number: "05",
            image: "/images/capabilities/capability-05.webp",
            imageMobile: "/images/capabilities/mobile/capability-05.webp",
            title: "اخذ گواهی‌های بهینه سازی مصرف انرژی و خلق منافع مالی از بورس انرژی",
            description:
              "این مرکز ممیزی، مستندسازی و اخذ گواهی‌های صرفه‌جویی انرژی را برای مجتمع‌های صنعتی مدیریت می‌کند. این گواهی‌ها به کارفرمایان اجازه می‌دهد تا میزان انرژی صرفه‌جویی‌شده در فرآیندهای خود را در بازار بهینه‌سازی بورس انرژی به نقدینگی تبدیل کنند و یا از آن به عنوان ابزاری برای تأمین سوخت و خوراک پایدار در فصول ناترازی استفاده نمایند.",
          },
          {
            number: "06",
            image: "/images/capabilities/capability-06.webp",
            imageMobile: "/images/capabilities/mobile/capability-06.webp",
            title: "عارضه‌‌یابی ناترازی‌های فرآیندی و بهینه‌سازی مصرف آب و انرژی در صنایع سنگین",
            description:
              "علاوه بر مدیریت گازها، این مرکز توانایی فنی بالایی در بازطراحی سیستم‌های یوتیلیتی، پیش‌بینی و رفع اتلاف‌های حرارتی و بازیافت آب‌های صنعتی دارد.",
          },
        ],
      },
    },
  ],
};
