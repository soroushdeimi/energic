import { ShareholderSection } from "@/components/companies/ShareholderSection";
import { ResidentSection } from "@/components/companies/ResidentSection";
import { companiesFixture } from "@/fixtures/companies";

export default function CompaniesPage() {
  const { shareholders, residents } = companiesFixture;
  return (
    <main className="mx-auto w-full max-w-[390px] overflow-x-clip bg-bg-soft md:max-w-[1440px]">
      <section aria-labelledby="companies-heading" className="bg-bg-soft">
        <div className="relative mx-auto min-h-[176px] max-w-[1200px] px-5 pb-10 md:min-h-0 md:px-0 md:pt-[161px] md:pb-[50px] md:text-center">
          <h1
            id="companies-heading"
            dir="rtl"
            className="absolute left-[87px] top-[69px] h-[40px] w-[216px] whitespace-nowrap text-center text-[18px] font-bold leading-[40px] text-ink md:static md:h-auto md:w-auto md:whitespace-normal md:text-[36px]"
          >
            سهامداران و شرکای استراتژیک
          </h1>
        </div>
      </section>
      <ShareholderSection shareholders={shareholders} />
      <ResidentSection residents={residents} />
    </main>
  );
}
