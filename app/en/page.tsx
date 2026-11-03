import { JJWineSite } from "../JJWineSite";
import { content } from "../content";
import { localeMetadata } from "../site-metadata";
import { v2Copy } from "../v2-copy";

export const metadata = localeMetadata("en");

export default function EnglishPage() {
  return <JJWineSite locale="en" copy={v2Copy.en} footer={content.en.footer} />;
}
