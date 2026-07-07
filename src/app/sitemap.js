import { getHomepageConfig } from "./lib/config";

export const dynamic = "force-dynamic";

const LAST_MODIFIED = new Date().toISOString().split("T")[0];

export default function sitemap() {
  const { site } = getHomepageConfig();
  const siteUrl = `https://${site.domain}`;

  return [
    {
      url: siteUrl,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
