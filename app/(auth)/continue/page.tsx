import { redirect } from "next/navigation";

import { getAuthState } from "@/lib/session";
import { FOLLOWUP_APP_URL } from "@/lib/site";
import { createSsoToken } from "@/lib/sso";

export const dynamic = "force-dynamic";

export default async function ContinuePage() {
  const { user, onboardingCompleted } = await getAuthState();
  if (!user) redirect("/login");
  if (!onboardingCompleted) redirect("/onboarding");

  const appUrl = new URL(FOLLOWUP_APP_URL);
  try {
    const token = await createSsoToken({
      sub: user.id,
      email: user.email ?? "",
    });
    appUrl.searchParams.set("sso", token);
  } catch {
    // App placeholder still loads without the token.
  }

  redirect(appUrl.toString());
}
