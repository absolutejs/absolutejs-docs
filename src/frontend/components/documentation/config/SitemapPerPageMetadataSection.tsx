import { ThemeProps } from '../../../../types/springTypes';
import { sitemapPerPageMetadata } from '../../../data/documentation/sitemapDocsCode';
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

export const SitemapPerPageMetadataSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="per-page-metadata"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Per-Page Metadata in Handlers
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			Every framework's page-handler input accepts an optional{' '}
			<code>sitemap</code> field. AbsoluteJS reads it statically from the
			handler source at registration time and applies it to the sitemap
			entries produced from that route — no extra config file to keep in
			sync, no runtime cost in the handler itself.
		</p>
		<PrismPlus
			codeString={sitemapPerPageMetadata}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			For a wildcard SPA route like <code>/portal/*</code>, the metadata
			applies to every SPA sub-route emitted from that mount point. To
			target a specific sub-route inside an SPA, use the framework's
			per-route metadata slot — see{' '}
			<a href="#spa-sub-routes">SPA Sub-Routes</a>.
		</p>
		<p style={paragraphSpacedStyle}>
			<strong style={strongStyle}>Precedence</strong>, highest first:
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<code>sitemap.overrides[path]</code> in{' '}
				<code>absolute.config.ts</code>
			</li>
			<li style={listItemStyle}>
				The <code>sitemap</code> option on the page handler call
			</li>
			<li style={listItemStyle}>
				<code>sitemap.defaultChangefreq</code> /{' '}
				<code>defaultPriority</code> in the config
			</li>
			<li style={listItemStyle}>
				Built-in defaults (<code>weekly</code> / <code>0.8</code>)
			</li>
		</ul>
		<p style={paragraphSpacedStyle}>
			<strong style={strongStyle}>Caveat</strong> : values must be literal
			strings and numbers — the field is read by inspecting the handler's
			source text, not by invoking the handler. A computed value like{' '}
			<code>sitemap: getMetadata()</code> won't be picked up; use{' '}
			<code>sitemap.overrides</code> in the config for those cases.
		</p>
	</section>
);
