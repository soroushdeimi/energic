import Image from "next/image";

interface PartnerLogo {
  name: string;
  logo: string;
}

export interface PartnersData {
  title: string;
  logos: PartnerLogo[];
}

/**
 * "Strategic network & key partners" logo grid.
 *
 * The archive references 17 partner logos but only 4 logo files exist in the
 * design archive; the rest are absent (see report). We render the available
 * logos in the same 3-row desktop / 3-col mobile layout.
 */
export function Partners({ data }: { data: PartnersData }) {
  const logos = data.logos;
  return (
    <section aria-labelledby="partners-heading" className="bg-bg md:pt-0 md:pb-20">
      {/* Mobile */}
      <div className="mx-auto pt-[50px] md:hidden" style={{ width: 320 }}>
        <h2
          id="partners-heading"
          dir="rtl"
          className="mx-auto mb-5 text-center font-sans text-[18px] font-bold leading-[30px] tracking-[-0.5px] text-ink"
          style={{ width: 176, height: 60 }}
        >
          <span className="block h-[30px] whitespace-nowrap">شبکه ارتباطات راهبردی و</span>
          <span className="block h-[30px] whitespace-nowrap">همکاران کلیدی</span>
        </h2>
        <div className="flex flex-col" style={{ width: 320, gap: 10 }}>
          {chunk(logos, 3).map((row, ri) => (
            <ul key={ri} dir="ltr" className="flex" style={{ width: 320, gap: 10 }}>
              {row.map((logo) => (
                <li key={logo.name}>
                  <div
                    className="flex shrink-0 items-center justify-center rounded-[20px] bg-white p-3"
                    style={{ width: 100, height: 100 }}
                  >
                    <Image
                      src={logo.logo}
                      alt={logo.name}
                      width={120}
                      height={120}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="relative mx-auto hidden h-[631px] w-[955px] md:block">
        <h2
          id="partners-heading"
          dir="rtl"
          className="absolute left-[286px] top-0 w-[384px] text-center text-[36px] font-bold leading-[60px] tracking-[-0.5px] text-ink"
        >
          شبکه ارتباطات راهبردی و
          <br />
          همکاران کلیدی
        </h2>
        {chunk(logos, 6).map((row, ri) => (
          <div
            key={ri}
            dir="ltr"
            className={`absolute flex gap-x-[23px] ${ri === 2 ? "w-full justify-center" : ""}`}
            style={{ left: 0, top: [165, 328, 491][ri] }}
            aria-label={`Partner logos row ${ri + 1}`}
          >
            {row.map((logo) => (
              <div
                key={logo.name}
                className="flex size-[140px] shrink-0 items-center justify-center rounded-[20px] bg-white p-4"
              >
                <Image
                  src={logo.logo}
                  alt={logo.name}
                  width={120}
                  height={120}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}
