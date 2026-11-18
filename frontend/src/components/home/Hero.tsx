import Image from "next/image";
import Link from "next/link";

export interface HeroData {
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  imageMobile: string;
  imageDesktop: string;
}

export function Hero({ data }: { data: HeroData }) {
  return (
    <section dir="ltr" aria-labelledby="hero-heading" className="relative bg-bg-soft">
      <div className="relative mx-auto h-[262px] w-full max-w-[390px] overflow-hidden md:h-[804px] md:max-w-[1440px]">
        <Image
          src={data.imageMobile}
          alt="مجسمه ورودی مرکز نوآوری انرژیک"
          width={470}
          height={262}
          className="absolute left-[-40px] top-0 h-[262px] w-[470px] max-w-none object-cover object-top md:hidden"
        />
        <Image
          src={data.imageDesktop}
          alt="مجسمه ورودی مرکز نوآوری انرژیک"
          width={1440}
          height={804}
          className="absolute left-0 top-px hidden h-[804px] w-[1440px] max-w-none object-cover object-top md:block"
        />
        <div className="pointer-events-none absolute left-[21px] top-[57px] h-[191px] w-[185px] md:left-[129px] md:top-[112px] md:h-[574px] md:w-[556px]">
          <div className="pointer-events-auto relative size-full">
            <h1
              id="hero-heading"
              dir="rtl"
              className="absolute left-[92px] top-0 w-[162px] -translate-x-1/2 text-center text-[15px] font-extrabold leading-[22px] text-ink md:left-[278px] md:top-[30px] md:w-[484px] md:-translate-x-1/2 md:text-[42px] md:leading-[70px]"
            >
              {data.title}
            </h1>
            <p
              dir="rtl"
              className="absolute left-[92.5px] top-[76px] w-[185px] -translate-x-1/2 text-center text-[9px] font-semibold leading-[16px] text-ink md:left-[273px] md:top-[255px] md:w-[492px] md:-translate-x-1/2 md:text-[20px] md:leading-[40px]"
            >
              {data.subtitle}
            </p>
            <Link
              className="absolute left-[47px] top-[156px] flex h-[25px] w-[90px] items-center justify-center overflow-clip rounded-[50px] border border-green bg-[rgba(0,169,80,0.2)] md:hidden"
              href={data.cta.href}
            >
              <span className="flex items-center gap-1" dir="ltr">
                <Image
                  src="/icons/down-arrow.svg"
                  alt=""
                  aria-hidden
                  width={14}
                  height={14}
                  className="size-[14px] shrink-0 rotate-90"
                />
                <span className="text-[8px] font-bold leading-none text-green">
                  {data.cta.label}
                </span>
              </span>
            </Link>
            <Link
              dir="rtl"
              className="absolute z-20 hidden overflow-hidden rounded-[50px] border border-green bg-[rgba(0,169,80,0.2)] md:block"
              style={{ left: 158, top: 425, width: 240, height: 60 }}
              href={data.cta.href}
            >
              <Image
                src="/icons/down-arrow.svg"
                alt=""
                aria-hidden
                width={32}
                height={32}
                style={{
                  position: "absolute",
                  left: 33,
                  top: 14,
                  width: 32,
                  height: 32,
                  transform: "rotate(90deg)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 92,
                  top: 21,
                  width: 108,
                  height: 21,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  lineHeight: "21px",
                  color: "#00a950",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {data.cta.label}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
