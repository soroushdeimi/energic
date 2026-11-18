import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  /** Internal route; renders a <Link>. */
  href?: string;
  /** External URL; renders an <a> with rel="noopener noreferrer". */
  externalHref?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * Base button styles shared by the site. Pages compose their own
 * positioning/sizing on top of this.
 */
export const buttonBase =
  "flex items-center justify-center whitespace-nowrap bg-transparent p-0 text-ink transition-opacity hover:opacity-80";

export function Button({
  children,
  href,
  externalHref,
  type = "button",
  onClick,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const classes = `${buttonBase} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (externalHref) {
    return (
      <a
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
