import { isValidProviderOption } from '@absolutejs/auth';
import { Elysia } from 'elysia';
import { DatabaseType } from '../../../db/schema';
import { getProvider } from '../handlers/providerHandlers';

export const providerPlugin = (db: DatabaseType) =>
	new Elysia().get(
		'/api/v1/providers/:provider',
		async ({ status, params: { provider } }) => {
			if (!isValidProviderOption(provider)) {
				return status(400, `Invalid provider: ${provider}`);
			}
			const providerData = await getProvider({ db, name: provider });

			if (providerData === undefined) {
				return status(404, `Provider with name ${provider} not found`);
			}

			return providerData;
		}
	);
