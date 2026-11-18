import Image from "next/image";

export interface MissionCard {
  icon: string;
  iconMobile: string;
  title: string;
  body: string;
}

export interface MissionData {
  title: string;
  background: string;
  backgroundMobile: string;
  cards: MissionCard[];
}

export function Mission({ data }: { data: MissionData }) {
  return (
    <section
      aria-labelledby="about-mission-heading"
      className="relative z-10 -mt-[36px] bg-bg-soft md:mt-0"
    >
      <div className="relative mx-auto w-full max-w-[390px] md:h-[1001px] md:max-w-[1440px] md:px-0 md:py-0">
        {/* Desktop */}
        <div className="relative hidden h-[1001px] w-full overflow-hidden md:block">
          <Image
            src={data.background}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(89.82deg, rgba(245, 245, 245, 0.5) 41.43%, rgba(245, 245, 245, 0.7) 96.57%)",
            }}
          />
          <h2
            id="about-mission-heading"
            dir="rtl"
            className="absolute left-[264px] top-[92px] w-[200px] text-center text-[36px] font-bold leading-[40px] tracking-[-0.5px] text-ink"
          >
            {data.title}
          </h2>
          {data.cards.map((card, i) => (
            <article
              key={card.title}
              className="absolute left-[172px] h-[300px] w-[384px]"
              style={{ top: i === 0 ? 188 : 528 }}
            >
              <Image
                src={card.icon}
                alt=""
                aria-hidden
                width={384}
                height={300}
                className="absolute inset-0 size-full"
              />
              <h3
                dir="rtl"
                className="absolute left-[49px] top-[30px] w-[285px] text-[16px] font-semibold leading-[28px] text-white"
                style={{ textAlign: "justify" }}
              >
                {card.title}
              </h3>
              <p
                dir="rtl"
                className="absolute left-[49px] top-[101px] w-[285px] text-[16px] font-medium leading-[24px] text-[rgba(255,255,255,0.7)]"
                style={{ textAlign: "justify" }}
              >
                {card.body}
              </p>
            </article>
          ))}
        </div>

        {/* Mobile */}
        <div className="relative mx-auto h-[550px] w-full overflow-hidden md:hidden">
          <div
            className="pointer-events-none absolute left-0 top-0 h-[350px] w-[503px] overflow-hidden"
            aria-hidden="true"
          >
            <Image
              src={data.backgroundMobile}
              alt=""
              width={503}
              height={350}
              className="absolute left-0 top-0 h-full w-full object-cover"
              style={{ maxWidth: "none", width: 503, height: 350 }}
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-[550px] w-full"
            style={{
              backgroundImage:
                "linear-gradient(180.19deg, rgba(245, 245, 245, 0.6) 48.71%, rgb(245, 245, 245) 57.82%)",
            }}
          />
          <h2
            dir="rtl"
            className="absolute left-[107px] top-[86px] w-[77px] whitespace-nowrap text-center text-[18px] font-bold leading-[40px] tracking-[-0.5px] text-ink"
          >
            {data.title}
          </h2>
          {data.cards.map((card, i) => (
            <article
              key={card.title}
              className="absolute left-[30px] h-[190px] w-[230px]"
              style={{ top: i === 0 ? 156 : 356 }}
            >
              <Image
                src={card.iconMobile}
                alt=""
                width={230}
                height={190}
                className="absolute inset-0 max-w-none"
                style={{ width: 230, height: 190 }}
                aria-hidden="true"
              />
              <h3
                dir="rtl"
                className="absolute text-[12px] font-semibold leading-[25px] text-white"
                style={{ left: 29, top: 15, width: 174, textAlign: "justify" }}
              >
                {card.title}
              </h3>
              <p
                dir="rtl"
                className="absolute text-[10px] font-medium leading-[15px] text-[rgba(255,255,255,0.7)]"
                style={{ left: 29, top: 75, width: 172, textAlign: "justify" }}
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
