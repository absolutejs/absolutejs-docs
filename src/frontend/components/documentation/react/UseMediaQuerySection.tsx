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

type UseMediaQuerySectionProps = {
	codeString: string;
	themeSprings: ThemeSprings;
};

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
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>breakpoint</strong> : the current
				breakpoint name (<code>xs</code>, <code>sm</code>,{' '}
				<code>md</code>, <code>lg</code>, <code>xl</code>,{' '}
				<code>2xl</code>)
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>isSizeOrGreater</strong> : returns{' '}
				<code>true</code> if the viewport is at or above the given
				breakpoint
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>isSizeOrLess</strong> : returns{' '}
				<code>true</code> if the viewport is at or below the given
				breakpoint
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
