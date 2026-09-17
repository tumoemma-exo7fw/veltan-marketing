import type { CookieOptions } from "@supabase/ssr";

/** Browser preference: persist the Supabase session across browser restarts. */
export const REMEMBER_ME_COOKIE = "veltan-remember-me";
export const REMEMBER_ME_VALUE = "1";
const REMEMBER_ME_MAX_AGE = 400 * 24 * 60 * 60;

export function isPersistentSession(
  cookies: Iterable<{ name: string; value?: string }>,
): boolean {
  for (const cookie of cookies) {
    if (cookie.name === REMEMBER_ME_COOKIE && cookie.value === REMEMBER_ME_VALUE) {
      return true;
    }
  }
  return false;
}

export function applyAuthCookieLifetime(
  options: CookieOptions,
  persist: boolean,
): CookieOptions {
  // Deleting cookies must keep maxAge: 0 so the browser actually clears them.
  if (persist || options.maxAge === 0) {
    return options;
  }
  const next = { ...options };
  delete next.maxAge;
  delete next.expires;
  return next;
}

const rememberListeners = new Set<() => void>();

function emitRememberMe() {
  rememberListeners.forEach((listener) => listener());
}

export function subscribeRememberMe(listener: () => void) {
  rememberListeners.add(listener);
  return () => {
    rememberListeners.delete(listener);
  };
}

export function readRememberMeFromDocument(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((part) => {
    const [name, value] = part.trim().split("=");
    return name === REMEMBER_ME_COOKIE && value === REMEMBER_ME_VALUE;
  });
}

export function setRememberMePreference(persist: boolean) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  if (persist) {
    document.cookie = `${REMEMBER_ME_COOKIE}=${REMEMBER_ME_VALUE}; Path=/; Max-Age=${REMEMBER_ME_MAX_AGE}; SameSite=Lax${secure}`;
  } else {
    document.cookie = `${REMEMBER_ME_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
  }
  emitRememberMe();
}

export function serializeAuthCookie(
  name: string,
  value: string,
  options: CookieOptions,
): string {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (typeof options.maxAge === "number") {
    parts.push(`Max-Age=${Math.trunc(options.maxAge)}`);
  }
  if (options.expires) {
    const expires =
      options.expires instanceof Date ? options.expires : new Date(options.expires);
    parts.push(`Expires=${expires.toUTCString()}`);
  }
  parts.push(`Path=${options.path ?? "/"}`);
  if (options.domain) parts.push(`Domain=${options.domain}`);
  if (options.secure) parts.push("Secure");
  const sameSite = options.sameSite;
  if (sameSite === true || sameSite === "strict") parts.push("SameSite=Strict");
  else if (sameSite === "lax") parts.push("SameSite=Lax");
  else if (sameSite === "none") parts.push("SameSite=None");
  return parts.join("; ");
}
