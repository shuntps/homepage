import { cache } from "react";

function splitCsv(value, fallback) {
  if (!value) return fallback;
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const getHomepageConfig = cache(() => ({
  site: {
    domain:      process.env.SITE_DOMAIN || "example.com",
    description: process.env.SITE_DESCRIPTION  || "Your site description here.",
    keywords:    splitCsv(process.env.SITE_KEYWORDS, ["homelab", "self-hosted", "infrastructure"]),
    author:      process.env.SITE_AUTHOR        || "yourname",
    locale:      process.env.SITE_LOCALE        || "en_CA",
  },
  security: {
    expires: process.env.SECURITY_TXT_EXPIRES || (() => {
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      return d.toISOString();
    })(),
    contact: process.env.SECURITY_TXT_CONTACT || "",
    preferredLanguages: ["en"],
  },
}));
