"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicEnv } from "@/lib/supabase/env";
import {
  applyAuthCookieLifetime,
  readRememberMeFromDocument,
  serializeAuthCookie,
} from "@/lib/supabase/remember";

export function createClient() {
  const { url, key, configured } = getSupabasePublicEnv();
  if (!configured) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }
  return createBrowserClient(url, key, {
    cookies: {
      getAll() {
        if (typeof document === "undefined" || !document.cookie) return [];
        return document.cookie.split(";").flatMap((part) => {
          const trimmed = part.trim();
          if (!trimmed) return [];
          const eq = trimmed.indexOf("=");
          const name = eq === -1 ? trimmed : trimmed.slice(0, eq);
          const raw = eq === -1 ? "" : trimmed.slice(eq + 1);
          try {
            return [{ name, value: decodeURIComponent(raw) }];
          } catch {
            return [{ name, value: raw }];
          }
        });
      },
      setAll(cookiesToSet) {
        if (typeof document === "undefined") return;
        const persist = readRememberMeFromDocument();
        cookiesToSet.forEach(({ name, value, options }) => {
          document.cookie = serializeAuthCookie(
            name,
            value,
            applyAuthCookieLifetime(options, persist),
          );
        });
      },
    },
  });
}
