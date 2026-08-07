import type { LucideIcon } from "lucide-react";

export default function ComingSoon({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-charcoal/15 bg-white px-8 py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="mt-4 font-serif text-lg font-semibold text-charcoal">
        {title}
      </h2>
      <p className="mt-1.5 max-w-sm text-sm text-charcoal/55">
        {description}
      </p>
    </div>
  );
}
