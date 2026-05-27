export const cliUsage = `\
# 0.35.0 ships a first-party migration CLI. The package's Postgres stores
# are Drizzle tables; the runner enumerates them via getTableConfig and
# emits idempotent DDL (CREATE TABLE IF NOT EXISTS, ALTER TABLE ADD
# COLUMN IF NOT EXISTS, indexes).
#
# All migrations: 19 blocks (sessions, credentials, mfa, oidc, scim, vc, ...).

bunx absolute-auth migrate --database-url $DATABASE_URL

# Run only specific blocks (handy on partial rollouts):

bunx absolute-auth migrate --database-url $DATABASE_URL \\\\
  --blocks sessions,credentials,mfa,oidc,vc

# The runner uses @neondatabase/serverless Pool (not the HTTP client)
# because some migrations are multi-statement and the HTTP shape only
# handles single statements. Works against any Postgres-compatible
# database — Neon, Supabase, plain Postgres, RDS.`;

export const programmaticMigration = `\
// You can also drive the runner from a script — useful for tests
// that spin up a fresh database, or for "migrate on boot" patterns.
import { runMigrations, blockMigrations } from '@absolutejs/auth';

await runMigrations({
  databaseUrl: process.env.DATABASE_URL,
  // Omit blocks to apply every migration the package ships.
  blocks: ['sessions', 'credentials', 'mfa', 'oidc']
});

// The blockMigrations export is the underlying manifest — each block
// names its tables + ships a single 0001_init migration. Adding new
// blocks in future package releases will append migrations idempotently.`;
