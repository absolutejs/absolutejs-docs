import {
	createAuthConfiguration,
	instantiateUserSession,
	isValidProviderOption
} from '@absolutejs/auth';
import { eq } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { schema, SchemaType, User } from '../../../db/schema';
import { logError, logUnknownError } from '../handlers/errorLogHandlers';
import { updateProviderStatus } from '../handlers/providerHandlers';
import { createUser, getUser } from '../handlers/userHandlers';
import { providersConfiguration } from './providersConfiguration';

export const absoluteAuthConfig = (db: NeonHttpDatabase<SchemaType>) =>
	createAuthConfiguration<User>({
		providersConfiguration: providersConfiguration,
		onCallbackError: async ({ error, authProvider }) => {
			if (!isValidProviderOption(authProvider)) {
				throw new Error(`Invalid auth provider: ${authProvider}`);
			}

			const [{ authorize_status } = {}] = await db
				.select({ authorize_status: schema.providers.authorize_status })
				.from(schema.providers)
				.where(eq(schema.providers.name, authProvider))
				.execute();

			if (
				authorize_status === 'tested' ||
				authorize_status === 'untested'
			) {
				updateProviderStatus({
					column: 'authorize_status',
					db,
					name: authProvider,
					status: 'failed'
				})
					.then(() => {
						console.log(
							`Provider ${authProvider} authorize status updated to 'failed'`
						);
					})
					.catch((e) => {
						console.error(
							`Failed to update provider ${authProvider} authorize status:`,
							e
						);
					});

				if (error instanceof Error) {
					logError({
						db,
						message: error.message,
						stack: error.stack ?? 'No stack trace available'
					})
						.then(() => {
							console.log(
								`Error logged for provider ${authProvider}`
							);
						})
						.catch((e) => {
							console.error(
								`Failed to log error for provider ${authProvider}:`,
								e
							);
						});
				} else {
					logUnknownError({
						db,
						raw: error
					})
						.then(() => {
							console.log(
								`Unknown error logged for provider ${authProvider}`
							);
						})
						.catch((e) => {
							console.error(
								`Failed to log unknown error for provider ${authProvider}:`,
								e
							);
						});
				}
			}
		},
		onCallbackSuccess: async ({
			authProvider,
			providerInstance,
			tokenResponse,
			userSessionId,
			session
		}) => {
			if (!isValidProviderOption(authProvider)) {
				throw new Error(`Invalid auth provider: ${authProvider}`);
			}

			const [{ authorize_status } = {}] = await db
				.select({ authorize_status: schema.providers.authorize_status })
				.from(schema.providers)
				.where(eq(schema.providers.name, authProvider))
				.execute();

			if (
				authorize_status === 'failed' ||
				authorize_status === 'untested' ||
				authorize_status === 'missing' ||
				authorize_status === 'testing'
			) {
				updateProviderStatus({
					column: 'authorize_status',
					db,
					name: authProvider,
					status: 'tested'
				})
					.then(() => {
						console.log(
							`Provider ${authProvider} authorize status updated to 'tested'`
						);
					})
					.catch((error) => {
						console.error(
							`Failed to update provider ${authProvider} authorize status:`,
							error
						);
					});
			}

			return instantiateUserSession<User>({
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
		}
	});
