import { t } from 'elysia/type-system';
import { docsViews } from '../frontend/data/sidebarData';
import { telemetryViewIds } from '../frontend/data/telemetrySidebarData';
import { isValidViewId } from './typeGuards';
import { userSessionIdTypebox } from '@absolutejs/auth';

export const themeTypebox = t.Optional(
	t.Union([
		t.Literal('light'),
		t.Literal('dark'),
		t.Literal('system:light'),
		t.Literal('system:dark')
	])
);

export const pageCookie = t.Cookie({
	theme: themeTypebox,
	user_session_id: userSessionIdTypebox
});

export const docsViewEnum = t.Enum(
	Object.fromEntries(
		Object.keys(docsViews)
			.filter(isValidViewId)
			.map((key) => [key, key])
	)
);

export const telemetryViewEnum = t.Enum(
	Object.fromEntries(telemetryViewIds.map((key) => [key, key]))
);
