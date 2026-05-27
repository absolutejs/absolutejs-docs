// @absolutejs/auth routes are intentionally type-erased on the server (see
// server.ts: the chain blows TS's union budget otherwise), so call signout via
// plain fetch instead of through the Eden treaty.
export const handleSignOut = async () => {
	const response = await fetch('/oauth2/signout', { method: 'DELETE' });
	if (!response.ok) {
		console.error('Logout failed:', response.status);

		return;
	}

	window.location.href = '/';
};
