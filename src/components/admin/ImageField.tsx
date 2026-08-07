"use client";

import { ImagePlus, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { uploadImageAction } from "@/app/admin/(dashboard)/upload-actions";

export default function ImageField({
  label,
  folder,
  value,
  onChange,
}: {
  label: string;
  folder: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.set("file", file);
    formData.set("folder", folder);
    const result = await uploadImageAction(formData);

    if (result.url) {
      onChange(result.url);
    } else if (result.error) {
      setError(result.error);
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-charcoal/80">{label}</label>
      <div className="flex items-center gap-4">
        {value && (
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-charcoal/10 bg-cream-dark">
            <Image src={value} alt={label} fill sizes="128px" className="object-cover" />
          </div>
        )}
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-charcoal/20 bg-white px-4 py-3 text-sm font-medium text-charcoal/60 transition hover:border-wine-600 hover:text-wine-600">
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading…
            </>
          ) : (
            <>
              <ImagePlus className="h-4 w-4" />
              {value ? "Replace" : "Upload"}
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="text-sm font-medium text-wine-700">{error}</p>}
    </div>
  );
}
