import type { Metadata } from "next";
import "@/components/capabilities/capabilities.css";
import { PageSchema } from "@/components/seo/SiteSchema";
import { getCapabilitiesContent, sectionData } from "@/lib/content";
import { canonicalUrl, ogImageUrl, pageRobots } from "@/lib/seo";
import {
  CapabilitiesMobile,
  type CapabilityCategory,
  type CapabilityItem,
} from "@/components/capabilities/CapabilitiesMobile";
import { CapabilitiesDesktop } from "@/components/capabilities/CapabilitiesDesktop";

const CAPABILITIES_TITLE = "توانمندی‌های تخصصی | مرکز نوآوری انرژیک";
const CAPABILITIES_DESCRIPTION =
  "انرژیک، بازوی مهندسی و مشاوره تخصصی شما در توسعه پروژه‌های کربن، انرژی و صنایع فرآیندی — امکان‌سنجی، انتقال فناوری و بهینه‌سازی انرژی";

export const metadata: Metadata = {
  title: CAPABILITIES_TITLE,
  description: CAPABILITIES_DESCRIPTION,
  alternates: { canonical: canonicalUrl("/capabilities") },
  openGraph: {
    type: "website",
    title: CAPABILITIES_TITLE,
    description: CAPABILITIES_DESCRIPTION,
    url: canonicalUrl("/capabilities"),
    images: [ogImageUrl()],
  },
  twitter: {
    card: "summary_large_image",
    title: CAPABILITIES_TITLE,
    description: CAPABILITIES_DESCRIPTION,
    images: [ogImageUrl()],
  },
  robots: pageRobots(),
};

interface HeroData {
  title: string;
  subtitle: string;
  categories: CapabilityCategory[];
}

interface CapabilitiesData {
  items: CapabilityItem[];
}

export default function CapabilitiesPage() {
  const page = getCapabilitiesContent();
  const hero = sectionData<HeroData>(page, "hero");
  const capabilities = sectionData<CapabilitiesData>(page, "capabilities");
  const shared = {
    heroTitle: hero.title,
    heroSubtitle: hero.subtitle,
    categories: hero.categories,
    items: capabilities.items,
  };
  return (
    <div className="overflow-x-clip bg-bg-soft">
      <CapabilitiesMobile data={shared} />
      <CapabilitiesDesktop data={shared} />
      <PageSchema
        path="/capabilities"
        pageType="WebPage"
        name={CAPABILITIES_TITLE}
        description={CAPABILITIES_DESCRIPTION}
        breadcrumbLabel="توانمندی‌های تخصصی"
      />
    </div>
  );
}
