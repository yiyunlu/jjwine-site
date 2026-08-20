import { LegalPage } from "../../LegalPage";
import { legalPageMetadata } from "../../site-metadata";

export const metadata = legalPageMetadata("en", "legal");

export default function EnglishLegalPage() {
  return <LegalPage locale="en" page="legal" />;
}
