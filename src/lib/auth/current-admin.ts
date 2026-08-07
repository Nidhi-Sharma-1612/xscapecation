import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { createClient } from "@/lib/supabase/server";

export type CurrentAdmin = {
  id: string;
  email: string;
  name: string;
};

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [admin] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.authUserId, user.id))
    .limit(1);

  return {
    id: admin?.id ?? user.id,
    email: user.email ?? "",
    name: admin?.name ?? user.email?.split("@")[0] ?? "Admin",
  };
}
