"use client";

import { Plus, Trash2 } from "lucide-react";
import { useActionState, useState } from "react";
import ImageField from "@/components/admin/ImageField";
import type { SiteSettings } from "@/lib/content/site-settings";
import {
  updateSiteSettingsAction,
  type SiteSettingsFormState,
} from "@/app/admin/(dashboard)/settings/site/actions";

const inputClass =
  "w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm text-charcoal focus:border-wine-600 focus:ring-2 focus:ring-wine-600/20 focus:outline-none";
const labelClass = "text-sm font-medium text-charcoal/80";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

export default function SiteSettingsForm({
  initialValues,
}: {
  initialValues: SiteSettings;
}) {
  const [state, formAction, pending] = useActionState<
    SiteSettingsFormState,
    FormData
  >(updateSiteSettingsAction, null);

  const [logoUrl, setLogoUrl] = useState(initialValues.logoUrl ?? "");
  const [platforms, setPlatforms] = useState(initialValues.bookingPlatforms);

  function updatePlatform(index: number, key: "label" | "href", value: string) {
    setPlatforms((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [key]: value } : p)),
    );
  }

  function addPlatform() {
    setPlatforms((prev) => [...prev, { label: "", href: "" }]);
  }

  function removePlatform(index: number) {
    setPlatforms((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="logoUrl" value={logoUrl} />
      <input
        type="hidden"
        name="bookingPlatforms"
        value={JSON.stringify(platforms)}
      />

      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
        <h2 className="mb-5 font-serif text-base font-semibold text-charcoal">
          Contact
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone">
            <input
              name="phone"
              required
              defaultValue={initialValues.phone}
              className={inputClass}
            />
          </Field>
          <Field label="Email">
            <input
              name="email"
              type="email"
              required
              defaultValue={initialValues.email}
              className={inputClass}
            />
          </Field>
          <Field label="Address (optional)">
            <input
              name="address"
              defaultValue={initialValues.address ?? ""}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
        <h2 className="mb-5 font-serif text-base font-semibold text-charcoal">
          Branding
        </h2>
        <div className="flex flex-col gap-5">
          <ImageField
            label="Logo"
            folder="site-settings"
            value={logoUrl}
            onChange={setLogoUrl}
          />
          <Field label="Footer blurb">
            <textarea
              name="footerBlurb"
              rows={3}
              defaultValue={initialValues.footerBlurb ?? ""}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
        <h2 className="mb-5 font-serif text-base font-semibold text-charcoal">
          Social Links
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Instagram URL (optional)">
            <input
              name="instagramUrl"
              defaultValue={initialValues.instagramUrl ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Facebook URL (optional)">
            <input
              name="facebookUrl"
              defaultValue={initialValues.facebookUrl ?? ""}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-base font-semibold text-charcoal">
            Booking Platforms
          </h2>
          <p className="text-xs text-charcoal/50">
            Shown on the Footer, Contact, and Review pages
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {platforms.map((platform, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                value={platform.label}
                onChange={(e) => updatePlatform(index, "label", e.target.value)}
                placeholder="Label (e.g. Airbnb)"
                className={`${inputClass} max-w-40`}
              />
              <input
                value={platform.href}
                onChange={(e) => updatePlatform(index, "href", e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removePlatform(index)}
                aria-label="Remove platform"
                className="shrink-0 text-charcoal/40 transition hover:text-wine-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addPlatform}
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-charcoal/15 px-3 py-2 text-sm font-medium text-charcoal/70 transition hover:border-wine-600 hover:text-wine-600"
        >
          <Plus className="h-3.5 w-3.5" />
          Add platform
        </button>
      </div>

      {state?.error && (
        <p
          role="alert"
          className="rounded-lg bg-wine-600/10 px-4 py-2.5 text-sm font-medium text-wine-700"
        >
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="rounded-lg bg-green-600/10 px-4 py-2.5 text-sm font-medium text-green-700">
          Settings saved.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-fit items-center justify-center rounded-full bg-wine-600 px-6 py-2.5 text-sm font-semibold tracking-wide text-white shadow-md shadow-wine-600/20 transition hover:bg-wine-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save Settings"}
      </button>
    </form>
  );
}
