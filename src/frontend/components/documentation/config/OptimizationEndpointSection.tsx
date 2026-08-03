import { ThemeProps } from '../../../../types/springTypes';
import { imageEndpointDirect } from '../../../data/documentation/imageOptDocsCode';
import { paragraphSpacedStyle, sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid } from '../../utils/DefinitionGrid';
import { PrismPlus } from '../../utils/PrismPlus';

export const OptimizationEndpointSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="endpoint"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Optimization Endpoint
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			The endpoint accepts three query parameters:
		</p>
		<DefinitionGrid
			items={[
				{
					badge: 'required',
					description: 'the source image path or a full remote URL',
					term: 'url'
				},
				{
					badge: 'required',
					description: (
						<>
							target width in pixels. Must be one of the
							configured <code>deviceSizes</code> or{' '}
							<code>imageSizes</code> values.
						</>
					),
					term: 'w'
				},
				{
					badge: 'optional',
					description:
						'quality 1-100. Defaults to the configured quality.',
					term: 'q'
				}
			]}
			themeSprings={themeSprings}
		/>
		<PrismPlus
			codeString={imageEndpointDirect}
			language="bash"
			showLineNumbers={false}
			themeSprings={themeSprings}
		/>
	</section>
);
