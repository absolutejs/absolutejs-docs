import { ThemeProps } from '../../../../types/springTypes';
import {
	listItemStyle,
	listStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';

export const AvifSupportSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="avif"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			AVIF Support
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			AVIF delivers ~20-30% smaller files than WebP but encoding is ~50x
			slower. AbsoluteJS handles this with async pre-generation:
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				Add <code>"avif"</code> to your <code>formats</code> array
				before <code>"webp"</code>
			</li>
			<li style={listItemStyle}>
				First request: browser gets WebP immediately
			</li>
			<li style={listItemStyle}>
				Background: AVIF variant is generated and cached
			</li>
			<li style={listItemStyle}>
				Next request from an AVIF-capable browser: served from cache
				instantly
			</li>
		</ul>
	</section>
);
