import {
	existsSync,
	readFileSync,
	readdirSync,
	statSync,
	writeFileSync
} from 'node:fs';
import { createHash } from 'node:crypto';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { format, resolveConfig } from 'prettier';
import ts from 'typescript';

const workspaceDirectory = resolve(import.meta.dir, '../..');
const outputPath = resolve(
	import.meta.dir,
	'../src/frontend/data/documentation/packages/ecosystem.generated.ts'
);
const maximumPackageDepth = 4;
const maximumReadmeSampleLength = 4000;
const maximumReadmeSamples = 6;
const maximumReadmeTopics = 100;
const maximumApiSymbolsPerEntrypoint = 80;
const maximumApiSignatureLength = 1200;
const maximumApiDescriptionLength = 500;
const maximumTopicDetails = 12;
const defaultSampleIntentScore = 50;
const versionedSamplePenalty = 200;
const sampleIntentPatterns: Array<{ pattern: RegExp; score: number }> = [
	{ pattern: /quick\s*start|fastest first success/i, score: 120 },
	{ pattern: /install|setup|first deploy/i, score: 110 },
	{ pattern: /usage|example|define an endpoint|start here/i, score: 100 },
	{
		pattern: /production|security|guardrail|readiness|isolation/i,
		score: 90
	},
	{ pattern: /troubleshoot|debug|recovery|verify/i, score: 85 },
	{ pattern: /recipe|browser agent|phone agent|workflow/i, score: 80 }
];

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
	admin: 'Platform & Infra',
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

const readReadmeDigest = (directory: string) => {
	const readmePath = join(directory, 'README.md');
	if (!existsSync(readmePath)) return null;

	return createHash('sha256').update(readFileSync(readmePath)).digest('hex');
};

const readPublicExports = (packageData: Record<string, unknown> | null) => {
	const packageName = packageData?.name;
	const packageExports = packageData?.exports;
	if (typeof packageName !== 'string' || !packageExports) return [];
	if (typeof packageExports === 'string') return [packageName];
	if (typeof packageExports !== 'object') return [];

	return Object.keys(packageExports).map((entry) =>
		entry === '.'
			? packageName
			: `${packageName}/${entry.replace(/^\.\//, '')}`
	);
};

const readPackageCommands = (packageData: Record<string, unknown> | null) => {
	const scripts = packageData?.scripts;
	if (!scripts || typeof scripts !== 'object') return [];

	return Object.entries(scripts)
		.filter(
			(entry): entry is [string, string] => typeof entry[1] === 'string'
		)
		.filter(([name]) =>
			/^(?:build|check|dev|format|lint|start|test|typecheck)(?::|$)/.test(
				name
			)
		)
		.map(([name, command]) => ({ command, name }))
		.sort((left, right) => left.name.localeCompare(right.name));
};

export const cleanMarkdown = (value: string) =>
	value
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/<\/?[a-z][^>]*>/g, '')
		.replace(/[`*~]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

const readMarkdownSection = (lines: string[], startIndex: number) => {
	const blocks: string[] = [];
	let currentBlock: string[] = [];
	let inCodeFence = false;
	const flushBlock = () => {
		const value = cleanMarkdown(currentBlock.join(' '));
		if (value) blocks.push(value);
		currentBlock = [];
	};
	const consumeLine = (line: string) => {
		if (/^```/.test(line)) {
			flushBlock();
			inCodeFence = !inCodeFence;

			return;
		}
		if (inCodeFence || /^!\[/.test(line)) return;
		if (!line) {
			flushBlock();

			return;
		}
		const subheading = /^#{3,6}\s+(.+)$/.exec(line);
		if (subheading) {
			flushBlock();
			blocks.push(cleanMarkdown(subheading[1] ?? ''));

			return;
		}
		const listItem = /^(?:[-*+]\s+|\d+\.\s+)(.+)$/.exec(line);
		if (listItem) {
			flushBlock();
			blocks.push(cleanMarkdown(listItem[1] ?? ''));

			return;
		}
		if (/^\|/.test(line)) {
			flushBlock();
			const cells = line
				.split('|')
				.map((cell) => cleanMarkdown(cell))
				.filter(Boolean);
			const isDivider = cells.every((cell) => /^:?-{3,}:?$/.test(cell));
			if (cells.length > 0 && !isDivider) blocks.push(cells.join(' — '));

			return;
		}
		currentBlock.push(line.replace(/^>\s?/, ''));
	};

	for (let lineIndex = startIndex; lineIndex < lines.length; lineIndex += 1) {
		const line = (lines[lineIndex] ?? '').trim();
		if (/^##\s/.test(line)) break;
		consumeLine(line);
	}
	flushBlock();

	const [description = '', ...details] = blocks;

	return {
		description,
		details: details
			.filter((detail) => detail !== description)
			.slice(0, maximumTopicDetails)
	};
};

type ReadmeTopic = {
	description: string;
	details: string[];
	title: string;
};

// A README section sharing a title with an existing topic (e.g. an authored
// "## Overview" after the synthesized intro topic) is the authored version;
// the earlier description demotes to the merged topic's first detail.
const mergeDuplicateTopic = (duplicate: ReadmeTopic, section: ReadmeTopic) => {
	duplicate.details = [
		duplicate.description,
		...section.details.filter((detail) => detail !== section.description)
	].slice(0, maximumTopicDetails);
	duplicate.description = section.description;
};

const addReadmeTopic = (topics: ReadmeTopic[], section: ReadmeTopic) => {
	const duplicate = topics.find(
		(topic) => topic.title.toLowerCase() === section.title.toLowerCase()
	);
	if (!duplicate) {
		topics.push(section);

		return;
	}
	mergeDuplicateTopic(duplicate, section);
};

const readReadmeTopics = (directory: string) => {
	const readmePath = join(directory, 'README.md');
	if (!existsSync(readmePath)) return [];
	const lines = readFileSync(readmePath, 'utf8').split(/\r?\n/);
	const topics: ReadmeTopic[] = [];
	const titleIndex = lines.findIndex((line) => /^#\s+/.test(line));
	const overview = readMarkdownSection(
		lines,
		titleIndex >= 0 ? titleIndex + 1 : 0
	);
	if (overview.description) topics.push({ ...overview, title: 'Overview' });

	for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
		const headingMatch = /^##\s+(.+)$/.exec(lines[lineIndex] ?? '');
		if (!headingMatch) continue;
		const title = cleanMarkdown(headingMatch[1] ?? '');
		if (
			!title ||
			/^(?:changelog|contributing|license|roadmap|what's new|workspace dev logs)$/i.test(
				title
			)
		)
			continue;
		const section = readMarkdownSection(lines, lineIndex + 1);
		if (!section.description) continue;
		addReadmeTopic(topics, { ...section, title });
		if (topics.length >= maximumReadmeTopics) break;
	}

	return topics;
};

const apiKindFor = (node: ts.Node) => {
	if (ts.isFunctionDeclaration(node)) return 'function';
	if (ts.isClassDeclaration(node)) return 'class';
	if (ts.isInterfaceDeclaration(node)) return 'interface';
	if (ts.isTypeAliasDeclaration(node)) return 'type';
	if (ts.isEnumDeclaration(node)) return 'enum';
	if (ts.isVariableStatement(node)) return 'value';

	return 'export';
};

const declarationDocumentation = (node: ts.Node) => {
	const sourceFile = node.getSourceFile();
	const comments =
		ts.getLeadingCommentRanges(sourceFile.text, node.pos) ?? [];
	const raw = comments
		.map((comment) => sourceFile.text.slice(comment.pos, comment.end))
		.join('\n')
		.replace(/^\/\*\*?|\*\/$/g, '')
		.replace(/^\s*\*\s?/gm, '')
		.replace(/@(?:param|returns?|throws?|example)\b[\s\S]*/g, '');

	return cleanMarkdown(raw).slice(0, maximumApiDescriptionLength);
};

const declarationTagValues = (node: ts.Node, tag: string) => {
	const sourceFile = node.getSourceFile();
	const comments =
		ts.getLeadingCommentRanges(sourceFile.text, node.pos) ?? [];
	const raw = comments
		.map((comment) => sourceFile.text.slice(comment.pos, comment.end))
		.join('\n')
		.replace(/^\/\*\*?|\*\/$/g, '')
		.replace(/^\s*\*\s?/gm, '');
	const pattern = new RegExp(`@${tag}\\s+([^\\n]+)`, 'gi');

	return Array.from(raw.matchAll(pattern), (match) =>
		cleanMarkdown(match[1] ?? '')
	).filter(Boolean);
};

const declarationMetadata = (node: ts.Node) => {
	const [deprecated] = declarationTagValues(node, 'deprecated');
	const [since] = declarationTagValues(node, 'since');
	const throws = declarationTagValues(node, 'throws?');

	return {
		...(deprecated ? { deprecated } : {}),
		...(since ? { since } : {}),
		...(throws.length > 0 ? { throws } : {})
	};
};

const resolveDeclarationModule = (fromPath: string, moduleName: string) => {
	const basePath = resolve(dirname(fromPath), moduleName);
	const candidates = [
		basePath,
		`${basePath}.d.ts`,
		join(basePath, 'index.d.ts')
	];

	return (
		candidates.find(
			(candidate) => existsSync(candidate) && statSync(candidate).isFile()
		) ?? null
	);
};

const exportedNamesFor = (node: ts.Node) => {
	if (ts.isVariableStatement(node))
		return node.declarationList.declarations.flatMap((declaration) =>
			ts.isIdentifier(declaration.name) ? [declaration.name.text] : []
		);
	if (
		(ts.isFunctionDeclaration(node) ||
			ts.isClassDeclaration(node) ||
			ts.isInterfaceDeclaration(node) ||
			ts.isTypeAliasDeclaration(node) ||
			ts.isEnumDeclaration(node)) &&
		node.name
	)
		return [node.name.text];

	return [];
};

const readExportDeclaration = (
	node: ts.ExportDeclaration,
	declarationPath: string,
	seen: Set<string>
) => {
	if (node.exportClause && ts.isNamedExports(node.exportClause))
		return node.exportClause.elements.map((element) => ({
			description: '',
			kind: 'export',
			name: element.name.text,
			signature: element.getText(node.getSourceFile())
		}));
	if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier))
		return [];
	const resolvedPath = resolveDeclarationModule(
		declarationPath,
		node.moduleSpecifier.text
	);
	if (!resolvedPath) return [];

	return readDeclarationSymbols(resolvedPath, seen);
};

type ReadDeclarationSymbols = (
	declarationPath: string,
	seen?: Set<string>
) => Array<{
	deprecated?: string;
	description: string;
	kind: string;
	name: string;
	since?: string;
	signature: string;
	throws?: string[];
}>;

const readDeclarationStatement = (
	node: ts.Statement,
	declarationPath: string,
	seen: Set<string>
) => {
	if (ts.isExportDeclaration(node))
		return readExportDeclaration(node, declarationPath, seen);
	const hasExportModifier =
		ts.canHaveModifiers(node) &&
		ts
			.getModifiers(node)
			?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
	if (!hasExportModifier) return [];
	const signature = node
		.getText(node.getSourceFile())
		.replace(/^export\s+(?:declare\s+)?/, '')
		.slice(0, maximumApiSignatureLength);

	return exportedNamesFor(node).map((name) => ({
		...declarationMetadata(node),
		description: declarationDocumentation(node),
		kind: apiKindFor(node),
		name,
		signature
	}));
};

const readDeclarationSymbols: ReadDeclarationSymbols = (
	declarationPath,
	seen = new Set<string>()
) => {
	if (seen.has(declarationPath) || !existsSync(declarationPath)) return [];
	seen.add(declarationPath);
	const sourceText = readFileSync(declarationPath, 'utf8');
	const sourceFile = ts.createSourceFile(
		declarationPath,
		sourceText,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TS
	);
	const symbols: Array<{
		deprecated?: string;
		description: string;
		kind: string;
		name: string;
		since?: string;
		signature: string;
		throws?: string[];
	}> = [];

	for (const node of sourceFile.statements)
		symbols.push(...readDeclarationStatement(node, declarationPath, seen));

	return Array.from(
		new Map(symbols.map((symbol) => [symbol.name, symbol])).values()
	).slice(0, maximumApiSymbolsPerEntrypoint);
};

const readTypesTarget = (value: unknown) => {
	if (typeof value === 'string')
		return value.endsWith('.d.ts') ? value : null;
	if (!value || typeof value !== 'object') return null;
	const typesTarget = Reflect.get(value, 'types');
	if (typeof typesTarget === 'string') return typesTarget;

	return null;
};

const readPackageApi = (
	directory: string,
	packageData: Record<string, unknown> | null
) => {
	const packageName = packageData?.name;
	const packageExports = packageData?.exports;
	if (
		typeof packageName !== 'string' ||
		!packageExports ||
		typeof packageExports !== 'object'
	)
		return [];

	return Object.entries(packageExports).flatMap(([entry, target]) => {
		const typesTarget = readTypesTarget(target);
		if (!typesTarget) return [];
		const declarationPath = resolve(directory, typesTarget);
		const symbols = readDeclarationSymbols(declarationPath);
		if (symbols.length === 0) return [];

		return [
			{
				entryPoint:
					entry === '.'
						? packageName
						: `${packageName}/${entry.replace(/^\.\//, '')}`,
				symbols
			}
		];
	});
};

const readReadmeSamples = (directory: string) => {
	const readmePath = join(directory, 'README.md');
	if (!existsSync(readmePath)) return [];
	const readme = readFileSync(readmePath, 'utf8');
	const candidates: Array<{
		code: string;
		description: string;
		heading: string;
		language: string;
		sourceIndex: number;
	}> = [];
	for (const match of readme.matchAll(
		/```([a-zA-Z0-9_-]*)\r?\n([\s\S]*?)```/g
	)) {
		const code = (match[2] ?? '').trim();
		if (!code || code.length > maximumReadmeSampleLength) continue;
		const declaredLanguage = (match[1] ?? '').toLowerCase();
		let language = declaredLanguage || 'text';
		if (declaredLanguage === 'ts' || declaredLanguage === 'tsx')
			language = 'typescript';
		if (declaredLanguage === 'js' || declaredLanguage === 'jsx')
			language = 'javascript';
		const precedingLines = readme.slice(0, match.index).split(/\r?\n/);
		const documentTitle = cleanMarkdown(
			(readme.match(/^#\s+(.+)$/m)?.[1] ?? 'Quick Start').trim()
		);
		const headingLineIndex = precedingLines.findLastIndex((line) =>
			/^#{2,6}\s+/.test(line)
		);
		const precedingHeading = precedingLines[headingLineIndex];
		const heading = precedingHeading
			? cleanMarkdown(precedingHeading.replace(/^#{2,6}\s+/, ''))
			: `${documentTitle} quick start`;
		const section = readMarkdownSection(
			precedingLines,
			headingLineIndex >= 0 ? headingLineIndex + 1 : 0
		);
		candidates.push({
			code,
			description:
				section.description || `Working example for ${heading}.`,
			heading,
			language,
			sourceIndex: match.index
		});
	}

	const scoreSample = ({ heading }: { heading: string }) => {
		const intentScore = sampleIntentPatterns.find(({ pattern }) =>
			pattern.test(heading)
		)?.score;
		const versionPenalty = /(?:^|\s)v?\d+\.\d+\.\d+|phase\s+\d+/i.test(
			heading
		)
			? versionedSamplePenalty
			: 0;

		return (intentScore ?? defaultSampleIntentScore) - versionPenalty;
	};
	const headingCounts = new Map<string, number>();
	const intentCounts = new Map<number, number>();

	return candidates
		.sort(
			(left, right) =>
				scoreSample(right) - scoreSample(left) ||
				left.sourceIndex - right.sourceIndex
		)
		.filter((candidate) => {
			const count = headingCounts.get(candidate.heading) ?? 0;
			headingCounts.set(candidate.heading, count + 1);
			const intentIndex = sampleIntentPatterns.findIndex(({ pattern }) =>
				pattern.test(candidate.heading)
			);
			const intentCount = intentCounts.get(intentIndex) ?? 0;
			intentCounts.set(intentIndex, intentCount + 1);

			return count < 2 && intentCount < 2;
		})
		.slice(0, maximumReadmeSamples)
		.map(({ sourceIndex: _sourceIndex, ...sample }, index, selected) => {
			const previousCount = selected
				.slice(0, index)
				.filter(
					(candidate) => candidate.heading === sample.heading
				).length;

			return {
				...sample,
				heading:
					previousCount === 0
						? sample.heading
						: `${sample.heading} ${previousCount + 1}`
			};
		});
};

const readRepository = (directory: string) => {
	const configPath = join(directory, '.git', 'config');
	if (!existsSync(configPath)) return null;
	const match = readFileSync(configPath, 'utf8').match(
		/\[remote "origin"\][\s\S]*?url = (.+)/
	);

	return match?.[1]?.trim().replace(/\.git$/, '') ?? null;
};

const readManifestRepository = (
	packageData: Record<string, unknown> | null
) => {
	const repository = packageData?.repository;
	let raw: unknown;
	if (typeof repository === 'string') raw = repository;
	else if (repository && typeof repository === 'object')
		raw = Reflect.get(repository, 'url');
	if (typeof raw !== 'string') return null;

	return raw
		.replace(/^git\+/, '')
		.replace(/^git@github\.com:/, 'https://github.com/')
		.replace(/\.git$/, '');
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

const normalizeDescription = (value: string) =>
	value.replaceAll('AbsoluteJS AI Studio', 'hosted AbsoluteJS.ai Studio');

const documentedVersion = (
	packageName: string | null,
	version: string | null
) => {
	if (packageName === '@absolutejs/absolute' && version)
		return version.replace(/-beta\.\d+$/, '-beta');

	return version;
};

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
			.map((manifestPath) => ({
				manifestPath,
				packageData: readPackage(manifestPath)
			}))
			.filter(({ packageData: nestedPackageData }) =>
				Boolean(nestedPackageData)
			)
			.map(({ manifestPath, packageData: subpackage }) => ({
				api: readPackageApi(dirname(manifestPath), subpackage),
				commands: readPackageCommands(subpackage),
				description: normalizeDescription(
					subpackage.description ??
						readReadmeTopics(dirname(manifestPath))[0]
							?.description ??
						`${subpackage.name ?? basename(dirname(manifestPath))} package in the ${directory} workspace.`
				),
				name: subpackage.name ?? 'Unnamed package',
				private: subpackage.private === true,
				publicExports: readPublicExports(subpackage),
				readmeDigest: readReadmeDigest(dirname(manifestPath)),
				readmeSamples: readReadmeSamples(dirname(manifestPath)),
				readmeTopics: readReadmeTopics(dirname(manifestPath)),
				sourcePath: relative(projectDirectory, dirname(manifestPath)),
				version: documentedVersion(
					subpackage.name ?? null,
					subpackage.version ?? null
				)
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
			api: readPackageApi(projectDirectory, packageData),
			category: categoryByDirectory[directory] ?? 'Dev Tools',
			commands: readPackageCommands(packageData),
			description: normalizeDescription(
				packageData?.description ??
					readReadmeTopics(projectDirectory)[0]?.description ??
					descriptionByDirectory[directory] ??
					`${titleCase(directory)} repository in the AbsoluteJS workspace.`
			),
			directory,
			kind: kindFor(collection, packageName),
			name: nameFor(directory, packageName),
			packageName,
			private: packageData?.private === true || !packageData,
			publicExports: readPublicExports(packageData),
			readmeDigest: readReadmeDigest(projectDirectory),
			readmeSamples: readReadmeSamples(projectDirectory),
			readmeTopics: readReadmeTopics(projectDirectory),
			repository:
				readRepository(projectDirectory) ??
				readManifestRepository(packageData),
			subpackages: collection ? nestedPackages : [],
			version: documentedVersion(
				packageName,
				packageData?.version ?? null
			)
		};
	});

const source = `// Generated by scripts/generateEcosystemCatalog.ts. Do not edit by hand.\n\nimport type { PackageCategory } from '../../../../types/packageDocs';\n\nexport type EcosystemApiSymbol = {\n\tdescription: string;\n\tkind: string;\n\tname: string;\n\tsignature: string;\n};\n\nexport type EcosystemApiEntrypoint = {\n\tentryPoint: string;\n\tsymbols: EcosystemApiSymbol[];\n};\n\nexport type EcosystemCommand = {\n\tcommand: string;\n\tname: string;\n};\n\nexport type EcosystemSample = {\n\tcode: string;\n\tdescription: string;\n\theading: string;\n\tlanguage: string;\n};\n\nexport type EcosystemTopic = {\n\tdescription: string;\n\tdetails: string[];\n\ttitle: string;\n};\n\nexport type EcosystemSubpackage = {\n\tapi: EcosystemApiEntrypoint[];\n\tcommands: EcosystemCommand[];\n\tdescription: string;\n\tname: string;\n\tprivate: boolean;\n\tpublicExports: string[];\n\treadmeSamples: EcosystemSample[];\n\treadmeTopics: EcosystemTopic[];\n\tsourcePath: string;\n\tversion: string | null;\n};\n\nexport type EcosystemProject = {\n\tapi: EcosystemApiEntrypoint[];\n\tcategory: PackageCategory;\n\tcommands: EcosystemCommand[];\n\tdescription: string;\n\tdirectory: string;\n\tkind: 'monorepo' | 'package' | 'repository';\n\tname: string;\n\tpackageName: string | null;\n\tprivate: boolean;\n\tpublicExports: string[];\n\treadmeSamples: EcosystemSample[];\n\treadmeTopics: EcosystemTopic[];\n\trepository: string | null;\n\tsubpackages: EcosystemSubpackage[];\n\tversion: string | null;\n};\n\nexport const ecosystemProjects: EcosystemProject[] = ${JSON.stringify(projects, null, '\t')};\n`;

const sourceWithReadmeDigests = source
	.replace(
		'export type EcosystemApiSymbol = {',
		'export type EcosystemApiSymbol = {\n\tdeprecated?: string;\n\tsince?: string;\n\tthrows?: string[];'
	)
	.replace(
		'export type EcosystemSubpackage = {',
		'export type EcosystemSubpackage = {\n\treadmeDigest: string | null;'
	)
	.replace(
		'export type EcosystemProject = {',
		'export type EcosystemProject = {\n\treadmeDigest: string | null;'
	);
const prettierOptions = await resolveConfig(outputPath);
const formattedSource = await format(sourceWithReadmeDigests, {
	...prettierOptions,
	parser: 'typescript'
});

writeFileSync(outputPath, formattedSource);
console.warn(`Wrote ${projects.length} projects to ${basename(outputPath)}`);
