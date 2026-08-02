import type {
	EcosystemProject,
	EcosystemSubpackage
} from './ecosystem.generated';

export const documentationViewByDirectory: Record<string, string> = {
	absolutejs: 'overview',
	'absolutejs-vscode-extension': 'vscode-extension-overview',
	ai: 'ai-overview',
	audience: 'audience-overview',
	audit: 'audit-overview',
	auth: 'absolute-auth',
	autoscaler: 'autoscaler-overview',
	beacon: 'beacon-overview',
	billing: 'billing-overview',
	blob: 'blob-overview',
	citra: 'citra',
	cli: 'cli-overview',
	commerce: 'commerce-overview',
	compliance: 'compliance-overview',
	'create-absolutejs': 'create-absolutejs',
	crm: 'crm-overview',
	demo: 'demo-overview',
	deploy: 'deploy-overview',
	discover: 'discover-overview',
	dispatch: 'dispatch-overview',
	eden: 'eden-overview',
	email: 'email-overview',
	enrich: 'enrich-overview',
	errors: 'errors-overview',
	'eslint-plugin': 'eslint',
	health: 'health-overview',
	'isolated-jsc': 'isolated-jsc',
	'linked-providers': 'linked-providers-overview',
	logs: 'logs-overview',
	manifest: 'manifest-overview',
	mcp: 'mcp-overview',
	media: 'media-overview',
	meeting: 'meeting-overview',
	metering: 'metering-overview',
	metrics: 'metrics-overview',
	onchain: 'onchain-overview',
	outcomes: 'outcomes-overview',
	partnership: 'partnership-overview',
	pwa: 'pwa-overview',
	queue: 'queue-overview',
	rag: 'rag-overview',
	'rate-limit': 'rate-limit-overview',
	renown: 'renown-overview',
	replay: 'replay-overview',
	router: 'router-overview',
	rules: 'rules-overview',
	runtime: 'runtime-overview',
	'scoped-state': 'scoped-state',
	secrets: 'secrets-overview',
	sync: 'sync-overview',
	'sync-adapters': 'sync-adapters',
	'sync-packs': 'sync-packs',
	telemetry: 'telemetry-overview',
	tour: 'tour-overview',
	voice: 'voice',
	'voice-adapters': 'voice-adapters',
	'voice-tester': 'voice-tester',
	'vue-composables': 'vue-composables-overview'
};

export const legacyEcosystemProjectViewId = (project: EcosystemProject) =>
	`ecosystem-${project.directory}`;

export const legacyEcosystemSubpackageViewId = (
	project: EcosystemProject,
	subpackage: EcosystemSubpackage
) =>
	`${legacyEcosystemProjectViewId(project)}-${subpackage.name
		.replace(/^@/, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')}`;

export const packageProjectViewId = (project: EcosystemProject) =>
	documentationViewByDirectory[project.directory] ??
	`${project.directory}-overview`;

export const packageSubpackageViewId = (
	_project: EcosystemProject,
	subpackage: EcosystemSubpackage
) => slugifyPackageName(subpackage.name);

export const slugifyPackageName = (value: string) =>
	value
		.replace(/^@absolutejs\//, '')
		.replace(/^@/, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
