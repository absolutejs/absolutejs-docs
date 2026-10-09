import { PackageCatalogEntry } from '../../../../types/packageDocs';
import { ecosystemProjects } from './ecosystem.generated';
import {
	documentationViewByDirectory,
	packageProjectViewId
} from './packageRoutes';

export { documentationViewByDirectory } from './packageRoutes';

type CatalogProject = (typeof ecosystemProjects)[number];

// A private project's own name is a workspace detail nobody can install,
// so show its published packages, or failing that its repository.
const badgeFor = (project: CatalogProject) => {
	if (!project.private && project.packageName) return project.packageName;
	const published = project.subpackages
		.filter((subpackage) => !subpackage.private)
		.map((subpackage) => subpackage.name);
	const [first] = published;
	if (first)
		return published.length > 1
			? `${first} +${published.length - 1} more`
			: first;

	return project.repository
		? project.repository.replace(/^https:\/\/github\.com\//, '')
		: project.directory;
};

const statusForVersion = (version: string | null) => {
	if (!version || version.includes('alpha')) return 'alpha';
	if (version.includes('beta') || version.startsWith('0.')) return 'beta';

	return 'stable';
};

export const packageCatalog: PackageCatalogEntry[] = ecosystemProjects.map(
	(project) => ({
		badge: badgeFor(project),
		category: project.category,
		guideView: documentationViewByDirectory[project.directory],
		kind: project.kind,
		name: project.name,
		npmName: project.packageName,
		private: project.private,
		searchText: [
			...project.publicExports,
			...project.readmeTopics.flatMap((topic) => [
				topic.title,
				topic.description
			]),
			...project.subpackages.flatMap((subpackage) => [
				subpackage.name,
				subpackage.description,
				...subpackage.publicExports,
				...subpackage.readmeTopics.flatMap((topic) => [
					topic.title,
					topic.description
				])
			])
		].join(' '),
		sourceDirectory: project.directory,
		status: statusForVersion(project.version),
		subpackageCount: project.subpackages.length,
		tagline: project.description,
		version: project.version,
		view: packageProjectViewId(project)
	})
);
