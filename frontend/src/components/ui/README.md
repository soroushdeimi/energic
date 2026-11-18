# Shared UI components

Small, typed, presentational building blocks used by the site pages
(`companies`, `coworking`, and later pages). Keep them minimal: no data
fetching, no routing logic, no global state.

| Component     | Purpose                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| `Button`      | Base button/link with the site's shared styles. `href` → internal `Link`, `externalHref` → external `<a>`, otherwise `<button>`. |
| `Card`        | Presentational `<article>` wrapper. Optional archive border; caller supplies size/radius/background. |
| `Gallery`     | Coworking gallery: mobile single column + desktop 3×3 `dir=ltr` grid, `next/image` with captions and the archive overlay gradient. |
| `LogoGrid`    | Shareholder tiles (gradient card, white logo box, name). Companies with a `url` are wrapped in an external link. |
| `AmenityItem` | 180×130 amenity tile with icon + label and the archive hover fill. |
| `SectionTitle`| Green accent bar + bold heading, matching the archive section titles. |
| `Slider`      | Minimal accessible slider (one slide visible, prev/next, RTL-aware). Use for carousels; no autoplay. |

## Conventions

- Props are explicit interfaces; no `any`.
- Colors/sizes come from the design tokens in `tailwind.config.ts`
  (`ink`, `green`, `bg-soft`, `muted`, …) or from the archive's exact
  values when the archive uses one-off sizes.
- All images go through `next/image`.
- Text is Persian, `dir="rtl"` where the archive sets it.
