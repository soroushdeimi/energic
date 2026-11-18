# ایجنت ۲ — صفحات اصلی: خانه، درباره ما، توانمندی‌ها

**اول `prompts/00-shared.md` را کامل بخوان.** روی اسکلت ایجنت ۱ کار می‌کنی (بعد از merge آن شروع کن). برنچ: `agent/2-core-pages`.

هدف: سه صفحه را **پیکسل‌به‌پیکسل** مثل آرشیو بساز.

## وظایف
1. **صفحه خانه** (`app/(site)/page.tsx`) از `design-archive/pages/home/index.html`:
   - Hero با تیتر «هاب تخصصی مشاوره مهندسی، توسعه فناوری و اقتصاد کربن» و تصویر مجسمه (دسکتاپ/موبایل جدا).
   - بخش «شبکه‌سازی میان دانشگاه و صنعت / زیرساخت رشد / ...»، «ماموریت انرژیک» و بقیه‌ی بخش‌ها دقیقاً به همان ترتیب و چیدمان.
2. **صفحه درباره ما** (`/about`) از `pages/about/index.html` — همه‌ی بخش‌ها و تصاویر پس‌زمینه.
3. **صفحه توانمندی‌ها** (`/capabilities`) از `pages/capabilities/index.html` — کارت‌های توانمندی (مطالعات امکان‌سنجی، مشاوره فنی و انتقال فناوری، اجرای پروژه، بازار اعتبار کربن، بهینه‌سازی انرژی/آب و…) با آیکون‌های `design-archive/icons/capabilities/`.
4. محتوا (متن/تصویر) را از اندپوینت‌های `GET /api/pages/{home,about,capabilities}/` و `GET /api/capabilities/` بگیر (کلاینت `lib/api.ts` ایجنت ۱). **تا بک‌اند ایجنت ۴ آماده شود، fixture تایپ‌دار** در `frontend/src/fixtures/` بساز که عیناً شکل قرارداد API را دارد و متن‌ها را از HTML آرشیو پر کرده؛ وقتی API واقعی آمد فقط منبع داده عوض شود، نه کامپوننت.
5. همه‌ی تصاویر با `next/image` و `alt` فارسی مناسب. فاصله/رنگ/فونت/گردی از توکن‌ها، نه هاردکد.

## مالکیت فایل‌ها (فقط این‌ها)
`frontend/app/(site)/page.tsx`, `frontend/app/(site)/about/`, `frontend/app/(site)/capabilities/`, کامپوننت‌های مخصوص این صفحات در `frontend/src/components/home|about|capabilities/`, و `frontend/src/fixtures/{home,about,capabilities}.ts`. کامپوننت‌های مشترک و لِی‌اوت را **دست نزن** (مال ایجنت ۱/۳)؛ اگر کم داشتی، در `.worker/QUESTION.md` بنویس.

## دستورهای پذیرش
```
cd frontend && pnpm exec playwright test tests/home.spec.ts tests/about.spec.ts tests/capabilities.spec.ts
```
- تست Playwright برای هر صفحه: اجزای کلیدی (تیتر، تعداد کارت‌ها، تصاویر با alt) وجود دارند.
- **visual check:** اسکرین‌شات هر سه صفحه در ۳۹۰ و ۱۴۴۰ (light/dark) کنار نسخه‌ی آرشیو بگذار؛ تفاوت چشمی نباید باشد.
- یک تست کلیدی را عمداً بشکن (مثلاً حذف یک کارت توانمندی) و نشان بده قرمز می‌شود، بعد برگردان.
