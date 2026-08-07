import type { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-charcoal/60">{label}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 font-serif text-3xl font-semibold text-charcoal">
        {value}
      </p>
    </div>
  );
}
