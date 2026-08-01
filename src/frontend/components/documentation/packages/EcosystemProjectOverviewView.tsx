import type {
	PackageAdapterGroup,
	PackageDocData,
	PackageFeature
} from '../../../../types/packageDocs';
import {
	EcosystemProject,
	ecosystemProjects
} from '../../../data/documentation/packages/ecosystem.generated';
import { createPackageView } from './PackageOverviewTemplate';

const statusForVersion = (version: string | null) => {
	if (!version || version.includes('alpha')) return 'alpha';
	if (version.includes('beta')) return 'beta';

	return 'stable';
};

const installCommandFor = (project: EcosystemProject) => {
	if (project.packageName && !project.private)
		return `bun add ${project.packageName}`;
	if (project.repository) return `git clone ${project.repository}.git`;

	return `# Workspace project: ~/abs/${project.directory}`;
};

const linksFor = (project: EcosystemProject) => [
	...(project.repository
		? [{ href: project.repository, label: 'Repository' }]
		: []),
	...(project.repository
		? [{ href: `${project.repository}#readme`, label: 'README' }]
		: []),
	...(project.packageName && !project.private
		? [
				{
					href: `https://www.npmjs.com/package/${project.packageName}`,
					label: 'npm'
				}
			]
		: [])
];

const adapterGroupsFor = (project: EcosystemProject) => {
	const groups: PackageAdapterGroup[] = [];
	if (project.subpackages.length > 0) {
		const publicCount = project.subpackages.filter(
			(subpackage) => !subpackage.private
		).length;
		const privateCount = project.subpackages.length - publicCount;
		groups.push({
			description: `${publicCount} public package${publicCount === 1 ? '' : 's'} and ${privateCount} private workspace project${privateCount === 1 ? '' : 's'} are maintained in this repository.`,
			heading: 'Workspace contents',
			items: project.subpackages.map((subpackage) => ({
				description: `${subpackage.private ? 'Private workspace project' : 'Public package'} — ${subpackage.description}`,
				name: subpackage.name,
				...(subpackage.version ? { version: subpackage.version } : {})
			}))
		});
	}
	if (project.publicExports.length > 0) {
		groups.push({
			description:
				'Supported entry points declared by this project’s package manifest. Internal dist paths are not part of the package contract.',
			heading: project.private
				? 'Workspace entry points'
				: 'Public entry points',
			items: project.publicExports.map((entryPoint) => ({
				description: project.private
					? 'Workspace package entry point declared in package.json.'
					: 'Public package entry point declared in package.json.',
				name: entryPoint
			}))
		});
	}
	if (project.commands.length > 0) {
		groups.push({
			description: 'Scripts declared by this project’s package manifest.',
			heading: 'Package commands',
			items: project.commands.map(({ command, name }) => ({
				description: command,
				name: `bun run ${name}`
			}))
		});
	}

	return groups.length > 0 ? groups : undefined;
};

const featuresFor = (project: EcosystemProject) => {
	const features: PackageFeature[] = project.readmeTopics.map((topic) => ({
		description: topic.description,
		title: topic.title
	}));
	if (project.kind === 'monorepo') {
		const publicCount = project.subpackages.filter(
			(subpackage) => !subpackage.private
		).length;
		const privateCount = project.subpackages.length - publicCount;
		features.unshift({
			description: `${publicCount} public package${publicCount === 1 ? '' : 's'} and ${privateCount} private workspace project${privateCount === 1 ? '' : 's'} are versioned and developed together.`,
			title: 'Repository composition'
		});
	}

	return features;
};

const toPackageDocData = (project: EcosystemProject): PackageDocData => ({
	adapterGroups: adapterGroupsFor(project),
	category: project.category,
	description: project.description,
	features: featuresFor(project),
	installCommand: installCommandFor(project),
	links: linksFor(project),
	name: project.name,
	notes: project.private
		? [
				{
					body: 'This workspace project is not published as a standalone npm package. Use its repository and the accurately labeled public or private workspace contents below.',
					title: 'Workspace project',
					variant: 'info'
				}
			]
		: undefined,
	npmName: project.packageName ?? project.directory,
	samples: project.readmeSamples,
	status: statusForVersion(project.version),
	tagline: project.description,
	version: project.version ?? 'workspace'
});

export const ecosystemProjectViews = Object.fromEntries(
	ecosystemProjects.map((project) => [
		`ecosystem-${project.directory}`,
		createPackageView(toPackageDocData(project))
	])
);
