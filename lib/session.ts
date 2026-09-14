import { cache } from "react";

import {
  hasCompletedOnboarding,
  isNewSupabaseUser,
} from "@/lib/auth-validation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const getAuthState = cache(async () => {
  if (!isSupabaseConfigured()) {
    return { user: null, onboardingCompleted: false, isNew: false };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    user,
    onboardingCompleted: hasCompletedOnboarding(user),
    isNew: user ? isNewSupabaseUser(user) : false,
  };
});
