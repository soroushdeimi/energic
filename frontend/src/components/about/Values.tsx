import Image from "next/image";

export interface ValueCard {
  icon: string;
  title: string;
  body: string;
}

export interface ValuesData {
  title: string;
  cards: ValueCard[];
}

export function Values({ data }: { data: ValuesData }) {
  return (
    <section
      aria-labelledby="about-values-heading"
      className="bg-bg-soft md:mt-[80px] md:pb-[80px]"
    >
      <div className="relative mx-auto w-full max-w-[390px] px-5 pb-0 pt-0 md:max-w-[1440px] md:px-[120px] md:pb-0 md:pt-[48px]">
        <h2
          id="about-values-heading"
          dir="rtl"
          className="mx-auto w-[130px] whitespace-nowrap text-center text-[18px] font-bold leading-[40px] text-ink md:absolute md:left-[720px] md:top-0 md:w-max md:-translate-x-1/2 md:text-[36px] md:leading-[48px]"
        >
          {data.title}
        </h2>
        <div className="mt-[17px] grid grid-cols-1 gap-[14px] md:mx-auto md:mt-[45px] md:flex md:w-[1200px] md:justify-center md:gap-0 md:[&>article:not(:last-child)]:me-[calc(24px-27.142px)]">
          {data.cards.map((card, i) => (
            <article
              key={card.title}
              className="relative mx-auto h-[180px] w-[220px] md:mx-0 md:h-[225px] md:w-[282px] md:max-w-none md:shrink-0 md:grow-0 md:basis-[282px]"
            >
              <div className="relative h-[180px] w-[220px] md:h-[225px] md:w-[282px]">
                <Image
                  src={card.icon}
                  alt=""
                  aria-hidden
                  width={312}
                  height={255}
                  className={`h-[180px] w-[220px] md:h-[225px] md:w-[282px] ${i === 3 ? "-scale-y-100 rotate-180" : ""}`}
                  style={{ maxWidth: "none" }}
                />
              </div>
              <h3
                dir="rtl"
                className="absolute left-1/2 top-[25px] -translate-x-1/2 text-center text-[14px] font-semibold leading-[28px] text-green md:text-[20px]"
              >
                {card.title}
              </h3>
              <p
                dir="rtl"
                className="absolute left-1/2 top-[53px] -translate-x-1/2 text-center text-[11px] font-medium leading-[27px] text-white md:top-[69px] md:text-[16px] md:leading-[30px] md:h-[120px] md:overflow-hidden w-[196px] md:w-[196px]"
              >
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
