import type {
	EcosystemProject,
	EcosystemSubpackage
} from './ecosystem.generated';

const unchangedPackageViews = new Set([
	'absolute-auth',
	'citra',
	'create-absolutejs',
	'eslint',
	'isolated-jsc',
	'overview',
	'scoped-state',
	'sync-adapters',
	'sync-packs',
	'voice',
	'voice-adapters',
	'voice-tester'
]);

export const documentationViewByDirectory: Record<string, string> = {
	absolutejs: 'overview',
	'absolutejs-vscode-extension': 'vscode-extension',
	ai: 'ai-overview',
	audience: 'audience',
	audit: 'audit',
	auth: 'absolute-auth',
	autoscaler: 'autoscaler',
	beacon: 'beacon-overview',
	billing: 'billing',
	blob: 'blob',
	citra: 'citra',
	cli: 'cli',
	commerce: 'commerce',
	compliance: 'compliance',
	'create-absolutejs': 'create-absolutejs',
	crm: 'crm',
	demo: 'demo-overview',
	deploy: 'deploy',
	discover: 'discover',
	dispatch: 'dispatch',
	eden: 'eden-overview',
	email: 'email',
	enrich: 'enrich',
	errors: 'errors-overview',
	'eslint-plugin': 'eslint',
	health: 'health',
	'isolated-jsc': 'isolated-jsc',
	'linked-providers': 'linked-providers',
	logs: 'logs-package',
	manifest: 'manifest',
	mcp: 'mcp-overview',
	media: 'media',
	meeting: 'meeting',
	metering: 'metering',
	metrics: 'metrics',
	onchain: 'onchain',
	outcomes: 'outcomes',
	partnership: 'partnership',
	pwa: 'pwa',
	queue: 'queue-overview',
	rag: 'rag-overview',
	'rate-limit': 'rate-limit',
	renown: 'renown',
	replay: 'replay-overview',
	router: 'router',
	rules: 'rules',
	runtime: 'runtime',
	'scoped-state': 'scoped-state',
	secrets: 'secrets',
	sync: 'sync-overview',
	'sync-adapters': 'sync-adapters',
	'sync-packs': 'sync-packs',
	telemetry: 'telemetry-package',
	tour: 'tour-overview',
	voice: 'voice',
	'voice-adapters': 'voice-adapters',
	'voice-tester': 'voice-tester',
	'vue-composables': 'vue-composables'
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

export const legacyPackageProjectViewId = (project: EcosystemProject) => {
	const canonicalView = packageProjectViewId(project);
	if (
		canonicalView.endsWith('-overview') ||
		unchangedPackageViews.has(canonicalView)
	)
		return canonicalView;
	if (project.directory === 'absolutejs-vscode-extension')
		return 'vscode-extension-overview';

	return `${project.directory}-overview`;
};

export const packageProjectViewId = (project: EcosystemProject) =>
	documentationViewByDirectory[project.directory] ??
	(project.subpackages.length > 0
		? `${project.directory}-overview`
		: project.directory);

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
