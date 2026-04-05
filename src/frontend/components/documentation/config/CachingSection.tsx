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

export const CachingSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="caching"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Caching
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			Optimized images are cached to disk at{' '}
			<code>{'{buildDir}/.cache/images/'}</code>. Each entry is keyed by a
			SHA-256 hash of the URL, width, quality, and format. Cache files
			persist across server restarts.
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>ETag</strong>: each cached image
				gets a unique ETag. Browsers send <code>If-None-Match</code> on
				subsequent requests and get 304 Not Modified.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>TTL</strong>: set via{' '}
				<code>minimumCacheTTL</code> (seconds). After expiry, the next
				request regenerates the image.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Cache-Control</strong> : responses
				include <code>public, max-age={'<TTL>'}, must-revalidate</code>.
			</li>
		</ul>
	</section>
);
