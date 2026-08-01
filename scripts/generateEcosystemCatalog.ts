import {
	existsSync,
	readFileSync,
	readdirSync,
	statSync,
	writeFileSync
} from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { format, resolveConfig } from 'prettier';

const workspaceDirectory = resolve(import.meta.dir, '../..');
const outputPath = resolve(
	import.meta.dir,
	'../src/frontend/data/documentation/packages/ecosystem.generated.ts'
);
const maximumPackageDepth = 4;

const excludedDirectories = new Set([
	'.absolutejs',
	'.git',
	'benchmarks',
	'build',
	'dist',
	'mongo',
	'node_modules',
	'repro',
	'templates',
	'test',
	'tests'
]);

const collectionDirectories = new Set(['absolutejs']);

const categoryByDirectory: Record<string, string> = {
	a2a: 'AI',
	absolutejs: 'Frontend & UX',
	'absolutejs-vscode-extension': 'Dev Tools',
	admin: 'Auth & Identity',
	agency: 'AI',
	agent: 'AI',
	'agent-modules': 'AI',
	agents: 'AI',
	'agents-mcp': 'AI',
	ai: 'AI',
	analytics: 'Commerce & Growth',
	arazzo: 'AI',
	artifacts: 'AI',
	attest: 'Platform & Infra',
	audience: 'Commerce & Growth',
	'audience-audiense': 'Commerce & Growth',
	audit: 'Observability',
	'audit-adapters': 'Observability',
	auth: 'Auth & Identity',
	'auth-adapters': 'Auth & Identity',
	autoscaler: 'Platform & Infra',
	beacon: 'Observability',
	benchmarks: 'Dev Tools',
	billing: 'Platform & Infra',
	blob: 'Data & Sync',
	blog: 'Frontend & UX',
	citra: 'Auth & Identity',
	cli: 'Dev Tools',
	collectibles: 'Commerce & Growth',
	commerce: 'Commerce & Growth',
	'commerce-adapters': 'Commerce & Growth',
	compliance: 'Platform & Infra',
	'conformance-suite': 'Dev Tools',
	'create-absolutejs': 'Dev Tools',
	crm: 'Commerce & Growth',
	'dataset-adapters': 'Commerce & Growth',
	demo: 'Dev Tools',
	deploy: 'Platform & Infra',
	discover: 'Commerce & Growth',
	dispatch: 'Messaging',
	'dispatch-adapters': 'Messaging',
	docs: 'Dev Tools',
	eden: 'Data & Sync',
	egress: 'AI',
	email: 'Messaging',
	'engagement-adapters': 'Commerce & Growth',
	enrich: 'Commerce & Growth',
	errors: 'Observability',
	'errors-adapters': 'Observability',
	'eslint-plugin': 'Dev Tools',
	examples: 'Dev Tools',
	execution: 'AI',
	git: 'Data & Sync',
	handoff: 'AI',
	health: 'Observability',
	hotkeys: 'Frontend & UX',
	incidents: 'Observability',
	'isolated-jsc': 'Platform & Infra',
	'linked-providers': 'Auth & Identity',
	logs: 'Observability',
	manifest: 'AI',
	marketplace: 'Commerce & Growth',
	mcp: 'AI',
	media: 'Voice & Media',
	meeting: 'Voice & Media',
	'meeting-adapters': 'Voice & Media',
	metering: 'Platform & Infra',
	metrics: 'Observability',
	observability: 'Observability',
	onchain: 'On-chain',
	'onchain-adapters': 'On-chain',
	outcomes: 'AI',
	partnership: 'Commerce & Growth',
	policy: 'AI',
	pwa: 'Frontend & UX',
	queue: 'Data & Sync',
	'queue-adapters': 'Data & Sync',
	rag: 'AI',
	'rag-adapters': 'AI',
	'rate-limit': 'Platform & Infra',
	reliability: 'Platform & Infra',
	renown: 'Dev Tools',
	'renown-vscode-extension': 'Dev Tools',
	replay: 'Observability',
	router: 'Platform & Infra',
	rules: 'AI',
	runtime: 'Platform & Infra',
	'scoped-state': 'Frontend & UX',
	scripts: 'Dev Tools',
	secrets: 'Platform & Infra',
	slo: 'Platform & Infra',
	sync: 'Data & Sync',
	'sync-adapters': 'Data & Sync',
	'sync-packs': 'Data & Sync',
	telemetry: 'Observability',
	tour: 'Frontend & UX',
	voice: 'Voice & Media',
	'voice-adapters': 'Voice & Media',
	'voice-fixtures-multilingual': 'Voice & Media',
	'voice-tester': 'Voice & Media',
	'vue-composables': 'Frontend & UX',
	vulnerabilities: 'Platform & Infra',
	'vulnerabilities-adapters': 'Platform & Infra',
	'vulnerabilities-modules': 'Platform & Infra',
	wallet: 'Commerce & Growth',
	'wallet-adapters': 'Commerce & Growth',
	webmcp: 'AI'
};

const descriptionByDirectory: Record<string, string> = {
	benchmarks:
		'Reproducible performance and accuracy comparisons for AbsoluteJS packages.',
	'commerce-adapters':
		'Payment, fulfillment, shipping, and transactional-email adapters for @absolutejs/commerce.',
	'conformance-suite':
		'Local OpenID Foundation conformance tooling used to validate standards-based identity implementations.',
	examples:
		'Runnable examples demonstrating AbsoluteJS framework features and ecosystem packages.',
	'meeting-adapters':
		'Voice-source adapters that connect meeting platforms to @absolutejs/meeting.',
	'voice-adapters':
		'Speech-to-text, text-to-speech, and realtime provider adapters for @absolutejs/voice.',
	'voice-fixtures-multilingual':
		'Multilingual audio fixtures used to evaluate and regression-test voice providers.',
	'wallet-adapters':
		'Funding and payment-provider adapters for @absolutejs/wallet.'
};

const labelByDirectory: Record<string, string> = {
	a2a: 'A2A',
	absolutejs: 'AbsoluteJS',
	'absolutejs-vscode-extension': 'AbsoluteJS VS Code Extension',
	'agent-modules': 'Agent Modules',
	'agents-mcp': 'Agents MCP',
	'audience-audiense': 'Audience Audiense Adapter',
	'audit-adapters': 'Audit Adapters',
	'auth-adapters': 'Auth Adapters',
	'commerce-adapters': 'Commerce Adapters',
	'conformance-suite': 'OpenID Conformance Suite',
	'create-absolutejs': 'Create AbsoluteJS',
	'dataset-adapters': 'Dataset Adapters',
	'dispatch-adapters': 'Dispatch Adapters',
	'engagement-adapters': 'Engagement Adapters',
	'errors-adapters': 'Errors Adapters',
	'eslint-plugin': 'ESLint Plugin',
	'isolated-jsc': 'isolated-jsc',
	'linked-providers': 'Linked Providers',
	'meeting-adapters': 'Meeting Adapters',
	'onchain-adapters': 'On-chain Adapters',
	'queue-adapters': 'Queue Adapters',
	'rag-adapters': 'RAG Adapters',
	'rate-limit': 'Rate Limit',
	'renown-vscode-extension': 'Renown VS Code Extension',
	'scoped-state': 'Scoped State',
	'sync-adapters': 'Sync Adapters',
	'sync-packs': 'Sync Packs',
	'voice-adapters': 'Voice Adapters',
	'voice-fixtures-multilingual': 'Multilingual Voice Fixtures',
	'voice-tester': 'Voice Tester',
	'vue-composables': 'Vue Composables',
	'vulnerabilities-adapters': 'Vulnerability Adapters',
	'vulnerabilities-modules': 'Vulnerability Modules',
	'wallet-adapters': 'Wallet Adapters',
	webmcp: 'WebMCP'
};

const readPackage = (path: string) =>
	existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : null;

const readRepository = (directory: string) => {
	const configPath = join(directory, '.git', 'config');
	if (!existsSync(configPath)) return null;
	const match = readFileSync(configPath, 'utf8').match(
		/\[remote "origin"\][\s\S]*?url = (.+)/
	);

	return match?.[1]?.trim().replace(/\.git$/, '') ?? null;
};

const findNestedPackages = (directory: string, depth = 0): string[] => {
	if (depth >= maximumPackageDepth) return [];

	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		if (
			!entry.isDirectory() ||
			entry.name.startsWith('.') ||
			excludedDirectories.has(entry.name)
		)
			return [];
		const childDirectory = join(directory, entry.name);
		const manifestPath = join(childDirectory, 'package.json');
		const manifests = existsSync(manifestPath) ? [manifestPath] : [];

		return [...manifests, ...findNestedPackages(childDirectory, depth + 1)];
	});
};

const titleCase = (value: string) =>
	value
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');

const kindFor = (collection: boolean, packageName: string | null) => {
	if (collection) return 'monorepo';
	if (packageName) return 'package';

	return 'repository';
};

const nameFor = (directory: string, packageName: string | null) => {
	const label = labelByDirectory[directory];
	if (label) return label;
	if (packageName)
		return titleCase(packageName.replace(/^@absolutejs\//, ''));

	return titleCase(directory);
};

const projects = readdirSync(workspaceDirectory)
	.filter((directory) => !directory.startsWith('.') && directory !== 'PAAS')
	.filter((directory) =>
		statSync(join(workspaceDirectory, directory)).isDirectory()
	)
	.sort((left, right) => left.localeCompare(right))
	.map((directory) => {
		const projectDirectory = join(workspaceDirectory, directory);
		const packageData = readPackage(join(projectDirectory, 'package.json'));
		const nestedPackages = findNestedPackages(projectDirectory)
			.map(readPackage)
			.filter(Boolean)
			.map((subpackage) => ({
				description:
					subpackage.description ??
					'No package description provided.',
				name: subpackage.name ?? 'Unnamed package',
				private: subpackage.private === true,
				version: subpackage.version ?? null
			}))
			.sort((left, right) => left.name.localeCompare(right.name));
		const declaredWorkspaces = Array.isArray(packageData?.workspaces)
			? packageData.workspaces
			: (packageData?.workspaces?.packages ?? []);
		const collection =
			collectionDirectories.has(directory) ||
			(packageData?.private === true && declaredWorkspaces.length > 0) ||
			(!packageData && nestedPackages.length > 0);
		const packageName = packageData?.name ?? null;

		return {
			category: categoryByDirectory[directory] ?? 'Dev Tools',
			description:
				packageData?.description ??
				descriptionByDirectory[directory] ??
				`${titleCase(directory)} repository in the AbsoluteJS workspace.`,
			directory,
			kind: kindFor(collection, packageName),
			name: nameFor(directory, packageName),
			packageName,
			private: packageData?.private === true || !packageData,
			repository: readRepository(projectDirectory),
			subpackages: collection ? nestedPackages : [],
			version: packageData?.version ?? null
		};
	});

const source = `// Generated by scripts/generateEcosystemCatalog.ts. Do not edit by hand.\n\nimport type { PackageCategory } from '../../../../types/packageDocs';\n\nexport type EcosystemSubpackage = {\n\tdescription: string;\n\tname: string;\n\tprivate: boolean;\n\tversion: string | null;\n};\n\nexport type EcosystemProject = {\n\tcategory: PackageCategory;\n\tdescription: string;\n\tdirectory: string;\n\tkind: 'monorepo' | 'package' | 'repository';\n\tname: string;\n\tpackageName: string | null;\n\tprivate: boolean;\n\trepository: string | null;\n\tsubpackages: EcosystemSubpackage[];\n\tversion: string | null;\n};\n\nexport const ecosystemProjects: EcosystemProject[] = ${JSON.stringify(projects, null, '\t')};\n`;

const prettierOptions = await resolveConfig(outputPath);
const formattedSource = await format(source, {
	...prettierOptions,
	parser: 'typescript'
});

writeFileSync(outputPath, formattedSource);
console.warn(`Wrote ${projects.length} projects to ${basename(outputPath)}`);
