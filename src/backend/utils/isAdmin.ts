import { env } from 'node:process';

/* The admins' auth subjects. Optional: a copy without ADMIN_SUBS (a Studio
 * workspace, a fresh checkout) has no admins rather than failing to start. */
export const adminSubs = () =>
	(env.ADMIN_SUBS ?? '')
		.split(',')
		.map((adminSub) => adminSub.trim())
		.filter((adminSub) => adminSub.length > 0);

export const isAdmin = (authSub: string | undefined) =>
	authSub !== undefined && adminSubs().includes(authSub);
