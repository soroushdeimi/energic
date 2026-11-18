import Image from "@/components/ui/SiteImage";

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
 * Renders all 17 partner logos in archive order: a 6/6/5 three-row grid on
 * desktop (140px white rounded tiles) and a three-column stack on mobile
 * (100px tiles). The last mobile row is offset (padding-left 53px, gap 14px)
 * to match the archive.
 */
/**
 * Desktop row order is a fixed permutation of the (mobile-ordered) logo list,
 * taken verbatim from the archive's desktop grid. The mobile stack keeps the
 * fixture order; only the desktop rows are re-ordered.
 */
const DESKTOP_ROW_INDICES: number[][] = [
  [3, 4, 5, 0, 1, 2],
  [9, 10, 11, 6, 7, 8],
  [15, 16, 12, 13, 14],
];

export function Partners({ data }: { data: PartnersData }) {
  const logos = data.logos;
  const desktopRows = DESKTOP_ROW_INDICES.map((row) =>
    row.map((i) => logos[i]).filter((logo): logo is PartnerLogo => Boolean(logo)),
  );
  return (
    <section aria-labelledby="partners-heading" className="bg-bg-soft md:pt-0 md:pb-20">
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
          {chunk(logos, 3).map((row, ri) => {
            const isLast = ri === Math.ceil(logos.length / 3) - 1 && logos.length % 3 !== 0;
            return (
            <ul
              key={ri}
              dir="ltr"
              className="flex"
              style={{ width: 320, gap: isLast ? 14 : 10, paddingLeft: isLast ? 53 : 0 }}
            >
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
            );
          })}
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
        {desktopRows.map((row, ri) => (
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
