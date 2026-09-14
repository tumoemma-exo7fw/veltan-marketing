import type { Metadata } from "next";

import { AuthSwitch } from "@/components/auth/fields";
import { GuestPreviewLink } from "@/components/auth/guest-preview";
import { AuthShell } from "@/components/auth/shell";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { AUTH_GOOGLE_UNAVAILABLE } from "@/lib/auth-validation";

export const metadata: Metadata = {
  title: "Get started | Veltan",
  description: "Create a Veltan account. Google creates it automatically if you are new.",
  alternates: { canonical: "/signup" },
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; error?: string }>;
}) {
  const params = await searchParams;
  const initialError =
    params.error === "google" ? AUTH_GOOGLE_UNAVAILABLE : null;

  return (
    <AuthShell>
      <SignUpForm initialEmail={params.email ?? ""} initialError={initialError} />
      <div className="mt-8 text-center">
        <AuthSwitch prompt="Already have an account?" href="/login" action="Sign in" />
        <GuestPreviewLink />
      </div>
    </AuthShell>
  );
}
