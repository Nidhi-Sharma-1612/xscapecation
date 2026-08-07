import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Xscapecation Oasis",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-charcoal px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Image
            src="/images/brand/logo.png"
            alt="Xscapecation Oasis"
            width={64}
            height={64}
            className="h-16 w-16"
            priority
          />
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
              Admin Panel
            </p>
            <h1 className="font-serif text-2xl font-semibold text-white">
              Xscapecation Oasis
            </h1>
          </div>
        </div>

        <div className="rounded-2xl bg-cream p-8 shadow-2xl shadow-black/30">
          <h2 className="mb-1 font-serif text-xl font-semibold text-charcoal">
            Sign in
          </h2>
          <p className="mb-6 text-sm text-charcoal/60">
            Manage your site&apos;s content, properties, and settings.
          </p>
          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>
    </main>
  );
}
