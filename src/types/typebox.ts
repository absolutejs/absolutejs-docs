import { t } from 'elysia/type-system';

export const themeCookie = t.Cookie({
	theme: t.Optional(
		t.Union([
			t.Literal('light'),
			t.Literal('dark'),
			t.Literal('system:light'),
			t.Literal('system:dark')
		])
	)
});
