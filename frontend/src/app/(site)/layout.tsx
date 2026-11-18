import { Footer } from "@/components/Footer";
import { SiteShell } from "@/components/SiteShell";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell>
      <main className="flex-1">{children}</main>
      <Footer />
    </SiteShell>
  );
}
