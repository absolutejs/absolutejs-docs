import {
	PackageCatalogEntry,
	PackageDocData
} from '../../../../types/packageDocs';
import { audiencePackageData } from './audience';
import { autoscalerPackageData } from './autoscaler';
import { beaconPackageData } from './beacon';
import { billingPackageData } from './billing';
import { blobPackageData } from './blob';
import { commercePackageData } from './commerce';
import { compliancePackageData } from './compliance';
import { crmPackageData } from './crm';
import { demoPackageData } from './demo';
import { discoverPackageData } from './discover';
import { edenPackageData } from './eden';
import { emailPackageData } from './email';
import { engagementPackageData } from './engagement';
import { enrichPackageData } from './enrich';
import { errorsPackageData } from './errors';
import { healthPackageData } from './health';
import { linkedProvidersPackageData } from './linkedProviders';
import { logsPackageData } from './logsPackage';
import { manifestPackageData } from './manifest';
import { mcpPackageData } from './mcp';
import { mediaPackageData } from './media';
import { meetingPackageData } from './meeting';
import { metricsPackageData } from './metrics';
import { onchainPackageData } from './onchain';
import { opsCliPackageData } from './opsCli';
import { outcomesPackageData } from './outcomes';
import { partnershipPackageData } from './partnership';
import { pwaPackageData } from './pwa';
import { ragPackageData } from './rag';
import { renownPackageData } from './renown';
import { replayPackageData } from './replay';
import { rulesPackageData } from './rules';
import { studioPackageData } from './studio';
import { tourPackageData } from './tour';
import { vscodeExtensionPackageData } from './vscodeExtension';
import { vueComposablesPackageData } from './vueComposables';

const toEntry = (data: PackageDocData, view: string): PackageCatalogEntry => ({
	category: data.category,
	name: data.name,
	npmName: data.npmName,
	tagline: data.tagline,
	version: data.version,
	view
});

export const packageCatalog: PackageCatalogEntry[] = [
	{
		category: 'Auth & Identity',
		name: 'Absolute Auth',
		npmName: '@absolutejs/auth',
		tagline:
			'Full-featured authentication for Elysia — OAuth, credentials, MFA, SSO, organizations, and fine-grained authorization.',
		version: '0.53.0',
		view: 'absolute-auth'
	},
	{
		category: 'Auth & Identity',
		name: 'Citra',
		npmName: 'citra',
		tagline:
			'OAuth2 library for TypeScript that powers Absolute Auth provider flows.',
		version: '0.29.2',
		view: 'citra'
	},
	toEntry(linkedProvidersPackageData, 'linked-providers-overview'),
	toEntry(compliancePackageData, 'compliance-overview'),
	{
		category: 'Data & Sync',
		name: 'Sync',
		npmName: '@absolutejs/sync',
		tagline:
			'Reactive-push sync with write-behind caching, CRDT collaboration, and end-to-end types for Elysia.',
		version: '2.9.1',
		view: 'sync-overview'
	},
	{
		category: 'Data & Sync',
		name: 'Queue',
		npmName: '@absolutejs/queue',
		tagline:
			'Durable, typed job queue for Elysia with pluggable Postgres and Redis stores.',
		version: '0.3.0',
		view: 'queue-overview'
	},
	toEntry(blobPackageData, 'blob-overview'),
	{
		category: 'AI',
		name: 'AI',
		npmName: '@absolutejs/ai',
		tagline:
			'AI runtime with providers, streaming, tool calling, and framework adapters.',
		version: '0.0.38',
		view: 'ai-overview'
	},
	toEntry(ragPackageData, 'rag-overview'),
	toEntry(mcpPackageData, 'mcp-overview'),
	toEntry(manifestPackageData, 'manifest-overview'),
	toEntry(rulesPackageData, 'rules-overview'),
	toEntry(outcomesPackageData, 'outcomes-overview'),
	{
		category: 'Voice & Media',
		name: 'Voice',
		npmName: '@absolutejs/voice',
		tagline:
			'Realtime voice primitives and an Elysia plugin with a broad set of STT, TTS, and realtime adapters.',
		version: '0.0.22-beta.632',
		view: 'voice'
	},
	{
		category: 'Voice & Media',
		name: 'Voice Tester',
		npmName: '@absolutejs/voice-tester',
		tagline:
			'AI-driven automated caller for testing voice agents end to end.',
		version: '0.0.4-beta.5',
		view: 'voice-tester'
	},
	toEntry(mediaPackageData, 'media-overview'),
	toEntry(meetingPackageData, 'meeting-overview'),
	{
		category: 'Platform & Infra',
		name: 'Runtime',
		npmName: '@absolutejs/runtime',
		tagline:
			'Run many isolated Bun apps on one host with spawn retry, hibernation, and graceful deploys.',
		version: '0.3.0',
		view: 'runtime-overview'
	},
	{
		category: 'Platform & Infra',
		name: 'Router',
		npmName: '@absolutejs/router',
		tagline:
			'Consistent-hash connection routing for multi-tenant Bun gateways.',
		version: '0.3.0',
		view: 'router-overview'
	},
	{
		category: 'Platform & Infra',
		name: 'Deploy',
		npmName: '@absolutejs/deploy',
		tagline:
			'Deploy pipeline for Bun projects — SSH targets, atomic releases, verification, rollback.',
		version: '0.10.0',
		view: 'deploy-overview'
	},
	{
		category: 'Platform & Infra',
		name: 'Secrets',
		npmName: '@absolutejs/secrets',
		tagline: 'Host-side secret broker for multi-tenant Bun runtimes.',
		version: '0.5.0',
		view: 'secrets-overview'
	},
	{
		category: 'Platform & Infra',
		name: 'Metering',
		npmName: '@absolutejs/metering',
		tagline:
			'Per-tenant cost attribution and budget enforcement with a Stripe meter sink.',
		version: '0.1.0',
		view: 'metering-overview'
	},
	toEntry(billingPackageData, 'billing-overview'),
	toEntry(autoscalerPackageData, 'autoscaler-overview'),
	toEntry(healthPackageData, 'health-overview'),
	toEntry(opsCliPackageData, 'cli-overview'),
	{
		category: 'Platform & Infra',
		name: 'isolated-jsc',
		npmName: '@absolutejs/isolated-jsc',
		tagline:
			'JavaScriptCore-native sandbox for Bun with an isolated-vm-shaped API for untrusted code.',
		version: '0.11.0',
		view: 'isolated-jsc'
	},
	{
		category: 'Platform & Infra',
		name: 'Rate Limit',
		npmName: '@absolutejs/rate-limit',
		tagline:
			'GCRA rate limiting for Bun + Elysia with IETF headers and proxy-aware IP keys.',
		version: '0.3.0',
		view: 'rate-limit-overview'
	},
	{
		category: 'Observability',
		name: 'Telemetry',
		npmName: '@absolutejs/telemetry',
		tagline:
			'Shared OpenTelemetry layer — noop-safe tracer and OTLP HTTP exporter.',
		version: '0.1.1',
		view: 'telemetry-overview'
	},
	toEntry(metricsPackageData, 'metrics-overview'),
	toEntry(logsPackageData, 'logs-overview'),
	toEntry(errorsPackageData, 'errors-overview'),
	toEntry(beaconPackageData, 'beacon-overview'),
	toEntry(replayPackageData, 'replay-overview'),
	{
		category: 'Observability',
		name: 'Audit',
		npmName: '@absolutejs/audit',
		tagline:
			'Append-only audit events with hash-chain tamper evidence and pluggable sinks.',
		version: '0.0.1',
		view: 'audit-overview'
	},
	{
		category: 'Messaging',
		name: 'Dispatch',
		npmName: '@absolutejs/dispatch',
		tagline:
			'Provider-agnostic outbound dispatcher for email, SMS, and push.',
		version: '0.0.1',
		view: 'dispatch-overview'
	},
	toEntry(emailPackageData, 'email-overview'),
	toEntry(commercePackageData, 'commerce-overview'),
	toEntry(crmPackageData, 'crm-overview'),
	toEntry(discoverPackageData, 'discover-overview'),
	toEntry(enrichPackageData, 'enrich-overview'),
	toEntry(audiencePackageData, 'audience-overview'),
	toEntry(partnershipPackageData, 'partnership-overview'),
	toEntry(engagementPackageData, 'engagement-overview'),
	toEntry(pwaPackageData, 'pwa-overview'),
	toEntry(tourPackageData, 'tour-overview'),
	{
		category: 'Frontend & UX',
		name: 'Scoped State',
		npmName: '@absolutejs/scoped-state',
		tagline: 'Per-user scoped state management for Elysia.',
		version: '0.1.2',
		view: 'scoped-state'
	},
	toEntry(vueComposablesPackageData, 'vue-composables-overview'),
	toEntry(demoPackageData, 'demo-overview'),
	toEntry(onchainPackageData, 'onchain-overview'),
	{
		category: 'Dev Tools',
		name: 'Create AbsoluteJS',
		npmName: 'create-absolutejs',
		tagline: 'Scaffold a new AbsoluteJS project with one command.',
		version: '0.13.8',
		view: 'create-absolutejs'
	},
	{
		category: 'Dev Tools',
		name: 'ESLint Plugin',
		npmName: 'eslint-plugin-absolute',
		tagline: 'ESLint rules that enforce AbsoluteJS conventions.',
		version: '0.11.9',
		view: 'eslint'
	},
	toEntry(studioPackageData, 'studio-overview'),
	toEntry(vscodeExtensionPackageData, 'vscode-extension-overview'),
	toEntry(renownPackageData, 'renown-overview'),
	toEntry(edenPackageData, 'eden-overview')
];
