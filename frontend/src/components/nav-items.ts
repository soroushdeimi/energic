export interface NavItem {
  href: string;
  label: string;
}

/** Desktop nav, ordered right-to-left as rendered in the archive (RTL). */
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/capabilities", label: "توانمندی‌های تخصصی" },
  { href: "/coworking", label: "فضای کار اشتراکی" },
  { href: "/companies", label: "شرکت‌ها و سهامداران" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];
