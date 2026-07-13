import { PackageDocData } from '../../../../types/packageDocs';

export const edenPackageData: PackageDocData = {
	category: 'Dev Tools',
	description:
		'Tiny error helpers for Eden Treaty clients. Eden surfaces a failed call as { status, value }, and most call sites throw error.value — dropping the HTTP status so a 402 paywall, a 409 conflict and a 500 all look the same downstream. These helpers normalize any thrown value into a real Error that keeps .status, so error handling stays status-aware across the Elysia + Eden stack. Zero dependencies; works in the browser and on the server.',
	features: [
		{
			description:
				'apiError(error, fallback?) normalizes any thrown value — or an Eden { status, value } — into an Error that keeps .status.',
			title: 'Status-preserving errors'
		},
		{
			description:
				'apiErrorMessage(error, fallback?) extracts a best-effort human-readable message from whatever was thrown.',
			title: 'Human messages'
		},
		{
			description:
				'apiErrorStatus(error) returns the HTTP status carried by an error, if any, so handlers can branch on 402 vs 409 vs 500.',
			title: 'Status extraction'
		},
		{
			description:
				'isPaywallError(error) is true for a 402 Payment Required, making upgrade nudges a one-line check.',
			title: 'Paywall detection'
		},
		{
			description:
				'No dependencies and no runtime assumptions — the same helpers run in the browser and on the server.',
			title: 'Zero dependencies'
		}
	],
	installCommand: 'bun add @absolutejs/eden',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/eden',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/eden',
			label: 'GitHub'
		}
	],
	name: 'Eden',
	notes: [
		{
			body: 'Pairs with any Eden Treaty client — including the type-safe treaty clients AbsoluteJS apps generate from their Elysia server type — so end-to-end type safety extends to the failure path.',
			title: 'Made for Eden Treaty',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/eden',
	samples: [
		{
			code: `import {
	apiError,
	apiErrorMessage,
	isPaywallError
} from '@absolutejs/eden';

const { data, error } = await api.things.get();
if (error) throw apiError(error); // a real Error that KEEPS error.status

// elsewhere
try {
	await loadPremiumPanel();
} catch (e) {
	if (isPaywallError(e)) showUpgradeNudge();
	else showError(apiErrorMessage(e));
}`,
			description:
				'Throw a status-preserving Error at the call site, then branch on the status wherever the error surfaces.',
			heading: 'Quick Start',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Unwraps Eden Treaty failures into real Errors that keep the HTTP status, so 402, 409 and 500 stay distinguishable.',
	version: '0.1.0'
};
