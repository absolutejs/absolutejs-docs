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

export const SitemapExcludeRoutesSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="exclude-routes"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Excluding Routes
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			Use the <code>exclude</code> array to keep specific routes out of
			the sitemap. Supports exact string matches and regular expressions.
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Exact strings</strong> :{' '}
				<code>"/admin"</code> excludes only that path
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Regex patterns</strong> :{' '}
				<code>{'/^\\/internal/'}</code> excludes all routes starting
				with <code>/internal</code>
			</li>
		</ul>
		<p style={paragraphSpacedStyle}>
			API endpoints, wildcard routes, and parameterized routes (containing{' '}
			<code>*</code> or <code>:</code>) are always excluded automatically.
		</p>
	</section>
);
