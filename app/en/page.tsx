import { JJWineSite } from "../JJWineSite";
import { localeMetadata } from "../site-metadata";

export const metadata = localeMetadata("en");

export default function EnglishPage() {
  return <JJWineSite locale="en" />;
}
