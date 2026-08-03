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
	imageStyleItem,
	imageUnoptimizedItem,
	imageWidthItem
} from '../../../data/documentation/imagePropsShared';
import { paragraphSpacedStyle, sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

type VueImagePropsSectionProps = {
	themeSprings: ThemeSprings;
};

export const VueImagePropsSection = ({
	themeSprings
}: VueImagePropsSectionProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="image-props"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Image Props
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			The Vue Image component accepts the same props as the React Image
			component:
		</p>
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
				imageStyleItem,
				imageClassNameItem,
				imageOnLoadItem,
				imageOnErrorItem
			]}
			themeSprings={themeSprings}
		/>
	</section>
);
