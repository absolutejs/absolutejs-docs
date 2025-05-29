import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { schema, SchemaType } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { ProviderOption } from '@absolutejs/auth';

type ProviderFunctionProps = {
	db: NeonHttpDatabase<SchemaType>;
	name: ProviderOption;
};

export const createProvider = async ({ db, name }: ProviderFunctionProps) => {
	const [provider] = await db
		.insert(schema.providers)
		.values({
			name
		})
		.returning();

	return provider;
};

export const getProvider = async ({ db, name }: ProviderFunctionProps) => {
	const [provider] = await db
		.select()
		.from(schema.providers)
		.where(eq(schema.providers.name, name))
		.execute();

	return provider;
};
