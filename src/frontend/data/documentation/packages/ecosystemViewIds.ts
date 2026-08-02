import type {
	EcosystemProject,
	EcosystemSubpackage
} from './ecosystem.generated';

export const ecosystemProjectViewId = (project: EcosystemProject) =>
	`ecosystem-${project.directory}`;
export const ecosystemSubpackageViewId = (
	project: EcosystemProject,
	subpackage: EcosystemSubpackage
) =>
	`${ecosystemProjectViewId(project)}-${slugifyPackageName(subpackage.name)}`;
export const slugifyPackageName = (value: string) =>
	value
		.replace(/^@/, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
