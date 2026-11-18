import Image from "@/components/ui/SiteImage";

interface ContactRowProps {
  icon: string;
  iconWidth: number;
  iconHeight: number;
  label: string;
  children: React.ReactNode;
}

/**
 * A single contact detail row: a tinted icon tile on the right (RTL) and the
 * label/value text on the left. Geometry and classes match
 * design-archive/pages/contact/index.html.
 */
export function ContactRow({ icon, iconWidth, iconHeight, label, children }: ContactRowProps) {
  return (
    <div className="flex items-start gap-5 md:gap-4">
      <div
        className="flex size-[60px] shrink-0 items-center justify-center rounded-[10px] bg-[rgba(0,169,80,0.1)]"
        aria-hidden="true"
      >
        <Image src={icon} alt="" width={iconWidth} height={iconHeight} className="block" />
      </div>
      <div className="min-w-0 flex-1 text-right">
        <p className="text-[17px] font-semibold leading-[30px] tracking-[-0.5px] text-ink md:text-[20px]">
          {label}
        </p>
        <div className="text-[14px] font-medium leading-[30px] tracking-[-0.5px] text-[rgba(37,54,68,0.7)] md:text-[17px]">
          {children}
        </div>
      </div>
    </div>
  );
}
