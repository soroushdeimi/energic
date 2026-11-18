import Image from "@/components/ui/SiteImage";

interface AmenityItemProps {
  id: string;
  icon: string;
  label: string;
}

/**
 * Coworking amenity tile: 180x130 bordered card with icon and label.
 *
 * Faithful to `design-archive/_next/static/chunks/1qedp6y9n7qyb.js` (AmenityCard):
 * `transition-colors duration-200`, hover fills the card with ink (#253644) and
 * the label turns white. Each amenity has its own icon box inset; the
 * ergonomic-furniture card uses a wider icon box and a `whitespace-nowrap`
 * label inset so its caption never wraps.
 */
const ICON_BOX: Record<string, string> = {
  "central-access": "12.31% 38.33% 55.38% 38.33%",
  "ergonomic-furniture": "15.38% 37.78% 50.77% 37.78%",
  "free-catering": "13.85% 37.78% 52.31% 37.78%",
  "corporate-postal": "21.54% 37.78% 53.85% 38.89%",
  "fiber-internet": "15.38% 38.89% 53.85% 38.89%",
};

const DEFAULT_ICON_BOX = "15.38% 38.89% 53.85% 38.89%";

export function AmenityItem({ id, icon, label }: AmenityItemProps) {
  const isErgonomic = id === "ergonomic-furniture";
  const isCentral = id === "central-access";
  const iconInset = ICON_BOX[id] ?? DEFAULT_ICON_BOX;

  return (
    <article className="group relative h-[130px] w-[180px] shrink-0 rounded-[20px] border border-[rgba(37,54,68,0.5)] bg-transparent transition-colors duration-200 hover:bg-ink">
      <div className="absolute overflow-hidden" style={{ inset: iconInset }}>
        {isCentral ? (
          <div className="absolute inset-[9.69%_3.62%] flex items-center justify-center">
            <div className="relative size-full -rotate-180 -scale-x-100">
              <Image src={icon} alt="" fill unoptimized className="object-contain" aria-hidden />
            </div>
          </div>
        ) : isErgonomic ? (
          <div className="absolute inset-[15.63%_3.13%]">
            <Image src={icon} alt="" fill unoptimized className="object-contain" aria-hidden />
          </div>
        ) : (
          <Image src={icon} alt="" fill unoptimized className="object-contain" aria-hidden />
        )}
      </div>
      <p
        dir="rtl"
        className={`absolute bottom-[20%] top-[61.54%] text-center text-[17px] font-medium leading-[24px] text-ink transition-colors duration-200 group-hover:text-white ${
          isErgonomic ? "inset-x-[14.44%] whitespace-nowrap" : "inset-x-[18%]"
        }`}
      >
        {label}
      </p>
    </article>
  );
}
