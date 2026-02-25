export const isAdmin = (authSub: string | undefined) => {
	const adminSubs = process.env.ADMIN_SUBS?.split(',') ?? [];
	return authSub !== undefined && adminSubs.includes(authSub);
};
