import type { Metadata } from "next";
import { JJWineSite } from "../JJWineSite";
import { content } from "../content";

export const metadata: Metadata = {
  title: content.en.meta.title,
  description: content.en.meta.description,
  alternates: {
    canonical: "/en",
    languages: { en: "/en", "zh-CN": "/zh-cn", es: "/es", "x-default": "/en" },
  },
};

export default function EnglishPage() {
  return <JJWineSite locale="en" />;
}
