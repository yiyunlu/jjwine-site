import { LegalPage } from "../../LegalPage";
import { legalPageMetadata } from "../../site-metadata";

export const metadata = legalPageMetadata("zh-cn", "legal");

export default function ChineseLegalPage() {
  return <LegalPage locale="zh-cn" page="legal" />;
}
