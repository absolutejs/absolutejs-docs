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

export const seedProviders = async ({
	db: database,
	schema: databaseSchema
}: DatabaseFunctionProps) => {
	const existingProviderRecords = await database
		.select()
		.from(databaseSchema.providers)
		.execute();
	const existingProviderNames = new Set<string>();
	for (const record of existingProviderRecords) {
		existingProviderNames.add(record.name);
	}
	const creationPromises = providerOptions.flatMap((providerName) =>
		existingProviderNames.has(providerName)
			? []
			: [
					createProvider({
						db: database,
						schema: databaseSchema,
						name: providerName
					})
				]
	);
	const settlementResults = await Promise.allSettled(creationPromises);
	settlementResults
		.filter((settlement) => settlement.status === 'rejected')
		.forEach((settlement) =>
			console.warn('Failed to create provider:', settlement.reason)
		);
	return settlementResults
		.filter((settlement) => settlement.status === 'fulfilled')
		.map((settlement) => settlement.value);
};
