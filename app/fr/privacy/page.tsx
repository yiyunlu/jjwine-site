import { LegalPage } from "../../LegalPage";
import { legalPageMetadata } from "../../site-metadata";

export const metadata = legalPageMetadata("fr", "privacy");

export default function FrenchPrivacyPage() {
  return <LegalPage locale="fr" page="privacy" />;
}
