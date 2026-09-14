"use client";

import { useId, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

import { AuthField, AuthIconWrap, authInputClass } from "@/components/auth/fields";
import { cn } from "@/lib/utils";

export function PasswordField({
  label,
  value,
  error,
  autoComplete,
  hideLabel,
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  autoComplete: string;
  hideLabel?: boolean;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <AuthField id={id} label={label} error={error} hideLabel={hideLabel}>
      <div className="relative">
        <AuthIconWrap>
          <Lock className="size-4" />
        </AuthIconWrap>
        <input
          id={id}
          type={visible ? "text" : "password"}
          name="password"
          autoComplete={autoComplete}
          spellCheck={false}
          placeholder={label}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={cn(authInputClass, "pr-12", error && "border-destructive")}
        />
        <button
          type="button"
          className="absolute top-1/2 right-2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-white/45 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
          aria-pressed={visible}
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </AuthField>
  );
}
