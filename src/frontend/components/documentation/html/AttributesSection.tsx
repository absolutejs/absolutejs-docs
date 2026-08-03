import { ThemeProps } from '../../../../types/springTypes';
import { paragraphSpacedStyle, sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const AttributesSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="attributes"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Attributes
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			The following attributes are used by the build transform:
		</p>
		<DefinitionGrid
			items={[
				{
					description:
						'used for srcset generation. Determines the maximum width for the responsive breakpoints.',
					term: 'width'
				},
				{
					description:
						'prevents cumulative layout shift (CLS) by reserving space before the image loads',
					term: 'height'
				},
				{
					description:
						'responsive breakpoints hint for the browser. Controls which srcset entry the browser downloads.',
					term: 'sizes'
				},
				{
					description:
						'alternative text for accessibility. Always include a descriptive alt attribute.',
					term: 'alt'
				}
			]}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			The <code>data-optimized</code> attribute itself is removed from the
			output HTML. It is only used as a signal to the build transform.
		</p>
	</section>
);
