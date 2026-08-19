import { JJWineSite } from "./JJWineSite";
import { localeMetadata } from "./site-metadata";

// The root route serves the English page and canonicalizes to /en.
export const metadata = localeMetadata("en");

export default function Home() {
  return <JJWineSite locale="en" />;
}
