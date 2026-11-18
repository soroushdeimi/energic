import Image from "@/components/ui/SiteImage";
import type { Company } from "@/lib/api";
import { Card } from "./Card";

interface LogoGridProps {
  companies: Company[];
  /** Accessible prefix for logo images, e.g. "لوگوی". */
  logoAltPrefix?: string;
}

const TILE_GRADIENT =
  "linear-gradient(213.98deg, rgb(37, 54, 68) 37.051%, rgb(0, 169, 33) 162.2%)";

/**
 * Grid of shareholder cards: gradient tile, white 90px logo box, name below.
 * Companies with a URL are wrapped in an external link (archive behavior).
 */
export function LogoGrid({ companies, logoAltPrefix = "لوگوی" }: LogoGridProps) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
      {companies.map((company) => (
        <LogoCard key={company.name} company={company} logoAltPrefix={logoAltPrefix} />
      ))}
    </div>
  );
}

function LogoCard({ company, logoAltPrefix }: { company: Company; logoAltPrefix: string }) {
  const card = (
    <Card
      className="flex h-[213px] w-[282px] flex-col items-center rounded-[40px] px-4 pb-6 pt-[30px]"
      style={{ backgroundImage: TILE_GRADIENT }}
    >
      <div className="flex size-[90px] items-center justify-center rounded-[10px] bg-white">
        <Image
          src={company.logo}
          alt={`${logoAltPrefix} ${company.name}`}
          width={90}
          height={83}
          className="max-h-[83px] max-w-[90px] object-contain"
        />
      </div>
      <p
        dir="rtl"
        className="mt-[18px] text-center text-white text-[16px] leading-[30px] font-semibold md:mt-[25px] md:text-[18px]"
      >
        {company.name}
      </p>
    </Card>
  );

  if (company.url) {
    return (
      <a
        href={company.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer transition-opacity hover:opacity-95"
        aria-label={company.name}
      >
        {card}
      </a>
    );
  }
  return card;
}
