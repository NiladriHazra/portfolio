import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to out/, which the
// Cloudflare Worker in wrangler.jsonc serves as static assets.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
