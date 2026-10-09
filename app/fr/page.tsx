import { JJWineSite } from "../JJWineSite";
import { localeMetadata } from "../site-metadata";

export const metadata = localeMetadata("fr");

export default function FrenchPage() {
  return <JJWineSite locale="fr" />;
}
