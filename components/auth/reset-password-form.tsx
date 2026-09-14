"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authAlertClass, authPrimaryClass } from "@/components/auth/fields";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { AUTH_NETWORK_ERROR, passwordError } from "@/lib/auth-validation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const problem = passwordError(password, "create");
    if (problem) {
      setError(problem);
      return;
    }
    setPending(true);
    setError(null);
    try {
      if (!isSupabaseConfigured()) {
        setError(AUTH_NETWORK_ERROR);
        return;
      }
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(AUTH_NETWORK_ERROR);
        return;
      }
      router.push("/continue");
      router.refresh();
    } catch {
      setError(AUTH_NETWORK_ERROR);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <PasswordField
        label="New password"
        value={password}
        autoComplete="new-password"
        hideLabel
        onChange={setPassword}
      />
      {error ? (
        <p role="alert" className={authAlertClass("error")}>
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className={authPrimaryClass}>
        {pending ? "Saving…" : "Update password"}
      </Button>
    </form>
  );
}
