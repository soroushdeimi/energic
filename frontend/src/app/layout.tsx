import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteSchema } from "@/components/seo/SiteSchema";
import { metadataBase, ogImageUrl, pageRobots, SITE_NAME, SITE_NAME_EN, SITE_URL } from "@/lib/seo";
import "./globals.css";

const peyda = localFont({
  src: [
    { path: "../fonts/peyda-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/peyda-medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/peyda-semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/peyda-bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/peyda-extrabold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-peyda",
  display: "swap",
});

const vazirmatn = localFont({
  src: [{ path: "../fonts/vazirmatn-extrabold.woff2", weight: "800", style: "normal" }],
  variable: "--font-vazirmatn",
  display: "swap",
});

const SITE_DESCRIPTION =
  "مرکز نوآوری انرژیک (Energic Innovation Center) — مرکز فناوری و نوآوری خصوصی در دانشکده مهندسی نفت دانشگاه صنعتی امیرکبیر، تهران؛ مشاوره مهندسی، توسعه فناوری و اقتصاد کربن و فضای کار اشتراکی.";

export const metadata: Metadata = {
  metadataBase: metadataBase(),
  title: {
    default: `${SITE_NAME} | ${SITE_NAME_EN}`,
    // Page titles already carry the site name; the template must not append it.
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_NAME_EN}`,
    description: SITE_DESCRIPTION,
    images: [ogImageUrl()],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_NAME_EN}`,
    description: SITE_DESCRIPTION,
    images: [ogImageUrl()],
  },
  robots: pageRobots(),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={`${peyda.variable} ${vazirmatn.variable}`}>
      <body className="flex min-h-dvh w-full flex-col bg-bg-soft font-peyda text-ink antialiased">
        <SiteSchema />
        {children}
      </body>
    </html>
  );
}
