import { ThemeProps } from '../../../../types/springTypes';
import {
	sitemapSpaAngular,
	sitemapSpaReact,
	sitemapSpaSvelte,
	sitemapSpaVue,
	sitemapWildcardElysiaRoute
} from '../../../data/documentation/sitemapDocsCode';
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

export const SitemapSpaSubRoutesSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="spa-sub-routes"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			SPA Sub-Routes
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			Single-page apps mounted under a wildcard Elysia route — like{' '}
			<code>app.get('/portal/*', ...)</code> — host many client-side URLs
			that the server never registers individually. AbsoluteJS discovers
			those URLs by statically reading your page module's framework router
			config and emits one sitemap entry per non-dynamic leaf, prefixed by
			the mount path.
		</p>
		<PrismPlus
			codeString={sitemapWildcardElysiaRoute}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			The mount path comes from each framework's idiomatic base-URL slot.
			The route list comes from the same router config your app uses to
			navigate at runtime — there's no second source of truth to maintain.
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Dynamic segments</strong> (
				<code>:id</code>, <code>**</code>, <code>*</code>) are skipped
				automatically. Use the <code>routes</code> callback in the
				sitemap config to enumerate parameterised URLs from a database
				or CMS.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Per-sub-route opt-out</strong> : set{' '}
				<code>sitemap: 'exclude'</code> on a single Route inside the SPA
				config (slot name varies by framework — see below).
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>Nested routes</strong> work too;
				child paths are joined to the parent's path during emission.
			</li>
		</ul>

		<AnchorHeading
			id="spa-sub-routes-angular"
			level="h3"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Angular
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			Mount path comes from the page module's{' '}
			<code>{"{ provide: APP_BASE_HREF, useValue: '/portal/' }"}</code>
			provider. Routes come from the first argument to{' '}
			<code>provideRouter(...)</code>. Per-route opt-out uses the built-in{' '}
			<code>Route.data</code> slot.
		</p>
		<PrismPlus
			codeString={sitemapSpaAngular}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>

		<AnchorHeading
			id="spa-sub-routes-react"
			level="h3"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			React
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			Mount path comes from the <code>basename</code> option of{' '}
			<code>createBrowserRouter</code>. Routes come from the first
			argument. Per-route opt-out uses <code>Route.handle</code> (React
			Router's free-form metadata slot).
		</p>
		<PrismPlus
			codeString={sitemapSpaReact}
			language="tsx"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>

		<AnchorHeading
			id="spa-sub-routes-vue"
			level="h3"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Vue
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			Mount path comes from the argument to{' '}
			<code>createWebHistory('/portal/')</code>. Routes come from the{' '}
			<code>routes</code> option of <code>createRouter</code>. Per-route
			opt-out uses <code>Route.meta</code>.
		</p>
		<PrismPlus
			codeString={sitemapSpaVue}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>

		<AnchorHeading
			id="spa-sub-routes-svelte"
			level="h3"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Svelte
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			Mount path comes from the <code>basepath</code> attribute on
			AbsoluteJS's <code>&lt;Router&gt;</code> component. Routes come from
			child <code>&lt;Route path="..."&gt;</code> tags.
		</p>
		<PrismPlus
			codeString={sitemapSpaSvelte}
			language="markup"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>

		<p style={paragraphSpacedStyle}>
			<strong style={strongStyle}>Caveat</strong> : analysis is
			source-level. Routes built by a runtime function (
			<code>const routes = computeRoutes(env)</code>) or a base path
			pulled from a variable (<code>useValue: getBasePath()</code>) can't
			be read statically — fall back to <code>sitemap.routes</code> in the
			config to supply those URLs by hand.
		</p>
	</section>
);
