import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabasePublicEnv } from "@/lib/supabase/env";
import {
  applyAuthCookieLifetime,
  isPersistentSession,
} from "@/lib/supabase/remember";

export async function createClient() {
  const { url, key, configured } = getSupabasePublicEnv();
  if (!configured) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  const cookieStore = await cookies();
  const persist = isPersistentSession(cookieStore.getAll());

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet, headers) {
        void headers;
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, applyAuthCookieLifetime(options, persist)),
          );
        } catch {
          // Called from a Server Component. Proxy refreshes the session.
        }
      },
    },
  });
}
