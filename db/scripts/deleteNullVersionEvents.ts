#!/usr/bin/env bun
import { neon } from '@neondatabase/serverless';
import { env } from 'process';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, isNull, or } from 'drizzle-orm';
import { schema } from '../schema';

if (!env.DATABASE_URL) {
	throw new Error('Please set DATABASE_URL in your .env file');
}

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { schema });

const deleted = await db
	.delete(schema.telemetryEvents)
	.where(
		or(
			isNull(schema.telemetryEvents.version),
			eq(schema.telemetryEvents.version, ''),
			eq(schema.telemetryEvents.version, 'unknown')
		)
	)
	.returning({ id: schema.telemetryEvents.id });

console.log(`Deleted ${deleted.length} telemetry events with unknown version.`);
process.exit(0);
