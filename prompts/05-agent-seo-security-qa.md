# ایجنت ۵ — سئو، امنیت، پرفورمنس و QA نهایی

**اول `prompts/00-shared.md` را کامل بخوان.** تو **آخر** کار می‌کنی، وقتی ایجنت‌های ۱ تا ۴ merge شدند. برنچ: `agent/5-seo-security-qa`. کارت این است که خروجی همه را به سطح «معیارهای خودمان» برسانی و ثابت کنی رسیده.

## وظایف
1. **امنیت (رفع ایرادهای سایت فعلی):**
   - هدرهای امنیتی کامل: CSP سخت‌گیر، HSTS، X-Frame-Options، X-Content-Type-Options، Referrer-Policy، Permissions-Policy. حذف هر نشت نسخه.
   - HTTPS redirect + cookieهای secure/httponly/samesite در prod.
   - `infra/nginx.conf` و تنظیمات prod جنگو هماهنگ. محدودسازی مسیر admin.
   - **فایل مستند جدا** `infra/dns-email-setup.md`: رکوردهای `SPF`, `DMARC`, `CAA` و راهنمای محدودسازی cPanel/غیرفعال‌کردن FTP رمزنشده (اجرا سمت مشتری است، ولی مستندش ما می‌دهیم).
2. **پرفورمنس:**
   - پایپ‌لاین تصاویر: همه‌ی تصاویر آرشیو → webp/avif با عرض مناسب، هرکدام زیر ~۳۰۰KB (یکی الان ۹MB است). با `next/image`.
   - کش فایل‌های ثابت، bundle analysis، حذف JS اضافه.
   - هدف: **PageSpeed موبایل ≥ ۹۰** و Core Web Vitals سبز — با خروجی Lighthouse اثبات شود.
3. **سئو:**
   - متا/canonical/OG هر صفحه از `SEOMeta`، `schema.org` (Organization + CollegeOrUniversity مثل آرشیو، و Article برای اخبار)، `sitemap.xml` پویا، `robots.txt`، صفحه‌ی ۴۰۴ اختصاصی، `security.txt`.
4. **QA سرتاسری (Playwright):**
   - E2E روی هر ۶ صفحه + فرم‌ها (ارسال lead، حالت خطا).
   - **visual regression** هر صفحه در ۳۹۰ و ۱۴۴۰، light و dark، در برابر نسخه‌ی `design-archive` (baseline). اختلاف بیش از آستانه = شکست.
   - تست دسترس‌پذیری پایه (alt، کنتراست، لندمارک).
5. گزارش نهایی با جدول «وضعیت فعلی → بعد از بازسازی» و خروجی واقعی ابزارها (securityheaders, SSL Labs اگر دیپلوی شد, Lighthouse).

## مالکیت فایل‌ها (فقط این‌ها)
`frontend/` فقط: `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`, کامپوننت‌های SEO/meta، `next.config` بخش هدرها/تصاویر، `tests/` (E2E و visual)، اسکریپت بهینه‌سازی تصاویر. `infra/nginx.conf`, `infra/dns-email-setup.md`. تنظیمات امنیتی prod جنگو. **منطق صفحات و مدل‌ها را تغییر نده**؛ اگر برای رسیدن به معیار باید چیزی در کار دیگران عوض شود، در `.worker/QUESTION.md` بنویس یا به منیجر بگو.

## دستورهای پذیرش
```
cd frontend && pnpm build && pnpm exec playwright test            # کل E2E + visual سبز
npx lighthouse http://localhost:3000 --preset=perf --form-factor=mobile   # ≥90
curl -sI http://localhost:3000 | grep -iE 'content-security|strict-transport|x-frame'
```
- Lighthouse موبایل ≥ ۹۰ (خروجی واقعی در گزارش).
- هیچ تصویری > ۳۰۰KB (اسکریپت چک + خروجی).
- visual regression همه‌ی صفحات سبز در برابر baseline آرشیو.
- یک تست visual را با یک تغییر عمدی بشکن → قرمز → برگردان.
