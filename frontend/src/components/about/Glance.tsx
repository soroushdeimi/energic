import Image from "@/components/ui/SiteImage";

export interface GlanceCard {
  title: string;
  body: string;
}

export interface GlanceData {
  title: string;
  cards: GlanceCard[];
}

function GlanceCardItem({ card }: { card: GlanceCard }) {
  return (
    <article className="relative h-[159px] w-[156px] shrink-0 md:h-[204px] md:w-[204px]">
      <Image
        src="/icons/about/note-card.svg"
        alt=""
        aria-hidden
        width={204}
        height={180}
        className="absolute left-0 top-[9px] h-[150px] w-[156px] md:top-[13px] md:h-[180px] md:w-[204px]"
      />
      <Image
        src="/icons/about/note-tab.svg"
        alt=""
        aria-hidden
        width={106}
        height={26}
        className="absolute left-1/2 top-0 h-[18px] w-[81px] -translate-x-1/2 md:h-[26px] md:w-[106px]"
      />
      <h3
        dir="rtl"
        className="absolute left-1/2 top-[27px] w-[125px] -translate-x-1/2 text-center text-[12px] font-semibold text-ink leading-[28px] md:top-[40px] md:w-[176px] md:text-[17px]"
      >
        {card.title}
      </h3>
      <p
        dir="rtl"
        className="absolute left-1/2 top-[59px] w-[125px] -translate-x-1/2 text-center text-[10px] font-medium text-ink leading-[25px] md:top-[73px] md:w-[184px] md:text-[14px]"
      >
        {card.body}
      </p>
    </article>
  );
}

export function Glance({ data }: { data: GlanceData }) {
  return (
    <section aria-labelledby="about-story-heading" className="bg-bg-soft">
      <div className="mx-auto w-full max-w-[390px] px-5 pt-[69px] pb-10 md:max-w-[1440px] md:px-[120px] md:pt-[161px] md:pb-0">
        <h1
          id="about-story-heading"
          dir="rtl"
          className="whitespace-nowrap text-center text-[18px] font-bold leading-[40px] text-ink md:whitespace-nowrap md:text-[36px]"
        >
          {data.title}
        </h1>

        {/* Mobile */}
        <div className="relative mx-auto mt-[30px] w-fit min-h-[578px] overflow-visible md:hidden">
          <div
            className="pointer-events-none absolute left-1/2 top-0 z-0 h-[578px] w-[351px] -translate-x-1/2 overflow-visible"
            aria-hidden="true"
          >
            <Image
              src="/icons/about/mobile-story-green-ground.svg"
              alt=""
              width={539}
              height={199}
              className="absolute -left-[94px] top-[577px] max-w-none"
              style={{ width: 539, height: 199 }}
            />
            <Image
              src="/icons/about/mobile-story-oil-field-top.svg"
              alt=""
              width={340}
              height={251}
              className="absolute left-[11px] top-[28px] max-w-none"
            />
            <Image
              src="/icons/about/mobile-story-oil-field-left.svg"
              alt=""
              width={65}
              height={190}
              className="absolute left-[1px] top-[88px] max-w-none"
            />
            <Image
              src="/icons/about/mobile-story-oil-field-bottom-left.svg"
              alt=""
              width={256}
              height={208}
              className="absolute left-0 top-[369px] max-w-none"
            />
            <Image
              src="/icons/about/mobile-story-oil-field-center.svg"
              alt=""
              width={86}
              height={232}
              className="absolute left-[218px] top-[346px] max-w-none"
            />
            <Image
              src="/icons/about/mobile-story-oil-field-right-tower.svg"
              alt=""
              width={51}
              height={139}
              className="absolute left-[300px] top-[439px] max-w-none"
            />
          </div>
          <div
            dir="rtl"
            className="relative z-10 grid w-fit grid-cols-2 gap-x-[18px] gap-y-[140px]"
          >
            {data.cards.map((card) => (
              <GlanceCardItem key={card.title} card={card} />
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="relative hidden md:mx-auto md:mt-[45px] md:block md:min-h-[602px] md:w-[1200px]">
          <Image
            src="/icons/about/story-green-ground.svg"
            alt=""
            width={1440}
            height={958}
            className="pointer-events-none absolute left-1/2 z-0 max-w-none -translate-x-1/2"
            style={{ top: 380, width: 1440, height: 958 }}
            aria-hidden="true"
          />
          <Image
            src="/icons/about/oil-field-silhouette.svg"
            alt=""
            width={1259}
            height={776}
            className="pointer-events-none absolute left-1/2 z-[1] max-w-none -translate-x-1/2"
            style={{ top: -174, width: 1259, height: 776 }}
            aria-hidden="true"
          />
          <div
            dir="rtl"
            className="relative z-10 mx-auto grid w-[966px] grid-cols-[repeat(4,204px)] gap-x-[50px]"
          >
            {data.cards.map((card) => (
              <GlanceCardItem key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
