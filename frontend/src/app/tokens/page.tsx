import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "توکن‌های طراحی | مرکز نوآوری انرژیک",
  description: "توکن‌های طراحی (رنگ، فونت و فاصله) وب‌سایت مرکز نوآوری انرژیک",
  // Internal design reference page: never indexed, no canonical, no social cards.
  robots: { index: false, follow: true },
};

const COLORS: { name: string; value: string; className: string }[] = [
  { name: "--ink", value: "#253644", className: "bg-ink" },
  { name: "--ink-2", value: "#2d4152", className: "bg-ink-2" },
  { name: "--green", value: "#00a950", className: "bg-green" },
  { name: "--bg", value: "#ffffff", className: "bg-bg" },
  { name: "--bg-soft", value: "#f5f5f5", className: "bg-bg-soft" },
  { name: "--muted", value: "#a3a3a3", className: "bg-muted" },
  { name: "--blue-1", value: "#78b9ff", className: "bg-blue-1" },
  { name: "--blue-2", value: "#c2d6ff", className: "bg-blue-2" },
  { name: "--danger", value: "#ff7878", className: "bg-danger" },
];

const FONT_WEIGHTS: { label: string; className: string }[] = [
  { label: "Regular 400", className: "font-normal" },
  { label: "Medium 500", className: "font-medium" },
  { label: "SemiBold 600", className: "font-semibold" },
  { label: "Bold 700", className: "font-bold" },
  { label: "ExtraBold 800", className: "font-extrabold" },
];

const RADII: { name: string; className: string }[] = [
  { name: "rounded-pill (10px)", className: "rounded-pill" },
  { name: "rounded-card (20px)", className: "rounded-card" },
];

export default function TokensPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-[20px] py-10 md:px-[120px]">
      <h1 className="mb-8 text-3xl font-bold">توکن‌های طراحی</h1>

      <h2 className="mb-4 text-xl font-semibold">رنگ‌ها</h2>
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {COLORS.map((c) => (
          <div
            key={c.name}
            className="overflow-hidden rounded-card border border-[rgba(37,54,68,0.1)]"
          >
            <div className={`h-20 ${c.className}`} />
            <div className="bg-white p-3 text-sm">
              <div className="font-semibold">{c.name}</div>
              <div className="text-muted">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-xl font-semibold">فونت Peyda</h2>
      <div className="mb-10 space-y-3">
        {FONT_WEIGHTS.map((f) => (
          <div key={f.label} className={`text-2xl ${f.className}`}>
            {f.label} — مرکز نوآوری انرژیک ۰۱۲۳۴۵۶۷۸۹
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-xl font-semibold">فونت Vazirmatn (ExtraBold)</h2>
      <div className="mb-10 text-2xl font-extrabold font-vazirmatn">
        مرکز نوآوری انرژیک ۰۱۲۳۴۵۶۷۸۹
      </div>

      <h2 className="mb-4 text-xl font-semibold">گردی گوشه‌ها</h2>
      <div className="flex gap-6">
        {RADII.map((r) => (
          <div key={r.name} className="text-sm">
            <div className={`h-20 w-40 border-2 border-green ${r.className}`} />
            <div className="mt-2">{r.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
