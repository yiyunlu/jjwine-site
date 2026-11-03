import { JJWineSite } from "../JJWineSite";
import { content } from "../content";
import { localeMetadata } from "../site-metadata";
import { v2Copy } from "../v2-copy";

export const metadata = localeMetadata("es");

export default function SpanishPage() {
  return <JJWineSite locale="es" copy={v2Copy.es} footer={content.es.footer} />;
}
