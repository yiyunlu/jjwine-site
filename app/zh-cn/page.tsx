import { JJWineSite } from "../JJWineSite";
import { localeMetadata } from "../site-metadata";

export const metadata = localeMetadata("zh-cn");

export default function ChinesePage() {
  return <JJWineSite locale="zh-cn" />;
}
