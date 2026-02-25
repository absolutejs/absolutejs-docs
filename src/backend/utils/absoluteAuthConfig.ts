import {
	createAuthConfiguration,
	instantiateUserSession
} from '@absolutejs/auth';
import { DatabaseType, User } from '../../../db/schema';
import { handleStatusUpdate } from '../handlers/providerHandlers';
import { createUser, getUser } from '../handlers/userHandlers';
import { providersConfiguration } from './providersConfiguration';

export const absoluteAuthConfig = (db: DatabaseType) =>
	createAuthConfiguration<User>({
		providersConfiguration: providersConfiguration,
		onCallbackError: async ({ error, authProvider }) => {
			await handleStatusUpdate({
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
			session,
			unregisteredSession,
			cookie,
			originUrl,
			redirect
		}) => {
			await handleStatusUpdate({
				authProvider,
				column: 'authorize_status',
				db,
				guardStatuses: ['failed', 'untested', 'missing', 'testing'],
				newStatus: 'tested'
			});

			await instantiateUserSession<User>({
				authProvider,
				providerInstance,
				session,
				unregisteredSession,
				tokenResponse,
				user_session_id: cookie.user_session_id,
				onNewUser: async (userIdentity) => {
					const user = await createUser({
						authProvider,
						db,
						userIdentity
					});
					if (user === undefined)
						throw new Error('Failed to create user');

					return user;
				},
				getUser: async (userIdentity) => {
					const user = await getUser({
						authProvider,
						db,
						userIdentity
					});

					return user;
				}
			});

			const signupRedirectMatch = originUrl.match(/^\/signup\/(.+)$/);

			if (signupRedirectMatch) {
				return redirect(`/${signupRedirectMatch[1]}`);
			}
		},
		onProfileError: async ({ error, authProvider }) => {
			await handleStatusUpdate({
				authProvider,
				column: 'profile_status',
				db,
				error,
				guardStatuses: ['tested', 'untested'],
				newStatus: 'failed'
			});
		},
		onProfileSuccess: async ({ authProvider }) => {
			if (authProvider === 'withings') return; // Skip Withings since it does not support a profile route for OAuth

			await handleStatusUpdate({
				authProvider,
				column: 'profile_status',
				db,
				guardStatuses: ['failed', 'untested', 'missing', 'testing'],
				newStatus: 'tested'
			});
		},
		onRefreshError: async ({ error, authProvider }) => {
			await handleStatusUpdate({
				authProvider,
				column: 'refresh_status',
				db,
				error,
				guardStatuses: ['tested', 'untested'],
				newStatus: 'failed'
			});
		},
		onRefreshSuccess: async ({ authProvider }) => {
			await handleStatusUpdate({
				authProvider,
				column: 'refresh_status',
				db,
				guardStatuses: ['failed', 'untested', 'missing', 'testing'],
				newStatus: 'tested'
			});
		},
		onRevocationError: async ({ error, authProvider }) => {
			await handleStatusUpdate({
				authProvider,
				column: 'revoke_status',
				db,
				error,
				guardStatuses: ['tested', 'untested'],
				newStatus: 'failed'
			});
		},
		onRevocationSuccess: async ({ authProvider }) => {
			await handleStatusUpdate({
				authProvider,
				column: 'revoke_status',
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

			delete session[userSessionId];
		}
	});
