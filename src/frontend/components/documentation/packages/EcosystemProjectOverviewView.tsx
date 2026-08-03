import type {
	PackageAdapterGroup,
	PackageDocData,
	PackageFeature
} from '../../../../types/packageDocs';
import {
	EcosystemProject,
	EcosystemSubpackage,
	ecosystemProjects
} from '../../../data/documentation/packages/ecosystem.generated';
import {
	documentationViewByDirectory,
	packageProjectViewId,
	packageSubpackageViewId
} from '../../../data/documentation/packages/packageRoutes';
import { packageExplanationsByName } from '../../../data/documentation/packages/packageExplanations';
import {
	capabilityTopics,
	nonInstallSamples
} from '../../../data/documentation/packages/ecosystemVersions';
import { createPackageView } from './PackageOverviewTemplate';

const statusForVersion = (version: string | null) => {
	if (!version || version.includes('alpha')) return 'alpha';
	if (version.includes('beta')) return 'beta';
	if (version.startsWith('0.')) return 'beta';

	return 'stable';
};

const installCommandFor = (project: EcosystemProject) => {
	const installSample = project.readmeSamples.find((sample) =>
		/^install(?:ation)?$/i.test(sample.heading)
	);
	if (installSample) return installSample.code;
	if (project.packageName && !project.private)
		return `bun add ${project.packageName}`;
	if (project.repository) return `git clone ${project.repository}.git`;

	return `# Workspace project: ~/abs/${project.directory}`;
};

const linksFor = (project: EcosystemProject) => [
	...(documentationViewByDirectory[project.directory]
		? [
				{
					href: `/documentation/${documentationViewByDirectory[project.directory]}`,
					label: 'Guides'
				}
			]
		: []),
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
				href: `/documentation/${packageSubpackageViewId(project, subpackage)}`,
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
	const features: PackageFeature[] = capabilityTopics(
		project.readmeTopics
	).map((topic) => ({ ...topic }));
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

const notesFor = (project: EcosystemProject) => {
	if (project.directory === 'admin') {
		return [
			{
				body: 'The package and repository are named Admin. Exported SiteAdmin and authorizeSiteAdmin identifiers are compatibility APIs from the earlier name; use the Admin terminology for new product and documentation surfaces.',
				title: 'Compatibility naming',
				variant: 'info' as const
			}
		];
	}
	if (project.private) {
		return [
			{
				body: 'This workspace project is not published as a standalone npm package. Use its repository and the accurately labeled public or private workspace contents below.',
				title: 'Workspace project',
				variant: 'info' as const
			}
		];
	}

	return undefined;
};

const toPackageDocData = (project: EcosystemProject): PackageDocData => ({
	adapterGroups: adapterGroupsFor(project),
	api: project.api,
	category: project.category,
	description: project.description,
	explanations: project.packageName
		? packageExplanationsByName[project.packageName]
		: undefined,
	features: featuresFor(project),
	installCommand: installCommandFor(project),
	links: linksFor(project),
	name: project.name,
	notes: notesFor(project),
	npmName: project.packageName ?? project.directory,
	samples: nonInstallSamples(project.readmeSamples),
	status: statusForVersion(project.version),
	tagline: project.description,
	version: project.version ?? 'workspace'
});

const subpackageLinksFor = (
	project: EcosystemProject,
	subpackage: EcosystemSubpackage
) => [
	...(project.repository
		? [
				{
					href: `${project.repository}/tree/HEAD/${subpackage.sourcePath}`,
					label: 'Source'
				},
				...(subpackage.readmeTopics.length > 0 ||
				subpackage.readmeSamples.length > 0
					? [
							{
								href: `${project.repository}/blob/HEAD/${subpackage.sourcePath}/README.md`,
								label: 'README'
							}
						]
					: [])
			]
		: []),
	...(!subpackage.private
		? [
				{
					href: `https://www.npmjs.com/package/${subpackage.name}`,
					label: 'npm'
				}
			]
		: []),
	{
		href: `/documentation/${packageProjectViewId(project)}`,
		label: `${project.name} overview`
	}
];

const subpackageAdapterGroupsFor = (subpackage: EcosystemSubpackage) => {
	const groups: PackageAdapterGroup[] = [];
	if (subpackage.publicExports.length > 0) {
		groups.push({
			description:
				'Supported entry points declared by this package manifest.',
			heading: subpackage.private
				? 'Workspace entry points'
				: 'Public entry points',
			items: subpackage.publicExports.map((entryPoint) => ({
				description: 'Package entry point declared in package.json.',
				name: entryPoint
			}))
		});
	}
	if (subpackage.commands.length > 0) {
		groups.push({
			description: 'Scripts declared by this package manifest.',
			heading: 'Package commands',
			items: subpackage.commands.map(({ command, name }) => ({
				description: command,
				name: `bun run ${name}`
			}))
		});
	}

	return groups.length > 0 ? groups : undefined;
};

const toSubpackageDocData = (
	project: EcosystemProject,
	subpackage: EcosystemSubpackage
): PackageDocData => {
	const isNativeArtifact = subpackage.name.startsWith('@absolutejs/native-');
	let installCommand = `bun add ${subpackage.name}`;
	if (subpackage.private)
		installCommand = `# Private workspace project: ~/abs/${project.directory}/${subpackage.sourcePath}`;
	if (isNativeArtifact)
		installCommand =
			'# Installed automatically as an optional dependency of @absolutejs/absolute';
	let notes: PackageDocData['notes'];
	if (subpackage.private)
		notes = [
			{
				body: 'This project is maintained inside the workspace and is not published as a standalone npm package.',
				title: 'Private workspace project',
				variant: 'info'
			}
		];
	if (isNativeArtifact)
		notes = [
			{
				body: 'Do not install this platform-specific binary directly. The @absolutejs/absolute package selects the correct optional dependency for the current operating system and CPU architecture.',
				title: 'Automatically selected native artifact',
				variant: 'info'
			}
		];

	return {
		adapterGroups: subpackageAdapterGroupsFor(subpackage),
		api: subpackage.api,
		category: project.category,
		description: subpackage.description,
		explanations: packageExplanationsByName[subpackage.name],
		features: capabilityTopics(subpackage.readmeTopics).map((topic) => ({
			...topic
		})),
		installCommand,
		links: subpackageLinksFor(project, subpackage),
		name: subpackage.name,
		notes,
		npmName: subpackage.name,
		samples: nonInstallSamples(subpackage.readmeSamples),
		status: statusForVersion(subpackage.version),
		tagline: subpackage.description,
		version: subpackage.version ?? 'workspace'
	};
};

export const packageReferenceViews = Object.fromEntries(
	ecosystemProjects.flatMap((project) => [
		...(documentationViewByDirectory[project.directory]
			? []
			: [
					[
						packageProjectViewId(project),
						createPackageView(toPackageDocData(project))
					]
				]),
		...project.subpackages.map((subpackage) => [
			packageSubpackageViewId(project, subpackage),
			createPackageView(toSubpackageDocData(project, subpackage))
		])
	])
);
