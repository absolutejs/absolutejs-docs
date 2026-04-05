import { ThemeSprings } from '../../../../types/springTypes';
import {
	listItemStyle,
	listStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';

type BreakpointsSectionProps = {
	codeString: string;
	themeSprings: ThemeSprings;
};

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
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>xs</strong>: 0px
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>sm</strong>: 640px
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>md</strong>: 768px
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>lg</strong>: 1024px
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>xl</strong>: 1280px
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>2xl</strong>: 1536px
			</li>
		</ul>
		<PrismPlus
			codeString={codeString}
			language="tsx"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
	</section>
);
