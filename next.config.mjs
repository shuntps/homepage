import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  allowedDevOrigins: process.env.DEV_ALLOWED_ORIGINS?.split(",") ?? [],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
