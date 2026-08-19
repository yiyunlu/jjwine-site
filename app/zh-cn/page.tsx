import type { Metadata } from "next";
import { JJWineSite } from "../JJWineSite";
import { content } from "../content";

export const metadata: Metadata = {
  title: content["zh-cn"].meta.title,
  description: content["zh-cn"].meta.description,
  alternates: {
    canonical: "/zh-cn",
    languages: { en: "/en", "zh-CN": "/zh-cn", es: "/es", "x-default": "/en" },
  },
};

export default function ChinesePage() {
  return <JJWineSite locale="zh-cn" />;
}
