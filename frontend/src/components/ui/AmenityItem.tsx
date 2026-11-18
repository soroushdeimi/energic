import Image from "@/components/ui/SiteImage";

interface AmenityItemProps {
  icon: string;
  label: string;
}

/**
 * Coworking amenity tile: 180x130 bordered card with icon and label.
 * Hover fills the card with ink and turns the label white (archive behavior).
 */
export function AmenityItem({ icon, label }: AmenityItemProps) {
  return (
    <article className="group relative h-[130px] w-[180px] shrink-0 rounded-[20px] border border-[rgba(37,54,68,0.5)] bg-transparent transition-colors duration-200 hover:bg-ink">
      <div className="absolute inset-x-[37.78%] top-[15.38%] bottom-[50.77%] flex items-center justify-center">
        <Image src={icon} alt="" aria-hidden width={60} height={60} className="object-contain" />
      </div>
      <p
        dir="rtl"
        className="absolute inset-x-[18%] bottom-[20%] top-[61.54%] text-center text-[17px] font-medium leading-[24px] text-ink transition-colors duration-200 group-hover:text-white"
      >
        {label}
      </p>
    </article>
  );
}
