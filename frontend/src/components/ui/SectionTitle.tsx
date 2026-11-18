import { useId } from "react";

interface SectionTitleProps {
  title: string;
  /** Aligns the green bar + title block. "start" (default) is right-aligned in RTL. */
  align?: "start" | "end";
  className?: string;
}

/**
 * Section heading with the green accent bar, matching the archive:
 * 4px/6px bar, 18px/30px bold ink text.
 */
export function SectionTitle({ title, align = "start", className = "" }: SectionTitleProps) {
  const id = useId();
  return (
    <div
      className={`flex items-start ${align === "end" ? "justify-end" : "justify-start"} ${className}`}
    >
      <div
        aria-hidden="true"
        className="mt-[5px] h-[30px] w-[4px] shrink-0 bg-green md:mt-0 md:h-[50px] md:w-[6px]"
      />
      <h2
        id={id}
        dir="rtl"
        className="mr-[8px] whitespace-nowrap text-center text-[18px] font-bold leading-[40px] text-ink md:mr-[12px] md:pt-[5px] md:text-[30px]"
      >
        {title}
      </h2>
    </div>
  );
}
