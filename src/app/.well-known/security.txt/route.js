import { getHomepageConfig } from "../../lib/config";

export const dynamic = "force-dynamic";

export function GET() {
  const { site, security } = getHomepageConfig();
  const siteUrl = `https://${site.domain}`;
  const contact = security.contact || `${siteUrl}/`;
  const preferredLanguages = security.preferredLanguages.join(", ");

  const body = [
    `Contact: ${contact}`,
    `Expires: ${security.expires}`,
    `Preferred-Languages: ${preferredLanguages}`,
    `Canonical: ${siteUrl}/.well-known/security.txt`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
