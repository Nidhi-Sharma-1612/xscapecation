import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Falls back to an unreachable placeholder at import time (rather than
// throwing) so `next build` can statically analyze admin routes without
// live credentials. Queries against this placeholder fail at request time
// with a clear connection error once someone actually opens the page —
// that's expected until real Supabase credentials are set in .env.local.
const connectionString =
  process.env.DATABASE_URL ??
  "postgres://placeholder:placeholder@localhost:5432/placeholder";

// Small, bounded pool + fast-failing timeouts: `next build` spins up several
// parallel workers, each getting its own connection pool (module-scope
// singleton per process). Left unbounded, that's up to 10 connections per
// worker against a free-tier Supabase compute — easily exhausted, which
// showed up as builds hanging indefinitely rather than erroring cleanly.
const client = postgres(connectionString, {
  prepare: false,
  max: 3,
  connect_timeout: 10,
  idle_timeout: 20,
});

export const db = drizzle(client, { schema });
