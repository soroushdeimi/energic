import Image from "next/image";

export interface MissionData {
  title: string;
  body: string;
}

export function Mission({ data }: { data: MissionData }) {
  return (
    <section
      dir="ltr"
      aria-labelledby="mission-heading"
      className="relative mx-auto mt-[45px] w-full max-w-[390px] overflow-hidden md:mt-[80px] md:max-w-[1440px] md:overflow-visible"
    >
      <div className="relative -ml-[49px] h-[234px] w-[419px] md:ml-0 md:mr-auto md:h-[360px] md:w-[1320px]">
        <div className="absolute left-[49px] top-0 h-[233.553px] w-[370px] md:left-0 md:h-[360.148px] md:w-[1320px]">
          <Image
            src="/icons/mission-shape-mobile.svg"
            alt=""
            aria-hidden
            fill
            className="object-fill md:hidden"
          />
          <Image
            src="/icons/mission-shape.svg"
            alt=""
            aria-hidden
            fill
            className="hidden object-fill md:block"
          />
        </div>
        <div className="pointer-events-none absolute left-0 top-[88.6837px] z-[1] h-[145.3163px] w-[192px] md:hidden">
          <div className="flex size-full items-center justify-center">
            <div className="-rotate-90">
              <Image
                src="/icons/mission-arrows-mobile.svg"
                alt=""
                aria-hidden
                width={145}
                height={192}
                className="h-[192px] w-[145.314px] max-w-none"
              />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute left-[-123px] top-[-88px] hidden size-[448px] md:block">
          <div className="flex size-full items-center justify-center">
            <div className="-rotate-90">
              <Image
                src="/icons/mission-arrows.svg"
                alt=""
                aria-hidden
                width={448}
                height={448}
                className="size-[448px] max-w-none"
              />
            </div>
          </div>
        </div>
        <Image
          src="/icons/mission-line-1-mobile.svg"
          alt=""
          aria-hidden
          width={50}
          height={1}
          className="absolute left-[124px] top-[16.5825px] z-[2] h-px w-[50px] max-w-none md:hidden"
        />
        <Image
          src="/icons/mission-line-2-mobile.svg"
          alt=""
          aria-hidden
          width={30}
          height={1}
          className="absolute left-[69px] top-[56.6592px] z-[2] h-px w-[30px] max-w-none md:hidden"
        />
        <div className="absolute left-[71px] top-[21px] md:hidden">
          <h2
            id="mission-heading"
            dir="rtl"
            className="absolute left-[49.5px] top-[0.55px] -translate-x-1/2 whitespace-nowrap text-center text-[18px] font-bold leading-[32px] tracking-[-0.5px] text-white"
          >
            {data.title}
          </h2>
        </div>
        <Image
          src="/icons/mission-line-1.svg"
          alt=""
          aria-hidden
          width={150}
          height={2}
          className="absolute left-[303px] top-[38.7285px] hidden h-[2px] w-[150px] md:block"
        />
        <Image
          src="/icons/mission-line-2.svg"
          alt=""
          aria-hidden
          width={50}
          height={2}
          className="absolute left-[235px] top-[113.9824px] hidden h-[2px] w-[50px] md:block"
        />
        <h2
          dir="rtl"
          className="absolute left-[230px] top-[62px] hidden h-[32px] w-[228px] whitespace-nowrap text-center text-[36px] font-bold leading-[32px] tracking-[-0.5px] text-white md:block"
        >
          {data.title}
        </h2>
        <p
          dir="rtl"
          className="absolute left-[207px] top-[43px] h-[180px] w-[197px] text-justify text-[10px] leading-[18px] tracking-[-0.5px] text-white md:left-[569px] md:top-[93px] md:h-[240px] md:w-[721px] md:text-[20px] md:font-normal md:leading-[40px]"
        >
          {data.body}
        </p>
      </div>
    </section>
  );
}
