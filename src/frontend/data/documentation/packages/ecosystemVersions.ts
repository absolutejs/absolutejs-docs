import type { PackageDocData } from '../../../../types/packageDocs';
import type { PackageCard } from '../../../components/utils/PackageCardGrid';
import { ecosystemProjects } from './ecosystem.generated';

const packageVersions = new Map<string, string>();

for (const project of ecosystemProjects) {
	if (project.packageName && project.version)
		packageVersions.set(project.packageName, project.version);
	for (const subpackage of project.subpackages)
		if (subpackage.version)
			packageVersions.set(subpackage.name, subpackage.version);
}

export const currentPackageVersion = (packageName: string, fallback: string) =>
	packageVersions.get(packageName) ?? fallback;

export const synchronizePackageCards = (cards: PackageCard[]) =>
	cards.map((card) => ({
		...card,
		...(card.packageName && card.version
			? {
					version: currentPackageVersion(
						card.packageName,
						card.version
					)
				}
			: {})
	}));

export const synchronizePackageDocData = (data: PackageDocData) => ({
	...data,
	adapterGroups: data.adapterGroups?.map((group) => ({
		...group,
		items: group.items.map((item) => ({
			...item,
			...(item.version
				? {
						version: currentPackageVersion(item.name, item.version)
					}
				: {})
		}))
	})),
	version: currentPackageVersion(data.npmName, data.version)
});
