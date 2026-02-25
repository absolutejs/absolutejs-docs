import { server } from './edenTreaty';

export const handleSignOut = async () => {
	// @ts-expect-error - The oauth2 routes come from a third party plugin and arent being typed correctly but do exist
	const { error } = await server.oauth2.signout.delete();

	if (error) {
		console.error('Logout failed:', error);

		return;
	}

	window.location.href = '/';
};
