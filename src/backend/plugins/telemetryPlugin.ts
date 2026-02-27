import { Elysia, t } from 'elysia';
import { DatabaseType, User } from '../../../db/schema';
import {
	deleteTelemetryEvent,
	deleteUserLabel,
	getAllEvents,
	getBunVersions,
	getKpiSummary,
	getUniqueUsers,
	getUserEvents,
	getUserLabels,
	insertTelemetryEvent,
	telemetryQueryHandlers,
	upsertUserLabel
} from '../handlers/telemetryHandlers';
import { isRateLimited } from '../utils/rateLimit';
import { getEnv } from '@absolutejs/absolute';
import { protectRoutePlugin } from '@absolutejs/auth';

const MAX_BODY_BYTES = 10_240;
const whitelistedAdmins =
	getEnv('ADMIN_SUBS')
		?.split(',')
		.map((s) => s.trim()) ?? [];

export const telemetryPlugin = (db: DatabaseType) =>
	new Elysia()
		.use(protectRoutePlugin<User>())
		.post(
			'/api/telemetry',
			async ({ body, request, status }) => {
				const contentLength = Number(
					request.headers.get('content-length') ?? 0
				);
				if (contentLength > MAX_BODY_BYTES) {
					return status(413, 'Payload too large');
				}

				const ip =
					request.headers
						.get('x-forwarded-for')
						?.split(',')[0]
						?.trim() ?? 'unknown';
				if (isRateLimited(ip)) {
					return status(429, 'Too many requests');
				}

				const {
					event,
					anonymousId,
					version,
					os,
					arch,
					bunVersion,
					timestamp,
					payload
				} = body;

				if (!event || !anonymousId) {
					return status(
						400,
						'Missing required fields: event, anonymousId'
					);
				}

				await insertTelemetryEvent({
					db,
					event: {
						event,
						anonymous_id: anonymousId,
						version: version ?? null,
						os: os ?? null,
						arch: arch ?? null,
						bun_version: bunVersion ?? null,
						client_timestamp: new Date(timestamp),
						payload: payload ?? {}
					}
				});

				return { success: true };
			},
			{
				body: t.Object({
					event: t.String(),
					anonymousId: t.String(),
					version: t.Optional(t.String()),
					os: t.Optional(t.String()),
					arch: t.Optional(t.String()),
					bunVersion: t.Optional(t.String()),
					timestamp: t.String(),
					payload: t.Optional(t.Record(t.String(), t.Unknown()))
				})
			}
		)
		.get('/api/v1/telemetry/kpi-summary', ({ protectRoute, status }) =>
			protectRoute(
				async (user) => {
					if (!whitelistedAdmins.includes(user.auth_sub)) {
						return status(403, 'Access denied');
					}

					const kpiSummary = await getKpiSummary(db);

					return kpiSummary;
				},
				() => status(403, 'Access denied')
			)
		)
		.get('/api/v1/telemetry/versions', async ({ protectRoute, status }) =>
			protectRoute(
				async (user) => {
					if (!whitelistedAdmins.includes(user.auth_sub)) {
						return status(403, 'Access denied');
					}
					const res = await fetch(
						'https://registry.npmjs.org/@absolutejs/absolute'
					);
					if (!res.ok) return status(502, 'Failed to fetch versions');
					const json = await res.json();
					const versions = Object.keys(
						json.versions as Record<string, unknown>
					)
						.filter((v) => {
							const parts = v.split('.').map(Number);
							const [major, minor] = parts;
							return (
								major != null &&
								minor != null &&
								(major > 0 || (major === 0 && minor >= 17))
							);
						})
						.reverse();
					return versions;
				},
				() => status(403, 'Access denied')
			)
		)
		.get(
			'/api/v1/telemetry/bun-versions',
			async ({ protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(403, 'Access denied');
						}
						return getBunVersions(db);
					},
					() => status(403, 'Access denied')
				)
		)
		.get(
			'/api/v1/telemetry/events',
			({ query, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(403, 'Access denied');
						}
						return getAllEvents(db, {
							page: query.page ? Number(query.page) : undefined,
							pageSize: query.pageSize
								? Number(query.pageSize)
								: undefined,
							event: query.event,
							version: query.version,
							os: query.os,
							bun_version: query.bun_version,
							anonymous_id: query.anonymous_id,
							search: query.search,
							from: query.from,
							to: query.to
						});
					},
					() => status(403, 'Access denied')
				),
			{
				query: t.Object({
					page: t.Optional(t.String()),
					pageSize: t.Optional(t.String()),
					event: t.Optional(t.String()),
					version: t.Optional(t.String()),
					os: t.Optional(t.String()),
					bun_version: t.Optional(t.String()),
					anonymous_id: t.Optional(t.String()),
					search: t.Optional(t.String()),
					from: t.Optional(t.String()),
					to: t.Optional(t.String())
				})
			}
		)
		.delete(
			'/api/v1/telemetry/events/:eventId',
			({ params: { eventId }, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(403, 'Access denied');
						}
						const deleted = await deleteTelemetryEvent(db, eventId);
						if (!deleted) return status(404, 'Event not found');
						return { success: true };
					},
					() => status(403, 'Access denied')
				),
			{
				params: t.Object({ eventId: t.String() })
			}
		)
		.get(
			'/api/v1/telemetry/users',
			async ({ query, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(403, 'Access denied');
						}
						return getUniqueUsers(db, query.search);
					},
					() => status(403, 'Access denied')
				),
			{
				query: t.Object({
					search: t.Optional(t.String())
				})
			}
		)
		.get(
			'/api/v1/telemetry/users/:anonymousId/events',
			({ params: { anonymousId }, query, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(403, 'Access denied');
						}
						return getUserEvents(db, anonymousId, {
							page: query.page ? Number(query.page) : undefined,
							pageSize: query.pageSize
								? Number(query.pageSize)
								: undefined,
							event: query.event,
							version: query.version,
							os: query.os,
							search: query.search,
							from: query.from,
							to: query.to
						});
					},
					() => status(403, 'Access denied')
				),
			{
				params: t.Object({ anonymousId: t.String() }),
				query: t.Object({
					page: t.Optional(t.String()),
					pageSize: t.Optional(t.String()),
					event: t.Optional(t.String()),
					version: t.Optional(t.String()),
					os: t.Optional(t.String()),
					search: t.Optional(t.String()),
					from: t.Optional(t.String()),
					to: t.Optional(t.String())
				})
			}
		)
		.get('/api/v1/telemetry/user-labels', ({ protectRoute, status }) =>
			protectRoute(
				async (user) => {
					if (!whitelistedAdmins.includes(user.auth_sub)) {
						return status(403, 'Access denied');
					}
					return getUserLabels(db);
				},
				() => status(403, 'Access denied')
			)
		)
		.put(
			'/api/v1/telemetry/user-labels/:anonymousId',
			({ params: { anonymousId }, body, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(403, 'Access denied');
						}
						return upsertUserLabel({
							db,
							anonymousId,
							label: body.label
						});
					},
					() => status(403, 'Access denied')
				),
			{
				params: t.Object({ anonymousId: t.String() }),
				body: t.Object({ label: t.String() })
			}
		)
		.delete(
			'/api/v1/telemetry/user-labels/:anonymousId',
			({ params: { anonymousId }, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(403, 'Access denied');
						}
						const deleted = await deleteUserLabel(db, anonymousId);
						if (!deleted) return status(404, 'Label not found');
						return { success: true };
					},
					() => status(403, 'Access denied')
				),
			{
				params: t.Object({ anonymousId: t.String() })
			}
		)
		.get(
			'/api/v1/telemetry/:key',
			({ params: { key }, query, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(403, 'Access denied');
						}
						const handler =
							telemetryQueryHandlers[
								key as keyof typeof telemetryQueryHandlers
							];
						if (!handler) return status(404, 'Unknown query');
						return handler(db, query.version);
					},
					() => status(403, 'Access denied')
				),
			{
				params: t.Object({ key: t.String() }),
				query: t.Object({
					version: t.Optional(t.String())
				})
			}
		);
