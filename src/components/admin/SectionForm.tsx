"use client";

import { Plus, Trash2 } from "lucide-react";
import { useActionState, useState } from "react";
import ImageField from "@/components/admin/ImageField";
import SectionPreview from "@/components/admin/SectionPreview";
import SortableList from "@/components/admin/SortableList";
import type {
  CardListFieldDef,
  FieldDef,
  ScalarFieldDef,
} from "@/lib/content/section-registry";

const inputClass =
  "w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm text-charcoal focus:border-wine-600 focus:ring-2 focus:ring-wine-600/20 focus:outline-none";

export type SectionFormState = { error?: string } | null;

function ScalarInput({
  field,
  value,
  onChange,
  folder,
}: {
  field: ScalarFieldDef;
  value: unknown;
  onChange: (value: string | string[]) => void;
  folder: string;
}) {
  if (field.kind === "image") {
    return (
      <ImageField
        label={field.label}
        folder={folder}
        value={typeof value === "string" ? value : ""}
        onChange={onChange}
      />
    );
  }

  if (field.kind === "textarea") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-charcoal/80">
          {field.label}
        </label>
        <textarea
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className={inputClass}
        />
      </div>
    );
  }

  if (field.kind === "multilineList") {
    const text = Array.isArray(value) ? value.join("\n") : "";
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-charcoal/80">
          {field.label}
        </label>
        <textarea
          defaultValue={text}
          onChange={(e) =>
            onChange(
              e.target.value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean),
            )
          }
          rows={5}
          className={inputClass}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-charcoal/80">
        {field.label}
      </label>
      <input
        type={field.kind === "url" ? "url" : "text"}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

function CardList({
  field,
  value,
  onChange,
  folder,
}: {
  field: CardListFieldDef;
  value: unknown;
  onChange: (value: Record<string, unknown>[]) => void;
  folder: string;
}) {
  const items = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];

  function updateItem(index: number, key: string, itemValue: unknown) {
    const next = items.map((item, i) =>
      i === index ? { ...item, [key]: itemValue } : item,
    );
    onChange(next);
  }

  function addItem() {
    const blank = Object.fromEntries(
      field.itemFields.map((f) => [f.key, f.kind === "multilineList" ? [] : ""]),
    );
    onChange([...items, blank]);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium text-charcoal/80">
        {field.label}
      </label>

      <SortableList
        items={items}
        onReorder={onChange}
        getId={(_item, index) => `${field.key}-${index}`}
        className="flex flex-col gap-4"
        renderItem={(item, index, dragHandle) => (
          <div className="flex flex-col gap-4 rounded-xl border border-charcoal/10 bg-cream-dark/40 p-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold tracking-wide text-charcoal/50 uppercase">
                {dragHandle}
                {field.itemLabel} {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="inline-flex items-center gap-1 text-xs font-medium text-wine-600 hover:underline"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>

            {field.itemFields.map((subField) => (
              <ScalarInput
                key={subField.key}
                field={subField}
                value={item[subField.key]}
                onChange={(v) => updateItem(index, subField.key, v)}
                folder={folder}
              />
            ))}
          </div>
        )}
      />

      <button
        type="button"
        onClick={addItem}
        className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-charcoal/15 px-3 py-2 text-sm font-medium text-charcoal/70 transition hover:border-wine-600 hover:text-wine-600"
      >
        <Plus className="h-3.5 w-3.5" />
        Add {field.itemLabel}
      </button>
    </div>
  );
}

export default function SectionForm({
  action,
  fields,
  initialContent,
  folder,
}: {
  action: (
    state: SectionFormState,
    formData: FormData,
  ) => Promise<SectionFormState>;
  fields: FieldDef[];
  initialContent: Record<string, unknown>;
  folder: string;
}) {
  const [state, formAction, pending] = useActionState<
    SectionFormState,
    FormData
  >(action, null);
  const [content, setContent] =
    useState<Record<string, unknown>>(initialContent);

  function setField(key: string, value: unknown) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form action={formAction} className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
      <input type="hidden" name="content" value={JSON.stringify(content)} />

      <div className="flex flex-col gap-6 lg:col-span-2">
        <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6">
            {fields.map((field) =>
              field.kind === "cardList" ? (
                <CardList
                  key={field.key}
                  field={field}
                  value={content[field.key]}
                  onChange={(v) => setField(field.key, v)}
                  folder={folder}
                />
              ) : (
                <ScalarInput
                  key={field.key}
                  field={field}
                  value={content[field.key]}
                  onChange={(v) => setField(field.key, v)}
                  folder={folder}
                />
              ),
            )}
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
          className="inline-flex w-fit items-center justify-center rounded-full bg-wine-600 px-6 py-2.5 text-sm font-semibold tracking-wide text-white shadow-md shadow-wine-600/20 transition hover:bg-wine-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save Section"}
        </button>
      </div>

      <div className="lg:sticky lg:top-8">
        <p className="mb-2 text-xs font-semibold tracking-wide text-charcoal/50 uppercase">
          Preview
        </p>
        <SectionPreview fields={fields} content={content} />
      </div>
    </form>
  );
}
