"use client";

import Image from "@/components/ui/SiteImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Archive-faithful site shell.
 *
 * Ported from `design-archive/_next/static/chunks/2il5lf6aozeg3.js` (the
 * bespoke `SiteShell` export). The archive renders every page inside a fixed
 * logical canvas — 390px wide on mobile, 1440px wide on desktop — and scales
 * that canvas to the viewport with `transform: scale(innerWidth / logicalWidth)`.
 * The header is a separate *fixed* overlay that is scaled identically, so it
 * floats over the content instead of pushing it down in normal flow.
 *
 * The rebuild previously dropped this provider entirely, which produced
 * 1440px-wide layouts at 768/1024 and horizontal overflow at 1440/390.
 */

interface CanvasState {
  logicalWidth: number;
  scale: number;
}

const CanvasContext = createContext<CanvasState>({ logicalWidth: 1440, scale: 1 });

function useCanvas() {
  return useContext(CanvasContext);
}

function isScaled(scale: number) {
  return Math.abs(scale - 1) > 1e-4;
}

function CanvasProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CanvasState>(() => ({
    logicalWidth: 1440,
    scale: 1,
  }));

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const logicalWidth = window.matchMedia("(min-width: 768px)").matches ? 1440 : 390;
      setState({ logicalWidth, scale: width / logicalWidth });
    };
    update();
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <CanvasContext.Provider value={state}>{children}</CanvasContext.Provider>;
}

/** Scales its children to the logical canvas width and maintains outer height. */
function CanvasScaler({ children }: { children: ReactNode }) {
  const { logicalWidth, scale } = useCanvas();
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const measure = useCallback(() => {
    setContentHeight(contentRef.current?.offsetHeight ?? 0);
  }, []);

  useEffect(() => {
    const onResize = () => setViewportHeight(window.innerHeight);
    onResize();
    measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("resize", measure);
    const el = contentRef.current;
    if (!el) {
      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("resize", measure);
      };
    }
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [measure]);

  const scaled = isScaled(scale);
  const minLogicalHeight = scaled ? (scale <= 0 ? 0 : Math.ceil(viewportHeight / scale)) : 0;
  const scaledHeight = contentHeight * scale;
  const wrapperHeight = scaled && scaledHeight > 0 ? Math.max(scaledHeight, viewportHeight) : undefined;

  return (
    <div className="design-canvas-host flex w-full flex-1 overflow-x-clip">
      <div
        className="design-canvas-scaler relative left-0 overflow-x-clip"
        style={{ width: scaled ? "calc(100% + 1px)" : logicalWidth, height: wrapperHeight }}
      >
        <div
          ref={contentRef}
          className={
            scaled
              ? "design-canvas-content design-canvas-content--scaled absolute left-0 top-0 origin-top-left"
              : "design-canvas-content"
          }
          style={{
            width: logicalWidth,
            minHeight: scaled && minLogicalHeight > 0 ? minLogicalHeight : undefined,
            transform: scaled ? `scale(${scale})` : undefined,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const DESKTOP_NAV = [
  { href: "/contact", label: "تماس با ما", left: 155, top: 23, height: 24 },
  { href: "/about", label: "درباره ما", left: 263, top: 23, height: 24 },
  { href: "/companies", label: "شرکت‌ها و سهامداران", left: 355, top: 23, height: 24 },
  { href: "/coworking", label: "فضای کار اشتراکی", left: 532, top: 15, height: 40 },
  { href: "/capabilities", label: "توانمندی‌های تخصصی", left: 691, top: 23, height: 24 },
  { href: "/", label: "صفحه اصلی", left: 872, top: 23, height: 24 },
];

const MOBILE_NAV = [
  { href: "/", label: "صفحه اصلی", left: 141, top: 50, width: 69 },
  { href: "/capabilities", label: "توانمندی‌های تخصصی", left: 114, top: 88, width: 123 },
  { href: "/coworking", label: "فضای کار اشتراکی", left: 124, top: 126, width: 103 },
  { href: "/companies", label: "شرکت‌ها و سهامداران", left: 115, top: 164, width: 120 },
  { href: "/about", label: "درباره ما", left: 153, top: 202, width: 45 },
  { href: "/contact", label: "تماس با ما", left: 147, top: 240, width: 56 },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** The floating header pill (dir=ltr shell, RTL nav), verbatim from the archive. */
function HeaderPill() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while the mobile menu is open (archive behavior).
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header dir="ltr" className="pointer-events-none relative z-50 w-full">
      <div className="pointer-events-none mx-auto w-full max-w-[390px] px-[20px] pt-[15px] md:max-w-[1440px] md:px-[120px] md:pt-[30px]">
        <div
          className={`pointer-events-auto relative mx-auto w-[350px] overflow-hidden rounded-[10px] border border-[rgba(37,54,68,0.1)] bg-[rgba(0,169,80,0.2)] backdrop-blur-[15px] md:w-[1200px] md:rounded-[20px] ${
            open ? "h-[284px]" : "h-[30px] md:h-[71px]"
          }`}
        >
          <button
            ref={toggleRef}
            type="button"
            className="absolute left-[20px] top-[6px] z-20 size-[18px] overflow-clip md:hidden"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <span className="absolute inset-[25%]">
                <Image
                  src="/icons/close.svg"
                  alt=""
                  width={9}
                  height={9}
                  aria-hidden
                  className="size-full"
                />
              </span>
            ) : (
              <Image
                src="/icons/hamburger.svg"
                alt=""
                width={18}
                height={18}
                aria-hidden
                className="size-[18px]"
              />
            )}
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
              priority
              className="h-[26px] w-[42px] object-contain md:hidden"
            />
            <Image
              src="/logos/header-logo-desktop.png"
              alt="لوگوی مرکز نوآوری انرژیک"
              width={110}
              height={67}
              priority
              className="hidden h-[67px] w-[110px] object-contain md:block"
            />
          </Link>
          <nav className="absolute inset-0 hidden md:block" aria-label="منوی اصلی">
            {DESKTOP_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  dir="rtl"
                  aria-current={active ? "page" : undefined}
                  style={{ left: item.left, top: item.top, height: item.height }}
                  className={`absolute flex items-center text-[16px] font-semibold leading-[24px] ${
                    active ? "text-[#00a950]" : "text-[#253644] hover:text-[#00a950]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          {open ? (
            <nav id="mobile-nav" className="absolute inset-0 md:hidden" aria-label="منوی موبایل">
              {MOBILE_NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    dir="rtl"
                    aria-current={active ? "page" : undefined}
                    style={{ left: item.left, top: item.top, width: item.width, height: 24 }}
                    className={`absolute flex items-center justify-center whitespace-nowrap text-center text-[14px] font-semibold leading-[24px] ${
                      active ? "text-[#00a950]" : "text-[#253644]"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}

/** Fixed overlay header, scaled identically to the content canvas. */
function FixedHeader() {
  const { logicalWidth, scale } = useCanvas();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const measure = useCallback(() => {
    setHeaderHeight(headerRef.current?.offsetHeight ?? 0);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const el = headerRef.current;
    if (!el) {
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [measure, scale]);

  const scaled = isScaled(scale);
  const scaledHeight = headerHeight * scale;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full overflow-x-clip">
      <div
        className="pointer-events-none relative w-full overflow-hidden"
        style={{ width: scaled ? "100%" : logicalWidth, height: scaled && scaledHeight > 0 ? scaledHeight : undefined }}
      >
        <div
          ref={headerRef}
          className={`pointer-events-none origin-top-left${scaled ? " absolute left-0 top-0" : ""}`}
          style={{ width: logicalWidth, transform: scaled ? `scale(${scale})` : undefined }}
        >
          <HeaderPill />
        </div>
      </div>
    </div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <CanvasProvider>
      <FixedHeader />
      <CanvasScaler>{children}</CanvasScaler>
    </CanvasProvider>
  );
}
