import { providerOptions } from '@absolutejs/auth';
import { createProvider } from '../../src/backend/handlers/providerHandlers';
import { schema } from '../schema';
import { env } from 'process';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env file');
}

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { schema });

const existing = await db.select().from(schema.providers).execute();
const existingNames = new Set(existing.map(r => r.name));
const toCreate = providerOptions.filter(name => !existingNames.has(name));

if (toCreate.length === 0) {
  console.log('No new providers to create');
  process.exit(0);
}

const creationPromises = toCreate.map(name =>
  createProvider({ db, schema, name })
);

const results = await Promise.allSettled(creationPromises);

results.forEach((res, i) => {
  const name = toCreate[i];
  if (res.status === 'fulfilled') {
    console.log(`✔ Created provider "${name}"`);
  } else {
    console.warn(`✖ Failed to create provider "${name}":`, res.reason);
  }
});
