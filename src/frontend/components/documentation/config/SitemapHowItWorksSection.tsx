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
				<strong style={strongStyle}>Discovers page routes</strong> :
				walks every <code>GET</code> route registered on your Elysia app
				and inspects each handler's source for a call to one of the{' '}
				<code>handle*PageRequest</code> helpers (
				<code>handleAngularPageRequest</code>,{' '}
				<code>handleReactPageRequest</code>, etc.).
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Walks framework routers</strong> :
				for any wildcard page route like <code>/portal/*</code>, it
				statically parses the SPA's framework router config (Angular's{' '}
				<code>provideRouter</code>, React Router's{' '}
				<code>createBrowserRouter</code>, Vue Router's{' '}
				<code>createRouter</code>, or AbsoluteJS's Svelte{' '}
				<code>&lt;Router&gt;</code>) and emits one entry per
				non-dynamic, non-redirect leaf.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Reads per-page metadata</strong> :
				extracts any literal <code>{'sitemap: { ... }'}</code> option
				you pass to a <code>handle*PageRequest</code> call and applies
				it to that route's sitemap entries.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Filters non-emittable URLs</strong>{' '}
				: parameterised routes (<code>:slug</code>, <code>**</code>),
				redirects, and routes explicitly opted out via{' '}
				<code>data.sitemap === 'exclude'</code> (or each framework's
				equivalent) are dropped.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Writes sitemap.xml</strong> :
				generates the XML and writes it to the build directory where the
				static file server picks it up.
			</li>
		</ul>
		<p style={paragraphSpacedStyle}>
			This runs in the background and does not block server startup. The
			sitemap is available at <code>/sitemap.xml</code> as soon as
			generation completes. Everything happens via static source analysis
			— no user code is invoked, no synthetic requests are made, no
			framework bootstrap runs.
		</p>
	</section>
);
