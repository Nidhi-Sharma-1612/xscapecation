/**
 * Enables Row Level Security on every app table with zero policies
 * (default-deny). This app never queries these tables through Supabase's
 * PostgREST/anon-key API — all reads/writes go through Drizzle over the
 * direct DATABASE_URL connection, whose role owns these tables and so
 * bypasses RLS regardless. Without this, Supabase's auto-generated REST API
 * exposes every public-schema table to anyone holding the public anon key,
 * bypassing the app's own auth checks entirely.
 *
 * Run once per fresh database (e.g. after db:push on a new project). Safe
 * to re-run — ENABLE ROW LEVEL SECURITY is idempotent.
 *
 * Run with: npm run db:secure
 */
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

const TABLES = [
  "activity_log",
  "admin_users",
  "pages",
  "properties",
  "sections",
  "site_settings",
];

async function main() {
  for (const table of TABLES) {
    await sql.unsafe(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY`);
    console.log(`✓ RLS enabled on "${table}"`);
  }
  await sql.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
