import type { Metadata } from "next";
import Link from "next/link";

/**
 * 404 page.
 *
 * In ordinary server mode unknown paths return a real HTTP 404. In the static
 * GitHub Pages export, direct requests to `/404.html` return HTTP 200 (GitHub
 * Pages behaviour) — the page still carries `noindex` and a 404 title.
 */
export const metadata: Metadata = {
  title: "صفحه یافت نشد | مرکز نوآوری انرژیک",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-5 py-20 text-center"
    >
      <p dir="rtl" className="text-[64px] font-extrabold leading-none text-green">
        ۴۰۴
      </p>
      <h1
        id="not-found-heading"
        dir="rtl"
        className="text-[24px] font-bold leading-[40px] text-ink md:text-[36px]"
      >
        صفحه‌ای که دنبالش بودید پیدا نشد
      </h1>
      <p dir="rtl" className="max-w-[480px] text-[16px] font-medium leading-[30px] text-muted">
        ممکن است آدرس صفحه تغییر کرده باشد یا دیگر در دسترس نباشد. از منوی بالای صفحه به بخش‌های
        دیگر مرکز نوآوری انرژیک بروید.
      </p>
      <Link
        href="/"
        dir="rtl"
        className="rounded-[10px] bg-green px-8 py-3 text-[16px] font-bold leading-[24px] text-white transition-opacity hover:opacity-90"
      >
        بازگشت به صفحه اصلی
      </Link>
    </section>
  );
}
