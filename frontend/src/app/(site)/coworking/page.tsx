import type { Metadata } from "next";
import { Gallery } from "@/components/ui/Gallery";
import { AmenityItem } from "@/components/ui/AmenityItem";
import { VirtualTourSection } from "@/components/coworking/VirtualTourSection";
import { PageSchema } from "@/components/seo/SiteSchema";
import {
  coworkingFixture,
  desktopGalleryOrder,
  galleryCaptions,
  mobileAmenityOrder,
} from "@/fixtures/coworking";
import type { CoworkingData } from "@/lib/api";
import { canonicalUrl, ogImageUrl, pageRobots } from "@/lib/seo";

const COWORKING_TITLE = "فضای کار اشتراکی | مرکز نوآوری انرژیک";
const COWORKING_DESCRIPTION =
  "فضای کار اشتراکی انرژیک در دانشکده مهندسی نفت دانشگاه صنعتی امیرکبیر، تهران — اینترنت فیبر نوری، مبلمان ارگونومیک و دسترسی مرکزی برای تیم‌ها و استارتاپ‌ها";

export const metadata: Metadata = {
  title: COWORKING_TITLE,
  description: COWORKING_DESCRIPTION,
  alternates: { canonical: canonicalUrl("/coworking") },
  openGraph: {
    type: "website",
    title: COWORKING_TITLE,
    description: COWORKING_DESCRIPTION,
    url: canonicalUrl("/coworking"),
    images: [ogImageUrl()],
  },
  twitter: {
    card: "summary_large_image",
    title: COWORKING_TITLE,
    description: COWORKING_DESCRIPTION,
    images: [ogImageUrl()],
  },
  robots: pageRobots(),
};

export default function CoworkingPage() {
  const { gallery, amenities } = coworkingFixture;
  const mobileAmenities = mobileAmenityOrder
    .map((label) => amenities.find((amenity) => amenity.label === label))
    .filter((amenity): amenity is CoworkingData["amenities"][number] => amenity !== undefined);
  return (
    <main className="mx-auto w-full max-w-[390px] overflow-x-clip bg-bg-soft md:max-w-[1440px]">
      <section aria-labelledby="coworking-heading" className="bg-bg-soft">
        <div className="mx-auto max-w-[390px] px-5 pb-8 pt-[69px] text-center md:w-[911px] md:max-w-none md:px-0 md:pt-[161px] md:pb-[32px]">
          <h1
            id="coworking-heading"
            dir="rtl"
            className="text-[18px] font-bold leading-[30px] text-ink md:mb-0 md:text-[36px] md:leading-[50px]"
          >
            فضای کار اشتراکی انرژیک
          </h1>
          <p
            dir="rtl"
            className="text-[12px] font-medium leading-[30px] text-ink md:mt-0 md:text-[16px] md:leading-[50px]"
          >
            نمایی از فضاهای کاری طراحی‌شده برای تمرکز، همکاری و رشد؛ از محیط‌های اشتراکی الهام‌بخش
            تا اتاق‌های جلسات و فضاهای آماده برگزاری رویداد.
          </p>
        </div>
      </section>
      <section aria-label="گالری فضاهای کاری" className="bg-bg-soft">
        <Gallery items={gallery} captions={galleryCaptions} desktopOrder={desktopGalleryOrder} />
      </section>
      <section aria-label="امکانات فضای کار" className="bg-bg-soft">
        {/* Mobile: 2-column grid + centered last item (archive layout). */}
        <div className="mx-auto max-w-[390px] px-5 md:hidden">
          <div dir="ltr" className="flex flex-col gap-5">
            <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-5">
              {mobileAmenities.slice(0, 4).map((amenity) => (
                <AmenityItem
                  key={amenity.label}
                  id={amenity.id ?? ""}
                  icon={amenity.icon}
                  label={amenity.label}
                />
              ))}
            </div>
            <div className="flex justify-center">
              {mobileAmenities[4] ? (
                <AmenityItem
                  id={mobileAmenities[4].id ?? ""}
                  icon={mobileAmenities[4].icon}
                  label={mobileAmenities[4].label}
                />
              ) : null}
            </div>
          </div>
        </div>
        {/* Desktop: single row of 5 (archive order). */}
        <div
          dir="ltr"
          className="mx-auto hidden w-[996px] grid-cols-[repeat(5,180px)] gap-6 md:grid"
        >
          {amenities.map((amenity) => (
            <AmenityItem
              key={amenity.label}
              id={amenity.id ?? ""}
              icon={amenity.icon}
              label={amenity.label}
            />
          ))}
        </div>
      </section>
      <VirtualTourSection />
      <PageSchema
        path="/coworking"
        pageType="WebPage"
        name={COWORKING_TITLE}
        description={COWORKING_DESCRIPTION}
        breadcrumbLabel="فضای کار اشتراکی"
      />
    </main>
  );
}
