/**
 * Public Supabase keys. Accept both the current publishable key name and
 * the older anon-key name so either dashboard copy-paste works.
 */
export function getSupabasePublicEnv(): {
  url: string;
  key: string;
  configured: boolean;
} {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const key = (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    ""
  );
  return { url, key, configured: Boolean(url && key) };
}

export function isSupabaseConfigured(): boolean {
  return getSupabasePublicEnv().configured;
}
