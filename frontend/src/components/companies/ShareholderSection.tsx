import { LogoGrid } from "@/components/ui/LogoGrid";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Company } from "@/lib/api";

interface ShareholderSectionProps {
  shareholders: Company[];
}

/** «سهامداران و شرکای استراتژیک» section of /companies. */
export function ShareholderSection({ shareholders }: ShareholderSectionProps) {
  return (
    <section
      id="shareholders"
      aria-labelledby="shareholders-heading"
      className="bg-bg-soft pb-10 md:pb-[80px]"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-0">
        <SectionTitle title="سهامداران اصلی" align="end" className="mb-[-29px] md:mb-0" />
        <div className="mt-6 md:mt-[40px]">
          <LogoGrid companies={shareholders} />
        </div>
      </div>
    </section>
  );
}
