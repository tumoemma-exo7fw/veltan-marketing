import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/shell";
import { OnboardingForm } from "@/components/auth/onboarding-form";
import { getAuthState } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Set up your clinic | Veltan",
};

export default async function OnboardingPage() {
  const { user, onboardingCompleted } = await getAuthState();
  if (!user) redirect("/login");
  if (onboardingCompleted) redirect("/continue");

  return (
    <AuthShell>
      <p className="mb-6 text-center text-[14px] text-white/55">
        A few details so we can open the app in your name.
      </p>
      <OnboardingForm
        defaultName={String(user.user_metadata?.full_name ?? user.user_metadata?.name ?? "")}
        defaultOrganization={String(user.user_metadata?.organizationName ?? "")}
      />
    </AuthShell>
  );
}
