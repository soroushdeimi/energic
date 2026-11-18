import Image from "@/components/ui/SiteImage";
import type { CoworkingData } from "@/lib/api";

interface GalleryProps {
  items: CoworkingData["gallery"];
  /** Caption rendered over each image, keyed by the image path. */
  captions: Record<string, string>;
  /** Optional reorder for the desktop grid (dir=ltr in the archive). */
  desktopOrder?: string[];
}

const OVERLAY_GRADIENT =
  "linear-gradient(to bottom, rgba(0,0,0,0) 2.31%, rgba(255,255,255,0.7) 90.105%)";

function GalleryFigure({ image, alt, caption }: { image: string; alt: string; caption: string }) {
  return (
    <figure className="relative aspect-[384/298] overflow-hidden rounded-[40px] border border-[rgba(37,54,68,0.3)] md:aspect-auto md:h-[298px] md:w-[384px]">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 768px) 384px, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[40px] border border-[rgba(37,54,68,0.3)]"
        style={{ background: OVERLAY_GRADIENT }}
      />
      <figcaption
        dir="rtl"
        className="absolute bottom-[18px] right-[24px] z-[1] text-[15px] font-semibold leading-[24px] text-black md:right-[30px] md:text-[17px]"
      >
        {caption}
      </figcaption>
    </figure>
  );
}

/**
 * Coworking space gallery: single column on mobile, 3-column dir=ltr grid
 * on md+, matching the archive layout.
 */
export function Gallery({ items, captions, desktopOrder }: GalleryProps) {
  const ordered = desktopOrder
    ? desktopOrder
        .map((name) => items.find((item) => item.image.endsWith(name)))
        .filter((item): item is CoworkingData["gallery"][number] => item !== undefined)
    : items;

  return (
    <>
      {/* Mobile: vertical stack (archive order). */}
      <div className="mx-auto max-w-[390px] px-5 pb-10 md:hidden">
        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <GalleryFigure
              key={item.image}
              image={item.image}
              alt={item.alt}
              caption={captions[item.image] ?? ""}
            />
          ))}
        </div>
      </div>
      {/* Desktop: 3x3 grid, dir=ltr (archive order). */}
      <div dir="ltr" className="mx-auto hidden w-[1200px] grid-cols-[repeat(3,384px)] gap-6 pb-[80px] md:grid">
        {ordered.map((item) => (
          <GalleryFigure
            key={item.image}
            image={item.image}
            alt={item.alt}
            caption={captions[item.image] ?? ""}
          />
        ))}
      </div>
    </>
  );
}
