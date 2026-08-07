"use client";

import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

export default function ConfirmButton({
  action,
  label = "Delete",
  confirmLabel = "Delete this?",
  className,
}: {
  action: () => Promise<void>;
  label?: string;
  confirmLabel?: string;
  className?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  if (confirming) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-charcoal/60">{confirmLabel}</span>
        <button
          type="button"
          disabled={pending}
          onClick={() => startTransition(async () => action())}
          className="font-semibold text-wine-600 hover:underline disabled:opacity-50"
        >
          {pending ? "Deleting…" : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-charcoal/50 hover:underline"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className={
        className ??
        "inline-flex items-center gap-1.5 text-sm font-medium text-charcoal/50 transition hover:text-wine-600"
      }
    >
      <Trash2 className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
