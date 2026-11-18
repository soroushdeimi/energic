import { useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "./Button";

interface SliderProps {
  children: ReactNode;
  /** Number of slides (children). */
  count: number;
  ariaLabel: string;
}

/**
 * Minimal accessible slider: one slide visible, prev/next buttons,
 * RTL-aware (next moves left). No autoplay, no dependencies.
 */
export function Slider({ children, count, ariaLabel }: SliderProps) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: number) => {
      const clamped = (next + count) % count;
      setIndex(clamped);
      const track = trackRef.current;
      if (track) {
        track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
      }
    },
    [count],
  );

  const slides = Array.isArray(children) ? children : [children];

  return (
    <div dir="ltr" role="region" aria-label={ariaLabel}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full shrink-0 snap-start">
            {slide}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-3">
        <Button
          onClick={() => goTo(index - 1)}
          ariaLabel="اسلاید قبلی"
          className="rounded-pill border border-[rgba(37,54,68,0.3)] px-4 py-1 text-[14px] font-semibold"
        >
          قبلی
        </Button>
        <span className="text-[14px] text-muted" aria-hidden="true">
          {index + 1} / {count}
        </span>
        <Button
          onClick={() => goTo(index + 1)}
          ariaLabel="اسلاید بعدی"
          className="rounded-pill border border-[rgba(37,54,68,0.3)] px-4 py-1 text-[14px] font-semibold"
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
