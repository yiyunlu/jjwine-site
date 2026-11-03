import { JJWineSite } from "./JJWineSite";
import { content } from "./content";
import { localeMetadata } from "./site-metadata";
import { v2Copy } from "./v2-copy";

// The root route serves the English page and canonicalizes to /en.
export const metadata = localeMetadata("en");

export default function Home() {
  return <JJWineSite locale="en" copy={v2Copy.en} footer={content.en.footer} />;
}
