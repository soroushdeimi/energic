import Image from "@/components/ui/SiteImage";
import type { CSSProperties } from "react";

import type { CapabilityCategory, CapabilityItem } from "./CapabilitiesMobile";

export interface CapabilitiesDesktopData {
  heroTitle: string;
  heroSubtitle: string;
  categories: CapabilityCategory[];
  items: CapabilityItem[];
}

// Desktop hero category cards: [icon, size, label] in the archive's grid order.
const HERO_CARDS = [
  { icon: "/icons/capabilities/worker.svg", size: 60, label: "مهندسی و اجرا" },
  { icon: "/icons/capabilities/save-water.svg", size: 60, label: "پایداری و خلق ارزش" },
  { icon: "/icons/capabilities/analysis.svg", size: 55, label: "تحلیل و تصمیم‌سازی" },
  { icon: "/icons/capabilities/technology.svg", size: 55, label: "فناوری و نوآوری" },
];

export function CapabilitiesDesktop({ data }: { data: CapabilitiesDesktopData }) {
  return (
    <>
      {/* Hero */}
      <section
        dir="ltr"
        aria-labelledby="capabilities-hero-heading"
        className="relative hidden h-[748px] overflow-hidden bg-bg-soft md:block"
      >
        <div
          className="absolute left-[-41px] top-0 size-full min-h-[748px] min-w-[1751px]"
          style={{ containerType: "size", width: 1751, height: 748.185 }}
        >
          <div className="absolute inset-0" style={{ containerType: "size" }}>
            <div
              className="absolute flex items-center justify-center"
              style={{ containerType: "size", inset: "0 0.63% 10.5% 0" }}
            >
              <div
                className="relative flex-none rotate-[-97.95deg]"
                style={{
                  width: "hypot(-3.49281cqw, -64.9689cqh)",
                  height: "hypot(96.5072cqw, -35.0311cqh)",
                }}
              >
                <Image
                  src="/icons/capabilities/hero-bg-gray.svg"
                  alt=""
                  aria-hidden
                  width={439}
                  height={1696}
                  className="absolute inset-0 block size-full max-w-none"
                />
              </div>
            </div>
            <div
              className="absolute flex items-center justify-center"
              style={{ containerType: "size", inset: "6.99% 0 0 0.42%" }}
            >
              <div
                className="relative flex-none rotate-[-97.95deg]"
                style={{
                  width: "hypot(-3.69556cqw, -66.289cqh)",
                  height: "hypot(96.3044cqw, -33.711cqh)",
                }}
              >
                <Image
                  src="/icons/capabilities/hero-bg-green.svg"
                  alt=""
                  aria-hidden
                  width={439}
                  height={1696}
                  className="absolute inset-0 block size-full max-w-none"
                />
              </div>
            </div>
          </div>
          <div
            className="capabilities-hero-glass absolute z-[1]"
            style={{ left: 211.09, top: 136.93, width: 1100, height: 300 }}
            aria-hidden="true"
          />
          <div className="absolute z-[2]" style={{ left: 333.09, top: 196.93 }}>
            <h1
              id="capabilities-hero-heading"
              dir="rtl"
              className="whitespace-nowrap text-justify text-[36px] font-bold leading-[40px] tracking-[-0.5px] text-green not-italic"
              style={{ height: 40 }}
            >
              {data.heroTitle}
            </h1>
          </div>
          <div className="absolute z-[2]" style={{ left: 307.09, top: 256.93 }}>
            <p
              dir="rtl"
              className="text-justify text-[22px] font-medium leading-[40px] tracking-[-0.5px] text-ink not-italic"
              style={{ width: 342, height: 120 }}
            >
              {data.heroSubtitle}
            </p>
          </div>
          <div
            className="absolute z-[2] grid grid-cols-2"
            style={{ left: 821.09, top: 217.93, columnGap: 25, rowGap: 30 }}
          >
            {HERO_CARDS.map((card) => (
              <div key={card.label} className="relative h-[120px] w-[190px]">
                <div className="capabilities-hero-card absolute inset-0" aria-hidden="true" />
                <div className="relative z-[1] flex h-full w-full flex-col items-center pt-[10px] pb-[10px]">
                  <Image
                    src={card.icon}
                    alt=""
                    aria-hidden
                    width={card.size}
                    height={card.size}
                    className="max-w-none shrink-0"
                    style={{ width: card.size, height: card.size }}
                  />
                  <p
                    dir="rtl"
                    className="mt-auto whitespace-nowrap text-center text-[18px] font-medium leading-[40px] tracking-[-0.5px] text-ink not-italic"
                  >
                    {card.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability cards */}
      <div className="relative hidden px-[120px] pb-[80px] md:block">
        <div className="flex flex-col gap-[20px]">
          {data.items.map((item, i) => {
            const g = CARD_GEOMETRY[i];
            if (!g) return null;
            return (
              <article
                key={item.number}
                className="relative w-[1200px] overflow-hidden rounded-[20px] bg-white"
                style={{ height: g.height }}
              >
                <div
                  className="absolute left-0 top-0 w-[1200px] rounded-[20px] bg-white"
                  aria-hidden="true"
                />
                <div
                  className="absolute h-[262px] w-[470px] overflow-hidden rounded-[20px]"
                  style={{ left: g.imgLeft, top: g.imgTop }}
                >
                  <Image
                    src={item.image}
                    alt=""
                    aria-hidden
                    width={940}
                    height={524}
                    className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[20px] object-cover"
                  />
                </div>
                <div
                  className="absolute flex items-center justify-center"
                  style={{ left: g.lineLeft, top: g.lineTop, width: 0, height: g.lineLen }}
                  aria-hidden="true"
                >
                  <div className="flex-none rotate-90">
                    <div className="relative h-0" style={{ width: g.lineLen }}>
                      <div className="absolute inset-[-2px_0_0_0]">
                        <Image
                          src={g.line}
                          alt=""
                          width={g.lineLen}
                          height={2}
                          className="block size-full max-w-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <h2
                  dir="rtl"
                  className="absolute text-[20px] font-bold leading-[40px] tracking-[-0.5px] text-ink break-words"
                  style={g.titleStyle}
                >
                  {item.title}
                </h2>
                <p
                  dir="rtl"
                  className="absolute text-[16px] font-medium leading-[30px] tracking-[-0.5px] text-ink break-words text-justify"
                  style={g.bodyStyle}
                >
                  {item.description}
                </p>
                <div
                  className="absolute flex flex-col justify-center whitespace-nowrap text-[60px] font-extrabold leading-[30px] tracking-[-0.5px] text-ink"
                  style={g.numStyle}
                  aria-hidden="true"
                >
                  {item.number}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}

// Per-card geometry from design-archive/pages/capabilities/index.html (desktop).
const CARD_GEOMETRY: {
  height: number;
  imgLeft: number;
  imgTop: number;
  lineLeft: number;
  lineTop: number;
  lineLen: number;
  line: string;
  titleStyle: CSSProperties;
  bodyStyle: CSSProperties;
  numStyle: CSSProperties;
}[] = [
  {
    height: 320,
    imgLeft: 30,
    imgTop: 29,
    lineLeft: 1065,
    lineTop: 76,
    lineLen: 190,
    line: "/icons/capabilities/line-190.svg",
    titleStyle: { left: 654, top: 65, width: 381, height: 80 },
    bodyStyle: { left: 661, top: 155, width: 374, height: 90 },
    numStyle: { left: 1095, top: 157, width: 63, height: 30 },
  },
  {
    height: 361,
    imgLeft: 700,
    imgTop: 49,
    lineLeft: 135,
    lineTop: 65,
    lineLen: 270,
    line: "/icons/capabilities/line-270.svg",
    titleStyle: { left: 168, top: 52, width: 407, height: 80 },
    bodyStyle: { left: 168, top: 142, width: 407, height: 180 },
    numStyle: { left: 36, top: 191, width: 69, height: 30, transform: "translateY(-50%)" },
  },
  {
    height: 320,
    imgLeft: 30,
    imgTop: 29,
    lineLeft: 1065,
    lineTop: 77,
    lineLen: 190,
    line: "/icons/capabilities/line-190.svg",
    titleStyle: { left: 643, top: 65, width: 392, height: 80 },
    bodyStyle: { left: 643, top: 155, width: 392, height: 90 },
    numStyle: { left: 1095, top: 172, width: 69, height: 30, transform: "translateY(-50%)" },
  },
  {
    height: 320,
    imgLeft: 700,
    imgTop: 29,
    lineLeft: 135,
    lineTop: 78,
    lineLen: 207,
    line: "/icons/capabilities/line-207.svg",
    titleStyle: { left: 168, top: 65, width: 407, height: 80 },
    bodyStyle: { left: 168, top: 155, width: 407, height: 120 },
    numStyle: { left: 36, top: 178, width: 70, height: 30, transform: "translateY(-50%)" },
  },
  {
    height: 333,
    imgLeft: 30,
    imgTop: 36,
    lineLeft: 1065,
    lineTop: 64,
    lineLen: 228,
    line: "/icons/capabilities/line-228.svg",
    titleStyle: { left: 1035, top: 52, width: 428, transform: "translateX(-100%)" },
    bodyStyle: { left: 607, top: 142, width: 428 },
    numStyle: { left: 1095, top: 172, transform: "translateY(-50%)" },
  },
  {
    height: 320,
    imgLeft: 700,
    imgTop: 29,
    lineLeft: 135,
    lineTop: 78,
    lineLen: 207,
    line: "/icons/capabilities/line-207.svg",
    titleStyle: { left: 168, top: 65, width: 407, height: 80 },
    bodyStyle: { left: 168, top: 155, width: 407, height: 90 },
    numStyle: { left: 36, top: 178, width: 73, height: 30, transform: "translateY(-50%)" },
  },
];
