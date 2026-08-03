import { ThemeSprings } from '../../../../types/springTypes';
import {
	imageAltItem,
	imageClassNameItem,
	imageFillItem,
	imageHeightItem,
	imageLoadingItem,
	imagePriorityItem,
	imageQualityItem,
	imageSizesItem,
	imageSrcItem,
	imageStyleItem,
	imageUnoptimizedItem,
	imageWidthItem
} from '../../../data/documentation/imagePropsShared';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

type ImageInputsListProps = {
	themeSprings: ThemeSprings;
};

export const ImageInputsList = ({ themeSprings }: ImageInputsListProps) => (
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
			imageLoadingItem,
			imageUnoptimizedItem,
			imageStyleItem,
			imageClassNameItem
		]}
		themeSprings={themeSprings}
	/>
);
