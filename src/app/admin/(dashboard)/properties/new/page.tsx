import PropertyForm from "@/components/admin/PropertyForm";
import { createPropertyAction } from "../actions";

export default function NewPropertyPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-charcoal">
          Add Property
        </h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Create a new property listing.
        </p>
      </div>

      <PropertyForm action={createPropertyAction} />
    </div>
  );
}
