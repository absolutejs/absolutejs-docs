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
			Use the <code>exclude</code> array in{' '}
			<code>absolute.config.ts</code> to keep routes out of the
			sitemap. Each entry can be a string (exact match) or a regex
			(tested against the full URL path).
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Exact strings</strong> :{' '}
				<code>"/admin"</code> drops only that path.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Regex patterns</strong> :{' '}
				<code>{'/^\\/admin(\\/|$)/'}</code> drops <code>/admin</code>{' '}
				and every <code>/admin/*</code> sub-route — useful for
				excluding an entire SPA wing.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Per-route opt-out</strong> : for
				one SPA sub-route, set the framework's route metadata to{' '}
				<code>sitemap: 'exclude'</code> (Angular{' '}
				<code>Route.data</code>, React Router <code>Route.handle</code>,
				Vue Router <code>Route.meta</code>).
			</li>
		</ul>
		<p style={paragraphSpacedStyle}>
			Three things are dropped automatically and don't need to appear
			in <code>exclude</code>:
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				Routes with <code>:param</code>, <code>*</code>, or{' '}
				<code>**</code> segments in their path (dynamic, can't enumerate).
			</li>
			<li style={listItemStyle}>
				Handlers that don't call any <code>handle*PageRequest</code>{' '}
				(treated as API endpoints, not pages).
			</li>
			<li style={listItemStyle}>
				Pure <code>redirectTo</code> routes inside an SPA router
				config — they aren't destination URLs.
			</li>
		</ul>
		<p style={paragraphSpacedStyle}>
			Wildcard routes <em>are</em> kept when their handler is a page
			handler — they're the mount points for SPA sub-routes. The
			wildcard URL itself isn't emitted (it has no canonical
			destination); the sitemap emits the SPA's actual leaf URLs
			instead.
		</p>
	</section>
);
