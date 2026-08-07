"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  changePassword,
  type ChangePasswordState,
} from "./actions";

const initialState: ChangePasswordState = null;

export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(
    changePassword,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex max-w-md flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="currentPassword"
          className="text-sm font-medium text-charcoal/80"
        >
          Current password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm text-charcoal focus:border-wine-600 focus:ring-2 focus:ring-wine-600/20 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="newPassword"
          className="text-sm font-medium text-charcoal/80"
        >
          New password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          className="rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm text-charcoal focus:border-wine-600 focus:ring-2 focus:ring-wine-600/20 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-charcoal/80"
        >
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          className="rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm text-charcoal focus:border-wine-600 focus:ring-2 focus:ring-wine-600/20 focus:outline-none"
        />
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
          Password updated successfully.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex w-fit items-center justify-center rounded-full bg-wine-600 px-6 py-2.5 text-sm font-semibold tracking-wide text-white shadow-md shadow-wine-600/20 transition hover:bg-wine-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Updating…" : "Update Password"}
      </button>
    </form>
  );
}
