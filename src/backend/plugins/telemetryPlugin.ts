import {
	HTTP_STATUS_BAD_GATEWAY,
	HTTP_STATUS_BAD_REQUEST,
	HTTP_STATUS_FORBIDDEN,
	HTTP_STATUS_NOT_FOUND,
	HTTP_STATUS_PAYLOAD_TOO_LARGE,
	HTTP_STATUS_TOO_MANY_REQUESTS,
	MIN_SUPPORTED_ABSOLUTE_MINOR_VERSION
} from '../../constants';
import { count, eq } from 'drizzle-orm';
import { Elysia, t } from 'elysia';
import { DatabaseType, schema, User } from '../../../db/schema';
import {
	deleteTelemetryEvent,
	deleteTelemetryEvents,
	deleteTelemetryEventsByFilter,
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
import { isObject } from '../../types/typeGuards';

const MAX_BODY_BYTES = 10240;
const whitelistedAdmins =
	getEnv('ADMIN_SUBS')
		?.split(',')
		.map((adminSub) => adminSub.trim()) ?? [];

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
					return status(
						HTTP_STATUS_PAYLOAD_TOO_LARGE,
						'Payload too large'
					);
				}

				const ipAddress =
					request.headers
						.get('x-forwarded-for')
						?.split(',')[0]
						?.trim() ?? 'unknown';
				if (isRateLimited(ipAddress)) {
					return status(
						HTTP_STATUS_TOO_MANY_REQUESTS,
						'Too many requests'
					);
				}

				const {
					event,
					anonymousId,
					version,
					os: operatingSystem,
					arch,
					bunVersion,
					timestamp,
					payload
				} = body;

				if (!event || !anonymousId) {
					return status(
						HTTP_STATUS_BAD_REQUEST,
						'Missing required fields: event, anonymousId'
					);
				}

				await insertTelemetryEvent({
					db,
					event: {
						anonymous_id: anonymousId,
						arch: arch ?? null,
						bun_version: bunVersion ?? null,
						client_timestamp: new Date(timestamp),
						event,
						os: operatingSystem ?? null,
						payload: payload ?? {},
						version: version ?? null
					}
				});

				return { success: true };
			},
			{
				body: t.Object({
					anonymousId: t.String(),
					arch: t.Optional(t.String()),
					bunVersion: t.Optional(t.String()),
					event: t.String(),
					os: t.Optional(t.String()),
					payload: t.Optional(t.Record(t.String(), t.Unknown())),
					timestamp: t.String(),
					version: t.Optional(t.String())
				})
			}
		)
		.get('/api/v1/telemetry/kpi-summary', ({ protectRoute, status }) =>
			protectRoute(
				async (user) => {
					if (!whitelistedAdmins.includes(user.auth_sub)) {
						return status(HTTP_STATUS_FORBIDDEN, 'Access denied');
					}

					const kpiSummary = await getKpiSummary(db);

					return kpiSummary;
				},
				() => status(HTTP_STATUS_FORBIDDEN, 'Access denied')
			)
		)
		.get('/api/v1/telemetry/versions', async ({ protectRoute, status }) =>
			protectRoute(
				async (user) => {
					if (!whitelistedAdmins.includes(user.auth_sub)) {
						return status(HTTP_STATUS_FORBIDDEN, 'Access denied');
					}
					const [res, unknownCount] = await Promise.all([
						fetch(
							'https://registry.npmjs.org/@absolutejs/absolute'
						),
						db
							.select({ count: count() })
							.from(schema.telemetryEvents)
							.where(
								eq(schema.telemetryEvents.version, 'unknown')
							)
					]);
					if (!res.ok)
						return status(
							HTTP_STATUS_BAD_GATEWAY,
							'Failed to fetch versions'
						);
					const json = await res.json();
					if (!isObject(json) || !isObject(json.versions)) {
						return status(
							HTTP_STATUS_BAD_GATEWAY,
							'Invalid versions response'
						);
					}
					const versions = Object.keys(json.versions)
						.filter((version) => {
							const parts = version.split('.').map(Number);
							const [major, minor] = parts;

							return (
								major !== null &&
								major !== undefined &&
								minor !== null &&
								minor !== undefined &&
								(major > 0 ||
									(major === 0 &&
										minor >=
											MIN_SUPPORTED_ABSOLUTE_MINOR_VERSION))
							);
						})
						.reverse();
					if ((unknownCount[0]?.count ?? 0) > 0) {
						versions.push('unknown');
					}

					return versions;
				},
				() => status(HTTP_STATUS_FORBIDDEN, 'Access denied')
			)
		)
		.get(
			'/api/v1/telemetry/bun-versions',
			async ({ protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(
								HTTP_STATUS_FORBIDDEN,
								'Access denied'
							);
						}

						return getBunVersions(db);
					},
					() => status(HTTP_STATUS_FORBIDDEN, 'Access denied')
				)
		)
		.get(
			'/api/v1/telemetry/events',
			({ query, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(
								HTTP_STATUS_FORBIDDEN,
								'Access denied'
							);
						}

						return getAllEvents(db, {
							anonymous_id: query.anonymous_id,
							bun_version: query.bun_version,
							event: query.event,
							from: query.from,
							os: query.os,
							page: query.page ? Number(query.page) : undefined,
							pageSize: query.pageSize
								? Number(query.pageSize)
								: undefined,
							search: query.search,
							to: query.to,
							version: query.version
						});
					},
					() => status(HTTP_STATUS_FORBIDDEN, 'Access denied')
				),
			{
				query: t.Object({
					anonymous_id: t.Optional(t.String()),
					bun_version: t.Optional(t.String()),
					event: t.Optional(t.String()),
					from: t.Optional(t.String()),
					os: t.Optional(t.String()),
					page: t.Optional(t.String()),
					pageSize: t.Optional(t.String()),
					search: t.Optional(t.String()),
					to: t.Optional(t.String()),
					version: t.Optional(t.String())
				})
			}
		)
		.delete(
			'/api/v1/telemetry/events/:eventId',
			({ params: { eventId }, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(
								HTTP_STATUS_FORBIDDEN,
								'Access denied'
							);
						}
						const deleted = await deleteTelemetryEvent(db, eventId);
						if (!deleted)
							return status(
								HTTP_STATUS_NOT_FOUND,
								'Event not found'
							);

						return { success: true };
					},
					() => status(HTTP_STATUS_FORBIDDEN, 'Access denied')
				),
			{
				params: t.Object({ eventId: t.String() })
			}
		)
		.delete(
			'/api/v1/telemetry/events',
			({ body, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(
								HTTP_STATUS_FORBIDDEN,
								'Access denied'
							);
						}
						if (body.ids) {
							if (body.ids.length === 0) {
								return status(
									HTTP_STATUS_BAD_REQUEST,
									'No event IDs provided'
								);
							}
							const deleted = await deleteTelemetryEvents(
								db,
								body.ids
							);

							return {
								deletedCount: deleted.length,
								success: true
							};
						}
						const deleted = await deleteTelemetryEventsByFilter(
							db,
							{
								bun_version: body.bun_version,
								event: body.event,
								from: body.from,
								os: body.os,
								search: body.search,
								to: body.to,
								version: body.version
							}
						);

						return {
							deletedCount: deleted.length,
							success: true
						};
					},
					() => status(HTTP_STATUS_FORBIDDEN, 'Access denied')
				),
			{
				body: t.Object({
					bun_version: t.Optional(t.String()),
					event: t.Optional(t.String()),
					from: t.Optional(t.String()),
					ids: t.Optional(t.Array(t.String())),
					os: t.Optional(t.String()),
					search: t.Optional(t.String()),
					to: t.Optional(t.String()),
					version: t.Optional(t.String())
				})
			}
		)
		.get(
			'/api/v1/telemetry/users',
			async ({ query, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(
								HTTP_STATUS_FORBIDDEN,
								'Access denied'
							);
						}

						return getUniqueUsers(db, query.search);
					},
					() => status(HTTP_STATUS_FORBIDDEN, 'Access denied')
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
							return status(
								HTTP_STATUS_FORBIDDEN,
								'Access denied'
							);
						}

						return getUserEvents(db, anonymousId, {
							event: query.event,
							from: query.from,
							os: query.os,
							page: query.page ? Number(query.page) : undefined,
							pageSize: query.pageSize
								? Number(query.pageSize)
								: undefined,
							search: query.search,
							to: query.to,
							version: query.version
						});
					},
					() => status(HTTP_STATUS_FORBIDDEN, 'Access denied')
				),
			{
				params: t.Object({ anonymousId: t.String() }),
				query: t.Object({
					event: t.Optional(t.String()),
					from: t.Optional(t.String()),
					os: t.Optional(t.String()),
					page: t.Optional(t.String()),
					pageSize: t.Optional(t.String()),
					search: t.Optional(t.String()),
					to: t.Optional(t.String()),
					version: t.Optional(t.String())
				})
			}
		)
		.get('/api/v1/telemetry/user-labels', ({ protectRoute, status }) =>
			protectRoute(
				async (user) => {
					if (!whitelistedAdmins.includes(user.auth_sub)) {
						return status(HTTP_STATUS_FORBIDDEN, 'Access denied');
					}

					return getUserLabels(db);
				},
				() => status(HTTP_STATUS_FORBIDDEN, 'Access denied')
			)
		)
		.put(
			'/api/v1/telemetry/user-labels/:anonymousId',
			({ params: { anonymousId }, body, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(
								HTTP_STATUS_FORBIDDEN,
								'Access denied'
							);
						}

						return upsertUserLabel({
							anonymousId,
							db,
							label: body.label
						});
					},
					() => status(HTTP_STATUS_FORBIDDEN, 'Access denied')
				),
			{
				body: t.Object({ label: t.String() }),
				params: t.Object({ anonymousId: t.String() })
			}
		)
		.delete(
			'/api/v1/telemetry/user-labels/:anonymousId',
			({ params: { anonymousId }, protectRoute, status }) =>
				protectRoute(
					async (user) => {
						if (!whitelistedAdmins.includes(user.auth_sub)) {
							return status(
								HTTP_STATUS_FORBIDDEN,
								'Access denied'
							);
						}
						const deleted = await deleteUserLabel(db, anonymousId);
						if (!deleted)
							return status(
								HTTP_STATUS_NOT_FOUND,
								'Label not found'
							);

						return { success: true };
					},
					() => status(HTTP_STATUS_FORBIDDEN, 'Access denied')
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
							return status(
								HTTP_STATUS_FORBIDDEN,
								'Access denied'
							);
						}
						const handler = telemetryQueryHandlers[key];
						if (!handler)
							return status(
								HTTP_STATUS_NOT_FOUND,
								'Unknown query'
							);

						return handler(db, query.version);
					},
					() => status(HTTP_STATUS_FORBIDDEN, 'Access denied')
				),
			{
				params: t.Object({ key: t.String() }),
				query: t.Object({
					version: t.Optional(t.String())
				})
			}
		);
