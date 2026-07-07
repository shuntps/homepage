import HomePage from "./components/HomePage";
import { getHomepageConfig } from "./lib/config";

export const dynamic = "force-dynamic";

export default function Page() {
  const { site } = getHomepageConfig();
  return <HomePage domain={site.domain} locale={site.locale} />;
}
