import { JJWineSite } from "../JJWineSite";
import { localeMetadata } from "../site-metadata";

export const metadata = localeMetadata("es");

export default function SpanishPage() {
  return <JJWineSite locale="es" />;
}
