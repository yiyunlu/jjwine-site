import { JJWineSite } from "../JJWineSite";
import { content } from "../content";
import { localeMetadata } from "../site-metadata";
import { v2Copy } from "../v2-copy";

export const metadata = localeMetadata("zh-cn");

export default function ChinesePage() {
  return <JJWineSite locale="zh-cn" copy={v2Copy["zh-cn"]} footer={content["zh-cn"].footer} />;
}
