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
			AbsoluteJS registers a <code>/_absolute/image</code> endpoint
			automatically when your server starts. When a browser requests an
			optimized image:
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Content negotiation</strong> :
				checks the browser's <code>Accept</code> header to determine the
				best output format (AVIF, WebP, or JPEG)
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Cache lookup</strong> : checks the
				disk cache for a previously optimized version with matching URL,
				width, quality, and format
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Sharp optimization</strong> : if not
				cached, loads the source image, auto-rotates based on EXIF,
				resizes to the requested width (never upscales), and converts to
				the negotiated format
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Cache write</strong> : stores the
				optimized image to disk with metadata (ETag, TTL, content type)
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Response</strong> : serves the image
				with <code>Cache-Control</code>, <code>ETag</code>, and{' '}
				<code>Vary: Accept</code> headers
			</li>
		</ul>
	</section>
);
