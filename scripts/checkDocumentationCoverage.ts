import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import process from 'node:process';
import { Glob } from 'bun';
import {
	docsViews,
	documentationSitemapRoutes,
	sidebarCategories
} from '../src/frontend/data/sidebarData';
import { documentationMetadataFor } from '../src/frontend/data/documentation/documentationMetadata';
import { packageCatalog } from '../src/frontend/data/documentation/packages/catalog';
import { ecosystemProjects } from '../src/frontend/data/documentation/packages/ecosystem.generated';
import { flagshipDocumentationContract } from '../src/frontend/data/documentation/packages/documentationContract';
import { flagshipGuidanceByPackage } from '../src/frontend/data/documentation/packages/flagshipGuidance';
import { firstSuccessSamplesByPackage } from '../src/frontend/data/documentation/packages/firstSuccessSamples';
import { packageRelationshipsByName } from '../src/frontend/data/documentation/packages/packageRelationships';
import { outcomePlaybooks } from '../src/frontend/data/documentation/outcomePlaybooks';
import {
	legacyEcosystemProjectViewId,
	legacyEcosystemSubpackageViewId,
	legacyPackageProjectViewId,
	packageProjectViewId,
	packageSubpackageViewId
} from '../src/frontend/data/documentation/packages/packageRoutes';

const workspaceDirectory = resolve(import.meta.dir, '../..');
const minimumMetadataDescriptionLength = 50;
const minimumMetadataTitleLength = 20;
const minimumPackageDescriptionLength = 20;
const failures: string[] = [];
const reachableViews = new Set<string>(['overview', 'packages']);
const sourceWorkspaceAvailable = existsSync(
	resolve(workspaceDirectory, 'absolutejs', 'package.json')
);

const readManifest = (manifestPath: string) =>
	existsSync(manifestPath)
		? JSON.parse(readFileSync(manifestPath, 'utf8'))
		: null;

const readFileDigest = (path: string) =>
	existsSync(path)
		? createHash('sha256').update(readFileSync(path)).digest('hex')
		: null;

const manifestExports = (manifest: Record<string, unknown> | null) => {
	const packageName = manifest?.name;
	const exportsValue = manifest?.exports;
	if (typeof packageName !== 'string' || !exportsValue) return [];
	if (typeof exportsValue === 'string') return [packageName];
	if (typeof exportsValue !== 'object') return [];

	return Object.keys(exportsValue).map((entry) =>
		entry === '.'
			? packageName
			: `${packageName}/${entry.replace(/^\.\//, '')}`
	);
};

const snapshotVersion = (packageName: string | null, version: unknown) => {
	if (typeof version !== 'string') return null;
	if (packageName === '@absolutejs/absolute')
		return version.replace(/-beta\.\d+$/, '-beta');

	return version;
};

const sameStrings = (left: string[], right: string[]) =>
	left.length === right.length &&
	left.every((value, index) => value === right[index]);

const expectedPlaybookCount = 7;
const minimumPlaybookListItems = 3;
if (outcomePlaybooks.length !== expectedPlaybookCount)
	failures.push(
		`Expected ${expectedPlaybookCount} outcome playbooks; found ${outcomePlaybooks.length}.`
	);
const playbookIds = new Set<string>();
for (const playbook of outcomePlaybooks) {
	if (playbookIds.has(playbook.id))
		failures.push(`${playbook.id}: duplicate playbook id.`);
	playbookIds.add(playbook.id);
	if (!(playbook.id in docsViews))
		failures.push(`${playbook.id}: playbook has no documentation route.`);
	if (!playbook.installCommand.startsWith('bun add '))
		failures.push(
			`${playbook.id}: playbook install command is incomplete.`
		);
	if (playbook.prerequisites.length < minimumPlaybookListItems)
		failures.push(`${playbook.id}: playbook prerequisites are too thin.`);
	if (playbook.quickstart.length < minimumPlaybookListItems)
		failures.push(`${playbook.id}: playbook run/verify path is too thin.`);
	if (playbook.expectedResults.length < minimumPlaybookListItems)
		failures.push(
			`${playbook.id}: playbook success criteria are too thin.`
		);
	if (playbook.substitutions.length < 2)
		failures.push(`${playbook.id}: production substitutions are too thin.`);
	if (playbook.failures.length < 2)
		failures.push(`${playbook.id}: failure decisions are too thin.`);
	for (const phase of ['required', 'production', 'operate'])
		if (
			!playbook.packages.some(
				(packageRole) => packageRole.phase === phase
			)
		)
			failures.push(`${playbook.id}: missing ${phase} package role.`);
	for (const packageRole of playbook.packages)
		if (!(packageRole.view in docsViews))
			failures.push(
				`${playbook.id}: package role links to unknown view ${packageRole.view}.`
			);
}

const documentedPackageNames = new Set(
	ecosystemProjects.flatMap((project) => [
		...(project.packageName ? [project.packageName] : []),
		...project.subpackages.map((subpackage) => subpackage.name)
	])
);

for (const [packageName, relationships] of Object.entries(
	packageRelationshipsByName
)) {
	if (!documentedPackageNames.has(packageName))
		failures.push(`${packageName}: relationship owner is not documented.`);
	if (relationships.length === 0)
		failures.push(`${packageName}: relationship contract is empty.`);
	for (const relationship of relationships)
		if (relationship.view && !(relationship.view in docsViews))
			failures.push(
				`${packageName}: relationship links to unknown view ${relationship.view}.`
			);
}

for (const [packageName, sample] of Object.entries(
	firstSuccessSamplesByPackage
)) {
	if (sample.intent !== 'runnable')
		failures.push(`${packageName}: first-success sample is not runnable.`);
	if (!sample.expectedResult)
		failures.push(`${packageName}: runnable sample lacks expected output.`);
	if (!sample.prerequisites || sample.prerequisites.length === 0)
		failures.push(`${packageName}: runnable sample lacks prerequisites.`);
	if (!sample.code.includes('import '))
		failures.push(
			`${packageName}: runnable sample lacks explicit imports.`
		);
}
const legacyPackageViews = new Set(
	ecosystemProjects.flatMap((project) => {
		const legacyView = legacyPackageProjectViewId(project);

		return legacyView === packageProjectViewId(project) ? [] : [legacyView];
	})
);

for (const category of sidebarCategories)
	for (const entry of category.entries) {
		if (entry.id) reachableViews.add(entry.id);
		for (const page of entry.pages ?? []) reachableViews.add(page.id);
	}
for (const catalogEntry of packageCatalog)
	reachableViews.add(catalogEntry.view);

if (ecosystemProjects.some((project) => project.directory === 'PAAS'))
	failures.push(
		'PAAS must never be included in the public documentation catalog.'
	);

if (packageCatalog.length !== ecosystemProjects.length)
	failures.push(
		'Every ecosystem project must have exactly one catalog entry.'
	);

for (const contract of flagshipDocumentationContract) {
	const project = ecosystemProjects.find(
		(candidate) => candidate.directory === contract.directory
	);
	if (!project) {
		failures.push(`${contract.directory}: flagship package is missing.`);
		continue;
	}
	const catalogEntry = packageCatalog.find(
		(entry) => entry.sourceDirectory === contract.directory
	);
	if (!catalogEntry || !(catalogEntry.view in docsViews))
		failures.push(
			`${contract.directory}: flagship package has no canonical guide.`
		);
	if (!project.packageName || project.private)
		failures.push(
			`${contract.directory}: flagship package must be publicly installable.`
		);
	if (!project.version)
		failures.push(`${contract.directory}: flagship version is missing.`);
	if (project.publicExports.length === 0)
		failures.push(
			`${contract.directory}: public exports are undocumented.`
		);
	if (project.readmeSamples.length === 0)
		failures.push(`${contract.directory}: verified example is missing.`);
	if (!project.packageName || !flagshipGuidanceByPackage[project.packageName])
		failures.push(
			`${contract.directory}: outcomes, production guidance, or troubleshooting is missing.`
		);
	const metadata = documentationMetadataFor(catalogEntry?.view ?? '');
	if (
		metadata.title.length < minimumMetadataTitleLength ||
		metadata.description.length < minimumMetadataDescriptionLength
	)
		failures.push(
			`${contract.directory}: search metadata is too thin for a flagship guide.`
		);

	const evidence = [
		project.description,
		...project.publicExports,
		...Object.values(
			project.packageName
				? (flagshipGuidanceByPackage[project.packageName] ?? {})
				: {}
		).flatMap((features) =>
			features.flatMap((feature) => [feature.title, feature.description])
		),
		...project.readmeTopics.flatMap((topic) => [
			topic.title,
			topic.description
		]),
		...project.readmeSamples.flatMap((sample) => [
			sample.heading,
			sample.description,
			sample.code
		])
	].join('\n');
	for (const requiredEvidence of contract.requiredEvidence)
		if (!evidence.toLowerCase().includes(requiredEvidence.toLowerCase()))
			failures.push(
				`${contract.directory}: missing flagship evidence “${requiredEvidence}”.`
			);
	const sampleEvidence = project.readmeSamples
		.flatMap((sample) => [sample.heading, sample.code])
		.join('\n');
	for (const requiredSampleEvidence of contract.requiredSampleEvidence)
		if (
			!sampleEvidence
				.toLowerCase()
				.includes(requiredSampleEvidence.toLowerCase())
		)
			failures.push(
				`${contract.directory}: prioritized example “${requiredSampleEvidence}” is missing.`
			);
}

for (const view of Object.keys(docsViews)) {
	if (view === 'overview' || legacyPackageViews.has(view)) continue;
	if (!documentationSitemapRoutes.includes(`/documentation/${view}`))
		failures.push(
			`${view}: missing from automatic documentation sitemap routes.`
		);
}

for (const project of ecosystemProjects) {
	const catalogEntry = packageCatalog.find(
		(entry) => entry.sourceDirectory === project.directory
	);
	const projectView = packageProjectViewId(project);
	if (!catalogEntry) {
		failures.push(`${project.directory}: missing catalog entry.`);
		continue;
	}
	if (catalogEntry.view !== projectView)
		failures.push(
			`${project.directory}: catalog must link to its source-backed reference page.`
		);
	if (!(projectView in docsViews))
		failures.push(
			`${project.directory}: missing generated project view ${projectView}.`
		);
	if (project.description.length < minimumPackageDescriptionLength)
		failures.push(`${project.directory}: package description is too thin.`);
	if (!project.private && project.readmeTopics.length === 0)
		failures.push(
			`${project.directory}: public package has no source-backed feature documentation.`
		);
	if (
		!project.private &&
		project.readmeSamples.length === 0 &&
		project.api.length === 0 &&
		project.commands.length === 0
	)
		failures.push(
			`${project.directory}: public package has no example, API reference, or command reference.`
		);
	if (sourceWorkspaceAvailable) {
		const manifest = readManifest(
			resolve(workspaceDirectory, project.directory, 'package.json')
		);
		const currentVersion = snapshotVersion(
			project.packageName,
			manifest?.version
		);
		if (currentVersion !== project.version)
			failures.push(
				`${project.directory}: generated version ${project.version ?? 'none'} is stale; source is ${currentVersion ?? 'none'}.`
			);
		if (!sameStrings(manifestExports(manifest), project.publicExports))
			failures.push(
				`${project.directory}: generated public exports are stale.`
			);
	}

	const readmePath = resolve(
		workspaceDirectory,
		project.directory,
		'README.md'
	);
	if (
		sourceWorkspaceAvailable &&
		!existsSync(readmePath) &&
		project.subpackages.length > 0
	)
		failures.push(
			`${project.directory}: monorepo is missing a root README.md.`
		);
	if (
		sourceWorkspaceAvailable &&
		readFileDigest(readmePath) !== project.readmeDigest
	)
		failures.push(
			`${project.directory}: generated README documentation is stale.`
		);

	for (const subpackage of project.subpackages) {
		const view = packageSubpackageViewId(project, subpackage);
		reachableViews.add(view);
		if (!(view in docsViews))
			failures.push(
				`${subpackage.name}: missing generated subpackage view ${view}.`
			);
		if (subpackage.description.length < minimumPackageDescriptionLength)
			failures.push(
				`${subpackage.name}: package description is too thin.`
			);
		const isNativeArtifact = /^@absolutejs\/native-/.test(subpackage.name);
		if (
			!subpackage.private &&
			!isNativeArtifact &&
			subpackage.readmeTopics.length === 0
		)
			failures.push(
				`${subpackage.name}: public package has no source-backed feature documentation.`
			);
		if (
			!subpackage.private &&
			!isNativeArtifact &&
			subpackage.readmeSamples.length === 0 &&
			subpackage.api.length === 0 &&
			subpackage.commands.length === 0
		)
			failures.push(
				`${subpackage.name}: public package has no example, API reference, or command reference.`
			);
		if (sourceWorkspaceAvailable) {
			const subpackageDirectory = resolve(
				workspaceDirectory,
				project.directory,
				subpackage.sourcePath
			);
			const manifest = readManifest(
				resolve(subpackageDirectory, 'package.json')
			);
			const currentVersion = snapshotVersion(
				subpackage.name,
				manifest?.version
			);
			if (currentVersion !== subpackage.version)
				failures.push(
					`${subpackage.name}: generated version is stale.`
				);
			if (
				!sameStrings(
					manifestExports(manifest),
					subpackage.publicExports
				)
			)
				failures.push(
					`${subpackage.name}: generated public exports are stale.`
				);
			if (
				readFileDigest(resolve(subpackageDirectory, 'README.md')) !==
				subpackage.readmeDigest
			)
				failures.push(
					`${subpackage.name}: generated README documentation is stale.`
				);
		}
		if (!catalogEntry.searchText.includes(subpackage.name))
			failures.push(
				`${subpackage.name}: not indexed by package catalog search.`
			);
		for (const entryPoint of subpackage.publicExports) {
			if (!catalogEntry.searchText.includes(entryPoint))
				failures.push(
					`${entryPoint}: not indexed by package catalog search.`
				);
		}
	}
}

const generatedEvidence = JSON.stringify(ecosystemProjects);
if (generatedEvidence.includes('README Example'))
	failures.push(
		'Generated samples contain the generic README Example label.'
	);
if (generatedEvidence.includes('A verified example from the package README.'))
	failures.push('Generated samples contain the retired generic description.');
for (const exactIdentifier of [
	"BlobError('INVALID_KEY')",
	'Promise<Uint8Array>',
	'REGISTRY_AGENT_SIGNING_JWK'
])
	if (!generatedEvidence.includes(exactIdentifier))
		failures.push(
			`Generated documentation corrupted or omitted ${exactIdentifier}.`
		);

for (const view of Object.keys(docsViews)) {
	if (view.startsWith('ecosystem-'))
		failures.push(`${view}: legacy ecosystem route must not be canonical.`);
}

for (const project of ecosystemProjects) {
	const legacyPackageView = legacyPackageProjectViewId(project);
	const canonicalPackageView = packageProjectViewId(project);

	if (legacyPackageView !== canonicalPackageView) {
		if (!(legacyPackageView in docsViews))
			failures.push(
				`${project.directory}: legacy package route ${legacyPackageView} cannot redirect.`
			);
		if (
			documentationSitemapRoutes.includes(
				`/documentation/${legacyPackageView}`
			)
		)
			failures.push(
				`${project.directory}: legacy package route must not be indexed.`
			);
	}
	if (legacyEcosystemProjectViewId(project) === packageProjectViewId(project))
		failures.push(`${project.directory}: legacy route did not migrate.`);
	for (const subpackage of project.subpackages)
		if (
			legacyEcosystemSubpackageViewId(project, subpackage) ===
			packageSubpackageViewId(project, subpackage)
		)
			failures.push(`${subpackage.name}: legacy route did not migrate.`);
}

const forbiddenPublicDocs = [
	'@absolutejs/absolute/ai',
	'elysia-scoped-state',
	'github.com/alexkahndev/elysia-scoped-state'
];
const docsGlob = new Glob('src/**/*.{ts,tsx,md,mdx}');
for await (const file of docsGlob.scan(resolve(import.meta.dir, '..'))) {
	if (file.endsWith('ecosystem.generated.ts')) continue;
	const contents = readFileSync(resolve(import.meta.dir, '..', file), 'utf8');
	for (const forbidden of forbiddenPublicDocs) {
		if (contents.includes(forbidden))
			failures.push(
				`${file}: contains historical package reference ${forbidden}.`
			);
	}
	for (const match of contents.matchAll(
		/href\s*=\s*["']\/documentation\/([^"'#?\s]+)/g
	)) {
		const [, linkedView] = match;
		if (linkedView && !linkedView.includes('{'))
			reachableViews.add(linkedView);
		if (
			linkedView &&
			!linkedView.includes('{') &&
			!(linkedView in docsViews)
		)
			failures.push(
				`${file}: links to unknown documentation view ${linkedView}.`
			);
	}
}

for (const view of Object.keys(docsViews))
	if (!legacyPackageViews.has(view) && !reachableViews.has(view))
		failures.push(
			`${view}: documentation page is orphaned from navigation, catalog, and internal links.`
		);

if (failures.length > 0) {
	console.error(failures.map((failure) => `- ${failure}`).join('\n'));
	process.exit(1);
}

const subpackageCount = ecosystemProjects.reduce(
	(total, project) => total + project.subpackages.length,
	0
);
console.warn(
	`Documentation coverage verified for ${ecosystemProjects.length} projects and ${subpackageCount} nested packages.`
);
