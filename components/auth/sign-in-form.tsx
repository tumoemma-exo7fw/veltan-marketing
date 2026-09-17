"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";

import { AuthField, AuthIconWrap, authAlertClass, authInputClass, authPrimaryClass } from "@/components/auth/fields";
import { GoogleButton } from "@/components/auth/google-button";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";
import {
  AUTH_GENERIC_ERROR,
  AUTH_NETWORK_ERROR,
  emailError,
  googleAuthError,
  normalizeEmail,
  passwordError,
} from "@/lib/auth-validation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/client";
import {
  readRememberMeFromDocument,
  setRememberMePreference,
  subscribeRememberMe,
} from "@/lib/supabase/remember";
import { cn } from "@/lib/utils";

export function SignInForm({
  initialEmail = "",
  initialError = null,
}: {
  initialEmail?: string;
  initialError?: string | null;
}) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const rememberMe = useSyncExternalStore(
    subscribeRememberMe,
    readRememberMeFromDocument,
    () => false,
  );
  const [emailErr, setEmailErr] = useState<string>();
  const [passwordErr, setPasswordErr] = useState<string>();
  const [formError, setFormError] = useState<string | null>(initialError);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;
    const nextEmail = emailError(email);
    const nextPassword = passwordError(password, "sign-in");
    setEmailErr(nextEmail ?? undefined);
    setPasswordErr(nextPassword ?? undefined);
    if (nextEmail || nextPassword) {
      setFormError(null);
      return;
    }
    setPending(true);
    setFormError(null);
    try {
      if (!isSupabaseConfigured()) {
        setFormError(googleAuthError("SUPABASE_NOT_CONFIGURED"));
        return;
      }
      setRememberMePreference(rememberMe);
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizeEmail(email),
        password,
      });
      if (error) {
        setFormError(AUTH_GENERIC_ERROR);
        return;
      }
      analytics.authSignedIn();
      router.push("/continue");
      router.refresh();
    } catch {
      setFormError(AUTH_NETWORK_ERROR);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
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
            aria-describedby={emailErr ? "auth-email-error" : undefined}
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
        autoComplete="current-password"
        hideLabel
        onChange={(value) => {
          setPassword(value);
          setPasswordErr(undefined);
          setFormError(null);
        }}
      />
      <div className="flex items-center justify-between gap-3 pt-0.5">
        <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-white/70">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMePreference(event.target.checked)}
            className="size-4 rounded-[4px] border-white/30 accent-hero-cyan"
          />
          Remember me
        </label>
        <a
          href={
            email
              ? `/forgot-password?email=${encodeURIComponent(normalizeEmail(email))}`
              : "/forgot-password"
          }
          className="text-[13px] font-medium text-hero-cyan underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
        >
          Forgot password?
        </a>
      </div>
      {formError ? (
        <p role="alert" aria-live="polite" className={authAlertClass("error")}>
          {formError}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} aria-busy={pending} className={authPrimaryClass}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <GoogleButton
        disabled={pending}
        rememberMe={rememberMe}
        onError={(message) => setFormError(message || null)}
      />
    </form>
  );
}
