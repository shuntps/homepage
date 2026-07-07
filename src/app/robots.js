import { getHomepageConfig } from "./lib/config";

export const dynamic = "force-dynamic";

export default function robots() {
  const { site } = getHomepageConfig();
  const siteUrl = `https://${site.domain}`;

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
