import { notFound } from "next/navigation";
import SectionForm from "@/components/admin/SectionForm";
import { getSectionContent } from "@/lib/content/sections";
import { getSectionDef } from "@/lib/content/section-registry";
import { updateSectionAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminSectionEditPage({
  params,
}: {
  params: Promise<{ slug: string; sectionKey: string }>;
}) {
  const { slug, sectionKey } = await params;
  const def = getSectionDef(slug, sectionKey);
  if (!def) notFound();

  const content = await getSectionContent(slug, sectionKey);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-charcoal">
          {def.name}
        </h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Edit this section&apos;s content.
        </p>
      </div>

      <SectionForm
        action={updateSectionAction.bind(null, slug, sectionKey)}
        fields={def.fields}
        initialContent={content}
        folder={`sections/${slug}-${sectionKey}`}
      />
    </div>
  );
}
