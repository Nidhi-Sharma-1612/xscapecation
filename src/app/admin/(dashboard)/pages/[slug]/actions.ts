"use server";

import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/current-admin";
import { updateSectionContent } from "@/lib/content/sections";
import type { SectionFormState } from "@/components/admin/SectionForm";

export async function updateSectionAction(
  pageSlug: string,
  sectionKey: string,
  _prevState: SectionFormState,
  formData: FormData,
): Promise<SectionFormState> {
  const raw = formData.get("content");
  let content: Record<string, unknown>;
  try {
    content = JSON.parse(String(raw));
  } catch {
    return { error: "Something went wrong reading the form. Try again." };
  }

  const admin = await getCurrentAdmin();

  try {
    await updateSectionContent(pageSlug, sectionKey, content, admin?.id ?? null);
  } catch {
    return { error: "Could not save this section. Please try again." };
  }

  redirect(`/admin/pages/${pageSlug}`);
}
