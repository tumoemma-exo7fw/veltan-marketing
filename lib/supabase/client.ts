"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicEnv } from "@/lib/supabase/env";

export function createClient() {
  const { url, key, configured } = getSupabasePublicEnv();
  if (!configured) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }
  return createBrowserClient(url, key);
}
