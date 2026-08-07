import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses RLS entirely. Server-only; never expose
 * SUPABASE_SERVICE_ROLE_KEY to the client. Used for admin-triggered storage
 * uploads/deletes where we've already verified the caller via Supabase Auth
 * in the calling Server Action.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

export const PROPERTY_IMAGES_BUCKET = "property-images";
