import { ThemeSprings } from '../../../../types/springTypes';
import { paragraphSpacedStyle, sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid, DefinitionItem } from '../../utils/DefinitionGrid';
import { PrismPlus } from '../../utils/PrismPlus';

type BreakpointsSectionProps = {
	codeString: string;
	themeSprings: ThemeSprings;
};

const breakpointItems: DefinitionItem[] = [
	{ badge: '0px', description: '', term: 'xs' },
	{ badge: '640px', description: '', term: 'sm' },
	{ badge: '768px', description: '', term: 'md' },
	{ badge: '1024px', description: '', term: 'lg' },
	{ badge: '1280px', description: '', term: 'xl' },
	{ badge: '1536px', description: '', term: '2xl' }
];

export const BreakpointsSection = ({
	codeString,
	themeSprings
}: BreakpointsSectionProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="breakpoints"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Breakpoints
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			The default breakpoints match Tailwind CSS values. The hook checks
			viewport width against these thresholds and returns the largest
			breakpoint that the current width satisfies.
		</p>
		<DefinitionGrid items={breakpointItems} themeSprings={themeSprings} />
		<PrismPlus
			codeString={codeString}
			language="tsx"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
	</section>
);
