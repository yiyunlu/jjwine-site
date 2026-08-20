import { LegalPage } from "../../LegalPage";
import { legalPageMetadata } from "../../site-metadata";

export const metadata = legalPageMetadata("es", "privacy");

export default function SpanishPrivacyPage() {
  return <LegalPage locale="es" page="privacy" />;
}
