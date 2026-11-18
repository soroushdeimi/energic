import type { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Adds the archive card border (rgba(37,54,68,0.3)). */
  bordered?: boolean;
}

/**
 * Presentational card wrapper. Sizing, radius and background are supplied
 * by the caller so the same card can serve shareholder tiles, resident
 * rows and the "your team here" placeholder.
 */
export function Card({ children, className = "", style, bordered = true }: CardProps) {
  return (
    <article
      className={`${bordered ? "border border-[rgba(37,54,68,0.3)]" : ""} ${className}`}
      style={style}
    >
      {children}
    </article>
  );
}
