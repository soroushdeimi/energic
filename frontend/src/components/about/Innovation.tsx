import Image from "next/image";

export interface InnovationItem {
  icon: string;
  title: string;
  body: string;
}

export interface InnovationData {
  title: string;
  background: string;
  backgroundMobile: string;
  items: InnovationItem[];
}

export function Innovation({ data }: { data: InnovationData }) {
  return (
    <section
      aria-labelledby="about-innovation-heading"
      className="relative z-10 bg-bg-soft md:-mt-[148px]"
    >
      <h2 id="about-innovation-heading" className="sr-only">
        {data.title}
      </h2>
      <div className="relative mx-auto w-full max-w-[390px] overflow-hidden md:h-[410px] md:max-w-[1440px] md:px-0 md:py-0">
        {/* Desktop */}
        <div className="relative hidden h-[410px] w-full md:block">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={data.background}
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(89.72deg, rgba(37, 54, 68, 0.76) 4.74%, rgba(37, 54, 68, 0.86) 56.65%)",
            }}
          />
          <div className="absolute left-[147px] top-[112px] h-[186px] w-[1146px]">
            {data.items.map((item, i) => {
              const colLeft = [0, 308, 620, 916][i];
              const colWidth = [209, 190, 209, 230][i];
              const boxLeft = [70, 69, 64, 75][i];
              const iconLeft = [82.5, 77, 72, 87.5][i];
              const iconTop = [12.5, 8, 8, 14.5][i];
              const iconSize = [55, 64, 64, 55][i];
              const titleWidth = [221, 217, 126, 213][i];
              const bodyWidth = [209, 190, 209, 230][i];
              return (
                <div
                  key={item.title}
                  className="absolute top-0"
                  style={{ left: colLeft, width: colWidth }}
                >
                  <div
                    className="absolute rounded-[20px] border border-[rgba(255,255,255,0.5)]"
                    style={{ left: boxLeft, top: 0, width: 80, height: 80 }}
                  />
                  <div
                    className="absolute flex items-center justify-center"
                    style={{ left: iconLeft, top: iconTop, width: iconSize, height: iconSize }}
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      aria-hidden
                      width={iconSize}
                      height={iconSize}
                      className="size-full"
                    />
                  </div>
                  <p
                    dir="rtl"
                    className="absolute top-[100px] -translate-x-1/2 text-center text-[18px] font-medium leading-[28px] text-white left-1/2"
                    style={{ width: titleWidth }}
                  >
                    {item.title}
                  </p>
                  <p
                    dir="rtl"
                    className="absolute top-[136px] -translate-x-1/2 text-center text-[14px] font-medium leading-[24px] text-[rgba(255,255,255,0.7)] left-1/2"
                    style={{ width: bodyWidth }}
                  >
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile */}
        <div className="relative mx-auto h-[974px] w-full md:hidden">
          <div
            className="pointer-events-none absolute left-0 top-0 h-[219px] w-full overflow-hidden"
            aria-hidden="true"
          >
            <Image
              src={data.backgroundMobile}
              alt=""
              width={390}
              height={219}
              className="absolute left-0 top-0 h-full w-full object-cover"
              style={{ maxWidth: "none" }}
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180.79deg, rgba(37, 54, 68, 0.8) 1.14%, rgb(37, 54, 68) 15.69%)",
            }}
          />
          {/* Mobile stacks the items in reverse order of the desktop row. */}
          {[...data.items].reverse().map((item, i) => {
            const top = [61, 277, 483, 689][i];
            const left = [93, 108, 103, 104][i];
            const width = [203, 174, 184, 181][i];
            const boxLeft = [62, 47, 52, 51][i];
            const iconLeft = [74.5, 55, 60, 63.5][i];
            const iconTop = [12.5, 8, 8, 12.5][i];
            const iconSize = [55, 64, 64, 55][i];
            const titleWidth = [179, 126, 184, 181][i];
            const bodyWidth = [203, 174, 153, 166][i];
            return (
              <div
                key={item.title}
                className="absolute h-[176px] overflow-hidden"
                style={{ top, left, width }}
              >
                <div
                  className="absolute top-0 size-[80px] rounded-[20px] border border-[rgba(255,255,255,0.5)]"
                  style={{ left: boxLeft }}
                />
                <div
                  className="absolute flex items-center justify-center"
                  style={{ left: iconLeft, top: iconTop, width: iconSize, height: iconSize }}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    aria-hidden
                    width={iconSize}
                    height={iconSize}
                    className="size-full"
                  />
                </div>
                <p
                  dir="rtl"
                  className="absolute left-1/2 top-[100px] -translate-x-1/2 text-center text-[16px] font-medium leading-[28px] text-white"
                  style={{ width: titleWidth }}
                >
                  {item.title}
                </p>
                <p
                  dir="rtl"
                  className="absolute left-1/2 top-[136px] -translate-x-1/2 text-center text-[12px] font-medium leading-[20px] text-[rgba(255,255,255,0.7)]"
                  style={{ width: bodyWidth }}
                >
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
