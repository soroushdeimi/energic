import type { Metadata } from "next";
import { PageSchema } from "@/components/seo/SiteSchema";
import { getHomeContent, sectionData } from "@/lib/content";
import { canonicalUrl, ogImageUrl, pageRobots } from "@/lib/seo";
import { Hero, type HeroData } from "@/components/home/Hero";
import { FeaturesBar, type FeatureItem } from "@/components/home/FeaturesBar";
import { Mission, type MissionData } from "@/components/home/Mission";
import { Roadmap, type RoadmapData } from "@/components/home/Roadmap";
import { Partners, type PartnersData } from "@/components/home/Partners";
import { Workspace, type WorkspaceData } from "@/components/home/Workspace";
import { Investor, type InvestorData } from "@/components/home/Investor";
import { VirtualTour, type VirtualTourData } from "@/components/home/VirtualTour";

const HOME_TITLE = "مرکز نوآوری انرژیک | Energic Innovation Center";
const HOME_DESCRIPTION =
  "هاب تخصصی مشاوره مهندسی، توسعه فناوری و اقتصاد کربن — مرکز نوآوری انرژیک در دانشکده مهندسی نفت دانشگاه صنعتی امیرکبیر، تهران";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: canonicalUrl("/") },
  openGraph: {
    type: "website",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: canonicalUrl("/"),
    images: [ogImageUrl()],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [ogImageUrl()],
  },
  robots: pageRobots(),
};

export default function HomePage() {
  const page = getHomeContent();
  return (
    <>
      <Hero data={sectionData<HeroData>(page, "hero")} />
      <FeaturesBar items={sectionData<{ items: FeatureItem[] }>(page, "features").items} />
      <Mission data={sectionData<MissionData>(page, "mission")} />
      <Roadmap data={sectionData<RoadmapData>(page, "roadmap")} />
      <Partners data={sectionData<PartnersData>(page, "partners")} />
      <Workspace data={sectionData<WorkspaceData>(page, "workspace")} />
      <Investor data={sectionData<InvestorData>(page, "investor")} />
      <VirtualTour data={sectionData<VirtualTourData>(page, "virtualTour")} />
      <PageSchema path="/" pageType="WebPage" name={HOME_TITLE} description={HOME_DESCRIPTION} />
    </>
  );
}
