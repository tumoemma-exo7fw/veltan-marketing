"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

import {
  AuthField,
  AuthIconWrap,
  authAlertClass,
  authInputClass,
  authPrimaryClass,
} from "@/components/auth/fields";
import { Button } from "@/components/ui/button";
import {
  AUTH_NETWORK_ERROR,
  emailError,
  googleAuthError,
  normalizeEmail,
} from "@/lib/auth-validation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm({ initialEmail = "" }: { initialEmail?: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const problem = emailError(email);
    if (problem) {
      setError(problem);
      return;
    }
    setPending(true);
    setError(null);
    try {
      if (!isSupabaseConfigured()) {
        setError(googleAuthError("SUPABASE_NOT_CONFIGURED"));
        return;
      }
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        normalizeEmail(email),
        {
          redirectTo: `${window.location.origin || SITE_URL}/auth/confirm?next=/reset-password`,
        },
      );
      if (resetError) {
        setError(AUTH_NETWORK_ERROR);
        return;
      }
      setSent(true);
    } catch {
      setError(AUTH_NETWORK_ERROR);
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <p role="status" className={authAlertClass("info")}>
        If that email has an account, we sent a reset link. Check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <AuthField id="reset-email" label="Email address" hideLabel>
        <div className="relative">
          <AuthIconWrap>
            <Mail className="size-4" />
          </AuthIconWrap>
          <input
            id="reset-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className={cn(authInputClass)}
            autoComplete="username"
          />
        </div>
      </AuthField>
      {error ? (
        <p role="alert" className={authAlertClass("error")}>
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className={authPrimaryClass}>
        {pending ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
