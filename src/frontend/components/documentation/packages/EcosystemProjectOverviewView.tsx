import { PackageDocData } from '../../../../types/packageDocs';
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
	...(project.packageName && !project.private
		? [
				{
					href: `https://www.npmjs.com/package/${project.packageName}`,
					label: 'npm'
				}
			]
		: [])
];

const toPackageDocData = (project: EcosystemProject): PackageDocData => ({
	adapterGroups:
		project.subpackages.length > 0
			? [
					{
						description:
							'Packages maintained together in this repository. Each package keeps its own version and publication lifecycle.',
						heading: 'Subpackages',
						items: project.subpackages.map((subpackage) => ({
							description: subpackage.description,
							name: subpackage.name,
							...(subpackage.version
								? { version: subpackage.version }
								: {})
						}))
					}
				]
			: undefined,
	category: project.category,
	description: project.description,
	features:
		project.kind === 'monorepo'
			? [
					{
						description: `${project.subpackages.length} subpackages are developed together while remaining independently consumable.`,
						title: 'Monorepo overview'
					}
				]
			: [],
	installCommand: installCommandFor(project),
	links: linksFor(project),
	name: project.name,
	notes: project.private
		? [
				{
					body: 'This workspace project is not published as a standalone npm package. Use its repository or the published subpackages listed below.',
					title: 'Workspace project',
					variant: 'info'
				}
			]
		: undefined,
	npmName: project.packageName ?? project.directory,
	samples: [],
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
