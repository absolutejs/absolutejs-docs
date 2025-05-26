import {
	createAuthConfiguration,
	isValidProviderOption,
	instantiateUserSession
} from '@absolutejs/auth';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { SchemaType, User, schema } from '../../../db/schema';
import { providerData } from '../../frontend/data/providerData';
import { createUser, getUser } from '../handlers/userHandlers';
import { providersConfiguration } from './providersConfiguration';

export const absoluteAuthConfig = (db: NeonHttpDatabase<SchemaType>) =>
	createAuthConfiguration<User>({
		providersConfiguration: providersConfiguration,
		onCallback: async ({
			authProvider,
			providerInstance,
			tokenResponse,
			user_session_id,
			session
		}) => {
			const providerName = isValidProviderOption(authProvider)
				? providerData[authProvider].name
				: authProvider;

			console.log(
				`\nSuccesfully authorized OAuth2 with ${providerName} and got token response:`,
				{
					...tokenResponse
				}
			);

			return instantiateUserSession<User>({
				authProvider,
				session,
				tokenResponse,
				user_session_id,
				providerInstance,
				createUser: async (userProfile) => {
					const user = await createUser({
						authProvider,
						db,
						schema,
						userProfile
					});
					if (user === undefined)
						throw new Error('Failed to create user');

					return user;
				},
				getUser: async (userProfile) => {
					const user = await getUser({
						authProvider,
						db,
						schema,
						userProfile
					});

					return user;
				}
			});
		}
	});
