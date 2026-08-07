import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import { getSiteSettings } from "@/lib/content/site-settings";

export const dynamic = "force-dynamic";

export default async function AdminSiteSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-charcoal">
          Site Settings
        </h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Phone, email, social links, and booking platforms shown across the
          site.
        </p>
      </div>

      <SiteSettingsForm initialValues={settings} />
    </div>
  );
}
