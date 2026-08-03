import { ThemeSprings } from '../../../../types/springTypes';
import {
	imageAltItem,
	imageBlurDataUrlItem,
	imageClassNameItem,
	imageFillItem,
	imageHeightItem,
	imageLoadingItem,
	imageOnErrorItem,
	imageOnLoadItem,
	imagePlaceholderItem,
	imagePriorityItem,
	imageQualityItem,
	imageSizesItem,
	imageSrcItem,
	imageUnoptimizedItem,
	imageWidthItem
} from '../../../data/documentation/imagePropsShared';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

type SvelteImagePropsListProps = {
	themeSprings: ThemeSprings;
};

export const SvelteImagePropsList = ({
	themeSprings
}: SvelteImagePropsListProps) => (
	<DefinitionGrid
		items={[
			imageSrcItem,
			imageAltItem,
			imageWidthItem,
			imageHeightItem,
			imageFillItem,
			imageQualityItem,
			imageSizesItem,
			imagePriorityItem,
			imagePlaceholderItem,
			imageBlurDataUrlItem,
			imageLoadingItem,
			imageUnoptimizedItem,
			{
				description: 'inline styles (string in Svelte)',
				term: 'style'
			},
			imageClassNameItem,
			imageOnLoadItem,
			imageOnErrorItem
		]}
		themeSprings={themeSprings}
	/>
);
