"""Seed the database with real content extracted from design-archive."""

from __future__ import annotations

from typing import Any

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone

from core.models import (
    Amenity,
    Capability,
    Company,
    CoworkingImage,
    NewsPost,
    Page,
    Section,
    SEOMeta,
)

ARCHIVE = settings.BASE_DIR.parent / "design-archive"

PAGES: dict[str, Any] = {
    "home": {
        "seo": {
            "title": "مرکز نوآوری انرژیک | Energic Innovation Center — وب‌سایت رسمی",
            "description": (
                "مرجع ارائه خدمات مشاوره مهندسی، امکان‌سنجی‌های فنی-اقتصادی و توسعه "
                "فناوری‌های کم‌کربن در صنایع مادر؛ با تمرکز بر عارضه‌یابی فرآیندی، "
                "کاهش آلایندگی و خلق دارایی‌های مالی در بازار کربن و انرژی"
            ),
            "og_image": "/images/hero-sculpture-desktop.png",
        },
        "sections": [
            {
                "key": "hero",
                "data": {
                    "title": "هاب تخصصی مشاوره مهندسی، توسعه فناوری و اقتصاد کربن",
                    "subtitle": (
                        "مرجع ارائه خدمات مشاوره مهندسی، امکان‌سنجی‌های فنی-اقتصادی و توسعه "
                        "فناوری‌های کم‌کربن در صنایع مادر؛ با تمرکز بر عارضه‌یابی فرآیندی، "
                        "کاهش آلایندگی و خلق دارایی‌های مالی در بازار کربن و انرژی"
                    ),
                    "cta": "مشاهده فضا",
                    "cta_url": "/coworking",
                },
            },
            {
                "key": "features",
                "data": {
                    "items": [
                        {"title": "شبکه‌سازی میان دانشگاه و صنعت", "icon": "/icons/feature-networking-shape.svg"},
                        {"title": "زیرساخت رشد", "icon": "/icons/feature-infrastructure.svg"},
                        {"title": "ارتباطات راهبردی", "icon": "/icons/feature-strategic.svg"},
                        {"title": "تمرکز بر نوآوری", "icon": "/icons/feature-innovation.svg"},
                    ]
                },
            },
            {
                "key": "mission",
                "data": {
                    "title": "ماموریت انرژیک",
                    "body": (
                        "مرکز نوآوری انرژیک، کانون استقرار و هم‌آفرینی شرکت‌های فناور، "
                        "دانش‌بنیان و هسته‌های تخصصی دانشگاهی در زنجیره ارزش نفت، گاز و انرژی "
                        "است. این مرکز با تمرکز راهبردی بر توسعه فناوری‌های سبز، اقتصاد چرخشی و "
                        "تجاری‌سازی در حوزه دی‌اکسید کربن، بستری زیرساختی را برای حل چالش‌های "
                        "کلان صنایع مادر فراهم می‌آورد. همچنین انرژیک، با ارائه فضای کار اشتراکی، "
                        "فرآیند هم‌افزایی را تسهیل کرده تا نوآوری‌های عمیق مهندسی به عنوان ابزاری "
                        "عملیاتی برای بهبود عملکرد و تحول در صنایع بزرگ به‌کار گرفته شوند."
                    ),
                },
            },
            {
                "key": "services",
                "data": {
                    "title": "همراه راهبردی در تمامی مراحل توسعه صنعتی",
                    "columns": [
                        {
                            "title": "توسعه صنعتی",
                            "items": [
                                "عارضه‌یابی ناترازی‌های فرآیندی در صنایع سنگین",
                                "مشاوره فنی، ارزیابی لایسنس‌ها و انتقال فناوری‌های فرآیندی",
                                "مدیریت پروژه از فاز مهندسی تا نظارت بر ساخت و تأمین",
                                "مطالعات امکان‌سنجی جامع و مدل‌سازی اقتصادی پروژه‌ها",
                                "توسعه فناوری‌های کم‌کربن و مدیریت زنجیره ارزش",
                            ],
                        },
                        {
                            "title": "پایین‌دستی کربن دی‌اکسید",
                            "items": [
                                "مشاوره تخصصی جهت ورود به بازارهای داخلی و بین‌المللی اعتبار کربن",
                                "اخذ گواهی‌های بهینه‌سازی مصرف انرژی و خلق منافع مالی از بورس انرژی",
                                "بازطراحی سیستم‌های یوتیلیتی و بهینه‌سازی مصرف آب و انرژی در صنایع",
                                "فضای استقرار تخصصی برای شرکت‌های فناور و هسته‌های پیشرو",
                                "امکانات کامل اداری و کارگاهی متناسب با نیازهای مهندسی",
                                "همجواری و شبکه هم‌افزایی با شرکت‌های بزرگ و شرکای راهبردی",
                                "دسترسی به زیرساخت‌های تست، عارضه‌یابی و توسعه بازار",
                            ],
                        },
                    ],
                },
            },
            {
                "key": "network",
                "data": {
                    "title": "شبکه ارتباطات راهبردی و همکاران کلیدی",
                    "subtitle": "فضای کاری ممتاز",
                },
            },
            {
                "key": "investment",
                "data": {
                    "title": "توسعه سرمایه‌گذاری و تأمین مالی پروژه‌های انرژی",
                    "body": (
                        "انـرژیک با شناسایی و مدل‌سازی دقیق فرصت‌های سرمایه‌گذاری، بستری امن و "
                        "سودآور برای مشارکت هلدینگ‌های صنعتی، سهام‌داران عمده و ارگان‌های "
                        "سرمایه‌گذار در پروژه‌های کلان انرژی فراهم می‌آورد"
                    ),
                    "cta": "آشنایی با سرمایه‌گذاران",
                    "cta_url": "/companies",
                    "badge": "افزایش اعتبار و دیده‌شدن",
                },
            },
        ],
    },
    "about": {
        "seo": {
            "title": "درباره مرکز نوآوری انرژیک | انرژیک",
            "description": (
                "انرژیک در یک نگاه: پیشگام نوآوری انرژی، پیوند صنعت و دانشگاه، توسعه "
                "راهکارهای فناورانه و خلق آینده پایدار."
            ),
            "og_image": "/images/about/innovation-mobile-bg.png",
        },
        "sections": [
            {
                "key": "hero",
                "data": {
                    "title": "انرژیک در یک نگاه",
                    "items": [
                        {
                            "title": "پیشگام نوآوری انرژی",
                            "description": "نخستین مرکز نوآوری خصوصی در حوزه نفت، گاز و انرژی از سال ۱۳۹۹.",
                        },
                        {
                            "title": "پیوند صنعت و دانشگاه",
                            "description": (
                                "ایجاد ارتباط مؤثر میان صنعت، دانشگاه، شرکت‌های تخصصی و اکوسیستم "
                                "نوآوری برای توسعه فناوری."
                            ),
                        },
                        {
                            "title": "توسعه راهکارهای فناورانه",
                            "description": (
                                "شناسایی نیازهای صنعت، تعریف پروژه‌های تحقیق و توسعه و تجاری‌سازی "
                                "فناوری‌های نوآورانه."
                            ),
                        },
                        {
                            "title": "خلق آینده پایدار",
                            "description": (
                                "توسعه فناوری‌های انرژی پاک، راهکارهای کم‌کربن و زنجیره ارزش "
                                "دی‌اکسیدکربن برای ارتقای صنعت انرژی."
                            ),
                        },
                    ],
                },
            },
            {
                "key": "services",
                "data": {
                    "items": [
                        {
                            "title": "اعتبار سنجی و ارزیابی فناوری",
                            "description": "ارزیابی فناوری، اعتبارسنجی راهکارها و آماده‌سازی برای ورود به صنعت",
                        },
                        {
                            "title": "مسیرهای مشارکت استراتژیک",
                            "description": "اتصال به سرمایه‌گذاران، شرکت‌ها و رهبران کلیدی صنعت",
                        },
                        {
                            "title": "منتورینگ حرفه‌ای",
                            "description": "پشتیبانی تخصصی در زمینه استراتژی، فناوری و توسعه محصول",
                        },
                        {
                            "title": "از نمونه اولیه تا اجرای پایلوت",
                            "description": (
                                "تبدیل سریع ایده‌ها به راهکارهای قابل اجرا با دریافت بازخوردهای "
                                "واقعی و هدفمند"
                            ),
                        },
                    ],
                },
            },
            {
                "key": "mission",
                "data": {
                    "title": "مأموریت ما",
                    "items": [
                        {
                            "title": "مطالعات امکان‌سنجی و مدیریت زنجیره ارزش کربن دی‌اکسید",
                            "body": (
                                "انرژیک از طریق انجام مطالعات فنی و اقتصادی، به بررسی پروژه‌های "
                                "مرتبط با زنجیره ارزش کربن دی‌اکسید می‌پردازد. همچنین از مرحله ایده "
                                "تا تدوین مدل کسب و کار و جذب سرمایه، همراه توسعه‌دهندگان فناوری و "
                                "سرمایه‌گذاران می‌باشد."
                            ),
                        },
                        {
                            "title": "مشاوره فنی و انتقال فناوری در حوزه صنایع فرایندی",
                            "body": (
                                "این مجموعه با ارزیابی فناوری‌ها، شناسایی راهکار‌های مناسب و ارائه "
                                "مشاوره تخصصی به صنایع در انتخاب، بومی‌سازی و انتقال فناوری کمک "
                                "می‌کند. همچنین با تدوین اسناد فنی، بررسی پیشنهاد های فناورانه و "
                                "اتصال شرکت ها به ارائه‌دهندگان فناوری، مسیر اجرای پروژه‌ها را "
                                "تسهیل می‌کند"
                            ),
                        },
                    ],
                },
            },
            {
                "key": "vision",
                "data": {
                    "title": "چشم‌انداز ما",
                    "body": (
                        "ایـفای نقش به عنوان مرجع راهبردی توسعه فناوری و مدیریت دارایی‌های انرژی در "
                        "سطح صنایع مادر. این مرکز با تمرکز بر مهندسی فرآیند، تجاری‌سازی فناوری‌های "
                        "کم‌کربن، توسعه محصولات پایین‌دستی زنجیره ارزش کربن دی‌اکسید و تسهیلگری در "
                        "بازارهای مالی انرژی، به دنبال خلق بستری پایدار، سودآور و بومی برای ارتقای "
                        "بهره‌وری و کاهش آلایندگی صنایع سنگین کشور است."
                    ),
                },
            },
            {
                "key": "values",
                "data": {
                    "title": "ارزش‌های اصلی ما",
                    "items": [
                        {
                            "title": "خلاقیت",
                            "description": (
                                "ارائه راهکارهای هوشمندانه برای رفع چالش‌های صنعت؛ بومی‌سازی "
                                "فناوری‌های نوآورانه در زنجیره ارزش انرژی."
                            ),
                        },
                        {
                            "title": "همکاری",
                            "description": (
                                "ایجاد بستر هم‌افزایی میان ارکان علمی، مالی و صنعتی؛ پیشبرد "
                                "پروژه‌ها بر پایه منافع متقابل و تعامل شفاف."
                            ),
                        },
                        {
                            "title": "رشد",
                            "description": (
                                "هدایت صنایع مادر به سمت توسعه پایدار و کم‌کربن؛ ارتقای مستمر "
                                "بهره‌وری و کاهش آلایندگی‌های محیطی."
                            ),
                        },
                        {
                            "title": "تعالی",
                            "description": (
                                "پایبندی به بالاترین استانداردهای اخلاقی و مهندسی؛ حفظ کیفیت، "
                                "اصالت و امانت‌داری در تمامی سطوح خدمات."
                            ),
                        },
                    ],
                },
            },
        ],
    },
    "capabilities": {
        "seo": {
            "title": "توانمندی‌های تخصصی مهندسی و انرژی | انرژیک",
            "description": (
                "انرژیک، بازوی مهندسی و مشاوره تخصصی شما در توسعه پروژه‌های کربن، انرژی و "
                "صنایع فرآیندی"
            ),
            "og_image": "/images/capabilities/capability-01.png",
        },
        "sections": [
            {
                "key": "hero",
                "data": {
                    "title": "توانمندی‌های تخصصی",
                    "subtitle": (
                        "انرژیک، بازوی مهندسی و مشاوره تخصصی شما در توسعه پروژه‌های کربن، انرژی "
                        "و صنایع فرآیندی"
                    ),
                    "categories": [
                        {"title": "تحلیل و تصمیم‌سازی", "icon": "/icons/capabilities/analysis.svg"},
                        {"title": "مهندسی و اجرا", "icon": "/icons/capabilities/worker.svg"},
                        {"title": "فناوری و نوآوری", "icon": "/icons/capabilities/technology.svg"},
                        {"title": "پایداری و خلق ارزش", "icon": "/icons/capabilities/save-water.svg"},
                    ],
                },
            },
            {
                "key": "capabilities",
                "data": {
                    "items": [
                        {
                            "number": "01",
                            "title": (
                                "مطالعات امکان‌سنجی جامع و مدیریت زنجیره ارزش پایین‌دستی "
                                "کربن‌دی‌اکسید"
                            ),
                            "description": (
                                "این مرکز با تسلط بر ابزارهای تحلیل فنی-اقتصادی، توانایی کاملی در "
                                "ارزیابی بازار، فرآیند و سودآوری پروژه‌های پایین‌دستی دی‌اکسید کربن "
                                "دارد."
                            ),
                            "image": "/images/capabilities/capability-01.png",
                        },
                        {
                            "number": "02",
                            "title": (
                                "خدمات مشاوره فنی و انتقال فناوری‌های مشابه در حوزه صنایع فرآیندی"
                            ),
                            "description": (
                                "انرژیک به عنوان بازوی مشاوره مهندسی، آمادگی دارد خدمات تخصصی در "
                                "زمینه ارزیابی لایسنس‌ها، مقایسه فناوری‌های جذب و فرآوری گازها و "
                                "مدیریت ریسک‌های تکنولوژی را به کارفرمایان ارائه دهد. این خدمات "
                                "شامل تدوین اسناد فنی، پروپوزال‌ها و صحه‌گذاری بر ادعاهای فنی "
                                "سازندگان داخلی و خارجی است تا از هدررفت منابع مالی کارفرما در "
                                "انتخاب فناوری‌های اشتباه جلوگیری شود."
                            ),
                            "image": "/images/capabilities/capability-02.png",
                        },
                        {
                            "number": "03",
                            "title": "توانایی اجرای پروژه‌ها از فاز مهندسی تا نظارت بر ساخت و تأمین",
                            "description": (
                                "این مرکز ظرفیت قابلیت اجرایی لازم برای هدایت پروژه‌های صنعتی را از "
                                "مراحل اولیه مهندسی (پایه و تفصیلی) تا نظارت بر زنجیره تأمین قطعات "
                                "و ساخت تخصصی دارد."
                            ),
                            "image": "/images/capabilities/capability-03.png",
                        },
                        {
                            "number": "04",
                            "title": "مشاوره تخصصی جهت ورود به بازارهای داخلی و بین‌المللی اعتبار کربن",
                            "description": (
                                "با توجه به الزامات ملی و بین‌المللی و همچنین شکل‌گیری مکانیزم‌های "
                                "نوین، انرژیک خدمات مشاوره‌ای ویژه‌ای را برای ثبت پروژه‌های کاهش "
                                "انتشار گازهای گلخانه‌ای در نهادهای معتبر بین‌المللی و پلتفرم‌های "
                                "داخلی ارائه می‌دهد."
                            ),
                            "image": "/images/capabilities/capability-04.png",
                        },
                        {
                            "number": "05",
                            "title": "اخذ گواهی‌های بهینه سازی مصرف انرژی و خلق منافع مالی از بورس انرژی",
                            "description": (
                                "این مرکز ممیزی، مستندسازی و اخذ گواهی‌های صرفه‌جویی انرژی را برای "
                                "مجتمع‌های صنعتی مدیریت می‌کند. این گواهی‌ها به کارفرمایان اجازه "
                                "می‌دهد تا میزان انرژی صرفه‌جویی‌شده در فرآیندهای خود را در بازار "
                                "بهینه‌سازی بورس انرژی به نقدینگی تبدیل کنند و یا از آن به عنوان "
                                "ابزاری برای تأمین سوخت و خوراک پایدار در فصول ناترازی استفاده نمایند."
                            ),
                            "image": "/images/capabilities/capability-05.png",
                        },
                        {
                            "number": "06",
                            "title": (
                                "عارضه‌‌یابی ناترازی‌های فرآیندی و بهینه‌سازی مصرف آب و انرژی در "
                                "صنایع سنگین"
                            ),
                            "description": (
                                "علاوه بر مدیریت گازها، این مرکز توانایی فنی بالایی در بازطراحی "
                                "سیستم‌های یوتیلیتی، پیش‌بینی و رفع اتلاف‌های حرارتی و بازیافت "
                                "آب‌های صنعتی دارد."
                            ),
                            "image": "/images/capabilities/capability-06.png",
                        },
                    ]
                },
            },
        ],
    },
    "companies": {
        "seo": {
            "title": "شرکت‌ها و سهامداران | انرژیک",
            "description": "سهامداران و شرکای استراتژیک و شرکت‌های مستقر در مرکز نوآوری انرژیک",
            "og_image": "/logos/header-logo-desktop.png",
        },
        "sections": [
            {
                "key": "hero",
                "data": {"title": "سهامداران و شرکای استراتژیک"},
            },
            {
                "key": "shareholders",
                "data": {"title": "سهامداران اصلی"},
            },
            {
                "key": "residents",
                "data": {
                    "title": "شرکت‌های مستقر",
                    "cta_title": "جای تیم شما اینجا خالیست!",
                    "cta": "درخواست استقرار",
                    "cta_url": "/contact",
                },
            },
        ],
    },
    "contact": {
        "seo": {
            "title": "تماس و آدرس | انرژیک",
            "description": "با ما در ارتباط باشید: آدرس، تلفن و پست الکترونیک مرکز نوآوری انرژیک",
            "og_image": "/logos/header-logo-desktop.png",
        },
        "sections": [
            {
                "key": "hero",
                "data": {"title": "با ما در ارتباط باشید"},
            },
            {
                "key": "contact-info",
                "data": {
                    "address_label": "آدرس حضوری",
                    "address": "ولیعصر، دانشگاه صنعتی امیرکبیر، دانشکده مهندسی نفت، طبقه اول، مرکز نوآوری انرژیک",
                    "phone_label": "تلفن تماس",
                    "phone": "021-66460043",
                    "email_label": "پست الکترونیک",
                    "email": "energyinnovationcenter1@gmail.com",
                },
            },
            {
                "key": "form",
                "data": {
                    "title": "درخواست استقرار",
                    "submit": "ارسال",
                    "fields": [
                        {"name": "name", "label": "نام و نام خانوادگی", "required": True},
                        {"name": "team", "label": "تیم / شرکت", "required": False},
                        {"name": "phone", "label": "تلفن", "required": True},
                        {"name": "email", "label": "پست الکترونیک", "required": False},
                        {"name": "message", "label": "پیام", "required": False},
                    ],
                },
            },
        ],
    },
    "coworking": {
        "seo": {
            "title": "فضای کار اشتراکی در دانشگاه امیرکبیر | انرژیک",
            "description": (
                "نمایی از فضاهای کاری طراحی‌شده برای تمرکز، همکاری و رشد؛ از محیط‌های اشتراکی "
                "الهام‌بخش تا اتاق‌های جلسات و فضاهای آماده برگزاری رویداد."
            ),
            "og_image": "/images/coworking/gallery-coworking-1.png",
        },
        "sections": [
            {
                "key": "hero",
                "data": {
                    "title": "فضای کار اشتراکی انرژیک",
                    "subtitle": (
                        "نمایی از فضاهای کاری طراحی‌شده برای تمرکز، همکاری و رشد؛ از محیط‌های "
                        "اشتراکی الهام‌بخش تا اتاق‌های جلسات و فضاهای آماده برگزاری رویداد."
                    ),
                },
            },
            {
                "key": "gallery",
                "data": {"title": "فضاهای ما"},
            },
            {
                "key": "amenities",
                "data": {"title": "امکانات"},
            },
            {
                "key": "virtual-tour",
                "data": {
                    "title": "تور مجازی دیجیتال انرژیک",
                    "body": (
                        "پیش از حضور، فضای کار اشتراکی، امکانات تخصصی و محیط نوآوری انرژیک را از "
                        "نزدیک تجربه کنید."
                    ),
                    "cta": "شروع تور مجازی",
                },
            },
        ],
    },
}

SHAREHOLDERS = [
    {"name": "پیشگامان توسعه کارمایه آپادانا", "logo": "/logos/apadana.png", "url": ""},
    {"name": "کربن بارد", "logo": "/logos/carbonbared.png", "url": "https://carbonbared.co"},
    {"name": "مهندسی و توسعه اقتصادی سدید", "logo": "/logos/sadid.png", "url": ""},
    {"name": "سرمایه‌گذاری صنعت نفت", "logo": "/logos/3-orig.png", "url": "https://oiicgroup.com/"},
]

RESIDENTS = [
    {"name": "کربن بارد", "logo": "/logos/carbonbared.png", "url": "https://carbonbared.co"},
    {"name": "ماهد انرژی پارس", "logo": "", "url": "https://mahedenergy.com"},
    {"name": "توسعه و تأمین انرژی تیوان", "logo": "", "url": "https://www.t1energy.ir"},
    {"name": "بهین انرژی سپهر تابان", "logo": "", "url": "https://www.best-energy.ir"},
    {"name": "توکا انرژی پارس", "logo": "", "url": "https://tepcoenergy.com"},
    {"name": "تیوا انرژی شمس", "logo": "", "url": "https://tiva-energy.com"},
    {"name": "طراحی الگوریتم انرژی", "logo": "", "url": "https://eneral.ir"},
    {"name": "راگا صنعت شریف", "logo": "", "url": ""},
    {"name": "فراز پیشه سبلان", "logo": "", "url": ""},
    {"name": "برندینگ و خلاقیت آورا", "logo": "", "url": ""},
    {"name": "تجارت صنعت نیکان فراز", "logo": "", "url": ""},
    {"name": "پیشرو صنعت پرهام", "logo": "", "url": ""},
]

CAPABILITIES = [
    {
        "title": "مطالعات امکان‌سنجی جامع",
        "icon": "/icons/capabilities/analysis.svg",
        "description": (
            "ارزیابی بازار، فرآیند و سودآوری پروژه‌های پایین‌دستی دی‌اکسید کربن با تسلط بر "
            "ابزارهای تحلیل فنی-اقتصادی."
        ),
    },
    {
        "title": "مشاوره فنی و انتقال فناوری",
        "icon": "/icons/capabilities/technology.svg",
        "description": (
            "ارزیابی لایسنس‌ها، مقایسه فناوری‌های جذب و فرآوری گازها و مدیریت ریسک‌های تکنولوژی "
            "در حوزه صنایع فرآیندی."
        ),
    },
    {
        "title": "اجرای پروژه از مهندسی تا تامین و مدیریت",
        "icon": "/icons/capabilities/worker.svg",
        "description": (
            "هدایت پروژه‌های صنعتی از مراحل اولیه مهندسی (پایه و تفصیلی) تا نظارت بر زنجیره "
            "تأمین قطعات و ساخت تخصصی."
        ),
    },
    {
        "title": "بازار اعتبار کربن",
        "icon": "/icons/capabilities/analysis.svg",
        "description": (
            "مشاوره تخصصی جهت ورود به بازارهای داخلی و بین‌المللی اعتبار کربن و ثبت پروژه‌های "
            "کاهش انتشار گازهای گلخانه‌ای."
        ),
    },
    {
        "title": "گواهی‌های بهینه‌سازی انرژی",
        "icon": "/icons/capabilities/save-water.svg",
        "description": (
            "ممیزی، مستندسازی و اخذ گواهی‌های صرفه‌جویی انرژی و خلق منافع مالی از بورس انرژی."
        ),
    },
    {
        "title": "بهینه سازی مصرف آب و انرژی",
        "icon": "/icons/capabilities/save-water.svg",
        "description": (
            "بازطراحی سیستم‌های یوتیلیتی، پیش‌بینی و رفع اتلاف‌های حرارتی و بازیافت آب‌های "
            "صنعتی در صنایع سنگین."
        ),
    },
]

GALLERY = [
    {"image": "/images/coworking/gallery-coworking-1.png", "alt": "فضای کار اشتراکی 1"},
    {"image": "/images/coworking/gallery-coworking-2.png", "alt": "فضای کار اشتراکی 2"},
    {"image": "/images/coworking/gallery-private-offices.png", "alt": "دفاتر خصوصی"},
    {"image": "/images/coworking/gallery-conference.png", "alt": "فضای کنفرانس"},
    {"image": "/images/coworking/gallery-meeting-rooms.png", "alt": "اتاق‌های جلسات"},
    {"image": "/images/coworking/gallery-waiting-1.png", "alt": "فضای انتظار 1"},
    {"image": "/images/coworking/gallery-waiting-2.png", "alt": "فضای انتظار 2"},
    {"image": "/images/coworking/gallery-dining-hall-1.png", "alt": "سالن غذاخوری 1"},
    {"image": "/images/coworking/gallery-dining-hall-2.png", "alt": "سالن غذاخوری 2"},
]

AMENITIES = [
    {"icon": "/icons/coworking/mail.svg", "label": "کد پستی شرکتی"},
    {"icon": "/icons/coworking/internet.svg", "label": "اینترنت فیبر نوری"},
    {"icon": "/icons/coworking/sofa.svg", "label": "مبلمان ارگونومیک"},
    {"icon": "/icons/coworking/coffee-cup.svg", "label": "پذیرایی رایگان"},
    {"icon": "/icons/coworking/map.svg", "label": "دسترسی مرکزی"},
]


class Command(BaseCommand):
    help = "Seed the database with real content from design-archive."

    def handle(self, *args: object, **options: object) -> None:
        if not ARCHIVE.is_dir():
            self.stderr.write(f"design-archive not found at {ARCHIVE}")
            return

        # Pages + sections + SEO
        for slug, content in PAGES.items():
            page, _ = Page.objects.get_or_create(slug=slug)
            seo_data = content["seo"]
            SEOMeta.objects.update_or_create(
                page=page,
                language="fa",
                defaults={
                    "title": seo_data["title"],
                    "description": seo_data["description"],
                    "og_image": seo_data["og_image"],
                },
            )
            for order, section in enumerate(content["sections"]):
                Section.objects.update_or_create(
                    page=page,
                    key=section["key"],
                    defaults={"order": order, "data": section["data"]},
                )
            self.stdout.write(f"  page: {slug} ({len(content['sections'])} sections)")

        # Companies
        for order, item in enumerate(SHAREHOLDERS):
            Company.objects.update_or_create(
                kind=Company.KIND_SHAREHOLDER,
                name=item["name"],
                defaults={"logo": item["logo"], "url": item["url"], "order": order},
            )
        for order, item in enumerate(RESIDENTS):
            Company.objects.update_or_create(
                kind=Company.KIND_RESIDENT,
                name=item["name"],
                defaults={"logo": item["logo"], "url": item["url"], "order": order},
            )
        self.stdout.write(
            f"  companies: {len(SHAREHOLDERS)} shareholders, {len(RESIDENTS)} residents"
        )

        # Capabilities
        for order, item in enumerate(CAPABILITIES):
            Capability.objects.update_or_create(
                title=item["title"],
                defaults={"icon": item["icon"], "description": item["description"], "order": order},
            )
        self.stdout.write(f"  capabilities: {len(CAPABILITIES)}")

        # Coworking
        for order, item in enumerate(GALLERY):
            CoworkingImage.objects.update_or_create(
                image=item["image"],
                defaults={"alt": item["alt"], "order": order},
            )
        for order, item in enumerate(AMENITIES):
            Amenity.objects.update_or_create(
                label=item["label"],
                defaults={"icon": item["icon"], "order": order},
            )
        self.stdout.write(f"  coworking: {len(GALLERY)} images, {len(AMENITIES)} amenities")

        # Sample news post (draft) so the CMS is demonstrable
        NewsPost.objects.update_or_create(
            slug="welcome",
            defaults={
                "title": "افتتاح مرکز نوآوری انرژیک",
                "cover": "/images/hero-sculpture-desktop.png",
                "excerpt": "مرکز نوآوری انرژیک رسماً فعالیت خود را آغاز کرد.",
                "body": (
                    "مرکز نوآوری انرژیک، کانون استقرار و هم‌آفرینی شرکت‌های فناور، دانش‌بنیان و "
                    "هسته‌های تخصصی دانشگاهی در زنجیره ارزش نفت، گاز و انرژی است."
                ),
                "status": NewsPost.STATUS_PUBLISHED,
                "published_at": timezone.now(),
            },
        )
        self.stdout.write("  news: 1 sample post")

        self.stdout.write(self.style.SUCCESS("Seed complete."))
