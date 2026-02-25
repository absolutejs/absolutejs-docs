import { Elysia, t } from 'elysia';
import { DatabaseType, User } from '../../../db/schema';
import { handleReactPageRequest, asset, Result } from '@absolutejs/absolute';
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
import { docsViewEnum, pageCookie } from '../../types/typebox';

export const pagesPlugin = (result: Awaited<Result>) =>
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
					asset(result, 'HomeIndex'),
					{
						theme: theme?.value,
						user
					}
				);
			}
		)
		.get('/signup/:redirect?', ({ cookie: { theme } }) =>
			handleReactPageRequest(Signup, asset(result, 'SignupIndex'), {
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
					asset(result, 'DocumentationIndex'),
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
					asset(result, 'AuthTestingIndex'),
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
		.get('/telemetry', ({ cookie: { theme }, protectRoute, redirect }) =>
			protectRoute(
				async (user) =>
					handleReactPageRequest(
						TelemetryDashboard,
						asset(result, 'TelemetryDashboardIndex'),
						{ theme: theme?.value, user }
					),
				async () => redirect('/signup/telemetry')
			)
		);
