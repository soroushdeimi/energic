import Image from "next/image";

export interface CapabilityCategory {
  label: string;
  icon: string;
}

export interface CapabilityItem {
  number: string;
  image: string;
  imageMobile: string;
  title: string;
  description: string;
}

export interface CapabilitiesMobileData {
  heroTitle: string;
  heroSubtitle: string;
  categories: CapabilityCategory[];
  items: CapabilityItem[];
}

const HERO_CARDS = [
  {
    left: 40,
    icon: "/icons/capabilities/mobile/analysis.svg",
    size: 25,
    label: "تحلیل و تصمیم‌سازی",
  },
  { left: 120, icon: "/icons/capabilities/mobile/worker.svg", size: 30, label: "مهندسی و اجرا" },
  {
    left: 200,
    icon: "/icons/capabilities/mobile/technology.svg",
    size: 30,
    label: "فناوری و نوآوری",
  },
  {
    left: 280,
    icon: "/icons/capabilities/mobile/save-water.svg",
    size: 30,
    label: "پایداری و خلق ارزش",
  },
];

// Per-card geometry from the archive (image box, line, title, number).
const CARD_GEOMETRY = [
  {
    top: 305,
    height: 310,
    imgLeft: 10,
    imgTop: 165,
    lineLeft: 251,
    lineTop: 32,
    lineLen: 123,
    line: "/icons/capabilities/mobile/line-123.svg",
    titleLeft: 35,
    titleWidth: 211,
    numLeft: 263,
    numTop: 93,
  },
  {
    top: 635,
    height: 387,
    imgLeft: 49,
    imgTop: 242,
    lineLeft: 49,
    lineTop: 32,
    lineLen: 200,
    line: "/icons/capabilities/mobile/line-200.svg",
    titleLeft: 61,
    titleWidth: 211,
    numLeft: 12,
    numTop: 132,
  },
  {
    top: 1042,
    height: 310,
    imgLeft: 10,
    imgTop: 165,
    lineLeft: 251,
    lineTop: 32,
    lineLen: 123,
    line: "/icons/capabilities/mobile/line-123.svg",
    titleLeft: 42,
    titleWidth: 197,
    numLeft: 263,
    numTop: 93,
  },
  {
    top: 1372,
    height: 327,
    imgLeft: 49,
    imgTop: 182,
    lineLeft: 49,
    lineTop: 32,
    lineLen: 140,
    line: "/icons/capabilities/mobile/line-140.svg",
    titleLeft: 61,
    titleWidth: 205,
    numLeft: 12,
    numTop: 102,
  },
  {
    top: 1719,
    height: 390,
    imgLeft: 10,
    imgTop: 245,
    lineLeft: 251,
    lineTop: 32,
    lineLen: 203,
    line: "/icons/capabilities/mobile/line-203.svg",
    titleLeft: 42,
    titleWidth: 197,
    numLeft: 263,
    numTop: 93,
  },
  {
    top: 2129,
    height: 342,
    imgLeft: 49,
    imgTop: 197,
    lineLeft: 49,
    lineTop: 32,
    lineLen: 155,
    line: "/icons/capabilities/mobile/line-155.svg",
    titleLeft: 61,
    titleWidth: 200,
    numLeft: 12,
    numTop: 102,
  },
];

export function CapabilitiesMobile({ data }: { data: CapabilitiesMobileData }) {
  return (
    <section
      aria-labelledby="capabilities-mobile-hero-heading"
      className="relative mx-auto w-full max-w-[390px] md:hidden"
      style={{ height: 2471 }}
    >
      {/* Hero background */}
      <div
        className="absolute left-0 top-0 isolate w-[390px] overflow-hidden bg-bg-soft"
        style={{ height: 273 }}
      >
        <div
          className="absolute overflow-hidden"
          style={{ left: -66.37, top: 3.97, width: 628.89, height: 268.71, containerType: "size" }}
        >
          <div className="absolute inset-0" style={{ containerType: "size" }}>
            <div
              className="absolute flex items-center justify-center"
              style={{ containerType: "size", inset: "0 0.63% 10.5% 0" }}
            >
              <div
                className="relative flex-none rotate-[-97.95deg]"
                style={{
                  width: "hypot(-3.49278cqw, -64.9687cqh)",
                  height: "hypot(96.5072cqw, -35.0313cqh)",
                }}
              >
                <Image
                  src="/icons/capabilities/mobile/hero-bg-gray.svg"
                  alt=""
                  aria-hidden
                  width={158}
                  height={609}
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
                  width: "hypot(-3.69553cqw, -66.2888cqh)",
                  height: "hypot(96.3045cqw, -33.7112cqh)",
                }}
              >
                <Image
                  src="/icons/capabilities/mobile/hero-bg-green.svg"
                  alt=""
                  aria-hidden
                  width={167}
                  height={609}
                  className="absolute inset-0 block size-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="capabilities-glass-panel absolute z-10"
        style={{ left: 25, top: 69, width: 340, height: 150 }}
        aria-hidden="true"
      />
      <h2
        id="capabilities-mobile-hero-heading"
        dir="rtl"
        className="absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-[20px] font-bold leading-[23px] tracking-[-0.5px] text-green"
        style={{ top: 95.5, width: 240 }}
      >
        {data.heroTitle}
      </h2>
      <p
        dir="rtl"
        className="absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-center text-[14px] font-semibold leading-[25px] tracking-[-0.5px] text-ink"
        style={{ top: 154.5, width: 216 }}
      >
        {data.heroSubtitle}
      </p>
      {HERO_CARDS.map((card) => (
        <div
          key={card.label}
          className="absolute z-20 flex flex-col items-center"
          style={{
            left: card.left,
            top: 200,
            width: 70,
            height: 55,
            paddingTop: 7,
            paddingBottom: 6,
            gap: 1,
            boxSizing: "border-box",
          }}
        >
          <div className="capabilities-glass-card absolute inset-0" aria-hidden="true" />
          <div
            className="relative z-10 flex shrink-0 items-center justify-center"
            style={{ width: "100%", height: 30 }}
          >
            <Image
              src={card.icon}
              alt=""
              aria-hidden
              width={card.size}
              height={card.size}
              className="relative z-10 block shrink-0"
              style={{ width: card.size, height: card.size }}
            />
          </div>
          <p
            dir="rtl"
            className="relative z-10 text-center font-semibold tracking-[-0.4px] text-ink whitespace-nowrap"
            style={{ width: "max-content", maxWidth: 68, fontSize: 7, lineHeight: "9px" }}
          >
            {card.label}
          </p>
        </div>
      ))}

      {/* Capability cards */}
      {data.items.map((item, i) => {
        const g = CARD_GEOMETRY[i];
        if (!g) return null;
        return (
          <article
            key={item.number}
            dir="ltr"
            className="absolute overflow-clip rounded-[10px] bg-white"
            style={{ left: 45, width: 300, top: g.top, height: g.height }}
            aria-labelledby={`capability-mobile-title-${item.number}`}
          >
            <div className="absolute inset-0 rounded-[10px] bg-white" aria-hidden="true" />
            <div
              className="absolute overflow-hidden rounded-[10px]"
              style={{ left: g.imgLeft, top: g.imgTop, width: 241, height: 135 }}
            >
              <Image
                src={item.imageMobile}
                alt=""
                width={241}
                height={135}
                className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[10px] object-cover"
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
              id={`capability-mobile-title-${item.number}`}
              dir="rtl"
              className="absolute overflow-hidden text-[14px] font-bold leading-[25px] tracking-[-0.5px] text-ink text-right break-words text-justify"
              style={{ left: g.titleLeft, top: 30, width: g.titleWidth, height: 50 }}
            >
              {item.title}
            </h2>
            <p
              dir="rtl"
              className="absolute text-justify text-[10px] font-medium leading-[20px] tracking-[-0.5px] text-ink break-words"
              style={{ left: g.titleLeft, top: 90, width: g.titleWidth }}
            >
              {item.description}
            </p>
            <div
              className="absolute flex -translate-y-1/2 flex-col justify-center whitespace-nowrap text-[22px] font-extrabold leading-[0] tracking-[-0.5px] text-ink"
              style={{ left: g.numLeft, top: g.numTop, width: 25, height: 20 }}
              aria-hidden="true"
            >
              <p className="leading-[30px]">{item.number}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
