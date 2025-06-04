import {
	createAuthConfiguration,
	instantiateUserSession
} from '@absolutejs/auth';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { SchemaType, User } from '../../../db/schema';
import { createUser, getUser } from '../handlers/userHandlers';
import { providersConfiguration } from './providersConfiguration';
import { handleStatusUpdate } from './handleStatusUpdate';

export const absoluteAuthConfig = (db: NeonHttpDatabase<SchemaType>) =>
	createAuthConfiguration<User>({
		providersConfiguration: providersConfiguration,
		onCallbackError: async ({ error, authProvider }) => {
			handleStatusUpdate({
				db,
				column: 'authorize_status',
				guardStatuses: ['tested', 'untested'],
				newStatus: 'failed',
				authProvider,
				error
			});
		},
		onCallbackSuccess: async ({
			authProvider,
			providerInstance,
			tokenResponse,
			userSessionId,
			session
		}) => {
			handleStatusUpdate({
				db,
				column: 'authorize_status',
				guardStatuses: ['failed', 'untested', 'missing', 'testing'],
				newStatus: 'tested',
				authProvider
			});

			instantiateUserSession<User>({
				authProvider,
				providerInstance,
				session,
				tokenResponse,
				userSessionId,
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
			});
		},
		onSignOut: ({ userSessionId, session }) => {
			const userSession = session[userSessionId];

			if (userSession === undefined) {
				throw new Error(
					`User session with id ${userSessionId} not found`
				);
			}

			session[userSessionId] = undefined;
		},
		onProfileSuccess: async ({ authProvider }) => {
			handleStatusUpdate({
				db,
				column: 'profile_status',
				guardStatuses: ['failed', 'untested', 'missing', 'testing'],
				newStatus: 'tested',
				authProvider
			});
		},
		onProfileError: async ({ error, authProvider }) => {
			handleStatusUpdate({
				db,
				column: 'profile_status',
				guardStatuses: ['tested', 'untested'],
				newStatus: 'failed',
				authProvider,
				error
			});
		}
	});
