"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, User } from "lucide-react";

import {
  AuthDivider,
  AuthField,
  AuthIconWrap,
  authAlertClass,
  authInputClass,
  authPrimaryClass,
} from "@/components/auth/fields";
import { GoogleButton } from "@/components/auth/google-button";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";
import {
  AUTH_NETWORK_ERROR,
  emailError,
  googleAuthError,
  normalizeEmail,
  passwordError,
} from "@/lib/auth-validation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function SignUpForm({
  initialEmail = "",
  initialError = null,
}: {
  initialEmail?: string;
  initialError?: string | null;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState<string>();
  const [passwordErr, setPasswordErr] = useState<string>();
  const [formError, setFormError] = useState<string | null>(initialError);
  const [info, setInfo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;
    const nextEmail = emailError(email);
    const nextPassword = passwordError(password, "create");
    setEmailErr(nextEmail ?? undefined);
    setPasswordErr(nextPassword ?? undefined);
    if (nextEmail || nextPassword) {
      setFormError(null);
      return;
    }
    setPending(true);
    setFormError(null);
    setInfo(null);
    try {
      if (!isSupabaseConfigured()) {
        setFormError(googleAuthError("SUPABASE_NOT_CONFIGURED"));
        return;
      }
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: normalizeEmail(email),
        password,
        options: {
          data: { full_name: name.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/continue`,
        },
      });
      if (error) {
        setFormError(
          "Could not create your account. Try signing in, or use a different email.",
        );
        return;
      }
      analytics.authSignedUp();
      if (data.session) {
        router.push("/continue");
        router.refresh();
        return;
      }
      setInfo("Check your email to confirm your account, then come back to sign in.");
    } catch {
      setFormError(AUTH_NETWORK_ERROR);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <AuthField id="auth-name" label="Your name" hideLabel>
        <div className="relative">
          <AuthIconWrap>
            <User className="size-4" />
          </AuthIconWrap>
          <input
            id="auth-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={authInputClass}
          />
        </div>
      </AuthField>
      <AuthField id="auth-email" label="Email address" error={emailErr} hideLabel>
        <div className="relative">
          <AuthIconWrap>
            <Mail className="size-4" />
          </AuthIconWrap>
          <input
            id="auth-email"
            type="email"
            name="email"
            inputMode="email"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Email address"
            value={email}
            aria-invalid={emailErr ? true : undefined}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailErr(undefined);
              setFormError(null);
            }}
            className={cn(authInputClass, emailErr && "border-destructive")}
          />
        </div>
      </AuthField>
      <PasswordField
        label="Password"
        value={password}
        error={passwordErr}
        autoComplete="new-password"
        hideLabel
        onChange={(value) => {
          setPassword(value);
          setPasswordErr(undefined);
          setFormError(null);
        }}
      />
      {formError ? (
        <p role="alert" aria-live="polite" className={authAlertClass("error")}>
          {formError}
        </p>
      ) : null}
      {info ? (
        <p role="status" className={authAlertClass("info")}>
          {info}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} aria-busy={pending} className={authPrimaryClass}>
        {pending ? "Creating account…" : "Get started →"}
      </Button>
      <AuthDivider />
      <GoogleButton
        disabled={pending}
        onError={(message) => setFormError(message || null)}
      />
    </form>
  );
}
