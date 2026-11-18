import type { Metadata } from "next";
import { PageSchema } from "@/components/seo/SiteSchema";
import { getAboutContent, sectionData } from "@/lib/content";
import { canonicalUrl, ogImageUrl, pageRobots } from "@/lib/seo";
import { Glance, type GlanceData } from "@/components/about/Glance";
import { Innovation, type InnovationData } from "@/components/about/Innovation";
import { Mission, type MissionData } from "@/components/about/Mission";
import { Outlook, type OutlookData } from "@/components/about/Outlook";
import { Values, type ValuesData } from "@/components/about/Values";

const ABOUT_TITLE = "درباره ما | مرکز نوآوری انرژیک";
const ABOUT_DESCRIPTION =
  "انرژیک در یک نگاه — مأموریت، چشم‌انداز و ارزش‌های اصلی مرکز نوآوری انرژیک؛ مرکز فناوری و نوآوری خصوصی در دانشکده مهندسی نفت دانشگاه صنعتی امیرکبیر، تهران";

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: canonicalUrl("/about") },
  openGraph: {
    type: "website",
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    url: canonicalUrl("/about"),
    images: [ogImageUrl()],
  },
  twitter: {
    card: "summary_large_image",
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    images: [ogImageUrl()],
  },
  robots: pageRobots(),
};

export default function AboutPage() {
  const page = getAboutContent();
  return (
    <div className="bg-bg-soft">
      <Glance data={sectionData<GlanceData>(page, "glance")} />
      <Innovation data={sectionData<InnovationData>(page, "innovation")} />
      <Mission data={sectionData<MissionData>(page, "mission")} />
      <Outlook data={sectionData<OutlookData>(page, "outlook")} />
      <Values data={sectionData<ValuesData>(page, "values")} />
      <PageSchema
        path="/about"
        pageType="AboutPage"
        name={ABOUT_TITLE}
        description={ABOUT_DESCRIPTION}
        breadcrumbLabel="درباره ما"
      />
    </div>
  );
}
