"use client";

import { RefreshCw } from "lucide-react";
import { useState, useTransition } from "react";
import { syncAvailabilityAction } from "@/app/admin/(dashboard)/properties/actions";

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

export default function SyncNowButton({
  propertyId,
  initialSyncedAt,
}: {
  propertyId: string;
  initialSyncedAt: Date | null;
}) {
  const [syncedAt, setSyncedAt] = useState(initialSyncedAt);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSync() {
    setError(null);
    startTransition(async () => {
      const result = await syncAvailabilityAction(propertyId);
      if (result?.success) {
        setSyncedAt(new Date());
      } else if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSync}
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-xl border border-charcoal/15 px-3 py-2 text-sm font-medium text-charcoal/70 transition hover:border-wine-600 hover:text-wine-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${pending ? "animate-spin" : ""}`} />
          {pending ? "Syncing…" : "Sync Now"}
        </button>
        <span className="text-xs text-charcoal/50">
          {syncedAt ? `Last synced ${timeAgo(syncedAt)}` : "Never synced"}
        </span>
      </div>
      {error && <p className="text-sm font-medium text-wine-700">{error}</p>}
    </div>
  );
}
