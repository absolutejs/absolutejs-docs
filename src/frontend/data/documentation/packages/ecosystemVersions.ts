import type { PackageDocData } from '../../../../types/packageDocs';
import type { PackageCard } from '../../../components/utils/PackageCardGrid';
import { ecosystemProjects } from './ecosystem.generated';
import { packageExplanationsByName } from './packageExplanations';

const packageVersions = new Map<string, string>();
const packageApi = new Map(
	ecosystemProjects.flatMap((project) => [
		...(project.packageName
			? [[project.packageName, project.api] as const]
			: []),
		...project.subpackages.map(
			(subpackage) => [subpackage.name, subpackage.api] as const
		)
	])
);
const packageFacts = new Map(
	ecosystemProjects.flatMap((project) => [
		...(project.packageName
			? [
					[
						project.packageName,
						{
							features: project.readmeTopics,
							samples: project.readmeSamples
						}
					] as const
				]
			: []),
		...project.subpackages.map(
			(subpackage) =>
				[
					subpackage.name,
					{
						features: subpackage.readmeTopics,
						samples: subpackage.readmeSamples
					}
				] as const
		)
	])
);

const mergeByKey = <Item>(
	curated: Item[],
	source: Item[],
	keyFor: (item: Item) => string
) =>
	Array.from(
		new Map(
			[...source, ...curated].map((item) => [keyFor(item), item])
		).values()
	);

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

export const synchronizePackageDocData = (data: PackageDocData) => {
	const facts = packageFacts.get(data.npmName);

	return {
		...data,
		adapterGroups: data.adapterGroups?.map((group) => ({
			...group,
			items: group.items.map((item) => ({
				...item,
				...(item.version
					? {
							version: currentPackageVersion(
								item.name,
								item.version
							)
						}
					: {})
			}))
		})),
		api: packageApi.get(data.npmName) ?? data.api,
		explanations:
			data.explanations ?? packageExplanationsByName[data.npmName],
		features: mergeByKey(data.features, facts?.features ?? [], (feature) =>
			feature.title.toLowerCase()
		),
		samples: mergeByKey(
			data.samples,
			facts?.samples ?? [],
			(sample) => sample.code
		),
		version: currentPackageVersion(data.npmName, data.version)
	};
};
