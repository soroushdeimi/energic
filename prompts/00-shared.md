# انرژیک — بازسازی سایت | سند مشترک همه‌ی ایجنت‌ها

> این فایل را **اول از همه و کامل** بخوان. هر ۵ ایجنت باید این را رعایت کنند. اگر جایی ابهام داشتی، حدس نزن — طبق بخش «وقتی مطمئن نیستی» عمل کن.

## هدف
سایت فعلی مشتری (`energiccenter.ir`) را از نو می‌سازیم چون به کد و دسترسی سایت فعلی دسترسی نداریم و ممکن است صاحب قبلی هر لحظه سایت را پاک کند. طراحی و محتوا **مال مشتری است** و باید **پیکسل‌به‌پیکسل** بازسازی شود، ولی این بار:
- بک‌اند **Django** که مشتری کنترلش را دارد (محتوا در admin ویرایش‌پذیر).
- کد و همه‌ی دسترسی‌ها به نام مشتری.
- همه‌ی ایرادهای امنیتی/سرعت/سئوی نسخه‌ی فعلی در این نسخه رفع شده باشد.

## منبع طراحی (source of truth)
پوشه‌ی `design-archive/` در ریشه‌ی ریپو، شامل:
- `design-archive/pages/{home,about,capabilities,companies,contact,coworking}/index.html` — HTML کامل رندرشده‌ی هر صفحه.
- `design-archive/_next/static/chunks/*.css` — استایل کامل.
- `design-archive/_next/static/media/*.woff2` — فونت‌ها: **Peyda** (Regular/Medium/SemiBold/Bold/ExtraBold) و Vazirmatn ExtraBold.
- `design-archive/images/`, `design-archive/icons/`, `design-archive/logos/` — همه‌ی تصاویر و آیکون‌ها.
- متن‌های فارسی هر صفحه داخل همان HTMLهاست؛ عیناً از آنجا بردار، بازنویسی نکن.

**قاعده:** هر چیزی که در صفحه می‌سازی باید با نسخه‌ی آرشیو مقایسه شود. رنگ/فاصله/فونت/گردی گوشه را از CSS آرشیو دربیاور، از چشم نزن.

## استک (قطعی)
- **مونوریپو:** `backend/` (Django)، `frontend/` (Next.js)، `design-archive/` (فقط مرجع، دست نزن)، `infra/` (docker, nginx, ci)، `docker-compose.yml`.
- **بک‌اند:** Django 5 + Django REST Framework + PostgreSQL. تنظیمات split (base/dev/prod) با `django-environ`. مستندات API با `drf-spectacular` (OpenAPI).
- **فرانت:** Next.js (App Router) + TypeScript + Tailwind CSS. فونت‌ها local از `design-archive` (نه CDN). `next/image` برای همه‌ی تصاویر.
- **i18n:** `fa` پیش‌فرض و RTL؛ ساختار `en` از همین ابتدا آماده ولی محتوای en بعداً.
- بدون وابستگی اضافه بدون نیاز واقعی. بدون انتزاع زودرس.

## توکن‌های طراحی (از CSS آرشیو استخراج شده)
```
--ink:      #253644   /* متن اصلی / سرمه‌ای */
--ink-2:    #2d4152
--green:    #00a950   /* اکسنت / دکمه‌ها / لینک */
--bg:       #ffffff
--bg-soft:  #f5f5f5
--muted:    #a3a3a3
--blue-1:   #78b9ff
--blue-2:   #c2d6ff
--danger:   #ff7878
font: peyda  → fallback: "Tahoma","Arial",sans-serif
dir: rtl ، lang: fa
```
این‌ها در `frontend/tailwind.config.ts` به‌صورت theme token تعریف می‌شوند (کار ایجنت ۱). بقیه از همین توکن‌ها استفاده کنند، نه هاردکد.

## قرارداد API (تا بک‌اند آماده شود، فرانت روی همین fixtureها کار کند)
شکل پاسخ‌ها (ایجنت ۴ این‌ها را واقعی می‌کند، ایجنت‌های ۲ و ۳ تا آن موقع fixture تایپ‌دار با همین شکل می‌سازند):
```jsonc
// GET /api/pages/<slug>/           → محتوای بخش‌های یک صفحه
{ "slug":"home", "seo":{"title":"","description":"","og_image":""},
  "sections":[ {"key":"hero","data":{ /* فیلدهای همان بخش */ }} ] }

// GET /api/companies/              → شرکت‌های مستقر و سهامداران
{ "shareholders":[{"name":"","logo":"","url":""}],
  "residents":[{"name":"","logo":"","url":""}] }

// GET /api/capabilities/          → توانمندی‌های تخصصی
[{"title":"","icon":"","description":""}]

// GET /api/coworking/             → گالری و امکانات
{ "gallery":[{"image":"","alt":""}], "amenities":[{"icon":"","label":""}] }

// GET /api/news/                  → اخبار/رویدادها (CMS جدید)
[{"slug":"","title":"","cover":"","excerpt":"","published_at":""}]

// POST /api/leads/                → فرم «درخواست استقرار» و تماس
// body: {name, team?, phone, email?, message, kind:"establishment"|"contact"}
// → 201 {ok:true}
```

## خط قرمزها (نقض = کار رد می‌شود)
1. **هیچ نامی از Claude/Anthropic/هیچ ابزار یا مدل AI** هیچ‌جا: کامیت (بدنه هم)، پیام PR، تگ، کامنت کد، مستندات، متن سایت، متادیتای تصاویر. بدون `Co-Authored-By`، بدون «Generated with».
2. گیت با هویت خود سروش (`user.name`/`user.email` تنظیم‌شده). author را override نکن.
3. **Conventional Commits با scope**: `feat(frontend-home): ...`، `fix(backend-leads): ...`. پیام فقط تغییر را توضیح دهد، نه چت ریویو.
4. فقط فایل‌های مالکیت خودت را دست بزن (بخش هر ایجنت پایین آمده). `CHANGELOG`، `README` ریشه، `pyproject` ریشه، `ci.yml` فقط دست منیجر.
5. تست واقعی: **UI/E2E فقط با Playwright**. حالت خطا و لبه هم تست شود، نه فقط happy path. هیچ skip/xfail و هیچ assert سست‌شده برای سبز شدن.
6. ثابت کن تست‌های کلیدی می‌توانند fail شوند: فیچر را بشکن → قرمز شود → برگردان؛ و اسم آن تست‌ها را در گزارش بیاور.
7. هر ادعا در مستندات/سایت باید پشتوانه‌ی تست یا اسکریپت قابل‌تکرار داشته باشد. عددها از اجرای کد می‌آیند، با دست تایپ نمی‌شوند.
8. کد ساده و خوانا و حداقلی. fail early با مقدار خطا در پیام. تایپ صریح. mypy/ruff سخت‌گیر (py)، eslint/prettier سخت‌گیر (ts).
9. RTL/فارسی؛ در عرض **۳۹۰** و **۱۴۴۰** پیکسل و در **light و dark** چک کن؛ به **اسکرین‌شات** نگاه کن، به کد اعتماد نکن.

## معیارهای «خودمان» که باید در خروجی رعایت شوند (رفع ایرادهای سایت فعلی)
- HTTPS اجباری + HSTS؛ هدرهای امنیتی (CSP، X-Frame-Options، X-Content-Type-Options، Referrer-Policy، Permissions-Policy). هدف: نمره A در `securityheaders.com`.
- هیچ نشت نسخه (بدون `X-Powered-By`، `poweredByHeader:false`).
- همه‌ی تصاویر webp/avif با عرض مناسب، هر کدام زیر ~۳۰۰KB (الان یکی ۹MB است). کش فایل‌های ثابت.
- admin جنگو پشت ورود دومرحله‌ای؛ فرم‌ها rate-limit + captcha.
- SEO: متا و canonical و OG هر صفحه، `schema.org`، `sitemap.xml`، `robots.txt`، صفحه ۴۰۴. هدف PageSpeed موبایل ≥ ۹۰.

## وقتی مطمئن نیستی
حدس نزن و خودسر تصمیم نگیر. یک فایل `.worker/QUESTION.md` بساز، سؤال دقیق + گزینه‌ها را بنویس و **متوقف شو**. هرگز ننویس «Doubts: none». اول آرشیو و این سند را دوباره چک کن.

## فرمت گزارش پایان کار (هر ایجنت)
```
## کاری که انجام شد
- ...
## فایل‌های تغییر/ساخته‌شده (فقط مالکیت خودم)
- ...
## دستورهای پذیرش که اجرا کردم + ته خروجی
$ ... (آخرین چند خط خروجی واقعی)
## تست‌هایی که ثابت کردم می‌توانند fail شوند
- test_x :: شکستم → قرمز شد → برگرداندم
## سؤال/ابهام باز (یا «ندارم» فقط اگر واقعاً صفر است)
```

## ترتیب اجرا
ایجنت ۱ **اول** کامل می‌شود و merge می‌شود (اسکلت + توکن + لِی‌اوت پایه + قرارداد API). بعد ۲ و ۳ و ۴ موازی. ایجنت ۵ **آخر** روی کل سیستم. هر ایجنت روی برنچ خودش کار می‌کند: `agent/<n>-<name>`.
