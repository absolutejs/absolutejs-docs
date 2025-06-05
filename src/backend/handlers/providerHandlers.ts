import { ProviderOption } from '@absolutejs/auth';
import { eq, or } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { Provider, schema, SchemaType } from '../../../db/schema';
import { PROVIDER_STATUSES } from '../../constants';

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

export const updateProviderStatus = async ({
	db,
	name,
	column,
	status
}: ProviderFunctionProps & {
	column: Extract<
		keyof Provider,
		| 'authorize_status'
		| 'profile_status'
		| 'refresh_status'
		| 'revoke_status'
	>;
	status: (typeof PROVIDER_STATUSES)[number];
}) => {
	const [updatedProvider] = await db
		.update(schema.providers)
		.set({ [column]: status })
		.where(eq(schema.providers.name, name))
		.returning()
		.execute();

	return updatedProvider;
};

export const resetAllProviderStatuses = async (
	db: NeonHttpDatabase<SchemaType>
) => {
	await db.update(schema.providers).set({
		authorize_status: 'untested',
		profile_status: 'untested',
		refresh_status: 'untested',
		revoke_status: 'untested'
	});
};

export const getProvidersByStatus = async (
	db: NeonHttpDatabase<SchemaType>,
	status: (typeof PROVIDER_STATUSES)[number]
) => {
	const providers = await db
		.select({
			authorize: schema.providers.authorize_status,
			name: schema.providers.name,
			profile: schema.providers.profile_status,
			refresh: schema.providers.refresh_status,
			revoke: schema.providers.revoke_status
		})
		.from(schema.providers)
		.where(
			or(
				eq(schema.providers.authorize_status, status),
				eq(schema.providers.profile_status, status),
				eq(schema.providers.refresh_status, status),
				eq(schema.providers.revoke_status, status)
			)
		);

	return providers;
};
