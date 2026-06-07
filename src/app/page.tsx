import { redirect } from "next/navigation";

/**
 * Bare domain entrypoint. The marketing site sends every visitor to the
 * company homepage. This is a static public site, so there is no auth check
 * here. That logic lives in the CRM app, which is deployed separately.
 */
export default function RootPage() {
  redirect("/company");
}
