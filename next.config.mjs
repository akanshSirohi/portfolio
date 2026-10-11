import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => ({
  output: "export",
  images: { unoptimized: true },
  // Keep production builds from overwriting a running dev server's bundles.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
});
export default nextConfig;
