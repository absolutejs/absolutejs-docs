import { PackageDocData } from '../../../../types/packageDocs';

export const linkedProvidersPackageData: PackageDocData = {
	category: 'Auth & Identity',
	description:
		'Shared type contracts for linked third-party provider credentials — grants, bindings, resolved credentials, token leases, and the resolver and store interfaces that move them around. It deliberately ships no runtime: @absolutejs/auth implements these contracts, @absolutejs/absolute consumes them, and this package stays the neutral source of truth between them. Depend on it whenever a package needs to talk about linked-provider credentials without pulling in the auth runtime.',
	features: [
		{
			description:
				'LinkedProviderGrant models an OAuth grant (scopes, encrypted tokens, refresh state); LinkedProviderBinding models a concrete external account riding that grant.',
			title: 'Grant and binding types'
		},
		{
			description:
				'LinkedProviderCredentialResolver defines listBindings, resolveCredential, getAccessToken, and reportFailure — the full lifecycle a consumer needs from any credential backend.',
			title: 'Resolver contract'
		},
		{
			description:
				'LinkedProviderAccessTokenLease carries an access token with expiry and granted scopes, so consumers can request minimum validity windows without seeing refresh mechanics.',
			title: 'Token lease shape'
		},
		{
			description:
				'LinkedProviderGrantStore and LinkedProviderBindingStore define the persistence surface, letting any database back the auth implementation.',
			title: 'Durable store contracts'
		},
		{
			description:
				'Provider unions (google, linkedin, x, meta, gmail, instagram, facebook) stay open via string augmentation, so new providers slot in without a breaking change.',
			title: 'Open provider unions'
		}
	],
	installCommand: 'bun add @absolutejs/linked-providers',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/linked-providers',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/linked-providers',
			label: 'GitHub'
		}
	],
	name: 'Linked Providers',
	notes: [
		{
			body: 'This package contains only types and contracts — no OAuth routes, token refresh, or provider SDK clients. Those live in @absolutejs/auth, which implements these contracts.',
			title: 'Contracts, not runtime',
			variant: 'info'
		},
		{
			body: '@absolutejs/linked-providers is 0.0.x — contract shapes may still evolve alongside the auth implementation before 0.1.',
			title: 'Alpha contracts',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/linked-providers',
	samples: [
		{
			code: `import type {
	LinkedProviderCredentialResolver
} from '@absolutejs/linked-providers';

// A consumer (connector, sync job, RAG source) only needs the
// resolver contract — the implementation lives in @absolutejs/auth.
const syncMailbox = async (
	resolver: LinkedProviderCredentialResolver,
	ownerRef: string
) => {
	const credential = await resolver.resolveCredential({
		connectorProvider: 'gmail',
		ownerRef,
		purpose: 'background_sync',
		requiredScopes: [
			'https://www.googleapis.com/auth/gmail.readonly'
		]
	});
	if (credential === null) return;

	const lease = await resolver.getAccessToken(credential, {
		minValidityMs: 60_000
	});

	// Call the provider API with lease.accessToken; on failure:
	await resolver.reportFailure(credential, {
		code: 'rate_limited',
		retryAt: Date.now() + 30_000
	});
};`,
			description:
				'Consumers program against LinkedProviderCredentialResolver: resolve a credential for a purpose, lease an access token with a minimum validity window, and report failures back so the implementation can mark grants for refresh.',
			heading: 'Quick Start',
			language: 'typescript'
		}
	],
	status: 'alpha',
	tagline:
		'Neutral credential and resolver contracts shared between @absolutejs/auth and the packages that consume linked-provider tokens.',
	version: '0.0.5'
};
