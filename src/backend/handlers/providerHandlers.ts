import { ProviderOption, providerOptions } from '@absolutejs/auth';
import { DatabaseFunctionProps } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const createProvider = async ({
	db,
	schema,
	name
}: DatabaseFunctionProps & { name: ProviderOption }) => {
	const [provider] = await db
		.insert(schema.providers)
		.values({
			name
		})
		.returning();

	return provider;
};

export const getProvider = async ({
	db,
	schema,
	name
}: DatabaseFunctionProps & { name: ProviderOption }) => {
	const [provider] = await db
		.select()
		.from(schema.providers)
		.where(eq(schema.providers.name, name))
		.execute();

	return provider;
};
