import { ThemeProps } from '../../../../types/springTypes';
import { paragraphSpacedStyle, sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const HowItWorksSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="how-it-works"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			How It Works
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			At build time, AbsoluteJS scans your HTML files for{' '}
			<code>&lt;img&gt;</code> tags with the <code>data-optimized</code>{' '}
			attribute and transforms them:
		</p>
		<DefinitionGrid
			items={[
				{
					description: (
						<>
							replaces the original <code>src</code> with a URL
							pointing to the <code>/_absolute/image</code>{' '}
							optimization endpoint
						</>
					),
					term: 'Rewrites src'
				},
				{
					description: (
						<>
							generates a responsive <code>srcset</code> with all
							configured breakpoints
						</>
					),
					term: 'Adds srcset'
				},
				{
					description: (
						<>
							adds <code>loading="lazy"</code> and{' '}
							<code>decoding="async"</code> for performance
						</>
					),
					term: 'Sets loading and decoding'
				},
				{
					description:
						'the attribute is stripped from the output HTML',
					term: 'Removes data-optimized'
				}
			]}
			themeSprings={themeSprings}
		/>
	</section>
);
