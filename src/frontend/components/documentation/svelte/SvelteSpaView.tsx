import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	svelteGoto,
	svelteHashMode,
	svelteLink,
	svelteNestedRouter,
	sveltePageRune,
	svelteRouteParams,
	svelteRouterPrimitives,
	svelteSpaHandler,
	svelteSpaPage,
	wildcardRoutePattern
} from '../../../data/documentation/spaDocsCode';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#why-shipped', label: 'Why AbsoluteJS Ships This' },
	{ href: '#wildcard-route', label: 'Wildcard Route' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#page-component', label: 'Page Component' },
	{ href: '#primitives', label: 'Primitives' },
	{ href: '#router', label: '<Router>' },
	{ href: '#route', label: '<Route>' },
	{ href: '#link', label: '<Link>' },
	{ href: '#page-rune', label: 'page (rune)' },
	{ href: '#goto', label: 'goto / pushState / replaceState' },
	{ href: '#hash-mode', label: 'Hash Mode' },
	{ href: '#nested', label: 'Nested Routers' }
];

const WhyShippedList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Svelte has no first-party router.</strong>{' '}
			SvelteKit is a meta-framework, not a router — and it owns the
			whole app. AbsoluteJS users want a router that drops into a
			single page, not a runtime that takes over.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>
				Third-party routers ship raw <code>.svelte</code> files.
			</strong>{' '}
			Bun has no built-in Svelte plugin, so a server bundle pass over
			something like <code>svelte-routing</code> fails to compile its
			source. Authoring our own router and shipping pre-compiled JS
			sidesteps the entire problem.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>
				API names align with SvelteKit
			</strong>{' '}
			where there's an analog (<code>goto</code>, <code>page</code>,{' '}
			<code>pushState</code>, <code>replaceState</code>) so users
			migrating from SvelteKit don't relearn the primitives.
		</li>
	</ul>
);

const RouterPropsList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>url</strong>: SSR URL passthrough.
			On the server, the page handler auto-injects the request
			pathname into props (see Page Handler section below). On the
			client, omit it — the router reads <code>window.location</code>{' '}
			directly.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>basepath</strong>: optional URL
			prefix the router operates under. Stacks with parent{' '}
			<code>{'<Router basepath>'}</code> blocks for nested routers.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>mode</strong>:{' '}
			<code>'history'</code> (default, clean URLs) or{' '}
			<code>'hash'</code> (<code>/#/path</code>, for static deploys).
		</li>
	</ul>
);

const RoutePropsList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>path</strong>: pattern with{' '}
			<code>:param</code>, <code>:param?</code> (optional), and{' '}
			<code>*</code> (wildcard) syntax.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>content</strong>: a Svelte 5 snippet.
			Receives a <code>params</code> argument typed from the path
			literal — no annotation needed.
		</li>
	</ul>
);

const MatchPriorityList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			Longest static prefix wins (<code>/users/me</code> beats{' '}
			<code>/users/:id</code>).
		</li>
		<li style={listItemStyle}>
			Then most static segments (<code>/a/b/:c</code> beats{' '}
			<code>/a/:b/:c</code>).
		</li>
		<li style={listItemStyle}>
			Then declaration order (tie-breaker).
		</li>
	</ul>
);

const LinkPropsList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>to</strong>: destination URL
			(relative or absolute).
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>prefetch</strong>:{' '}
			<code>'hover'</code> (default), <code>'viewport'</code>, or{' '}
			<code>'none'</code>.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>replaceState</strong>: use{' '}
			<code>history.replaceState</code> instead of{' '}
			<code>pushState</code>.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>noScroll</strong>,{' '}
			<strong style={strongStyle}>keepFocus</strong>: pass-through to
			the underlying <code>goto()</code>.
		</li>
		<li style={listItemStyle}>
			All standard <code>{'<a>'}</code> attributes pass through
			(<code>class</code>, <code>aria-*</code>, etc.).
		</li>
	</ul>
);

const LinkBehaviorList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			Internal same-origin URLs: client-side navigation via{' '}
			<code>goto()</code>.
		</li>
		<li style={listItemStyle}>
			External URLs, <code>target="_blank"</code>,{' '}
			<code>download</code>, modifier-key clicks (Ctrl/Cmd/Shift): fall
			through to browser default. No interception.
		</li>
		<li style={listItemStyle}>
			No JS available: the rendered <code>{'<a href>'}</code> still
			works as a normal link. Progressive enhancement by default.
		</li>
	</ul>
);

export const SvelteSpaView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const showDesktopToc = !isMobileOrTablet;

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 id="svelte-spa" style={h1Style(isMobileOrTablet)}>
						Svelte SPA
					</h1>
					<p style={paragraphLargeStyle}>
						Drive client-side sub-route navigation inside a Svelte
						page using the AbsoluteJS-shipped router. Unlike React,
						Vue, and Angular — which have battle-tested third-party
						or first-party routers — Svelte's ecosystem doesn't
						have a canonical answer, so AbsoluteJS ships one as a
						sub-export.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="why-shipped"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why AbsoluteJS Ships This
					</AnchorHeading>
					<WhyShippedList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="wildcard-route"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Wildcard Route
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Refresh on any sub-route hits the server with the actual
						URL. Register a wildcard pattern so the same handler
						responds for every URL the page's router knows about:
					</p>
					<PrismPlus
						codeString={wildcardRoutePattern}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="page-handler"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Handler
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pass <code>request</code> through to the page handler.
						The handler computes{' '}
						<code>new URL(request.url).pathname</code> and merges it
						into your page's props as <code>url</code> (only if you
						didn't supply your own <code>url</code>):
					</p>
					<PrismPlus
						codeString={svelteSpaHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="page-component"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Component
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Wrap your routes in <code>{'<Router url={url}>'}</code>.
						The <code>url</code> prop drives SSR matching; on the
						client it's undefined and the router reads{' '}
						<code>window.location</code>:
					</p>
					<PrismPlus
						codeString={svelteSpaPage}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="primitives"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Primitives
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Three components and four runtime primitives, exported
						from <code>@absolutejs/absolute/svelte/router</code>.
						Components are imported by file path so Svelte's
						compiler resolves them; everything else is a regular
						package-root import.
					</p>
					<PrismPlus
						codeString={svelteRouterPrimitives}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="router"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						{'<Router>'}
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Context provider that owns the route registry and
						resolves the active match. Wrap your page (or any
						subtree) in <code>{'<Router url={url}>'}</code> on the
						server, <code>{'<Router>'}</code> on the client.
					</p>
					<RouterPropsList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="route"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						{'<Route>'}
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Declarative path matcher. Renders its <code>content</code>{' '}
						snippet at its own DOM location when active — so a
						<code>{'<Route>'}</code> nested inside a layout{' '}
						<code>{'<section>'}</code> renders inside that section,
						not at the router's root.
					</p>
					<RoutePropsList />
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1.5rem'
						}}
					>
						<code>params</code> is type-inferred from the path
						literal — no annotation needed:
					</p>
					<PrismPlus
						codeString={svelteRouteParams}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1.5rem'
						}}
					>
						<strong style={strongStyle}>Match priority</strong>{' '}
						(specificity ranking, matches React Router v6+, Vue
						Router, Angular Router, and SvelteKit's internal
						matcher):
					</p>
					<MatchPriorityList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="link"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						{'<Link>'}
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Anchor wrapper with click interception, prefetch, and
						programmatic-nav semantics. Renders a real{' '}
						<code>{'<a href>'}</code>:
					</p>
					<PrismPlus
						codeString={svelteLink}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<LinkPropsList />
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1.5rem'
						}}
					>
						<strong style={strongStyle}>Behavior</strong>:
					</p>
					<LinkBehaviorList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="page-rune"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						page (rune)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Reactive route state. Mirrors SvelteKit's{' '}
						<code>page</code> from <code>$app/state</code> — same
						shape, same property names, so SvelteKit code that
						reads <code>page.url.pathname</code> ports over without
						changes.
					</p>
					<PrismPlus
						codeString={sveltePageRune}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="goto"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						goto / pushState / replaceState
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Programmatic navigation and shallow-routing primitives.
						Names match SvelteKit's <code>$app/navigation</code>:
					</p>
					<PrismPlus
						codeString={svelteGoto}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1.5rem'
						}}
					>
						<code>goto()</code> wraps the location change in{' '}
						<code>document.startViewTransition</code> when
						supported. Reduced-motion users automatically get
						instant swaps.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="hash-mode"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Hash Mode
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Opt-in via <code>{'<Router mode="hash">'}</code>. Matches
						against <code>window.location.hash</code> instead of
						<code>pathname</code>. Useful for static deploys where
						the host can't be configured to wildcard-route to a
						single HTML file:
					</p>
					<PrismPlus
						codeString={svelteHashMode}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="nested"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Nested Routers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>{'<Router basepath>'}</code> values stack from
						outer to inner. Useful for embeddable SPA fragments
						shipped as packages:
					</p>
					<PrismPlus
						codeString={svelteNestedRouter}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1.5rem'
						}}
					>
						<code>page.url</code> in the inner context still
						reflects the full URL; only{' '}
						<code>{'<Route path>'}</code> matching is scoped by the
						basepath stack.
					</p>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					isOpen={tocOpen ?? false}
					items={tocItems}
					onToggle={onTocToggle}
					themeSprings={themeSprings}
				/>
			)}
		</div>
	);
};
