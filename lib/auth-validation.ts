export const AUTH_GENERIC_ERROR = "Email or password is incorrect.";
export const AUTH_NETWORK_ERROR = "Something went wrong. Please try again.";
export const AUTH_GOOGLE_UNAVAILABLE =
  "Google sign-in isn’t connected yet. Use email, or try again in a moment.";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function emailError(value: string): string | null {
  const email = normalizeEmail(value);
  if (!email) return "Enter your email address.";
  if (!EMAIL_RE.test(email)) return "Enter a valid email address.";
  return null;
}

export function passwordError(
  value: string,
  mode: "sign-in" | "create",
): string | null {
  if (!value) return "Enter your password.";
  if (mode === "create" && value.length < 8) {
    return "Use at least 8 characters.";
  }
  return null;
}

export function googleAuthError(code?: string, message?: string): string {
  const blob = `${code ?? ""} ${message ?? ""}`.toUpperCase();
  if (
    blob.includes("PROVIDER") ||
    blob.includes("NOT ENABLED") ||
    blob.includes("UNSUPPORTED") ||
    blob.includes("SUPABASE_NOT_CONFIGURED")
  ) {
    return AUTH_GOOGLE_UNAVAILABLE;
  }
  if (
    blob.includes("CANCEL") ||
    blob.includes("ACCESS_DENIED") ||
    blob.includes("DENIED")
  ) {
    return "Google sign-in was cancelled. You can try again, or use email.";
  }
  return AUTH_NETWORK_ERROR;
}

export function isNewSupabaseUser(user: {
  created_at?: string | null;
  last_sign_in_at?: string | null;
  user_metadata?: Record<string, unknown> | null;
}): boolean {
  if (user.user_metadata?.onboardingCompleted === true) return false;
  const created = Date.parse(user.created_at ?? "");
  const last = Date.parse(user.last_sign_in_at ?? user.created_at ?? "");
  if (!Number.isFinite(created) || !Number.isFinite(last)) return true;
  return Math.abs(last - created) < 30_000;
}

export function hasCompletedOnboarding(user: {
  user_metadata?: Record<string, unknown> | null;
} | null): boolean {
  return user?.user_metadata?.onboardingCompleted === true;
}

export function safeNextPath(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/continue";
  }
  if (value.startsWith("/auth")) return "/continue";
  return value;
}
