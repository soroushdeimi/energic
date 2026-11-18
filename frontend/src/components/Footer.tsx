import Image from "next/image";
import Link from "next/link";

const CAPABILITY_LINKS = [
  "مطالعات امکان‌سنجی جامع",
  "مشاوره فنی و انتقال فناوری",
  "اجرای پروژه از مهندسی تا تامین و مدیریت",
  "بازار اعتبار کربن",
  "گواهی‌های بهینه‌سازی انرژی",
  "بهینه سازی مصرف آب و انرژی",
];

const QUICK_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/about", label: "درباره ما" },
  { href: "/capabilities", label: "توانمندی‌های تخصصی" },
  { href: "/coworking", label: "فضای کار اشتراکی" },
  { href: "/companies", label: "شرکت‌ها و سهامداران" },
  { href: "/contact", label: "تماس با ما" },
];

const SOCIALS = [
  { icon: "/icons/social-instagram.svg", label: "اینستاگرام" },
  { icon: "/icons/social-linkedin.svg", label: "لینکدین" },
  { icon: "/icons/social-telegram.svg", label: "تلگرام" },
];

function SocialIcons({ size, gap }: { size: number; gap: number }) {
  return (
    <div className="flex items-center" style={{ gap: `${gap}px` }}>
      {SOCIALS.map((s) => (
        <span
          key={s.label}
          aria-label={`${s.label} — لینک در دسترس نیست`}
          title="لینک در دسترس نیست"
        >
          <Image src={s.icon} alt="" width={size} height={size} className="max-w-none" />
        </span>
      ))}
    </div>
  );
}

/**
 * Archive-faithful footer. The archive renders two absolutely-positioned
 * variants (390px mobile, 1440px desktop); both are reproduced here with the
 * exact coordinates from design-archive/pages/home/index.html.
 */
export function Footer() {
  return (
    <footer className="relative mt-[50px] text-white md:mt-auto md:bg-transparent md:pt-0">
      {/* Mobile (390px) */}
      <div className="relative mx-auto h-[568px] w-[390px] md:hidden">
        <div aria-hidden="true" className="absolute left-0 top-[33px] h-[535px] w-[390px] bg-ink" />
        <Image
          src="/icons/footer-shape.svg"
          alt=""
          aria-hidden
          width={169}
          height={145}
          className="absolute left-[221px] top-0 z-[1] max-w-none"
        />
        <Link
          aria-label="صفحه اصلی مرکز نوآوری انرژیک"
          className="absolute left-[248px] top-[36px] z-[2] h-[74px] w-[122px] max-w-none"
          href="/"
        >
          <Image
            src="/logos/footer-logo.png"
            alt="لوگوی مرکز نوآوری انرژیک"
            width={122}
            height={74}
            className="size-full max-w-none object-contain"
          />
        </Link>
        <h2
          dir="rtl"
          className="absolute left-[11px] top-[155px] h-[28px] w-[196px] whitespace-nowrap text-right text-[14px] font-semibold leading-[28px] tracking-[-0.5px] text-green"
        >
          توانمندی‌های تخصصی
        </h2>
        <div
          aria-hidden="true"
          className="absolute left-[152px] top-[193px] h-[2px] w-[55px]"
          style={{ background: "linear-gradient(to left, #00A950, transparent)" }}
        />
        <ul
          dir="rtl"
          className="absolute left-[11px] top-[213px] h-[150px] w-[196px] list-disc text-right text-[12px] font-medium leading-[25px] tracking-[-0.5px] text-white marker:text-white"
        >
          {CAPABILITY_LINKS.map((label) => (
            <li key={label} className="ms-[18px]">
              <Link className="transition-colors hover:text-green" href="/capabilities">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <h2
          dir="rtl"
          className="absolute left-[257px] top-[155px] h-[28px] w-[113px] text-right text-[14px] font-semibold leading-[28px] tracking-[-0.5px] text-green"
        >
          دسترسی سریع
        </h2>
        <div
          aria-hidden="true"
          className="absolute left-[320px] top-[193px] h-[2px] w-[50px]"
          style={{ background: "linear-gradient(to left, #00A950, transparent)" }}
        />
        {QUICK_LINKS.map((item, i) => {
          const tops = [213, 240, 267, 294, 321, 348];
          const lefts = [261, 292, 196, 228, 202, 273];
          const widths = [84, 53, 149, 117, 143, 72];
          return (
            <Link
              key={item.href}
              dir="rtl"
              href={item.href}
              className="absolute whitespace-nowrap text-right text-[12px] font-medium leading-[28px] tracking-[-0.5px] text-white hover:text-green"
              style={{
                top: `${tops[i]}px`,
                left: `${lefts[i]}px`,
                width: `${widths[i]}px`,
                height: "28px",
              }}
            >
              {item.label}
            </Link>
          );
        })}
        {QUICK_LINKS.map((item, i) => (
          <Image
            key={item.href}
            src="/icons/down-arrow.svg"
            alt=""
            aria-hidden
            width={15}
            height={15}
            className="absolute -rotate-90 max-w-none"
            style={{ top: `${219 + i * 27}px`, left: "355px", width: "15px", height: "15px" }}
          />
        ))}
        <h2
          dir="rtl"
          className="absolute left-[269.96px] top-[386px] h-[28px] text-right text-[14px] font-semibold leading-[28px] tracking-[-0.5px] text-green"
          style={{ right: "20.05px" }}
        >
          اطلاعات تماس
        </h2>
        <div
          aria-hidden="true"
          className="absolute left-[309.98px] top-[424px] h-[2px] w-[60px]"
          style={{ background: "linear-gradient(to left, #00A950, transparent)" }}
        />
        <p
          dir="rtl"
          className="absolute left-[212px] top-[444px] whitespace-nowrap text-right text-[12px] font-medium leading-[22px] tracking-[-0.5px] text-white"
          style={{ right: "63px" }}
        >
          ولیعصر، دانشگاه صنعتی امیرکبیر، دانشکده مهندسی نفت، طبقه اول
        </p>
        <Image
          src="/icons/address.svg"
          alt=""
          aria-hidden
          width={30}
          height={30}
          className="absolute left-[335.98px] top-[444px] max-w-none"
        />
        <a
          href="tel:02166460043"
          dir="ltr"
          className="absolute left-[212px] top-[482px] h-[24px] text-right text-[12px] font-medium leading-[24px] tracking-[-0.5px] text-white"
          style={{ right: "65px" }}
        >
          021 -66460043
        </a>
        <Image
          src="/icons/phone.svg"
          alt=""
          aria-hidden
          width={20}
          height={20}
          className="absolute left-[339.98px] top-[482px] max-w-none"
        />
        <div className="absolute left-[36px] top-[482px] h-[20px] w-[101px]">
          <SocialIcons size={20} gap={20} />
        </div>
        <div className="absolute left-[20px] top-[528px] h-[40px] w-[350px] rounded-t-[10px] bg-ink-2 shadow-[6px_-6px_10px_rgba(37,54,68,0.5)]" />
        <p
          dir="rtl"
          className="absolute left-[20px] top-[533px] h-[30px] w-[350px] whitespace-nowrap text-center text-[9px] font-semibold leading-[28px] tracking-[-0.5px] text-white"
        >
          تمامی حقوق برای مرکز نوآوری انرژیک محفوظ است.
        </p>
      </div>

      {/* Desktop (1440px) */}
      <div className="relative mx-auto hidden h-[464px] w-[1440px] overflow-visible md:block">
        <div
          aria-hidden="true"
          className="absolute left-0 top-[39px] z-0 h-[425px] w-[1440px] rounded-t-[10px] bg-ink"
        />
        <Image
          src="/icons/footer-shape.svg"
          alt=""
          aria-hidden
          width={426}
          height={464}
          className="absolute left-[1014px] top-0 z-[1]"
        />
        <Link
          aria-label="صفحه اصلی مرکز نوآوری انرژیک"
          className="absolute left-[1115px] top-[125px] z-[2] block h-[167px] w-[274px]"
          href="/"
        >
          <Image
            src="/logos/footer-logo.png"
            alt="لوگوی مرکز نوآوری انرژیک"
            width={274}
            height={167}
            className="size-full max-w-none object-contain"
          />
        </Link>
        <h2
          dir="rtl"
          className="absolute left-[807px] top-[84px] z-[2] h-[28px] w-[171px] whitespace-nowrap text-right text-[20px] font-semibold leading-[28px] tracking-[-0.5px] text-green"
        >
          توانمندی‌های تخصصی
        </h2>
        <div
          aria-hidden="true"
          className="absolute left-[888px] top-[122px] z-[2] h-[2px] w-[90px]"
          style={{ background: "linear-gradient(to left, #00A950, transparent)" }}
        />
        <ul
          dir="rtl"
          className="absolute left-[688px] top-[147px] z-[2] w-[301px] list-disc text-right text-[18px] font-medium leading-[38px] tracking-[-0.5px] text-white marker:text-white"
        >
          {CAPABILITY_LINKS.map((label) => (
            <li key={label} className="ms-5">
              <Link className="transition-colors hover:text-green" href="/capabilities">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="absolute left-[422px] top-[84px] z-[2] w-[185px]">
          <h2
            dir="rtl"
            className="absolute left-[72px] top-0 h-[28px] w-[113px] whitespace-nowrap text-right text-[20px] font-semibold leading-[28px] tracking-[-0.5px] text-green"
          >
            دسترسی سریع
          </h2>
          <div
            aria-hidden="true"
            className="absolute left-[114.92px] top-[38px] h-[2px] w-[70px]"
            style={{ background: "linear-gradient(to left, #00A950, transparent)" }}
          />
          {QUICK_LINKS.map((item, i) => (
            <Link
              key={item.href}
              dir="rtl"
              href={item.href}
              className="absolute h-[28px] whitespace-nowrap text-right text-[18px] font-medium leading-[28px] tracking-[-0.5px] text-white hover:text-green"
              style={{ top: `${63 + i * 38}px`, right: "30px" }}
            >
              {item.label}
            </Link>
          ))}
          {QUICK_LINKS.map((item, i) => (
            <Image
              key={item.href}
              src="/icons/down-arrow.svg"
              alt=""
              aria-hidden
              width={20}
              height={20}
              className="absolute left-[165px] -rotate-90"
              style={{ top: `${67 + i * 38}px` }}
            />
          ))}
        </div>
        <h2
          dir="rtl"
          className="absolute left-[243px] top-[84px] z-[2] h-[28px] w-[109px] text-right text-[20px] font-semibold leading-[28px] tracking-[-0.5px] text-green"
        >
          اطلاعات تماس
        </h2>
        <div
          aria-hidden="true"
          className="absolute left-[282px] top-[122px] z-[2] h-[2px] w-[70px]"
          style={{ background: "linear-gradient(to left, #00A950, transparent)" }}
        />
        <p
          dir="rtl"
          className="absolute left-[73px] top-[147px] z-[2] w-[234px] text-right text-[18px] font-medium leading-[26px] tracking-[-0.5px] text-white"
        >
          ولیعصر، دانشگاه صنعتی امیرکبیر، دانشکده مهندسی نفت، طبقه اول
        </p>
        <Image
          src="/icons/address.svg"
          alt=""
          aria-hidden
          width={34}
          height={34}
          className="absolute left-[318px] top-[147px] z-[2]"
        />
        <a
          href="tel:02166460043"
          dir="ltr"
          className="absolute left-[192px] top-[209px] z-[2] h-[24px] w-[115px] whitespace-nowrap text-right text-[18px] font-medium leading-[24px] tracking-[-0.5px] text-white"
        >
          021 -66460043
        </a>
        <Image
          src="/icons/phone.svg"
          alt=""
          aria-hidden
          width={21}
          height={21}
          className="absolute left-[324px] top-[209px] z-[2]"
        />
        <div className="absolute left-[81px] top-[263px] z-[2] h-[30px] w-[154px]">
          <SocialIcons size={30} gap={32} />
        </div>
        <div className="absolute left-[395px] top-[404px] z-[2] flex h-[60px] w-[700px] items-center justify-center rounded-tl-[20px] rounded-tr-[20px] bg-ink-2 shadow-[6px_-6px_10px_rgba(37,54,68,0.5)]">
          <p
            dir="rtl"
            className="whitespace-nowrap text-center text-[14px] font-semibold leading-[28px] tracking-[-0.5px] text-white"
          >
            تمامی حقوق برای مرکز نوآوری انرژیک محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
