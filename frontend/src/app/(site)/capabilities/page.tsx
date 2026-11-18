import type { Metadata } from "next";
import "@/components/capabilities/capabilities.css";
import { getCapabilitiesContent, sectionData } from "@/lib/content";
import {
  CapabilitiesMobile,
  type CapabilityCategory,
  type CapabilityItem,
} from "@/components/capabilities/CapabilitiesMobile";
import { CapabilitiesDesktop } from "@/components/capabilities/CapabilitiesDesktop";

export const metadata: Metadata = {
  title: "توانمندی‌های تخصصی | مرکز نوآوری انرژیک",
  description:
    "انرژیک، بازوی مهندسی و مشاوره تخصصی شما در توسعه پروژه‌های کربن، انرژی و صنایع فرآیندی",
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
    </div>
  );
}
