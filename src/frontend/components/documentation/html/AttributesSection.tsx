import { ThemeProps } from '../../../../types/springTypes';
import {
	listItemStyle,
	listStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';

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
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>width</strong>: used for srcset
				generation. Determines the maximum width for the responsive
				breakpoints.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>height</strong> : prevents
				cumulative layout shift (CLS) by reserving space before the
				image loads
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>sizes</strong> : responsive
				breakpoints hint for the browser. Controls which srcset entry
				the browser downloads.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>alt</strong> : alternative text for
				accessibility. Always include a descriptive alt attribute.
			</li>
		</ul>
		<p style={paragraphSpacedStyle}>
			The <code>data-optimized</code> attribute itself is removed from the
			output HTML. It is only used as a signal to the build transform.
		</p>
	</section>
);
