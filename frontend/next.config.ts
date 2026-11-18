import type { NextConfig } from "next";

/**
 * Static export mode for the GitHub Pages preview (project path /energic).
 *
 * GITHUB_PAGES=true enables `next export` (output: "export", trailingSlash,
 * unoptimized images, base path /energic). Without it the app keeps its
 * ordinary server mode, including the /_tokens rewrite.
 */
const isStatic = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  ...(isStatic
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: "/energic",
        images: { unoptimized: true },
      }
    : {
        async rewrites() {
          // App Router does not route underscore-prefixed folders; expose the
          // design tokens page at /_tokens as required by the project brief.
          return [{ source: "/_tokens", destination: "/tokens" }];
        },
      }),
};

export default nextConfig;
