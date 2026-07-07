import { getHomepageConfig } from "./lib/config";

export const dynamic = "force-dynamic";

export default function manifest() {
  const { site } = getHomepageConfig();

  return {
    name: site.domain,
    short_name: site.domain,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#030712",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
