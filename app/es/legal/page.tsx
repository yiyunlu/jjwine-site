import { LegalPage } from "../../LegalPage";
import { legalPageMetadata } from "../../site-metadata";

export const metadata = legalPageMetadata("es", "legal");

export default function SpanishLegalPage() {
  return <LegalPage locale="es" page="legal" />;
}
