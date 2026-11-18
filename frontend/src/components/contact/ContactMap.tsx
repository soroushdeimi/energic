/**
 * Contact map area.
 *
 * In the archive the map is a client-side rendered Google Maps embed whose
 * server-rendered markup is only a pulsing placeholder
 * (`h-full w-full animate-pulse rounded-[40px] bg-[rgba(37,54,68,0.08)]`).
 * The map chunk itself is not part of the static archive, so this component
 * reproduces that placeholder and exposes the real location as a link to
 * Google Maps (coordinates from the archive schema `hasMap`).
 */
const MAP_URL = "https://www.google.com/maps?q=35.7036957,51.4065566";

interface ContactMapProps {
  className: string;
}

export function ContactMap({ className }: ContactMapProps) {
  return (
    <a
      dir="ltr"
      href={MAP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="مشاهده نقشه در Google Maps"
      className={`block overflow-hidden ${className}`}
    >
      <span className="sr-only">نقشه Google Maps</span>
      <div
        className="h-full w-full animate-pulse rounded-[40px] bg-[rgba(37,54,68,0.08)]"
        aria-hidden="true"
      />
    </a>
  );
}
