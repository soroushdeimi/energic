import { canonicalUrl, SITE_NAME, SITE_NAME_EN, SITE_URL } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

const BASE = SITE_URL;

/**
 * Site-wide schema graph.
 *
 * The center itself is an `Organization` (a private technology & innovation
 * center). Amirkabir University of Technology and its Petroleum Engineering
 * Faculty are modelled as *separate* entities only because the center is
 * physically located inside the faculty (a real, archived fact) — the center
 * is NOT classified as a university and no ratings are fabricated.
 */
const organization = {
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: SITE_NAME,
  alternateName: [SITE_NAME_EN, "انرژیک", "Energic", "Energic Center"],
  url: `${BASE}/`,
  logo: `${BASE}/logos/footer-logo.png`,
  email: "energyinnovationcenter1@gmail.com",
  telephone: "+98-21-66460043",
  description:
    "مرکز نوآوری و فناوری خصوصی انرژیک در دانشکده مهندسی نفت دانشگاه صنعتی امیرکبیر، تهران؛ خدمات مشاوره مهندسی، توسعه فناوری و اقتصاد کربن و فضای کار اشتراکی.",
  location: { "@id": `${BASE}/#place` },
};

const amirkabir = {
  "@type": "CollegeOrUniversity",
  "@id": `${BASE}/#amirkabir-university`,
  name: "دانشگاه صنعتی امیرکبیر",
  alternateName: ["Amirkabir University of Technology", "AUT"],
};

const petroleumFaculty = {
  "@type": "CollegeOrUniversity",
  "@id": `${BASE}/#petroleum-faculty`,
  name: "دانشکده مهندسی نفت",
  containedInPlace: { "@id": `${BASE}/#amirkabir-university` },
};

const place = {
  "@type": "Place",
  "@id": `${BASE}/#place`,
  name: SITE_NAME,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ولیعصر، دانشگاه صنعتی امیرکبیر، دانشکده مهندسی نفت، طبقه اول",
    addressLocality: "تهران",
    addressRegion: "تهران",
    addressCountry: "IR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.7036957,
    longitude: 51.4065566,
  },
  containedInPlace: { "@id": `${BASE}/#petroleum-faculty` },
  hasMap: "https://www.google.com/maps?q=35.7036957,51.4065566",
};

const website = {
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: `${BASE}/`,
  name: SITE_NAME,
  alternateName: [SITE_NAME_EN],
  inLanguage: "fa-IR",
  publisher: { "@id": `${BASE}/#organization` },
  about: { "@id": `${BASE}/#organization` },
};

/** Site-wide schema graph (Organization, university, faculty, Place, WebSite). */
export function SiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [organization, amirkabir, petroleumFaculty, place, website],
      }}
    />
  );
}

interface PageSchemaProps {
  /** Site route, e.g. "/about" or "/". */
  path: string;
  /** schema.org page type, e.g. "AboutPage". */
  pageType: string;
  name: string;
  description: string;
  /** Breadcrumb label, e.g. "درباره ما". Omit for the home page. */
  breadcrumbLabel?: string;
}

/** Per-page WebPage (+ BreadcrumbList) schema. */
export function PageSchema({
  path,
  pageType,
  name,
  description,
  breadcrumbLabel,
}: PageSchemaProps) {
  const pageUrl = canonicalUrl(path);
  const pageId = path === "/" ? `${BASE}/#webpage` : `${pageUrl}#webpage`;

  const pageNode = {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": pageId,
    url: pageUrl,
    name,
    description,
    isPartOf: { "@id": `${BASE}/#website` },
    about: { "@id": `${BASE}/#organization` },
    inLanguage: "fa-IR",
  };

  if (!breadcrumbLabel) {
    return <JsonLd data={pageNode} />;
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: breadcrumbLabel, item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={pageNode} />
      <JsonLd data={breadcrumb} />
    </>
  );
}
