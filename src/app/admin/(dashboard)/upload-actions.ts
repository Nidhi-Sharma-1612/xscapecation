"use server";

import { randomUUID } from "node:crypto";
import {
  createAdminClient,
  PROPERTY_IMAGES_BUCKET,
} from "@/lib/supabase/admin";

export async function uploadImageAction(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file provided." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are allowed." };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: "Images must be under 5MB." };
  }

  const folder = String(formData.get("folder") || "unfiled");
  const extension = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${randomUUID()}.${extension}`;

  const supabase = createAdminClient();
  const { error } = await supabase.storage
    .from(PROPERTY_IMAGES_BUCKET)
    .upload(path, file, { contentType: file.type });

  if (error) {
    return { error: "Upload failed. Please try again." };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(PROPERTY_IMAGES_BUCKET).getPublicUrl(path);

  return { url: publicUrl };
}
