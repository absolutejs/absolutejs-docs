import { documentationViewByDirectory } from './packages/catalog';
import { ecosystemProjects } from './packages/ecosystem.generated';
import {
	ecosystemProjectViewId,
	ecosystemSubpackageViewId
} from './packages/ecosystemViewIds';

type DocumentationMetadata = {
	description: string;
	title: string;
};

const metadataByView = new Map<string, DocumentationMetadata>();

for (const project of ecosystemProjects) {
	const metadata: DocumentationMetadata = {
		description: project.description,
		title: `${project.name} | AbsoluteJS`
	};
	metadataByView.set(ecosystemProjectViewId(project), metadata);
	const guideView = documentationViewByDirectory[project.directory];
	if (guideView) metadataByView.set(guideView, metadata);

	for (const subpackage of project.subpackages) {
		metadataByView.set(ecosystemSubpackageViewId(project, subpackage), {
			description: subpackage.description,
			title: `${subpackage.name} | AbsoluteJS`
		});
	}
}

metadataByView.set('packages', {
	description:
		'Explore every AbsoluteJS package, adapter, module, extension, example, and development tool.',
	title: 'Packages | AbsoluteJS'
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
