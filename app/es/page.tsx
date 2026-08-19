import type { Metadata } from "next";
import { JJWineSite } from "../JJWineSite";
import { content } from "../content";

export const metadata: Metadata = {
  title: content.es.meta.title,
  description: content.es.meta.description,
  alternates: {
    canonical: "/es",
    languages: { en: "/en", "zh-CN": "/zh-cn", es: "/es", "x-default": "/en" },
  },
};

export default function SpanishPage() {
  return <JJWineSite locale="es" />;
}
