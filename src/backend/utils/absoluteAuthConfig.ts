import {
	createAuthConfiguration,
	instantiateUserSession
} from '@absolutejs/auth';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { SchemaType, User } from '../../../db/schema';
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
		}) =>
			instantiateUserSession<User>({
				authProvider,
				providerInstance,
				session,
				tokenResponse,
				user_session_id,
				createUser: async (userProfile) => {
					const user = await createUser({
						authProvider,
						db,
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
						userProfile
					});

					return user;
				}
			})
	});
