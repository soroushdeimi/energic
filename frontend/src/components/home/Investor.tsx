import Image from "next/image";
import Link from "next/link";

interface InvestorItem {
  icon: string;
  label: string;
}

export interface InvestorData {
  title: string;
  body: string;
  cta: { label: string; href: string };
  background: string;
  items: InvestorItem[];
}

export function Investor({ data }: { data: InvestorData }) {
  return (
    <section aria-labelledby="investor-heading" className="relative overflow-hidden md:py-[100px]">
      {/* Mobile */}
      <div className="relative md:hidden" style={{ backgroundColor: "#253644" }}>
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
            style={{ height: 219 }}
          >
            <Image src={data.background} alt="" fill sizes="390px" className="object-cover" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180.97deg, rgba(37, 54, 68, 0.8) 1.14%, rgb(37, 54, 68) 100%)",
              }}
            />
          </div>
          <div className="relative z-10 flex flex-col text-center text-white">
            <h2
              id="investor-heading"
              dir="rtl"
              className="mx-auto font-sans text-[18px] font-bold leading-[30px]"
              style={{ marginTop: 20, width: 264, height: 60 }}
            >
              <span className="block">توسعه سرمایه‌گذاری و تأمین مالی</span>
              <span className="block">پروژه‌های انرژی</span>
            </h2>
            <p
              className="mx-auto font-sans text-[12px] font-medium leading-[25px]"
              style={{ marginTop: 6, width: 322, height: 75 }}
            >
              {data.body}
            </p>
            <div className="flex justify-center" style={{ marginTop: 10 }}>
              <Link
                className="inline-flex items-center justify-center rounded-[50px] bg-green font-sans text-[10px] font-bold leading-[24px] text-white"
                style={{ width: 120, height: 30 }}
                href={data.cta.href}
              >
                {data.cta.label}
              </Link>
            </div>
          </div>
        </div>
        <ul
          className="relative z-10 flex flex-col items-center"
          style={{ marginTop: 30, paddingBottom: 20, gap: 20 }}
        >
          {data.items.map((item) => (
            <li key={item.label} className="flex flex-col items-center" style={{ gap: 18 }}>
              <div
                className="flex shrink-0 items-center justify-center rounded-[20px] border border-white/50"
                style={{ width: 80, height: 80 }}
              >
                <Image src={item.icon} alt="" aria-hidden width={64} height={64} />
              </div>
              <p className="text-center font-sans text-base leading-8 text-white">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <Image src={data.background} alt="" fill sizes="100vw" className="object-cover" />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "linear-gradient(89.79deg, rgba(37, 54, 68, 0.9) 1.57%, rgb(37, 54, 68) 64.69%)",
          }}
        />
      </div>
      <div className="relative mx-auto hidden max-w-[846px] px-5 text-center text-white md:block md:px-0">
        <h2
          id="investor-heading"
          className="text-lg font-bold leading-[30px] md:text-4xl md:leading-[48px]"
        >
          {data.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[732px] text-xs leading-[25px] md:mt-6 md:text-base md:leading-[30px]">
          {data.body}
        </p>
        <div className="mt-6 md:mt-8">
          <Link
            className="inline-flex h-[33px] items-center justify-center rounded-full bg-green px-6 text-xs font-bold md:h-[60px] md:px-10 md:text-lg"
            href={data.cta.href}
          >
            {data.cta.label}
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:gap-x-4 md:gap-y-12">
          {data.items.map((item) => (
            <li key={item.label} className="flex flex-col items-center gap-4">
              <div className="flex size-20 items-center justify-center rounded-[20px] border border-white/50">
                <Image src={item.icon} alt="" aria-hidden width={64} height={64} />
              </div>
              <p className="max-w-[180px] text-base leading-8 md:text-xl md:leading-8">
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
