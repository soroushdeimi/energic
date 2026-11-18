import Image from "next/image";

interface WorkspaceImage {
  src: string;
  alt: string;
}

export interface WorkspaceData {
  title: string;
  images: WorkspaceImage[];
}

export function Workspace({ data }: { data: WorkspaceData }) {
  return (
    <section aria-labelledby="workspace-heading" className="relative py-12 md:pt-0 md:pb-20">
      {/* Mobile */}
      <div className="mx-auto md:hidden" style={{ width: 320 }}>
        <h2
          id="workspace-heading"
          dir="rtl"
          className="mx-auto text-center font-sans text-[18px] font-bold tracking-[-0.5px] text-ink"
          style={{ width: 116, height: 45, lineHeight: "45px", marginBottom: 20 }}
        >
          {data.title}
        </h2>
        <div className="flex flex-col" style={{ gap: 20 }}>
          {data.images.map((img) => (
            <figure
              key={img.src}
              className="relative shrink-0 overflow-hidden"
              style={{ width: 320, height: 200, borderRadius: 40 }}
            >
              <Image src={img.src} alt={img.alt} fill sizes="320px" className="object-cover" />
            </figure>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="relative mx-auto hidden h-[600px] w-[1141px] overflow-visible md:block">
        <div
          className="pointer-events-none absolute z-0"
          style={{ width: 367, height: 750, top: -338, left: -283 }}
          aria-hidden="true"
        >
          <Image
            src="/images/patterns/pattern-02-gray.svg"
            alt=""
            width={367}
            height={750}
            className="block max-w-none"
          />
        </div>
        <div
          className="pointer-events-none absolute z-0"
          style={{ width: 393, height: 750, top: -256, left: -257 }}
          aria-hidden="true"
        >
          <Image
            src="/images/patterns/pattern-02-green.svg"
            alt=""
            width={393}
            height={750}
            className="block max-w-none"
          />
        </div>
        <h2
          id="workspace-heading"
          dir="rtl"
          className="absolute left-[451px] top-0 z-10 w-[238px] whitespace-nowrap text-center text-[36px] font-bold leading-[45px] tracking-[-0.5px] text-ink"
        >
          {data.title}
        </h2>
        <div dir="ltr" className="absolute inset-0 z-10">
          {/* Desktop tile order differs from the mobile stack in the archive. */}
          {[2, 0, 1, 5, 4, 3].map((idx, i) => {
            const img = data.images[idx];
            if (!img) return null;
            const left = (i % 3) * 387;
            const top = i < 3 ? 90 : 355;
            return (
              <figure
                key={img.src}
                className="absolute overflow-hidden rounded-[40px]"
                style={{ left, top, width: 367, height: 245 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={367}
                  height={245}
                  className="h-full w-full object-cover"
                />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
