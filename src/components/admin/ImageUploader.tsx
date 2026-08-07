"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { uploadImageAction } from "@/app/admin/(dashboard)/upload-actions";
import SortableList from "@/components/admin/SortableList";

export default function ImageUploader({
  folder,
  images,
  onChange,
}: {
  folder: string;
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);

    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("folder", folder);
      const result = await uploadImageAction(formData);
      if (result.url) {
        uploaded.push(result.url);
      } else if (result.error) {
        setError(result.error);
      }
    }

    if (uploaded.length > 0) {
      onChange([...images, ...uploaded]);
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function remove(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-charcoal/80">
        Photos
      </label>

      {images.length > 0 && (
        <SortableList
          items={images}
          onReorder={onChange}
          getId={(src) => src}
          strategy="grid"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          renderItem={(src, index, dragHandle) => (
            <div className="group relative aspect-square overflow-hidden rounded-xl border border-charcoal/10 bg-cream-dark">
              <Image
                src={src}
                alt={`Photo ${index + 1}`}
                fill
                sizes="200px"
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-between bg-charcoal/0 p-1.5 opacity-0 transition group-hover:bg-charcoal/40 group-hover:opacity-100">
                <div className="flex w-full items-center justify-between">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow">
                    {dragHandle}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    aria-label="Remove photo"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-charcoal shadow"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              {index === 0 && (
                <span className="absolute top-1.5 left-1.5 rounded-full bg-wine-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Cover
                </span>
              )}
            </div>
          )}
        />
      )}

      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-charcoal/20 bg-white px-4 py-6 text-sm font-medium text-charcoal/60 transition hover:border-wine-600 hover:text-wine-600">
        {uploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading…
          </>
        ) : (
          <>
            <ImagePlus className="h-4 w-4" />
            Add photos
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </label>

      {error && <p className="text-sm font-medium text-wine-700">{error}</p>}
    </div>
  );
}
