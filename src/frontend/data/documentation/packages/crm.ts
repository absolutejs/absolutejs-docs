import { PackageDocData } from '../../../../types/packageDocs';

export const crmPackageData: PackageDocData = {
	category: 'Commerce & Growth',
	description:
		'A unified CRM contract (CRMAdapter) plus vendor adapters for the major CRMs, so the rest of your app only ever sees generic CRMContact, CRMLead, and CRMDeal types. OAuth2 flows ride on @absolutejs/auth and citra, token and sync-queue storage are bring-your-own interfaces with in-memory, Redis, SQLite, and Postgres implementations shipped, and a voice bridge connects @absolutejs/voice agents for lead capture and disposition logging.',
	features: [
		{
			description:
				'Generic CRMContact, CRMLead, and CRMDeal types are what your framework sees; vendor-specific shapes are confined to a single adapter file per vendor.',
			title: 'Unified CRM contract'
		},
		{
			description:
				'Adapter factories ship for HubSpot, Salesforce, Pipedrive, Zoho, Attio, Close, monday, and GoHighLevel, all exported from the package root.',
			title: 'Vendor adapter factories'
		},
		{
			description:
				'OAuth2 flows ride on @absolutejs/auth and citra; CRMTokenStore is the source of truth for tokens, refresh tokens, instance URLs, and region context, with automatic re-ask on 401.',
			title: 'Auth-integrated tokens'
		},
		{
			description:
				'CRMTokenStore, CRMLocalEntityStore, and CRMSyncQueue are interfaces with shipped in-memory, Redis, SQLite, and Neon/Postgres implementations.',
			title: 'Bring-your-own store'
		},
		{
			description:
				'Outbound mutations and inbound webhook intake flow through the same sync queue, with a reconciler and pluggable conflict resolvers (last-write-wins, remote-wins).',
			title: 'Bidirectional sync plumbing'
		},
		{
			description:
				'createVoiceCRMBridge and createVoiceLeadCapturePathway connect @absolutejs/voice agents to the CRM runtime for lead capture and disposition logging.',
			title: 'Voice CRM bridge'
		}
	],
	installCommand: 'bun add @absolutejs/crm',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/crm',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/crm',
			label: 'GitHub'
		}
	],
	name: 'CRM',
	notes: [
		{
			body: 'The API surface is in flux. The project is targeting 0.1.0 once all vendor adapters and bidirectional sync ship; v1 ships push-at-call-end plus on-demand pull, and v2 activates full sync via config.',
			title: 'Alpha status',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/crm',
	samples: [
		{
			code: `import {
	createCRMRuntime,
	createHubSpotCRMAdapter,
	createInMemoryCRMSyncQueue,
	createInMemoryCRMTokenStore
} from '@absolutejs/crm';

const runtime = createCRMRuntime({
	adapters: { hubspot: createHubSpotCRMAdapter },
	syncQueue: createInMemoryCRMSyncQueue(),
	tokenStore: createInMemoryCRMTokenStore()
});

// The runtime resolves the user's token from the store, hands it to the
// vendor adapter, and re-asks the store on 401 after a refresh.`,
			description:
				'Wire a runtime from a token store, a sync queue, and the vendor adapter factories you need — swap the in-memory stores for the Redis, SQLite, or Postgres implementations in production.',
			heading: 'Quick Start',
			language: 'typescript'
		}
	],
	status: 'alpha',
	tagline:
		'Multi-vendor CRM adapter framework with one type-safe contract across HubSpot, Salesforce, Pipedrive, and more.',
	version: '0.0.10-alpha.6'
};
