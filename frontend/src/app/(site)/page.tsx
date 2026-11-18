import type { Metadata } from "next";
import { getHomeContent, sectionData } from "@/lib/content";
import { Hero, type HeroData } from "@/components/home/Hero";
import { FeaturesBar, type FeatureItem } from "@/components/home/FeaturesBar";
import { Mission, type MissionData } from "@/components/home/Mission";
import { Roadmap, type RoadmapData } from "@/components/home/Roadmap";
import { Partners, type PartnersData } from "@/components/home/Partners";
import { Workspace, type WorkspaceData } from "@/components/home/Workspace";
import { Investor, type InvestorData } from "@/components/home/Investor";
import { VirtualTour, type VirtualTourData } from "@/components/home/VirtualTour";

export const metadata: Metadata = {
  title: "مرکز نوآوری انرژیک | Energic Innovation Center",
  description: "هاب تخصصی مشاوره مهندسی، توسعه فناوری و اقتصاد کربن — مرکز نوآوری انرژیک",
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
    </>
  );
}
