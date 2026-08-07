"use client";

import { Lock, Mail } from "lucide-react";
import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = null;

export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="redirectTo" value={redirectTo ?? ""} />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-sm font-medium tracking-wide text-charcoal/80"
        >
          Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="admin@xscapecationoasis.com"
            className="w-full rounded-xl border border-charcoal/15 bg-white py-3 pr-4 pl-11 text-sm text-charcoal placeholder:text-charcoal/35 focus:border-wine-600 focus:ring-2 focus:ring-wine-600/20 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium tracking-wide text-charcoal/80"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="w-full rounded-xl border border-charcoal/15 bg-white py-3 pr-4 pl-11 text-sm text-charcoal placeholder:text-charcoal/35 focus:border-wine-600 focus:ring-2 focus:ring-wine-600/20 focus:outline-none"
          />
        </div>
      </div>

      {state?.error && (
        <p
          role="alert"
          className="rounded-lg bg-wine-600/10 px-4 py-2.5 text-sm font-medium text-wine-700"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-wine-600 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-wine-600/20 transition hover:bg-wine-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
