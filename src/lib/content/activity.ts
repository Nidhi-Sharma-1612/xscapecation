import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { activityLog, adminUsers } from "@/lib/db/schema";

export async function logActivity(entry: {
  adminUserId: string | null;
  action: string;
  entityType: string;
  entityLabel: string;
}) {
  await db.insert(activityLog).values(entry);
}

export async function getRecentActivity(limit = 5) {
  return db
    .select({
      id: activityLog.id,
      action: activityLog.action,
      entityType: activityLog.entityType,
      entityLabel: activityLog.entityLabel,
      createdAt: activityLog.createdAt,
      adminName: adminUsers.name,
    })
    .from(activityLog)
    .leftJoin(adminUsers, eq(activityLog.adminUserId, adminUsers.id))
    .orderBy(desc(activityLog.createdAt))
    .limit(limit);
}
