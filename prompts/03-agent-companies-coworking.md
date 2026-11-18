# ایجنت ۳ — شرکت‌ها/سهامداران، فضای کار اشتراکی و کامپوننت‌های مشترک

**اول `prompts/00-shared.md` را کامل بخوان.** روی اسکلت ایجنت ۱ کار می‌کنی. برنچ: `agent/3-companies-coworking`.

## وظایف
1. **صفحه شرکت‌ها و سهامداران** (`/companies`) از `design-archive/pages/companies/index.html`:
   - بخش «سهامداران و شرکای استراتژیک» و «شرکت‌های مستقر» با لوگو و لینک هر شرکت (کربن بارد، ماهد انرژی پارس، تیوان، بهین انرژی سپهر تابان، توکا انرژی پارس، تیوا انرژی شمس، طراحی الگوریتم انرژی و… — عیناً از HTML آرشیو).
   - کارت «جای تیم شما اینجا خالیست! درخواست استقرار» با لینک به `/contact`.
2. **صفحه فضای کار اشتراکی** (`/coworking`) از `pages/coworking/index.html`:
   - گالری تصاویر (`design-archive/images/coworking/`) با همان چیدمان.
   - بخش امکانات (کد پستی شرکتی، اینترنت فیبر نوری، مبلمان ارگونومیک، پذیرایی، دسترسی مرکزی) با آیکون‌های `icons/coworking/`.
   - دکمه‌ی «شروع تور مجازی» — همان رفتار آرشیو (لینک/مُدال؛ اگر مقصد تور نامشخص بود → `.worker/QUESTION.md`).
3. **کامپوننت‌های مشترک UI** در `frontend/src/components/ui/`: `Card`, `LogoGrid`, `Gallery`, `Slider/Carousel`, `AmenityItem`, `Button`, `SectionTitle`. این‌ها را تمیز و بدون انتزاع زیادی بساز؛ ایجنت ۲ هم ممکن است استفاده کند، پس APIشان را ساده و تایپ‌دار نگه دار و در یک README کوتاه داخل همان پوشه مستند کن.
4. داده از `GET /api/companies/` و `GET /api/coworking/`؛ تا بک‌اند آماده شود fixture تایپ‌دار در `frontend/src/fixtures/` با متن/لوگوی آرشیو.

## مالکیت فایل‌ها (فقط این‌ها)
`frontend/app/(site)/companies/`, `frontend/app/(site)/coworking/`, `frontend/src/components/ui/`, `frontend/src/components/companies|coworking/`, و `frontend/src/fixtures/{companies,coworking}.ts`. لِی‌اوت پایه و صفحات ایجنت ۲ را دست نزن.

## دستورهای پذیرش
```
cd frontend && pnpm exec playwright test tests/companies.spec.ts tests/coworking.spec.ts
```
- تست: تعداد لوگوهای سهامداران/مستقر درست، هر لوگو لینک دارد؛ گالری تعداد درست تصاویر و alt دارد؛ دکمه‌ی تور مجازی کار می‌کند.
- اسکرین‌شات هر دو صفحه در ۳۹۰ و ۱۴۴۰ (light/dark) کنار آرشیو.
- یک تست کلیدی را بشکن (مثلاً حذف یک شرکت) → قرمز → برگردان؛ در گزارش نامش را بیاور.
