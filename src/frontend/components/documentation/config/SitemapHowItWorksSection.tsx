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

export const SitemapHowItWorksSection = ({ themeSprings }: ThemeProps) => (
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
			When your server starts, AbsoluteJS automatically:
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Discovers all GET routes</strong> :
				reads every route registered on your Elysia app
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Identifies pages</strong> : sends a
				HEAD request to each route and checks if it returns{' '}
				<code>text/html</code>
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Filters non-pages</strong> : API
				endpoints, static assets, wildcard routes, and parameterized
				routes are excluded automatically
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Writes sitemap.xml</strong> :
				generates the XML and writes it to the build directory where the
				static file server picks it up
			</li>
		</ul>
		<p style={paragraphSpacedStyle}>
			This runs in the background and does not block server startup. The
			sitemap is available at <code>/sitemap.xml</code> as soon as
			generation completes.
		</p>
	</section>
);
