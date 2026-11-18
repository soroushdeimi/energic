"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS } from "./nav-items";
import { MobileNav } from "./MobileNav";

/**
 * Archive-faithful header: a floating pill (dir=ltr shell, RTL nav) with the
 * logo on the left and the main navigation on the right.
 *
 * Desktop link positions (left offsets inside the 1200px pill) are taken from
 * design-archive/pages/home/index.html.
 */
const DESKTOP_POSITIONS: Record<string, { left: number; top: number; height: number }> = {
  "/": { left: 872, top: 23, height: 24 },
  "/capabilities": { left: 691, top: 23, height: 24 },
  "/coworking": { left: 532, top: 15, height: 40 },
  "/companies": { left: 355, top: 23, height: 24 },
  "/about": { left: 263, top: 23, height: 24 },
  "/contact": { left: 155, top: 23, height: 24 },
};

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header dir="ltr" className="pointer-events-none relative z-50 w-full">
      <div className="pointer-events-none mx-auto w-full max-w-[390px] px-[20px] pt-[15px] md:max-w-[1440px] md:px-[120px] md:pt-[30px]">
        <div className="pointer-events-auto relative mx-auto h-[30px] w-[350px] overflow-hidden rounded-[10px] border border-[rgba(37,54,68,0.1)] bg-[rgba(0,169,80,0.2)] backdrop-blur-[15px] md:h-[71px] md:w-[1200px] md:rounded-[20px]">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="absolute left-[20px] top-[6px] z-20 size-[18px] overflow-clip md:hidden"
            aria-label="باز کردن منو"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <Image
              src="/icons/hamburger.svg"
              alt=""
              width={18}
              height={18}
              className="size-[18px]"
            />
          </button>
          <Link
            className="absolute left-[288px] top-[2px] z-20 md:left-[1057px] md:top-px md:z-auto"
            aria-label="صفحه اصلی مرکز نوآوری انرژیک"
            href="/"
          >
            <Image
              src="/logos/header-logo-mobile.png"
              alt="لوگوی مرکز نوآوری انرژیک"
              width={42}
              height={26}
              className="h-[26px] w-[42px] object-contain md:hidden"
            />
            <Image
              src="/logos/header-logo-desktop.png"
              alt="لوگوی مرکز نوآوری انرژیک"
              width={110}
              height={67}
              className="hidden h-[67px] w-[110px] object-contain md:block"
            />
          </Link>
          <nav className="absolute inset-0 hidden md:block" aria-label="منوی اصلی">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  dir="rtl"
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  style={{
                    left: `${DESKTOP_POSITIONS[item.href]?.left ?? 0}px`,
                    top: `${DESKTOP_POSITIONS[item.href]?.top ?? 23}px`,
                    height: `${DESKTOP_POSITIONS[item.href]?.height ?? 24}px`,
                  }}
                  className={`absolute flex items-center text-[16px] font-semibold leading-[24px] hover:text-green ${
                    active ? "text-green" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
