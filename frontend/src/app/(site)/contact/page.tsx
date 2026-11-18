import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";
import { PageSchema } from "@/components/seo/SiteSchema";
import { canonicalUrl, ogImageUrl, pageRobots } from "@/lib/seo";

const CONTACT_TITLE = "تماس و آدرس | مرکز نوآوری انرژیک";
const CONTACT_DESCRIPTION =
  "آدرس: ولیعصر، دانشگاه صنعتی امیرکبیر، دانشکده مهندسی نفت، طبقه اول. تلفن ۰۲۱-۶۶۴۶۰۰۴۳، ایمیل energyinnovationcenter1@gmail.com و نقشه Google Maps.";

export const metadata: Metadata = {
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: canonicalUrl("/contact") },
  openGraph: {
    type: "website",
    title: CONTACT_TITLE,
    description: CONTACT_DESCRIPTION,
    url: canonicalUrl("/contact"),
    images: [ogImageUrl()],
  },
  twitter: {
    card: "summary_large_image",
    title: CONTACT_TITLE,
    description: CONTACT_DESCRIPTION,
    images: [ogImageUrl()],
  },
  robots: pageRobots(),
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />
      <PageSchema
        path="/contact"
        pageType="ContactPage"
        name={CONTACT_TITLE}
        description={CONTACT_DESCRIPTION}
        breadcrumbLabel="تماس با ما"
      />
    </>
  );
}
