import { Geist, Geist_Mono } from "next/font/google";
import { getHomepageConfig } from "./lib/config";
import "./styles/globals.css";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateMetadata() {
  const { site } = getHomepageConfig();
  const siteUrl = `https://${site.domain}`;
  const openGraphLocale = site.locale.replaceAll("-", "_");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: site.domain,
      template: `%s | ${site.domain}`,
    },
    description: site.description,
    keywords: site.keywords,
    authors: [{ name: site.author }],
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: siteUrl,
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title: site.domain,
      description: site.description,
      url: siteUrl,
      siteName: site.domain,
      locale: openGraphLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: site.domain,
      description: site.description,
    },
  };
}

export default function RootLayout({ children }) {
  const { site } = getHomepageConfig();
  const siteUrl = `https://${site.domain}`;
  const htmlLang = site.locale.replaceAll("_", "-");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.domain,
    url: siteUrl,
    description: site.description,
  };

  return (
    <html
      lang={htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
