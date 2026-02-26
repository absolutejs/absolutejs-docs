import { Elysia, t } from 'elysia';
import { DatabaseType, User } from '../../../db/schema';
import {
	getKpiSummary,
	insertTelemetryEvent,
	telemetryQueryHandlers
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
						return Response.json(await handler(db, query.version));
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
