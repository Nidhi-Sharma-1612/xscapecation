import { Clock, FileText, Home, LayoutGrid } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { getRecentActivity } from "@/lib/content/activity";
import { getDashboardStats } from "@/lib/content/dashboard";
import { SITE_PAGES } from "@/lib/content/site-pages";

export const dynamic = "force-dynamic";

function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function AdminDashboardPage() {
  const [stats, activity] = await Promise.all([
    getDashboardStats(),
    getRecentActivity(5),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-charcoal">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Overview of your site&apos;s content.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FileText} label="Total Pages" value={SITE_PAGES.length} />
        <StatCard icon={LayoutGrid} label="Total Sections" value={stats.sections} />
        <StatCard icon={Home} label="Total Properties" value={stats.properties} />
        <StatCard
          icon={Clock}
          label="Last Activity"
          value={activity[0] ? timeAgo(activity[0].createdAt) : "—"}
        />
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-lg font-semibold text-charcoal">
          Recent Activity
        </h2>
        {activity.length === 0 ? (
          <p className="mt-4 text-sm text-charcoal/50">
            No activity yet. Changes you make across the admin panel will show
            up here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-charcoal/8">
            {activity.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    {entry.action}
                  </p>
                  <p className="text-xs text-charcoal/50">
                    {entry.adminName ?? "Admin"} · {entry.entityLabel}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-charcoal/40">
                  {timeAgo(entry.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
