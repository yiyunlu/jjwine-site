import { LegalPage } from "../../LegalPage";
import { legalPageMetadata } from "../../site-metadata";

export const metadata = legalPageMetadata("en", "privacy");

export default function EnglishPrivacyPage() {
  return <LegalPage locale="en" page="privacy" />;
}
