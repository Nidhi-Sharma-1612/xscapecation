import { Bath, BedDouble, Home, Pencil, Plus, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { getAdminProperties } from "@/lib/content/properties";
import { deletePropertyAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const properties = await getAdminProperties();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-charcoal">
            Properties
          </h1>
          <p className="mt-1 text-sm text-charcoal/60">
            Manage your listed properties.
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          className="inline-flex items-center gap-2 rounded-full bg-wine-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-wine-600/20 transition hover:bg-wine-700"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-charcoal/15 bg-white px-8 py-20 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wine-600/10 text-wine-600">
            <Home className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-serif text-lg font-semibold text-charcoal">
            No properties yet
          </h2>
          <p className="mt-1.5 max-w-sm text-sm text-charcoal/55">
            Add your first property to get it live on the site.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-sm"
            >
              <div className="relative h-40 w-full bg-cream-dark">
                {property.images[0] && (
                  <Image
                    src={property.images[0]}
                    alt={property.name}
                    fill
                    sizes="360px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="font-serif text-base font-semibold text-charcoal">
                    {property.name}
                  </h3>
                  <p className="text-sm text-charcoal/55">
                    {property.location}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-charcoal/60">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {property.guests}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BedDouble className="h-3.5 w-3.5" />
                    {property.bedrooms}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" />
                    {property.bathrooms}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                    {property.rating}
                  </span>
                </div>

                <p className="font-serif text-lg font-semibold text-charcoal">
                  ${Number(property.priceFrom)}
                  <span className="text-xs font-normal text-charcoal/50">
                    {" "}
                    / night
                  </span>
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-charcoal/8 pt-3">
                  <Link
                    href={`/admin/properties/${property.id}/edit`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-wine-600 hover:underline"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                  <ConfirmButton
                    action={deletePropertyAction.bind(null, property.id)}
                    confirmLabel={`Delete ${property.name}?`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
