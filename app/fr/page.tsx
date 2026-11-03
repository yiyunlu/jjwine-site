import { JJWineSite } from "../JJWineSite";
import { content } from "../content";
import { localeMetadata } from "../site-metadata";
import { v2Copy } from "../v2-copy";

export const metadata = localeMetadata("fr");

export default function FrenchPage() {
  return <JJWineSite locale="fr" copy={v2Copy.fr} footer={content.fr.footer} />;
}
