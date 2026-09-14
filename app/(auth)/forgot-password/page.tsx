import type { Metadata } from "next";

import { AuthSwitch } from "@/components/auth/fields";
import { AuthShell } from "@/components/auth/shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset password | Veltan",
  alternates: { canonical: "/forgot-password" },
};

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  return (
    <AuthShell>
      <ForgotPasswordForm initialEmail={params.email ?? ""} />
      <div className="mt-8 text-center">
        <AuthSwitch prompt="Remembered it?" href="/login" action="Sign in" />
      </div>
    </AuthShell>
  );
}
