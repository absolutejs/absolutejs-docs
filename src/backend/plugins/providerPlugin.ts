import {
	HTTP_STATUS_BAD_REQUEST,
	HTTP_STATUS_NOT_FOUND
} from '../../constants';
import { isValidProviderOption } from '@absolutejs/auth';
import { Elysia } from 'elysia';
import { DatabaseType } from '../../../db/schema';
import { getProvider } from '../handlers/providerHandlers';

export const providerPlugin = (db: DatabaseType) =>
	new Elysia().get(
		'/api/v1/providers/:provider',
		async ({ status, params: { provider } }) => {
			if (!isValidProviderOption(provider)) {
				return status(
					HTTP_STATUS_BAD_REQUEST,
					`Invalid provider: ${provider}`
				);
			}
			const providerData = await getProvider({ db, name: provider });

			if (providerData === undefined) {
				return status(
					HTTP_STATUS_NOT_FOUND,
					`Provider with name ${provider} not found`
				);
			}

			return providerData;
		}
	);
