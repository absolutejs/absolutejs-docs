import { PackageCatalogEntry } from '../../../../types/packageDocs';
import { ecosystemProjects } from './ecosystem.generated';
import {
	documentationViewByDirectory,
	packageProjectViewId
} from './packageRoutes';

export { documentationViewByDirectory } from './packageRoutes';

export const packageCatalog: PackageCatalogEntry[] = ecosystemProjects.map(
	(project) => ({
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
		subpackageCount: project.subpackages.length,
		tagline: project.description,
		version: project.version,
		view: packageProjectViewId(project)
	})
);
