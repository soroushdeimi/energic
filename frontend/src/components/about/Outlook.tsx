import Image from "next/image";

export interface OutlookData {
  title: string;
  body: string;
}

export function Outlook({ data }: { data: OutlookData }) {
  return (
    <section aria-labelledby="about-outlook-heading" className="bg-bg-soft md:mt-[80px]">
      {/* Mobile */}
      <div className="relative mx-auto mb-[50px] mt-[46px] h-[221px] w-full max-w-[390px] md:hidden">
        <div className="relative ml-auto h-[221px] w-[382px]">
          <Image
            src="/icons/about/outlook-shape.svg"
            alt=""
            width={370}
            height={221}
            className="pointer-events-none absolute left-[12px] top-0 scale-x-[-1]"
            style={{ maxWidth: "none", width: 370, height: 221 }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-[7.49%_7.85%_92.51%_79.06%]"
            aria-hidden="true"
          >
            <Image
              src="/icons/about/outlook-line-1.svg"
              alt=""
              width={50}
              height={2}
              className="size-full"
              style={{ maxWidth: "none" }}
              aria-hidden="true"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-[25.59%_22.25%_74.41%_69.9%]"
            aria-hidden="true"
          >
            <Image
              src="/icons/about/outlook-line-2.svg"
              alt=""
              width={30}
              height={2}
              className="size-full"
              style={{ maxWidth: "none" }}
              aria-hidden="true"
            />
          </div>
          <div className="absolute right-[115px] top-[21px] flex w-[85px] translate-x-full items-center justify-center">
            <h2
              id="about-outlook-heading"
              dir="rtl"
              className="w-[85px] whitespace-nowrap text-right text-[18px] font-bold leading-[32px] tracking-[-0.5px] text-white"
            >
              {data.title}
            </h2>
          </div>
          <p
            dir="rtl"
            className="absolute right-[180px] top-[53px] h-[144px] w-[178px] text-[10px] font-medium leading-[18px] tracking-[-0.5px] text-white"
            style={{ textAlign: "justify" }}
          >
            {data.body}
          </p>
          <div
            className="pointer-events-none absolute flex items-center justify-center"
            style={{ containerType: "size", inset: "47.06% 3.29% 0.15% 61.92%" }}
            aria-hidden="true"
          >
            <div className="-scale-x-100 h-[100cqh] w-[100cqw] flex-none">
              <Image
                src="/icons/about/outlook-lamp.svg"
                alt=""
                className="size-full"
                style={{ maxWidth: "none" }}
                aria-hidden="true"
              />
            </div>
          </div>
          <div
            className="pointer-events-none absolute flex items-center justify-center"
            style={{ containerType: "size", inset: "64.59% 0 1.48% 57.59%" }}
            aria-hidden="true"
          >
            <div className="-scale-x-100 h-[100cqw] w-[100cqh] rotate-90">
              <Image
                src="/icons/about/outlook-dots.svg"
                alt=""
                className="size-full"
                style={{ maxWidth: "none" }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="relative mx-auto hidden w-full max-w-[1440px] md:block">
        <div className="relative ml-[120px] h-[360px] w-[1320px] overflow-hidden">
          <Image
            src="/icons/about/outlook-shape.svg"
            alt=""
            aria-hidden
            fill
            className="scale-x-[-1] object-fill"
            style={{ maxWidth: "none" }}
          />
          <div className="pointer-events-none absolute left-[977px] top-[64px]">
            <div className="relative h-[301px] w-[343px]">
              <Image
                src="/icons/about/outlook-lamp.svg"
                alt=""
                aria-hidden
                fill
                className="object-contain"
                style={{ maxWidth: "none" }}
              />
            </div>
            <div
              className="pointer-events-none absolute left-[-75px] top-[102px] h-[193.43px] w-[418.02px]"
              aria-hidden="true"
            >
              <Image
                src="/icons/about/outlook-dots.svg"
                alt=""
                aria-hidden
                width={194}
                height={418}
                className="absolute left-1/2 top-1/2"
                style={{
                  maxWidth: "none",
                  width: 193.43,
                  height: 418.02,
                  transform: "translate(-50%, -50%) rotate(90deg)",
                }}
              />
            </div>
          </div>
          <Image
            src="/icons/about/outlook-line-1.svg"
            alt=""
            aria-hidden
            width={100}
            height={2}
            className="absolute left-[892px] top-[35px] h-[2px] w-[100px]"
            style={{ maxWidth: "none" }}
          />
          <Image
            src="/icons/about/outlook-line-2.svg"
            alt=""
            aria-hidden
            width={50}
            height={2}
            className="absolute left-[820px] top-[112px] h-[2px] w-[50px]"
            style={{ maxWidth: "none" }}
          />
          <h2
            dir="rtl"
            className="absolute left-[818px] top-[52px] w-max whitespace-nowrap text-right text-[36px] font-bold leading-[40px] tracking-[-0.5px] text-white"
          >
            {data.title}
          </h2>
          <p
            dir="rtl"
            className="absolute left-[66px] top-[111px] h-[200px] w-[611px] text-[20px] font-semibold leading-[40px] tracking-[-0.5px] text-white"
            style={{ textAlign: "justify" }}
          >
            {data.body}
          </p>
        </div>
      </div>
    </section>
  );
}
