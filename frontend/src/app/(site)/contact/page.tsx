import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "تماس و آدرس | مرکز نوآوری انرژیک",
  description:
    "آدرس: ولیعصر، دانشگاه صنعتی امیرکبیر، دانشکده مهندسی نفت، طبقه اول. تلفن ۰۲۱-۶۶۴۶۰۰۴۳، ایمیل energyinnovationcenter1@gmail.com و نقشه Google Maps.",
};

export default function ContactPage() {
  return <ContactSection />;
}
