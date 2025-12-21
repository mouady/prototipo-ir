import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/prototipo-ir",
};

export default nextConfig;
