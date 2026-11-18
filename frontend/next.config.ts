import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async rewrites() {
    // App Router does not route underscore-prefixed folders; expose the
    // design tokens page at /_tokens as required by the project brief.
    return [{ source: "/_tokens", destination: "/tokens" }];
  },
};

export default nextConfig;
