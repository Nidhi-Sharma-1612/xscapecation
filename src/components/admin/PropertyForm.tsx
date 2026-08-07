"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import ArrayField from "@/components/admin/ArrayField";
import ImageUploader from "@/components/admin/ImageUploader";
import type { PropertyFormState } from "@/app/admin/(dashboard)/properties/actions";
import type { properties } from "@/lib/db/schema";

type PropertyRow = typeof properties.$inferSelect;

const inputClass =
  "w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm text-charcoal focus:border-wine-600 focus:ring-2 focus:ring-wine-600/20 focus:outline-none";
const labelClass = "text-sm font-medium text-charcoal/80";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
      <h2 className="mb-5 font-serif text-base font-semibold text-charcoal">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function PropertyForm({
  action,
  initialValues,
}: {
  action: (
    state: PropertyFormState,
    formData: FormData,
  ) => Promise<PropertyFormState>;
  initialValues?: PropertyRow;
}) {
  const [state, formAction, pending] = useActionState<
    PropertyFormState,
    FormData
  >(action, null);

  const [images, setImages] = useState<string[]>(
    initialValues?.images ?? [],
  );
  const [amenities, setAmenities] = useState<string[]>(
    initialValues?.amenities ?? [],
  );
  const [houseRules, setHouseRules] = useState<string[]>(
    initialValues?.houseRules ?? [],
  );
  const [name, setName] = useState(initialValues?.name ?? "");
  const [slug, setSlug] = useState(initialValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues?.slug));
  const [folder] = useState(
    () => initialValues?.id ?? crypto.randomUUID(),
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input
        type="hidden"
        name="amenities"
        value={JSON.stringify(amenities)}
      />
      <input
        type="hidden"
        name="houseRules"
        value={JSON.stringify(houseRules)}
      />

      <Section title="Basic Info">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name">
            <input
              name="name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              className={inputClass}
            />
          </Field>
          <Field label="URL slug">
            <input
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              className={inputClass}
            />
          </Field>
          <Field label="Location">
            <input
              name="location"
              required
              defaultValue={initialValues?.location}
              placeholder="Tulsa, Oklahoma"
              className={inputClass}
            />
          </Field>
          <Field label="Address">
            <input
              name="address"
              required
              defaultValue={initialValues?.address}
              className={inputClass}
            />
          </Field>
          <Field label="Google Maps URL">
            <input
              name="mapUrl"
              required
              defaultValue={initialValues?.mapUrl}
              className={inputClass}
            />
          </Field>
          <Field label="Booking URL">
            <input
              name="bookingUrl"
              required
              defaultValue={initialValues?.bookingUrl}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Description">
        <div className="flex flex-col gap-5">
          <Field label="Description">
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={initialValues?.description}
              className={inputClass}
            />
          </Field>
          <Field label="The Space (optional)">
            <textarea
              name="space"
              rows={4}
              defaultValue={initialValues?.space ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Additional Rules (optional)">
            <textarea
              name="additionalRules"
              rows={3}
              defaultValue={initialValues?.additionalRules ?? ""}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Details">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          <Field label="Guests">
            <input
              type="number"
              name="guests"
              min={1}
              required
              defaultValue={initialValues?.guests ?? 1}
              className={inputClass}
            />
          </Field>
          <Field label="Bedrooms">
            <input
              type="number"
              name="bedrooms"
              min={0}
              required
              defaultValue={initialValues?.bedrooms ?? 1}
              className={inputClass}
            />
          </Field>
          <Field label="Beds (optional)">
            <input
              type="number"
              name="beds"
              min={0}
              defaultValue={initialValues?.beds ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Bathrooms">
            <input
              type="number"
              name="bathrooms"
              min={0}
              required
              defaultValue={initialValues?.bathrooms ?? 1}
              className={inputClass}
            />
          </Field>
          <Field label="Rating">
            <input
              type="number"
              name="rating"
              min={0}
              max={5}
              step={0.01}
              required
              defaultValue={initialValues?.rating ?? 5}
              className={inputClass}
            />
          </Field>
          <Field label="Review count">
            <input
              type="number"
              name="reviews"
              min={0}
              required
              defaultValue={initialValues?.reviews ?? 0}
              className={inputClass}
            />
          </Field>
          <Field label="Price / night ($)">
            <input
              type="number"
              name="priceFrom"
              min={0}
              step={0.01}
              required
              defaultValue={initialValues?.priceFrom ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Check-in">
            <input
              name="checkIn"
              required
              defaultValue={initialValues?.checkIn ?? "3:00 PM"}
              className={inputClass}
            />
          </Field>
          <Field label="Check-out">
            <input
              name="checkOut"
              required
              defaultValue={initialValues?.checkOut ?? "11:00 AM"}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Photos">
        <ImageUploader folder={folder} images={images} onChange={setImages} />
      </Section>

      <Section title="Amenities">
        <ArrayField
          label="Amenities"
          values={amenities}
          onChange={setAmenities}
          placeholder="e.g. Wireless Internet"
        />
      </Section>

      <Section title="House Rules">
        <ArrayField
          label="House Rules"
          values={houseRules}
          onChange={setHouseRules}
          placeholder="e.g. No smoking"
        />
      </Section>

      {state?.error && (
        <p
          role="alert"
          className="rounded-lg bg-wine-600/10 px-4 py-2.5 text-sm font-medium text-wine-700"
        >
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-wine-600 px-6 py-2.5 text-sm font-semibold tracking-wide text-white shadow-md shadow-wine-600/20 transition hover:bg-wine-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save Property"}
        </button>
        <Link
          href="/admin/properties"
          className="text-sm font-medium text-charcoal/60 hover:text-charcoal"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
