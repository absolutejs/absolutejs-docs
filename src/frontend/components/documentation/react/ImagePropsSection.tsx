import { ThemeSprings } from '../../../../types/springTypes';
import {
	imageAltItem,
	imageBlurDataUrlItem,
	imageClassNameItem,
	imageHeightItem,
	imageOnErrorItem,
	imageOnLoadItem,
	imagePlaceholderItem,
	imagePriorityItem,
	imageQualityItem,
	imageSrcItem,
	imageStyleItem,
	imageWidthItem
} from '../../../data/documentation/imagePropsShared';
import { paragraphSpacedStyle, sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

type ImagePropsSectionProps = {
	themeSprings: ThemeSprings;
};

export const ImagePropsSection = ({ themeSprings }: ImagePropsSectionProps) => (
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
			All available props for the <code>Image</code> component:
		</p>
		<DefinitionGrid
			items={[
				imageSrcItem,
				imageAltItem,
				imageWidthItem,
				imageHeightItem,
				{
					description:
						'when true, the image fills its parent container using absolute positioning',
					term: 'fill'
				},
				imageQualityItem,
				{
					description: 'responsive sizes attribute for the browser',
					term: 'sizes'
				},
				imagePriorityItem,
				imagePlaceholderItem,
				imageBlurDataUrlItem,
				{
					description: (
						<>
							<code>"lazy"</code> or <code>"eager"</code>.
							Defaults to <code>"lazy"</code>.
						</>
					),
					term: 'loading'
				},
				{
					description:
						'skip optimization and serve the original image',
					term: 'unoptimized'
				},
				{
					description: 'custom function to generate the image URL',
					term: 'loader'
				},
				{
					description: (
						<>
							override the resolved <code>src</code> on the
							rendered <code>&lt;img&gt;</code>
						</>
					),
					term: 'overrideSrc'
				},
				{
					description: (
						<>
							<code>"high"</code>, <code>"low"</code>, or{' '}
							<code>"auto"</code>
						</>
					),
					term: 'fetchPriority'
				},
				{
					description: 'CORS setting for the image request',
					term: 'crossOrigin'
				},
				{
					description: 'referrer policy for the image request',
					term: 'referrerPolicy'
				},
				imageClassNameItem,
				imageStyleItem,
				imageOnLoadItem,
				imageOnErrorItem
			]}
			themeSprings={themeSprings}
		/>
	</section>
);
