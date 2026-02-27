import { Elysia, t } from 'elysia';
import { DatabaseType, User } from '../../../db/schema';
import {
	handleReactPageRequest,
	asset,
	Result,
	getEnv
} from '@absolutejs/absolute';
import {
	getStatus,
	isValidProviderOption,
	protectRoutePlugin
} from '@absolutejs/auth';
import { AuthTesting } from '../../frontend/pages/AuthTesting';
import { Documentation } from '../../frontend/pages/Documentation';
import { Home } from '../../frontend/pages/Home';
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
		.map((s) => s.trim()) ?? [];

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

				return handleReactPageRequest(
					Home,
					asset(manifest, 'HomeIndex'),
					{
						theme: theme?.value,
						user
					}
				);
			}
		)
		.get('/signup/:redirect?', ({ cookie: { theme } }) =>
			handleReactPageRequest(Signup, asset(manifest, 'SignupIndex'), {
				theme: theme?.value
			})
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

				return handleReactPageRequest(
					Documentation,
					asset(manifest, 'DocumentationIndex'),
					{
						initialView: view ?? 'overview',
						theme: theme?.value,
						user
					}
				);
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

				return handleReactPageRequest(
					AuthTesting,
					asset(manifest, 'AuthTestingIndex'),
					{
						theme: theme?.value,
						initialProvider:
							query.provider &&
							isValidProviderOption(query.provider)
								? query.provider
								: undefined,
						user
					}
				);
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

						return handleReactPageRequest(
							TelemetryDashboard,
							asset(manifest, 'TelemetryDashboardIndex'),
							{
								initialView: view ?? 'overview',
								theme: theme?.value,
								user
							}
						);
					},
					async () => redirect('/signup/telemetry')
				),
			{
				params: t.Object({
					view: t.Optional(telemetryViewEnum)
				})
			}
		);
