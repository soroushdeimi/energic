import Image from "@/components/ui/SiteImage";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Company } from "@/lib/api";

interface ResidentSectionProps {
  residents: Company[];
}

function ResidentCard({ company }: { company: Company }) {
  return (
    <Card className="relative h-[110px] w-[350px] rounded-[30px] bg-ink shadow-[0px_10px_15px_0px_rgba(0,169,80,0.30)] md:h-[130px] md:w-[384px] md:rounded-[40px]">
      <h3
        dir="rtl"
        className="absolute top-[12px] right-[12px] whitespace-nowrap text-right text-[16px] font-bold leading-[40px] text-white md:top-[22px] md:right-[30px] md:text-[20px]"
      >
        {company.name}
      </h3>
      <div dir="ltr" className="absolute top-[64px] left-[24px] flex items-center gap-[12px] md:top-[78px] md:left-[30px]">
        <Image
          src="/icons/coworking/internet.svg"
          alt=""
          aria-hidden
          width={22}
          height={22}
          className="size-[22px] shrink-0"
        />
        {company.url ? (
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-[16px] font-normal leading-[25px] text-white transition-opacity hover:opacity-80 md:text-[18px]"
          >
            {company.url}
          </a>
        ) : null}
      </div>
    </Card>
  );
}

/** «شرکت‌های مستقر» section of /companies, including the CTA placeholder card. */
export function ResidentSection({ residents }: ResidentSectionProps) {
  return (
    <section aria-labelledby="resident-companies-heading" className="bg-bg-soft pb-0 md:pb-[80px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-0">
        <SectionTitle title="شرکت‌های مستقر" />
        <div className="mt-6 grid grid-cols-1 gap-5 md:mt-[45px] md:grid-cols-3 md:gap-6">
          {residents.map((company) => (
            <ResidentCard key={company.name} company={company} />
          ))}
        </div>
        <div className="mt-5 flex justify-start md:mt-6 md:grid md:grid-cols-3 md:gap-6">
          <article className="flex h-[130px] w-full flex-col items-center justify-center rounded-[40px] border-2 border-dashed border-[rgba(37,54,68,0.3)] px-6 md:w-[384px]">
            <p dir="rtl" className="text-center text-[16px] font-bold leading-[28px] text-muted">
              جای تیم شما اینجا خالیست!
            </p>
            <a
              dir="rtl"
              className="mt-1 text-[15px] font-bold leading-[40px] text-green underline"
              href="/contact"
            >
              درخواست استقرار
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
