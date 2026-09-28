import type { NextConfig } from "next";

// Static export for GitHub Pages: `next build` writes plain HTML/CSS/JS to ./out.
// tsconfig.pages.json skips the Cloudflare-only files (worker, db, examples).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  typescript: { tsconfigPath: "tsconfig.pages.json" },
};

export default nextConfig;
