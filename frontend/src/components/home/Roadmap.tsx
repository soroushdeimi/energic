import Image from "@/components/ui/SiteImage";

interface RoadmapCard {
  icon: string;
  items: string[];
}

export interface RoadmapData {
  title: string;
  cards: RoadmapCard[];
}

export function Roadmap({ data }: { data: RoadmapData }) {
  return (
    <section aria-labelledby="roadmap-heading" className="relative pt-12 pb-0 md:py-20">
      <div className="mx-auto max-w-[1201px] px-5 md:px-0">
        {/* Mobile */}
        <div className="md:hidden">
          <h2
            id="roadmap-heading"
            dir="rtl"
            className="mx-auto mb-5 h-[60px] w-[207px] text-center font-sans text-[18px] font-bold leading-[30px] tracking-[-0.5px] text-ink"
          >
            <span className="block h-[30px] whitespace-nowrap">همراه راهبردی در تمامی مراحل</span>
            <span className="block h-[30px] whitespace-nowrap">توسعه صنعتی</span>
          </h2>
          <div>
            {data.cards.map((card, i) => (
              <article
                key={card.icon}
                className={`relative mx-auto h-[224px] w-[300px] shrink-0 ${i > 0 ? "mt-[10px]" : ""}`}
              >
                <Image
                  src="/icons/card-roadmap-mobile.svg"
                  alt=""
                  aria-hidden
                  width={300}
                  height={224}
                  className="block h-[224px] w-[300px]"
                />
                <div
                  dir="rtl"
                  role="list"
                  className="absolute z-10 m-0 overflow-hidden p-0 text-[11px] font-medium not-italic tracking-[-0.5px] text-[rgba(255,255,255,0.9)]"
                  style={
                    i === 0
                      ? { left: 25, top: 50, width: 250, height: 112 }
                      : { left: 27, top: 35, width: 246, height: 160 }
                  }
                >
                  {card.items.map((item) => (
                    <div
                      key={item}
                      role="listitem"
                      className="relative block w-full whitespace-nowrap text-right"
                      style={{
                        height: i === 0 ? 28 : 20,
                        lineHeight: i === 0 ? "28px" : "20px",
                        paddingInlineStart: 14,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute top-0 block w-[8px] text-center"
                        style={{ insetInlineStart: 2, lineHeight: i === 0 ? "28px" : "20px" }}
                      >
                        •
                      </span>
                      <span
                        className="block w-full whitespace-nowrap text-right"
                        style={{
                          transform: "scaleX(0.92)",
                          transformOrigin: "right center",
                          direction: "rtl",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="relative mx-auto hidden h-[465px] w-[1201px] overflow-visible md:block">
          <div
            className="pointer-events-none absolute z-0"
            style={{ width: 394, height: 750, top: -43, right: -225 }}
            aria-hidden="true"
          >
            <Image
              src="/images/patterns/pattern-01-green.svg"
              alt=""
              width={394}
              height={750}
              className="block max-w-none"
            />
          </div>
          <div
            className="pointer-events-none absolute z-0"
            style={{ width: 369, height: 750, top: -125, right: -250 }}
            aria-hidden="true"
          >
            <Image
              src="/images/patterns/pattern-01-gray.svg"
              alt=""
              width={369}
              height={750}
              className="block max-w-none"
            />
          </div>
          <h2
            id="roadmap-heading"
            dir="rtl"
            className="absolute left-[388px] top-0 z-10 w-[423px] text-center text-[36px] font-bold leading-[60px] tracking-[-0.5px] text-ink"
          >
            {data.title}
          </h2>
          {data.cards.map((card, i) => {
            const left = [0, 408, 816][i];
            const width = [384, 384, 385][i];
            const ulStyle = [
              { left: 35, top: 30, width: 306 },
              { left: 52, top: 30, width: 295 },
              { left: 28, top: 60, width: 328 },
            ][i];
            return (
              <article
                key={card.icon}
                className="absolute top-[165px] z-10 h-[300px]"
                style={{ left, width }}
              >
                <div
                  className={
                    i === 0
                      ? "absolute inset-0 drop-shadow-[0_10px_15px_rgba(0,169,80,0.3)]"
                      : "absolute inset-[-1.67%_-3.91%_-8.33%_-3.91%]"
                  }
                >
                  <Image
                    src={card.icon}
                    alt=""
                    aria-hidden
                    fill
                    className="absolute inset-0 h-full w-full object-fill"
                  />
                </div>
                <ul
                  dir="rtl"
                  className="absolute z-10 list-disc text-justify text-[16px] font-normal leading-[30px] tracking-[-0.5px] text-white/90 marker:text-white"
                  style={ulStyle}
                >
                  {card.items.map((item) => (
                    <li key={item} className="ms-6">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
