import type { Metadata } from "next";
import { getAboutContent, sectionData } from "@/lib/content";
import { Glance, type GlanceData } from "@/components/about/Glance";
import { Innovation, type InnovationData } from "@/components/about/Innovation";
import { Mission, type MissionData } from "@/components/about/Mission";
import { Outlook, type OutlookData } from "@/components/about/Outlook";
import { Values, type ValuesData } from "@/components/about/Values";

export const metadata: Metadata = {
  title: "درباره ما | مرکز نوآوری انرژیک",
  description: "انرژیک در یک نگاه — مأموریت، چشم‌انداز و ارزش‌های اصلی مرکز نوآوری انرژیک",
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
    </div>
  );
}
