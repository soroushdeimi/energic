# ایجنت ۴ — بک‌اند محتوا، admin، فرم‌ها و i18n

**اول `prompts/00-shared.md` را کامل بخوان.** روی اسکلت ایجنت ۱ کار می‌کنی. برنچ: `agent/4-backend-content`.

هدف: همان بک‌اندی که مشتری کنترلش را دارد. محتوا در admin ویرایش‌پذیر، API طبق قرارداد، و فرم‌ها واقعی.

## وظایف
1. **مدل‌های محتوا (Django) + admin فارسی:**
   - `Page` و `Section` (محتوای بخش‌های هر صفحه؛ `GET /api/pages/<slug>/`).
   - `Shareholder` و `ResidentCompany` (نام، لوگو، url، نوع) → `GET /api/companies/`.
   - `Capability` (عنوان، آیکون، توضیح) → `GET /api/capabilities/`.
   - `CoworkingImage` + `Amenity` → `GET /api/coworking/`.
   - `NewsPost` (اخبار/رویدادها: slug، عنوان، کاور، خلاصه، متن، تاریخ انتشار، وضعیت draft/published) → `GET /api/news/`, `GET /api/news/<slug>/`. **این بخش در سایت فعلی نیست؛ اضافه‌ی ماست** تا تیم مرکز بدون برنامه‌نویس محتوا منتشر کند.
   - `SEOMeta` برای هر صفحه (title, description, og_image).
2. **سریالایزرها + ویوها (DRF)** دقیقاً مطابق شکل قرارداد API سند مشترک. OpenAPI با drf-spectacular به‌روز.
3. **فرم‌ها:** `POST /api/leads/` برای «درخواست استقرار» و «تماس» (مدل `Lead`). ذخیره در DB + اطلاع‌رسانی ایمیل و (اختیاری) تلگرام. **rate-limit** و **captcha/honeypot** روی این اندپوینت (خط قرمز امنیتی سند).
4. **i18n:** ساختار دوزبانه fa/en روی مدل‌ها و API آماده (fieldهای ترجمه‌پذیر یا مدل Translation)؛ محتوای en بعداً پر می‌شود، ولی اسکیمـا و اندپوینت از الان دوزبانه.
5. **Seed/داده‌ی اولیه:** یک management command که محتوای واقعی را **از `design-archive`** استخراج و وارد DB کند (شرکت‌ها، سهامداران، توانمندی‌ها، تصاویر فضای کار، متن صفحات). این‌طوری فرانت با داده‌ی واقعی بالا می‌آید و دیگر fixture لازم نیست.
6. **امنیت admin:** ورود دومرحله‌ای (django-otp/allauth MFA)، لاگ ورود.

## مالکیت فایل‌ها (فقط این‌ها)
کل `backend/apps/*` (مدل‌ها، admin، serializer، view، migration، management commands، تست‌های بک‌اند). تنظیمات `backend/config/settings/*` را فقط برای افزودن اپ‌ها/DRF دست بزن و اگر با چیزی که ایجنت ۱ گذاشته تداخل شد، در `.worker/QUESTION.md` بنویس. فرانت را دست نزن.

## دستورهای پذیرش
```
cd backend && ruff check . && mypy . && pytest
python manage.py seed_from_archive && python manage.py runserver
curl -s localhost:8000/api/companies/ | head        # داده‌ی واقعی شرکت‌ها
curl -s -X POST localhost:8000/api/leads/ -d '{...}' # 201
```
- pytest برای هر مدل/اندپوینت: happy path + حالت خطا (ورودی نامعتبر، rate-limit، فیلد اجباری خالی).
- اثبات قابل fail بودن: یک validation را بردار → تست قرمز → برگردان؛ نامش در گزارش.
- خروجی هر اندپوینت را با شکل قرارداد API تطبیق بده (تست اسکیمـا).
