"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./nav-items";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Mobile dropdown menu, opened by the hamburger button in the header pill.
 * The archive only ships the closed state, so the panel follows the design
 * tokens (ink text, green hover, 10px radius, white surface).
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  if (!open) return null;

  return (
    <div
      id="mobile-nav"
      className="absolute inset-x-[20px] top-[52px] z-40 md:hidden"
      role="menu"
      aria-label="منوی موبایل"
    >
      <ul className="flex flex-col gap-1 rounded-[10px] border border-[rgba(37,54,68,0.1)] bg-white p-3 shadow-lg">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={onClose}
                className={`block rounded-[10px] px-3 py-2 text-[16px] font-semibold leading-[24px] transition-colors hover:text-green ${
                  active ? "text-green" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
