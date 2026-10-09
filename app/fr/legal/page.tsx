import { LegalPage } from "../../LegalPage";
import { legalPageMetadata } from "../../site-metadata";

export const metadata = legalPageMetadata("fr", "legal");

export default function FrenchLegalPage() {
  return <LegalPage locale="fr" page="legal" />;
}
