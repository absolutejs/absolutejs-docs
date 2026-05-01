import { Elysia, t } from 'elysia';
import { User } from '../../../db/schema';
import { asset, getEnv } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import {
	getStatus,
	isValidProviderOption,
	protectRoutePlugin
} from '@absolutejs/auth';
import { AuthTesting } from '../../frontend/pages/AuthTesting';
import { Blog } from '../../frontend/pages/Blog';
import { Documentation } from '../../frontend/pages/Documentation';
import { Home } from '../../frontend/pages/Home';
import { Profile } from '../../frontend/pages/Profile';
import { Signup } from '../../frontend/pages/Signup';
import { TelemetryDashboard } from '../../frontend/pages/TelemetryDashboard';
import {
	docsViewEnum,
	pageCookie,
	telemetryViewEnum
} from '../../types/typebox';

const whitelistedAdmins =
	getEnv('ADMIN_SUBS')
		?.split(',')
		.map((adminSub) => adminSub.trim()) ?? [];

export const pagesPlugin = (manifest: Record<string, string>) =>
	new Elysia()
		.guard({
			cookie: pageCookie
		})
		.use(protectRoutePlugin<User>())
		.get(
			'/',
			async ({
				status,
				cookie: { user_session_id, theme },
				store: { session }
			}) => {
				const { user, error } = await getStatus<User>(
					session,
					user_session_id
				);

				if (error) {
					return status(error.code, error.message);
				}

				return handleReactPageRequest({
					index: asset(manifest, 'HomeIndex'),
					Page: Home,
					props: {
						theme: theme?.value,
						user
					}
				});
			}
		)
		.get('/signup/:redirect?', ({ cookie: { theme } }) =>
			handleReactPageRequest({
				index: asset(manifest, 'SignupIndex'),
				Page: Signup,
				props: {
					theme: theme?.value
				}
			})
		)
		.get(
			'/blog',
			async ({
				cookie: { theme, user_session_id },
				store: { session },
				status
			}) => {
				const { user, error } = await getStatus<User>(
					session,
					user_session_id
				);

				if (error) {
					return status(error.code, error.message);
				}

				return handleReactPageRequest({
					index: asset(manifest, 'BlogIndex'),
					Page: Blog,
					props: {
						theme: theme?.value,
						user
					}
				});
			}
		)
		.get('/profile', ({ cookie: { theme }, protectRoute, redirect }) =>
			protectRoute(
				(user) =>
					handleReactPageRequest({
						index: asset(manifest, 'ProfileIndex'),
						Page: Profile,
						props: {
							theme: theme?.value,
							user
						}
					}),
				async () => redirect('/signup/profile')
			)
		)
		.get(
			'/documentation/:view?',
			async ({
				params: { view },
				cookie: { theme, user_session_id },
				store: { session },
				status
			}) => {
				const { user, error } = await getStatus<User>(
					session,
					user_session_id
				);

				if (error) {
					return status(error.code, error.message);
				}

				return handleReactPageRequest({
					index: asset(manifest, 'DocumentationIndex'),
					Page: Documentation,
					props: {
						initialView: view ?? 'overview',
						theme: theme?.value,
						user
					}
				});
			},
			{
				params: t.Object({ view: t.Optional(docsViewEnum) })
			}
		)
		.get(
			'/testing/authentication',
			async ({
				cookie: { theme, user_session_id },
				query,
				store: { session },
				status
			}) => {
				const { user, error } = await getStatus<User>(
					session,
					user_session_id
				);

				if (error) {
					return status(error.code, error.message);
				}

				return handleReactPageRequest({
					index: asset(manifest, 'AuthTestingIndex'),
					Page: AuthTesting,
					props: {
						initialProvider:
							query.provider &&
							isValidProviderOption(query.provider)
								? query.provider
								: undefined,
						theme: theme?.value,
						user
					}
				});
			},
			{
				query: t.Object({ provider: t.Optional(t.String()) })
			}
		)
		.get(
			'/telemetry/:view?',
			({ params: { view }, cookie: { theme }, protectRoute, redirect }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return redirect('/signup/telemetry');
						}

						return handleReactPageRequest({
							index: asset(manifest, 'TelemetryDashboardIndex'),
							Page: TelemetryDashboard,
							props: {
								initialView: view ?? 'overview',
								theme: theme?.value,
								user
							}
						});
					},
					async () => redirect('/signup/telemetry')
				),
			{
				params: t.Object({
					view: t.Optional(telemetryViewEnum)
				})
			}
		);
