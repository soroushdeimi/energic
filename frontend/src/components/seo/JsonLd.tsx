/**
 * Serialize JSON-LD safely for inline `<script>` embedding.
 *
 * `JSON.stringify` does not escape `<`, so a value containing `</script>`
 * would terminate the script tag early (a script-injection vector). We escape
 * `<` as the valid JSON escape `<`, which `JSON.parse` reads back as `<`
 * — the payload parses to exactly the original value with no literal
 * `</script>` sequence in the emitted HTML.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Renders a schema.org JSON-LD block. Invisible to the UI. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
