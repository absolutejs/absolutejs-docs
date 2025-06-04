import {
	createAuthConfiguration,
	instantiateUserSession
} from '@absolutejs/auth';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { SchemaType, User } from '../../../db/schema';
import { createUser, getUser } from '../handlers/userHandlers';
import { handleStatusUpdate } from './handleStatusUpdate';
import { providersConfiguration } from './providersConfiguration';

export const absoluteAuthConfig = (db: NeonHttpDatabase<SchemaType>) =>
	createAuthConfiguration<User>({
		providersConfiguration: providersConfiguration,
		onCallbackError: async ({ error, authProvider }) => {
			handleStatusUpdate({
				authProvider,
				column: 'authorize_status',
				db,
				error,
				guardStatuses: ['tested', 'untested'],
				newStatus: 'failed'
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
				authProvider,
				column: 'authorize_status',
				db,
				guardStatuses: ['failed', 'untested', 'missing', 'testing'],
				newStatus: 'tested'
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
		onProfileError: async ({ error, authProvider }) => {
			handleStatusUpdate({
				authProvider,
				column: 'profile_status',
				db,
				error,
				guardStatuses: ['tested', 'untested'],
				newStatus: 'failed'
			});
		},
		onProfileSuccess: async ({ authProvider }) => {
			handleStatusUpdate({
				authProvider,
				column: 'profile_status',
				db,
				guardStatuses: ['failed', 'untested', 'missing', 'testing'],
				newStatus: 'tested'
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
		}
	});
