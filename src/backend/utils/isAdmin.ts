import { env } from 'node:process';

export const isAdmin = (authSub: string | undefined) => {
	const adminSubs = env.ADMIN_SUBS?.split(',') ?? [];

	return authSub !== undefined && adminSubs.includes(authSub);
};
