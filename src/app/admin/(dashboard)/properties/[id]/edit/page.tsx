import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import { getAdminPropertyById } from "@/lib/content/properties";
import { updatePropertyAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getAdminPropertyById(id);
  if (!property) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-charcoal">
          Edit {property.name}
        </h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Update this property&apos;s details, photos, and amenities.
        </p>
      </div>

      <PropertyForm
        action={updatePropertyAction.bind(null, id)}
        initialValues={property}
      />
    </div>
  );
}
