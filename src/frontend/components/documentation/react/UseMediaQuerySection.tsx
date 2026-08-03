import { ThemeSprings } from '../../../../types/springTypes';
import { paragraphSpacedStyle, sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid, DefinitionItem } from '../../utils/DefinitionGrid';
import { PrismPlus } from '../../utils/PrismPlus';

type UseMediaQuerySectionProps = {
	codeString: string;
	themeSprings: ThemeSprings;
};

const mediaQueryHookItems: DefinitionItem[] = [
	{
		description: (
			<>
				the current breakpoint name (<code>xs</code>, <code>sm</code>,{' '}
				<code>md</code>, <code>lg</code>, <code>xl</code>,{' '}
				<code>2xl</code>)
			</>
		),
		term: 'breakpoint'
	},
	{
		description: (
			<>
				returns <code>true</code> if the viewport is at or above the
				given breakpoint
			</>
		),
		term: 'isSizeOrGreater'
	},
	{
		description: (
			<>
				returns <code>true</code> if the viewport is at or below the
				given breakpoint
			</>
		),
		term: 'isSizeOrLess'
	}
];

export const UseMediaQuerySection = ({
	codeString,
	themeSprings
}: UseMediaQuerySectionProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="use-media-query"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			useMediaQuery
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			The <code>useMediaQuery</code> hook provides viewport-based
			responsive breakpoints. It returns the current breakpoint name and
			two helper functions for checking size ranges.
		</p>
		<DefinitionGrid
			items={mediaQueryHookItems}
			themeSprings={themeSprings}
		/>
		<PrismPlus
			codeString={codeString}
			language="tsx"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
	</section>
);
