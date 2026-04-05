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
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Rewrites src</strong> : replaces the
				original <code>src</code> with a URL pointing to the{' '}
				<code>/_absolute/image</code> optimization endpoint
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Adds srcset</strong> : generates a
				responsive <code>srcset</code> with all configured breakpoints
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Sets loading and decoding</strong> :
				adds <code>loading="lazy"</code> and{' '}
				<code>decoding="async"</code> for performance
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Removes data-optimized</strong> :
				the attribute is stripped from the output HTML
			</li>
		</ul>
	</section>
);
