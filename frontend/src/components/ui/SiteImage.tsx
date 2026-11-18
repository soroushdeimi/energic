import Image, { type ImageProps } from "next/image";

/**
 * Reusable next/image wrapper for the GitHub Pages static export.
 *
 * In static mode the site is served under the project path `/energic`. Next's
 * `basePath` prefixes chunks, fonts and links, but NOT the `src` of public
 * assets rendered by `next/image` (and with `images.unoptimized` the custom
 * loader is bypassed entirely). This wrapper prefixes public-asset srcs with
 * the base path so they resolve at `/energic/...`.
 *
 * `NEXT_PUBLIC_BASE_PATH` is inlined at build time into both the server and
 * client bundles, so SSR and client hydration produce identical `src` values.
 * In ordinary server mode the variable is unset and no prefix is applied.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function withBase(src: string): string {
  if (BASE_PATH && src.startsWith("/") && !src.startsWith(BASE_PATH)) {
    return `${BASE_PATH}${src}`;
  }
  return src;
}

export default function SiteImage(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const resolved = typeof src === "string" ? withBase(src) : src;
  return <Image src={resolved} alt={alt} {...rest} />;
}
