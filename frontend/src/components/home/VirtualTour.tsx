import Image from "@/components/ui/SiteImage";

export interface VirtualTourData {
  title: string;
  body: string;
  cta: string;
}

export function VirtualTour({ data }: { data: VirtualTourData }) {
  return (
    <section aria-labelledby="virtual-tour-heading" className="md:pt-[90px] md:pb-20">
      {/* Mobile */}
      <div className="relative mx-auto md:hidden" style={{ width: 390, height: 332 }}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 17, top: 60, width: 356, height: 272 }}
        >
          <Image
            src="/icons/vr-bg-outer.svg"
            alt=""
            aria-hidden
            width={350}
            height={212}
            className="absolute z-0 max-w-none"
            style={{ left: 3, top: 29.06, width: 350, height: 211.96, opacity: 0.7 }}
          />
          <Image
            src="/icons/vr-bg-inner.svg"
            alt=""
            aria-hidden
            width={320}
            height={212}
            className="absolute z-10 max-w-none"
            style={{ left: 18, top: 60, width: 320, height: 211.78 }}
          />
          <Image
            src="/icons/vr-vector.svg"
            alt=""
            aria-hidden
            width={576}
            height={296}
            className="absolute z-20 max-w-none"
            style={{ left: 3, top: 75.99, width: 353, height: 196 }}
          />
          <Image
            src="/icons/vr-ar.svg"
            alt=""
            aria-hidden
            width={180}
            height={121}
            className="absolute z-30 max-w-none"
            style={{ left: 88, top: 0, width: 179.73, height: 120.6 }}
          />
          <h2
            id="virtual-tour-heading"
            dir="rtl"
            className="absolute z-40 whitespace-nowrap text-center text-[16px] font-bold leading-[25px] tracking-[-0.5px] text-ink"
            style={{ top: 128, left: 90, width: 177, height: 25 }}
          >
            {data.title}
          </h2>
          <p
            dir="rtl"
            className="absolute z-40 text-center text-[12px] font-medium leading-[20px] tracking-[-0.5px] text-ink"
            style={{ top: 163, left: 51, width: 254, height: 40 }}
          >
            {data.body}
          </p>
          <Image
            src="/icons/AR-btn.svg"
            alt=""
            aria-hidden
            width={136}
            height={53}
            className="absolute z-40 max-w-none"
            style={{ left: 107, top: 211, width: 135.76, height: 52.96 }}
          />
          <button
            type="button"
            className="absolute z-40 flex items-center justify-center whitespace-nowrap bg-transparent p-0 text-[12px] font-bold leading-[30px] tracking-[-0.5px] text-ink"
            style={{ left: 107, top: 211, width: 136, height: 53 }}
          >
            {data.cta}
          </button>
        </div>
      </div>

      {/* Desktop */}
      <div className="relative mx-auto hidden h-[343px] w-[960px] md:block">
        <Image
          src="/icons/vr-bg-outer.svg"
          alt=""
          aria-hidden
          width={959}
          height={226}
          className="absolute left-0 top-[62px] h-[225.667px] w-[959.058px]"
        />
        <Image
          src="/icons/vr-bg-inner.svg"
          alt=""
          aria-hidden
          width={895}
          height={241}
          className="absolute left-[30px] top-[102px] h-[240.671px] w-[894.637px]"
        />
        <Image
          src="/icons/vr-vector.svg"
          alt=""
          aria-hidden
          width={576}
          height={296}
          className="absolute left-[192.19px] top-[45.04px] h-[295.766px] w-[575.948px]"
        />
        <Image
          src="/icons/vr-ar.svg"
          alt=""
          aria-hidden
          width={321}
          height={215}
          className="absolute left-[320.31px] top-0 h-[215.208px] w-[320.735px]"
        />
        <Image
          src="/icons/AR-btn.svg"
          alt=""
          aria-hidden
          width={247}
          height={97}
          className="absolute left-[80px] top-[208.992px]"
        />
        <span
          className="pointer-events-none absolute z-[1] block text-center text-[18px] font-bold leading-[30px] tracking-[-0.5px] text-ink"
          style={{ left: 147, top: 241.99, width: 106, height: 30, whiteSpace: "nowrap" }}
        >
          {data.cta}
        </span>
        <h2
          id="virtual-tour-heading"
          dir="rtl"
          className="absolute left-[603px] top-[197px] w-[261px] whitespace-nowrap text-center text-[26px] font-bold leading-[45px] tracking-[-0.5px] text-ink"
        >
          {data.title}
        </h2>
        <p
          dir="rtl"
          className="absolute left-[564px] top-[257px] h-[60px] w-[300px] text-justify text-[16px] font-medium leading-[30px] tracking-[-0.5px] text-ink"
        >
          {data.body}
        </p>
      </div>
    </section>
  );
}
