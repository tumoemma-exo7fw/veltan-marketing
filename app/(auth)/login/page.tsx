import type { Metadata } from "next";

import { AuthSwitch } from "@/components/auth/fields";
import { GuestPreviewLink } from "@/components/auth/guest-preview";
import { AuthShell } from "@/components/auth/shell";
import { SignInForm } from "@/components/auth/sign-in-form";
import { AUTH_GOOGLE_UNAVAILABLE, AUTH_NETWORK_ERROR } from "@/lib/auth-validation";

export const metadata: Metadata = {
  title: "Sign in | Veltan",
  description:
    "Sign in to Veltan. Returning users go straight in. New clinics can get started in a minute.",
  alternates: { canonical: "/login" },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; error?: string }>;
}) {
  const params = await searchParams;
  const initialError =
    params.error === "google"
      ? AUTH_GOOGLE_UNAVAILABLE
      : params.error === "link"
        ? "That email link is invalid or expired. Request a new one."
        : params.error
          ? AUTH_NETWORK_ERROR
          : null;

  return (
    <AuthShell>
      <SignInForm initialEmail={params.email ?? ""} initialError={initialError} />
      <div className="mt-8 text-center">
        <AuthSwitch
          prompt="Don't have an account?"
          href="/signup"
          action="Get started"
        />
        <GuestPreviewLink />
      </div>
    </AuthShell>
  );
}
