# ایجنت ۱ — زیرساخت، اسکلت و لِی‌اوت پایه

**اول `prompts/00-shared.md` را کامل بخوان و رعایت کن.** برنچ: `agent/1-infra`.

تو پایه‌ای هستی که چهار ایجنت دیگر رویش می‌سازند. کارت باید **اول** merge شود. چیزی را «نیمه» تحویل نده: اسکلتی بده که بقیه بتوانند بلافاصله رویش کد بزنند.

## وظایف
1. **ساختار مونوریپو:** `backend/`، `frontend/`، `infra/`، `docker-compose.yml`، `.gitignore`، `.pre-commit-config.yaml`. (`design-archive/` موجود است؛ دست نزن.)
2. **بک‌اند جنگو (اسکلت):** پروژه‌ی Django 5 + DRF + `drf-spectacular`، تنظیمات split (`base/dev/prod`) با `django-environ`، اتصال Postgres، سلامت‌چک `/api/health/`، و **هدرهای امنیتی + `SECURE_*`** (HSTS، SSL redirect، cookieهای secure) در prod. `poweredByHeader`-معادل حذف شود. یک اندپوینت نمونه `GET /api/pages/<slug>/` که طبق قرارداد API یک fixture خالی برمی‌گرداند تا شکل پاسخ قطعی شود.
3. **فرانت Next.js (اسکلت):** App Router + TypeScript + Tailwind. فونت‌های **Peyda/Vazirmatn** را از `design-archive/_next/static/media/` به `frontend/` منتقل و با `next/font/local` لود کن (نه CDN). `dir="rtl"` و `lang="fa"`.
4. **توکن‌های طراحی:** `frontend/tailwind.config.ts` را با توکن‌های بخش «توکن‌های طراحی» سند مشترک پر کن (رنگ‌ها، فونت peyda، رادیوس‌ها). یک صفحه‌ی `/_tokens` بساز که همه‌ی توکن‌ها را نشان دهد (برای چک چشمی). مقادیر را از CSS آرشیو تأیید کن.
5. **کامپوننت‌های لِی‌اوت پایه (پیکسل‌مطابق آرشیو):** `Header` (لوگو + ناوبری: صفحه اصلی، درباره ما، توانمندی‌های تخصصی، فضای کار اشتراکی، شرکت‌ها و سهامداران، تماس با ما)، `Footer`، `MobileNav` (همبرگر)، `Container`، `Section`. از HTML آرشیو (`pages/home/index.html`) ساختار دقیق هدر/فوتر را دربیاور.
6. **کلاینت API:** `frontend/src/lib/api.ts` با fetcherهای تایپ‌دار برای همه‌ی اندپوینت‌های قرارداد (تایپ‌ها از قرارداد API سند مشترک). تا بک‌اند واقعی آماده شود، از متغیر محیطی `NEXT_PUBLIC_API_URL` بخواند.
7. **اسکلت مسیرها:** `app/(site)/page.tsx` (home) و `/about`، `/capabilities`، `/companies`، `/contact`، `/coworking` به‌صورت placeholder که فقط `Header/Footer` و عنوان صفحه را نشان دهند. ایجنت‌های ۲ و ۳ این‌ها را پر می‌کنند.
8. **CI و کیفیت:** `infra/ci.yml` (GitHub Actions): نصب، ruff+mypy (backend)، eslint+tsc+prettier --check (frontend)، build هر دو، اجرای Playwright. `pre-commit` همان‌ها را lokal بزند. `docker-compose.yml`: postgres + backend + frontend بالا بیاید.
9. **Playwright:** راه‌اندازی در `frontend/`؛ یک تست دود (smoke) که هر ۶ مسیر ۲۰۰ می‌دهند و `Header` دیده می‌شود.

## مالکیت فایل‌ها (فقط این‌ها)
کل `backend/` (اسکلت)، کل `frontend/` (اسکلت + لِی‌اوت + lib)، `infra/`، `docker-compose.yml`, ریشه‌ی config. **صفحات محتوایی داخل `app/(site)/*` را فقط placeholder بگذار**؛ پرکردنشان کار ایجنت ۲ و ۳ است.

## دستورهای پذیرش
```
docker-compose up -d && curl -s localhost:8000/api/health/      # {"status":"ok"}
cd frontend && pnpm build && pnpm exec playwright test          # smoke سبز
cd backend && ruff check . && mypy . && python manage.py check
```
معیار: هر ۶ مسیر بالا می‌آیند با هدر/فوتر پیکسل‌نزدیک به آرشیو، `/_tokens` رنگ‌ها و فونت درست، CI سبز. اسکرین‌شات هدر در ۳۹۰ و ۱۴۴۰ (light/dark) بگیر و با آرشیو مقایسه کن.
