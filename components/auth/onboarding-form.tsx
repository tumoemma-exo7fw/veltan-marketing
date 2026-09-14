"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authAlertClass, authInputClass, authPrimaryClass } from "@/components/auth/fields";
import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";
import { AUTH_NETWORK_ERROR } from "@/lib/auth-validation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const ROLES = ["Owner", "Manager", "Front desk", "Clinician", "Other"] as const;

export function OnboardingForm({
  defaultName = "",
  defaultOrganization = "",
}: {
  defaultName?: string;
  defaultOrganization?: string;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState(defaultName);
  const [organization, setOrganization] = useState(defaultOrganization);
  const [role, setRole] = useState<(typeof ROLES)[number]>("Owner");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;
    if (!organization.trim()) {
      setError("Enter your clinic or business name.");
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
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName.trim(),
          organizationName: organization.trim(),
          role,
          phone: phone.trim(),
          onboardingCompleted: true,
        },
      });
      if (updateError) {
        setError(AUTH_NETWORK_ERROR);
        return;
      }
      analytics.onboardingCompleted();
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
      <label className="block space-y-1.5">
        <span className="text-[13px] font-medium text-white/70">Your name</span>
        <input
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className={authInputClass.replace("pl-12", "pl-4")}
          autoComplete="name"
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-[13px] font-medium text-white/70">Clinic or business</span>
        <input
          value={organization}
          onChange={(event) => setOrganization(event.target.value)}
          className={authInputClass.replace("pl-12", "pl-4")}
          autoComplete="organization"
          required
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-[13px] font-medium text-white/70">Your role</span>
        <select
          value={role}
          onChange={(event) => setRole(event.target.value as (typeof ROLES)[number])}
          className={authInputClass.replace("pl-12", "pl-4")}
        >
          {ROLES.map((item) => (
            <option key={item} value={item} className="bg-[#071c1e]">
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-1.5">
        <span className="text-[13px] font-medium text-white/70">Phone (optional)</span>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className={authInputClass.replace("pl-12", "pl-4")}
          autoComplete="tel"
          inputMode="tel"
        />
      </label>
      {error ? (
        <p role="alert" className={authAlertClass("error")}>
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className={authPrimaryClass}>
        {pending ? "Saving…" : "Continue"}
      </Button>
    </form>
  );
}
