import type { Metadata } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  title: "مرکز نوآوری انرژیک | Energic Innovation Center",
  description: "وب‌سایت رسمی مرکز نوآوری انرژیک — مرکز فناوری و نوآوری خصوصی",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={`${peyda.variable} ${vazirmatn.variable}`}>
      <body className="min-h-screen bg-bg font-peyda text-ink antialiased">{children}</body>
    </html>
  );
}
