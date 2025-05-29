import { isValidProviderOption } from '@absolutejs/auth';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import Elysia from 'elysia';
import { SchemaType } from '../../../db/schema';
import { getProvider } from '../handlers/providerHandlers';

export const providerPlugin = (db: NeonHttpDatabase<SchemaType>) =>
	new Elysia().get(
		'/api/v1/providers/:provider',
		async ({ error, params: { provider } }) => {
			if (!isValidProviderOption(provider)) {
				return error('Bad Request', `Invalid provider: ${provider}`);
			}
			const providerData = await getProvider({ db, name: provider });

			if (providerData === undefined) {
				return error(
					'Not Found',
					`Provider with name ${provider} not found`
				);
			}

			return providerData;
		}
	);
