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
import { BlogPost } from '../../frontend/pages/BlogPost';
import { Documentation } from '../../frontend/pages/Documentation';
import { Demos } from '../../frontend/pages/Demos';
import { Home } from '../../frontend/pages/Home';
import { Profile } from '../../frontend/pages/Profile';
import { Signup } from '../../frontend/pages/Signup';
import { TelemetryDashboard } from '../../frontend/pages/TelemetryDashboard';
import {
	docsViewEnum,
	pageCookie,
	telemetryViewEnum
} from '../../types/typebox';
import { blog } from '../../shared/blog';
import { ecosystemProjects } from '../../frontend/data/documentation/packages/ecosystem.generated';
import {
	legacyEcosystemProjectViewId,
	legacyEcosystemSubpackageViewId,
	legacyPackageProjectViewId,
	packageProjectViewId,
	packageSubpackageViewId
} from '../../frontend/data/documentation/packages/packageRoutes';

const whitelistedAdmins =
	getEnv('ADMIN_SUBS')
		?.split(',')
		.map((adminSub) => adminSub.trim()) ?? [];
const permanentRedirectStatus = 301;
const notFoundStatus = 404;
const legacyDocumentationRedirects = new Map<string, string>();
const legacyPackageDocumentationRedirects = new Map<string, string>();
for (const project of ecosystemProjects) {
	const legacyPackageView = legacyPackageProjectViewId(project);
	const canonicalPackageView = packageProjectViewId(project);
	if (legacyPackageView !== canonicalPackageView)
		legacyPackageDocumentationRedirects.set(
			legacyPackageView,
			canonicalPackageView
		);
	legacyDocumentationRedirects.set(
		legacyEcosystemProjectViewId(project),
		packageProjectViewId(project)
	);
	for (const subpackage of project.subpackages)
		legacyDocumentationRedirects.set(
			legacyEcosystemSubpackageViewId(project, subpackage),
			packageSubpackageViewId(project, subpackage)
		);
}

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
		.get(
			'/blog/:slug',
			async ({
				params: { slug },
				cookie: { theme, user_session_id },
				store: { session },
				status
			}) => {
				if (blog.get(slug) === undefined) {
					return status('Not Found', 'Blog post not found');
				}

				const { user, error } = await getStatus<User>(
					session,
					user_session_id
				);

				if (error) {
					return status(error.code, error.message);
				}

				return handleReactPageRequest({
					index: asset(manifest, 'BlogPostIndex'),
					Page: BlogPost,
					props: {
						slug,
						theme: theme?.value,
						user
					}
				});
			},
			{
				params: t.Object({ slug: t.String() })
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
		.get('/documentation/react', ({ redirect }) =>
			redirect('/documentation/react-overview', permanentRedirectStatus)
		)
		.get('/documentation/vue', ({ redirect }) =>
			redirect('/documentation/vue-overview', permanentRedirectStatus)
		)
		.get('/documentation/svelte', ({ redirect }) =>
			redirect('/documentation/svelte-overview', permanentRedirectStatus)
		)
		.get('/documentation/angular', ({ redirect }) =>
			redirect('/documentation/angular-overview', permanentRedirectStatus)
		)
		.get('/documentation/html', ({ redirect }) =>
			redirect('/documentation/html-overview', permanentRedirectStatus)
		)
		.get('/documentation/htmx', ({ redirect }) =>
			redirect('/documentation/htmx-overview', permanentRedirectStatus)
		)
		.get('/documentation/overview', ({ redirect }) =>
			redirect('/documentation', permanentRedirectStatus)
		)
		.get(
			'/documentation/ecosystem-:legacy',
			({ params: { legacy }, redirect, status }) => {
				const canonicalView = legacyDocumentationRedirects.get(
					`ecosystem-${legacy}`
				);
				if (!canonicalView)
					return status(
						notFoundStatus,
						'Documentation page not found'
					);

				return redirect(
					canonicalView === 'overview'
						? '/documentation'
						: `/documentation/${canonicalView}`,
					permanentRedirectStatus
				);
			},
			{ params: t.Object({ legacy: t.String() }) }
		)
		.get(
			'/documentation/:view?',
			async ({
				params: { view },
				cookie: { theme, user_session_id },
				redirect,
				store: { session },
				status
			}) => {
				const canonicalView = view
					? legacyPackageDocumentationRedirects.get(view)
					: undefined;
				if (canonicalView)
					return redirect(
						`/documentation/${canonicalView}`,
						permanentRedirectStatus
					);

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
			'/demos',
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
					index: asset(manifest, 'DemosIndex'),
					Page: Demos,
					props: {
						theme: theme?.value,
						user
					}
				});
			}
		)
		.get(
			'/demos/authentication',
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
		.get('/testing', ({ redirect }) => redirect('/demos'))
		.get(
			'/testing/authentication',
			({ query, redirect }) =>
				redirect(
					query.provider
						? `/demos/authentication?provider=${encodeURIComponent(query.provider)}`
						: '/demos/authentication'
				),
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
