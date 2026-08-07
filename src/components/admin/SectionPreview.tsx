import Image from "next/image";
import type {
  CardListFieldDef,
  FieldDef,
  ScalarFieldDef,
} from "@/lib/content/section-registry";

function firstString(content: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const value = content[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return null;
}

/**
 * A generic, not-pixel-perfect preview that adapts to whichever fields a
 * section has (image / eyebrow+heading / body text / a card list), styled
 * with the site's own tokens. Gives a real sense of the content without a
 * bespoke preview per section type — the actual page is one click away.
 */
export default function SectionPreview({
  fields,
  content,
}: {
  fields: FieldDef[];
  content: Record<string, unknown>;
}) {
  const scalarFields = fields.filter(
    (f): f is ScalarFieldDef => f.kind !== "cardList",
  );
  const cardListField = fields.find(
    (f): f is CardListFieldDef => f.kind === "cardList",
  );

  const imageField = scalarFields.find((f) => f.kind === "image");
  const imageSrc = imageField ? content[imageField.key] : null;

  const eyebrow = firstString(content, ["eyebrow"]);
  const heading = firstString(content, ["heading", "title"]);
  const body = firstString(content, ["paragraph", "subheading", "description"]);

  const items = cardListField && Array.isArray(content[cardListField.key])
    ? (content[cardListField.key] as Record<string, unknown>[])
    : [];
  const itemImageField = cardListField?.itemFields.find((f) => f.kind === "image");

  const hasHeaderContent = Boolean(eyebrow || heading || body);

  return (
    <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-cream">
      {typeof imageSrc === "string" && imageSrc && (
        <div className="relative h-40 w-full bg-cream-dark">
          <Image src={imageSrc} alt="" fill sizes="360px" className="object-cover" />
        </div>
      )}

      {hasHeaderContent && (
        <div className="p-6 text-center">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-wine-600 uppercase">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h3 className="font-serif text-2xl font-semibold text-balance text-charcoal">
              {heading}
            </h3>
          )}
          {body && <p className="mt-2 text-sm text-charcoal/70">{body}</p>}
        </div>
      )}

      {items.length > 0 && (
        <div
          className={`grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 ${hasHeaderContent ? "border-t border-charcoal/10" : ""}`}
        >
          {items.slice(0, 6).map((item, i) => {
            const itemImage =
              itemImageField && typeof item[itemImageField.key] === "string"
                ? (item[itemImageField.key] as string)
                : null;
            const itemTitle = firstString(item, ["title", "name", "label", "value"]);
            const itemDesc = firstString(item, ["description", "quote", "detail"]);

            return (
              <div key={i} className="rounded-xl bg-white p-3 shadow-sm">
                {itemImage && (
                  <div className="relative mb-2 h-20 w-full overflow-hidden rounded-lg bg-cream-dark">
                    <Image src={itemImage} alt="" fill sizes="200px" className="object-cover" />
                  </div>
                )}
                {itemTitle && (
                  <p className="font-serif text-sm font-semibold text-charcoal">
                    {itemTitle}
                  </p>
                )}
                {itemDesc && (
                  <p className="mt-1 line-clamp-2 text-xs text-charcoal/60">
                    {itemDesc}
                  </p>
                )}
              </div>
            );
          })}
          {items.length > 6 && (
            <p className="text-xs text-charcoal/40">+{items.length - 6} more</p>
          )}
        </div>
      )}

      {!hasHeaderContent && items.length === 0 && !imageSrc && (
        <p className="p-6 text-center text-sm text-charcoal/40">
          Start filling in the form to see a preview.
        </p>
      )}
    </div>
  );
}
