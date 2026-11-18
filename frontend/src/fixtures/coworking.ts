import type { CoworkingData } from "@/lib/api";

/**
 * Typed fixture for GET /api/coworking/ (contract: prompts/00-shared.md).
 * Content is taken verbatim from design-archive/pages/coworking/index.html.
 * Replace with getCoworking() from "@/lib/api" once the backend endpoint is live.
 */
export const coworkingFixture: CoworkingData = {
  gallery: [
    { image: "/images/coworking/gallery-coworking-1.webp", alt: "فضای کار اشتراکی ۱ در انرژیک" },
    { image: "/images/coworking/gallery-coworking-2.webp", alt: "فضای کار اشتراکی ۲ در انرژیک" },
    { image: "/images/coworking/gallery-private-offices.webp", alt: "دفاتر خصوصی در فضای کار اشتراکی انرژیک" },
    { image: "/images/coworking/gallery-conference.webp", alt: "فضای کنفرانس در انرژیک" },
    { image: "/images/coworking/gallery-meeting-rooms.webp", alt: "اتاق‌های جلسات در انرژیک" },
    { image: "/images/coworking/gallery-waiting-1.webp", alt: "فضای انتظار ۱ در انرژیک" },
    { image: "/images/coworking/gallery-waiting-2.webp", alt: "فضای انتظار ۲ در انرژیک" },
    { image: "/images/coworking/gallery-dining-hall-1.webp", alt: "سالن غذاخوری ۱ در انرژیک" },
    { image: "/images/coworking/gallery-dining-hall-2.webp", alt: "سالن غذاخوری ۲ در انرژیک" },
  ],
  amenities: [
    { id: "central-access", icon: "/icons/coworking/map.svg", label: "دسترسی مرکزی" },
    { id: "ergonomic-furniture", icon: "/icons/coworking/sofa.svg", label: "مبلمان ارگونومیک" },
    { id: "free-catering", icon: "/icons/coworking/coffee-cup.svg", label: "پذیرایی رایگان" },
    { id: "corporate-postal", icon: "/icons/coworking/mail.svg", label: "کد پستی شرکتی" },
    { id: "fiber-internet", icon: "/icons/coworking/internet.svg", label: "اینترنت فیبر نوری" },
  ],
};

/** Captions rendered over the gallery images (verbatim from the archive). */
export const galleryCaptions: Record<string, string> = {
  "gallery-coworking-1.webp": "فضای کار اشتراکی  1",
  "gallery-coworking-2.webp": "فضای کار اشتراکی  2",
  "gallery-private-offices.webp": "دفاتر خصوصی",
  "gallery-conference.webp": "فضای کنفرانس",
  "gallery-meeting-rooms.webp": "اتاق‌های جلسات",
  "gallery-waiting-1.webp": "فضای انتظار  1",
  "gallery-waiting-2.webp": "فضای انتظار  2",
  "gallery-dining-hall-1.webp": "سالن غذاخوری  1",
  "gallery-dining-hall-2.webp": "سالن غذاخوری  2",
};

/** Desktop (md+) gallery order, dir=ltr, verbatim from the archive grid. */
export const desktopGalleryOrder: string[] = [
  "gallery-private-offices.webp",
  "gallery-coworking-2.webp",
  "gallery-coworking-1.webp",
  "gallery-waiting-1.webp",
  "gallery-meeting-rooms.webp",
  "gallery-conference.webp",
  "gallery-dining-hall-2.webp",
  "gallery-dining-hall-1.webp",
  "gallery-waiting-2.webp",
];

/** Mobile amenity order (2x2 grid + centered last), verbatim from the archive. */
export const mobileAmenityOrder: string[] = [
  "کد پستی شرکتی",
  "اینترنت فیبر نوری",
  "مبلمان ارگونومیک",
  "پذیرایی رایگان",
  "دسترسی مرکزی",
];
