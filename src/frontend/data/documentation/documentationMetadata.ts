import { ecosystemProjects } from './packages/ecosystem.generated';
import { flagshipGuidanceByPackage } from './packages/flagshipGuidance';
import {
	documentationViewByDirectory,
	packageProjectViewId,
	packageSubpackageViewId
} from './packages/packageRoutes';
import { outcomePlaybooks } from './outcomePlaybooks';

type DocumentationMetadata = {
	description: string;
	title: string;
};

const metadataByView = new Map<string, DocumentationMetadata>();
const maximumDescriptionLength = 158;

const conciseDescription = (value: string) => {
	if (value.length <= maximumDescriptionLength) return value;

	return `${value.slice(0, maximumDescriptionLength - 1).trimEnd()}…`;
};

for (const project of ecosystemProjects) {
	const packageLabel = project.packageName ?? project.name;
	const flagshipGuidance = project.packageName
		? flagshipGuidanceByPackage[project.packageName]
		: undefined;
	const guideMetadata: DocumentationMetadata = {
		description: conciseDescription(
			flagshipGuidance
				? `${project.description} ${flagshipGuidance.outcomes[0]?.description ?? ''}`
				: project.description
		),
		title: `${project.name} Guide | AbsoluteJS`
	};
	const referenceMetadata: DocumentationMetadata = {
		description: `Install ${packageLabel}, inspect its public exports, and use its API with source-backed AbsoluteJS examples.`,
		title: `${packageLabel} Installation, Exports and API | AbsoluteJS`
	};
	metadataByView.set(
		packageProjectViewId(project),
		flagshipGuidance ? guideMetadata : referenceMetadata
	);
	const guideView = documentationViewByDirectory[project.directory];
	if (guideView) metadataByView.set(guideView, guideMetadata);

	for (const subpackage of project.subpackages) {
		metadataByView.set(packageSubpackageViewId(project, subpackage), {
			description: `Install ${subpackage.name}, inspect its public exports, and use it within the ${project.name} workspace.`,
			title: `${subpackage.name} Installation and API | AbsoluteJS`
		});
	}
}

metadataByView.set('packages', {
	description:
		'Explore every AbsoluteJS package, adapter, module, extension, example, and development tool.',
	title: 'Packages | AbsoluteJS'
});
for (const playbook of outcomePlaybooks)
	metadataByView.set(playbook.id, {
		description: conciseDescription(playbook.description),
		title: `${playbook.title} Playbook | AbsoluteJS`
	});

const titleCase = (value: string) =>
	value
		.split('-')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');

export const documentationMetadataFor = (view: string) =>
	metadataByView.get(view) ?? {
		description: `AbsoluteJS documentation for ${titleCase(view)}.`,
		title: `${titleCase(view)} | AbsoluteJS`
	};

export const documentationStructuredDataFor = (view: string) => {
	const metadata = documentationMetadataFor(view);
	const path = view === 'overview' ? '' : `/${view}`;
	const url = `https://absolutejs.com/documentation${path}`;
	const breadcrumb: Record<string, unknown> = {
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				item: 'https://absolutejs.com/',
				name: 'AbsoluteJS',
				position: 1
			},
			{
				'@type': 'ListItem',
				item: 'https://absolutejs.com/documentation',
				name: 'Documentation',
				position: 2
			},
			{
				'@type': 'ListItem',
				item: url,
				name: metadata.title.replace(/ \| AbsoluteJS$/, ''),
				position: 3
			}
		]
	};

	const project = ecosystemProjects.find(
		(candidate) =>
			packageProjectViewId(candidate) === view ||
			candidate.subpackages.some(
				(subpackage) =>
					packageSubpackageViewId(candidate, subpackage) === view
			)
	);
	const playbook = outcomePlaybooks.find(
		(candidate) => candidate.id === view
	);
	if (playbook)
		return JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				breadcrumb,
				{
					'@type': 'HowTo',
					description: playbook.description,
					name: playbook.title,
					step: playbook.quickstart.map((step, index) => ({
						'@type': 'HowToStep',
						name: step.label,
						position: index + 1,
						text: `${step.detail} Verify: ${step.verify}`
					})),
					supply: playbook.packages.map((packageRole) => ({
						'@type': 'HowToSupply',
						name: packageRole.name
					})),
					url
				}
			]
		});
	if (project) {
		if (packageProjectViewId(project) === view)
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					breadcrumb,
					{
						'@type': 'SoftwareSourceCode',
						codeRepository: project.repository ?? undefined,
						description: project.description,
						name: project.packageName ?? project.name,
						programmingLanguage: 'TypeScript',
						runtimePlatform: 'Bun',
						url,
						version: project.version ?? undefined
					}
				]
			});

		const subpackage = project.subpackages.find(
			(candidate) => packageSubpackageViewId(project, candidate) === view
		);
		if (subpackage)
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					breadcrumb,
					{
						'@type': 'SoftwareSourceCode',
						codeRepository: project.repository ?? undefined,
						description: subpackage.description,
						name: subpackage.name,
						programmingLanguage: 'TypeScript',
						runtimePlatform: 'Bun',
						url,
						version: subpackage.version ?? undefined
					}
				]
			});
	}

	return JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			breadcrumb,
			{
				'@type': 'TechArticle',
				description: metadata.description,
				headline: metadata.title.replace(/ \| AbsoluteJS$/, ''),
				inLanguage: 'en-US',
				url
			}
		]
	});
};
