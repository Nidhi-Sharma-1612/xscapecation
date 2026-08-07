/**
 * Creates the Supabase Storage bucket used for property images, if it
 * doesn't already exist. Idempotent — safe to re-run.
 *
 * Run with: npm run storage:setup
 */
import { createAdminClient, PROPERTY_IMAGES_BUCKET } from "../src/lib/supabase/admin";

async function main() {
  const supabase = createAdminClient();

  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    throw listError;
  }

  if (buckets.some((bucket) => bucket.name === PROPERTY_IMAGES_BUCKET)) {
    console.log(`✓ Bucket "${PROPERTY_IMAGES_BUCKET}" already exists`);
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(
    PROPERTY_IMAGES_BUCKET,
    {
      public: true,
      fileSizeLimit: "5mb",
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    },
  );

  if (createError) {
    throw createError;
  }

  console.log(`✓ Bucket "${PROPERTY_IMAGES_BUCKET}" created`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Storage setup failed:", error);
    process.exit(1);
  });
