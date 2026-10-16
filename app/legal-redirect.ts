import { permanentRedirect } from "next/navigation";
import type { LegalPageKey } from "./legal-content";

/** Permanent redirect for retired es/fr legal routes to the English legal page. */
export function permanentRedirectToEnglishLegal(page: LegalPageKey): never {
  permanentRedirect(`/en/${page}`);
}
