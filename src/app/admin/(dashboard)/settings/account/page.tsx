import { getCurrentAdmin } from "@/lib/auth/current-admin";
import ChangePasswordForm from "./ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function AdminAccountSettingsPage() {
  const admin = await getCurrentAdmin();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-charcoal">
          Account Settings
        </h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Manage your admin profile and password.
        </p>
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-base font-semibold text-charcoal">
          Profile
        </h2>
        <dl className="mt-3 grid max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          <dt className="text-charcoal/50">Name</dt>
          <dd className="text-charcoal">{admin?.name}</dd>
          <dt className="text-charcoal/50">Email</dt>
          <dd className="text-charcoal">{admin?.email}</dd>
        </dl>
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-base font-semibold text-charcoal">
          Change Password
        </h2>
        <p className="mt-1 text-sm text-charcoal/55">
          You&apos;ll need your current password to set a new one.
        </p>
        <div className="mt-4">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
