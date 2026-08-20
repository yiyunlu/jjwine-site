import { LegalPage } from "../../LegalPage";
import { legalPageMetadata } from "../../site-metadata";

export const metadata = legalPageMetadata("zh-cn", "privacy");

export default function ChinesePrivacyPage() {
  return <LegalPage locale="zh-cn" page="privacy" />;
}
