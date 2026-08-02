import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { Glob } from 'bun';
import {
	docsViews,
	documentationSitemapRoutes
} from '../src/frontend/data/sidebarData';
import { packageCatalog } from '../src/frontend/data/documentation/packages/catalog';
import { ecosystemProjects } from '../src/frontend/data/documentation/packages/ecosystem.generated';
import {
	legacyEcosystemProjectViewId,
	legacyEcosystemSubpackageViewId,
	packageProjectViewId,
	packageSubpackageViewId
} from '../src/frontend/data/documentation/packages/packageRoutes';

const workspaceDirectory = resolve(import.meta.dir, '../..');
const failures: string[] = [];

if (ecosystemProjects.some((project) => project.directory === 'PAAS'))
	failures.push(
		'PAAS must never be included in the public documentation catalog.'
	);

if (packageCatalog.length !== ecosystemProjects.length)
	failures.push(
		'Every ecosystem project must have exactly one catalog entry.'
	);

for (const view of Object.keys(docsViews)) {
	if (view === 'overview') continue;
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

	const readmePath = resolve(
		workspaceDirectory,
		project.directory,
		'README.md'
	);
	if (!existsSync(readmePath) && project.subpackages.length > 0)
		failures.push(
			`${project.directory}: monorepo is missing a root README.md.`
		);

	for (const subpackage of project.subpackages) {
		const view = packageSubpackageViewId(project, subpackage);
		if (!(view in docsViews))
			failures.push(
				`${subpackage.name}: missing generated subpackage view ${view}.`
			);
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

for (const view of Object.keys(docsViews)) {
	if (view.startsWith('ecosystem-'))
		failures.push(`${view}: legacy ecosystem route must not be canonical.`);
}

for (const project of ecosystemProjects) {
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
