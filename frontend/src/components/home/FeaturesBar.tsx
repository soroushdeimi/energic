import Image from "@/components/ui/SiteImage";

export interface FeatureItem {
  label: string;
  icon: string;
}

/**
 * The "key features" bar that overlaps the hero. Reproduces the archive's
 * absolutely-positioned mobile (390px) and desktop (1440px) variants.
 */
export function FeaturesBar({ items }: { items: FeatureItem[] }) {
  return (
    <section
      dir="ltr"
      aria-label="ویژگی‌های کلیدی"
      className="relative mx-auto -mt-[4px] w-full max-w-[390px] max-md:z-10 md:-mt-[69px] md:max-w-[1440px]"
    >
      <div className="relative ml-[25px] h-[65px] w-[340px] max-md:overflow-visible md:mx-auto md:ml-auto md:h-[140px] md:w-[1100px]">
        <div className="absolute inset-[-9.23%_-2.94%_-21.54%_-2.94%] max-md:pointer-events-none md:inset-[-5.71%_-1.09%_-11.43%_-1.09%]">
          <Image
            src="/icons/features-bar-mobile.svg"
            alt=""
            aria-hidden
            width={340}
            height={65}
            className="absolute inset-0 size-full md:hidden"
          />
          <Image
            src="/icons/features-bar-mobile-overlay.svg"
            alt=""
            aria-hidden
            width={340}
            height={65}
            className="absolute inset-0 size-full md:hidden"
          />
          <Image
            src="/icons/features-bar.svg"
            alt=""
            aria-hidden
            width={1100}
            height={140}
            className="absolute inset-0 hidden size-full md:block"
          />
        </div>

        {/* Mobile dividers */}
        {[
          { left: 100, src: "/icons/feature-mobile-divider-1734-5049.svg" },
          { left: 170, src: "/icons/feature-mobile-divider-1734-5048.svg" },
          { left: 247, src: "/icons/feature-mobile-divider-1734-5047.svg" },
        ].map((d) => (
          <div
            key={d.src}
            className="pointer-events-none absolute z-[2] flex h-[30px] w-0 items-center justify-center md:hidden"
            style={{ left: d.left, top: 17 }}
            aria-hidden="true"
          >
            <div className="flex-none rotate-90">
              <Image
                src={d.src}
                alt=""
                aria-hidden
                width={30}
                height={1}
                className="h-px w-[30px] max-w-none"
              />
            </div>
          </div>
        ))}

        {/* Mobile feature icons + labels */}
        <Image
          src="/icons/feature-mobile-ellipse-1734-5063.svg"
          alt=""
          aria-hidden
          width={20}
          height={20}
          className="absolute z-[2] max-w-none md:hidden"
          style={{ left: 50, top: 9, width: 20, height: 20 }}
        />
        <Image
          src="/icons/feature-mobile-networking-shape-1734-5066.svg"
          alt=""
          aria-hidden
          width={10}
          height={10}
          className="absolute z-[2] max-w-none md:hidden"
          style={{ left: 54.8, top: 13.97, width: 10, height: 9.748 }}
        />
        <div
          dir="rtl"
          className="absolute z-[2] text-center text-[9px] font-semibold leading-[12px] tracking-[-0.5px] text-ink md:hidden"
          style={{ left: 32, top: 33, width: 57, height: 22 }}
        >
          <span className="block whitespace-nowrap">شبکه‌سازی میان</span>
          <span className="block whitespace-nowrap">دانشگاه و صنعت</span>
        </div>
        <Image
          src="/icons/feature-mobile-ellipse-1734-5060.svg"
          alt=""
          aria-hidden
          width={20}
          height={20}
          className="absolute z-[2] max-w-none md:hidden"
          style={{ left: 125, top: 12, width: 20, height: 20 }}
        />
        <Image
          src="/icons/feature-mobile-infrastructure-vector-1734-5061.svg"
          alt=""
          aria-hidden
          width={10}
          height={10}
          className="absolute z-[2] max-w-none md:hidden"
          style={{ left: 130.2, top: 16.97, width: 9.714, height: 9.471 }}
        />
        <p
          dir="rtl"
          className="absolute z-[2] flex flex-col justify-center whitespace-nowrap text-center text-[9px] font-semibold leading-[0] tracking-[-0.5px] text-ink md:hidden"
          style={{ left: 112, top: 36, width: 46, height: 16 }}
        >
          <span className="leading-[32px]">زیرساخت رشد</span>
        </p>
        <Image
          src="/icons/feature-mobile-ellipse-1734-5056.svg"
          alt=""
          aria-hidden
          width={21}
          height={21}
          className="absolute z-[2] max-w-none md:hidden"
          style={{ left: 198, top: 12, width: 21, height: 21 }}
        />
        <Image
          src="/icons/feature-mobile-strategic-vector-1734-5057.svg"
          alt=""
          aria-hidden
          width={7}
          height={12}
          className="absolute z-[2] max-w-none md:hidden"
          style={{ left: 205.14, top: 16.377, width: 6.9, height: 11.407 }}
        />
        <p
          dir="rtl"
          className="absolute z-[2] flex flex-col justify-center whitespace-nowrap text-center text-[9px] font-semibold leading-[0] tracking-[-0.5px] text-ink md:hidden"
          style={{ left: 182, top: 37, width: 53, height: 16 }}
        >
          <span className="leading-[32px]">ارتباطات راهبردی</span>
        </p>
        <Image
          src="/icons/feature-mobile-ellipse-1734-5051.svg"
          alt=""
          aria-hidden
          width={20}
          height={20}
          className="absolute z-[2] max-w-none md:hidden"
          style={{ left: 273, top: 12, width: 20, height: 20 }}
        />
        <Image
          src="/icons/feature-mobile-innovation-vector-1734-5052.svg"
          alt=""
          aria-hidden
          width={8}
          height={12}
          className="absolute z-[2] max-w-none md:hidden"
          style={{ left: 279, top: 16.17, width: 8, height: 11.7 }}
        />
        <p
          dir="rtl"
          className="absolute z-[2] flex flex-col justify-center whitespace-nowrap text-center text-[9px] font-semibold leading-[0] tracking-[-0.5px] text-ink md:hidden"
          style={{ left: 259, top: 36, width: 49, height: 16 }}
        >
          <span className="leading-[32px]">تمرکز بر نوآوری</span>
        </p>

        {/* Desktop dashed dividers */}
        {[320, 552, 807].map((left) => (
          <div
            key={left}
            className="pointer-events-none absolute top-[35px] hidden h-[70px] w-px md:block"
            style={{
              left,
              backgroundImage:
                "repeating-linear-gradient(to bottom, #b9c2c7 0 2px, transparent 2px 7px)",
            }}
            aria-hidden="true"
          />
        ))}

        {/* Desktop feature items */}
        <div>
          <div
            className="absolute hidden md:block"
            style={{ left: 75, top: 45, width: 50, height: 50 }}
          >
            <div className="absolute inset-0 rounded-full bg-bg-soft" aria-hidden="true" />
            <Image
              src={items[0]?.icon ?? ""}
              alt=""
              aria-hidden
              width={26}
              height={26}
              className="absolute max-w-none"
              style={{
                left: "50%",
                top: "50%",
                width: 26,
                height: 26,
                transform: "translate(-50%, -50%)",
                objectFit: "contain",
              }}
            />
          </div>
          <p
            dir="rtl"
            className="absolute hidden -translate-x-1/2 text-center text-[20px] font-semibold tracking-[-0.5px] text-ink md:block whitespace-normal"
            style={{ left: 216.5, top: 40, width: 143, lineHeight: "30px" }}
          >
            {items[0]?.label}
          </p>
        </div>
        <div>
          <Image
            src={items[1]?.icon ?? ""}
            alt=""
            aria-hidden
            width={50}
            height={50}
            className="absolute hidden max-w-none md:block"
            style={{ left: 351, top: 45, width: 50, height: 50 }}
          />
          <p
            dir="rtl"
            className="absolute hidden -translate-x-1/2 text-center text-[20px] font-semibold tracking-[-0.5px] text-ink md:block whitespace-nowrap"
            style={{ left: 471, top: 54, width: 120, lineHeight: "32px" }}
          >
            {items[1]?.label}
          </p>
        </div>
        <div>
          <Image
            src={items[2]?.icon ?? ""}
            alt=""
            aria-hidden
            width={50}
            height={50}
            className="absolute hidden max-w-none md:block"
            style={{ left: 583, top: 45, width: 50, height: 50 }}
          />
          <p
            dir="rtl"
            className="absolute hidden -translate-x-1/2 text-center text-[20px] font-semibold tracking-[-0.5px] text-ink md:block whitespace-nowrap"
            style={{ left: 714.5, top: 54, width: 130, lineHeight: "32px" }}
          >
            {items[2]?.label}
          </p>
        </div>
        <div>
          <Image
            src={items[3]?.icon ?? ""}
            alt=""
            aria-hidden
            width={50}
            height={50}
            className="absolute hidden max-w-none md:block"
            style={{ left: 838, top: 45, width: 50, height: 50 }}
          />
          <p
            dir="rtl"
            className="absolute hidden -translate-x-1/2 text-center text-[20px] font-semibold tracking-[-0.5px] text-ink md:block whitespace-nowrap"
            style={{ left: 966.5, top: 54, width: 120, lineHeight: "32px" }}
          >
            {items[3]?.label}
          </p>
        </div>
      </div>
    </section>
  );
}
