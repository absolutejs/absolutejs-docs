import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	navigationCartStore,
	navigationEvents,
	navigationOptions,
	navigationOptOut,
	navigationPrefetchReact,
	navigationPrefetchSvelte,
	navigationReactPage,
	navigationSveltePage
} from '../../../data/documentation/crossFrameworkNavigationDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const prefetchRows: DocsTableCell[][] = [
	[
		{ code: "'viewport'" },
		'Prefetch when the link scrolls into view, and on hover or pointer down. The production default.'
	],
	[{ code: "'hover'" }, 'Prefetch on hover only. The development default.'],
	[{ code: "'none'" }, 'No prefetch for this link.'],
	[
		{ code: 'prerender' },
		'Also add a prerender speculation rule on hover or pointer down.'
	]
];

const outcomeRows: DocsTableCell[][] = [
	[
		{ code: "'swapped'" },
		'The target page replaced the current one in place.'
	],
	[{ code: "'reloaded'" }, 'The browser did a normal page load instead.'],
	[
		{ code: "'superseded'" },
		'A newer navigation started before this one finished.'
	],
	[
		{ code: "'cancelled'" },
		'An absolute:before-navigate listener called preventDefault().'
	]
];

const tocItems: TocItem[] = [
	{ href: '#overview', label: 'Overview' },
	{ href: '#enable', label: 'Enable Navigation' },
	{ href: '#react-page', label: 'React Page' },
	{ href: '#svelte-page', label: 'Svelte Page' },
	{ href: '#island-stores', label: 'Island Stores' },
	{ href: '#prefetch', label: 'Prefetch' },
	{ href: '#opt-out', label: 'Opting Out' },
	{ href: '#options', label: 'Options and Events' },
	{ href: '#supported-pages', label: 'Supported Pages' }
];

export const CrossFrameworkNavigationView = ({
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
					<h1
						id="cross-framework-navigation"
						style={h1Style(isMobileOrTablet)}
					>
						Cross-Framework Navigation
					</h1>
					<p style={paragraphLargeStyle}>
						A link from a React page to a Svelte page, or back, can
						navigate without a full page load. Call{' '}
						<code>enableNavigation()</code> on both pages and use
						plain links or the <code>Link</code> components.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="overview"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Overview
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When you click a link to another page, AbsoluteJS
						fetches the target page&apos;s HTML and loads its
						stylesheets first. Then it tears down the current page,
						swaps the head and body, and hydrates the new page. The
						swap runs inside a View Transition where the browser
						supports one.
					</p>
					<p style={paragraphSpacedStyle}>
						Back and forward work across the two pages and restore
						scroll positions. Island stores keep their values. The
						new page&apos;s title is announced to screen readers.
						Under <code>secureHeaders()</code>, the new page&apos;s
						scripts and styles run with the current page&apos;s
						nonce. If anything fails, the browser does a normal page
						load.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="enable"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Enable Navigation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Import <code>enableNavigation</code> from{' '}
						<code>@absolutejs/absolute/client/navigation</code> and
						call it on every page that takes part, in a React{' '}
						<code>useEffect</code> or a Svelte <code>onMount</code>.
						The first call installs it for the tab. Later calls do
						nothing, so every page can call it.
					</p>
					<p style={paragraphSpacedStyle}>
						Don&apos;t call <code>disableNavigation()</code> when a
						component unmounts. The page unmounts on every
						navigation.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="react-page"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						React Page
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>Link</code> from{' '}
						<code>@absolutejs/absolute/react/components</code>. It
						renders a plain <code>&lt;a&gt;</code>, prefetches the
						target, and needs no router. A click on a link to
						another page goes to the navigation layer.
					</p>
					<PrismPlus
						codeString={navigationReactPage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Inside a <code>&lt;UniversalRouter&gt;</code>, a link
						that matches one of its routes still navigates through
						react-router. Other links go to the navigation layer.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="svelte-page"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Svelte Page
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>Link</code> from{' '}
						<code>
							@absolutejs/absolute/svelte/router/Link.svelte
						</code>
						. It takes <code>to</code> instead of <code>href</code>.
					</p>
					<PrismPlus
						codeString={navigationSveltePage}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						When a mounted <code>&lt;Router&gt;</code> has a route
						for the URL, the Svelte router handles the click. When
						no mounted router matches, the click goes to the
						navigation layer.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="island-stores"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Island Stores
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Stores made with <code>createIslandStore</code> survive
						the swap. Import the same store on both pages. In the
						example, items added on the React page show on the
						Svelte page, and the count is still there when you go
						back.
					</p>
					<PrismPlus
						codeString={navigationCartStore}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="prefetch"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Prefetch
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Both <code>Link</code> components take a{' '}
						<code>prefetch</code> mode and a <code>prerender</code>{' '}
						flag. A navigation uses the prefetched response when
						there is one.
					</p>
					<DocsTable
						columns={['Prop', 'Behavior']}
						rows={prefetchRows}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={navigationPrefetchReact}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={navigationPrefetchSvelte}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Prefetching is skipped when the user has Save-Data on,
						is on a 2G connection, or has asked for reduced data.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="opt-out"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Opting Out
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add{' '}
						<code>data-absolute-navigation=&quot;off&quot;</code> to
						a link, or to any parent, for a normal page load.
					</p>
					<PrismPlus
						codeString={navigationOptOut}
						language="html"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The browser also handles the click itself for modifier
						and middle clicks, a <code>target</code> other than{' '}
						<code>_self</code>, <code>download</code> links,{' '}
						<code>rel=&quot;external&quot;</code>, other origins,
						and <code>#hash</code> links on the same page.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Options and Events
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>enableNavigation</code> takes two options. The
						first call&apos;s options apply.
					</p>
					<PrismPlus
						codeString={navigationOptions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Use <code>navigateDocument(href, {'{ replace }'})</code>{' '}
						to navigate from code. The layer fires{' '}
						<code>absolute:before-navigate</code> and{' '}
						<code>absolute:after-navigate</code> on{' '}
						<code>window</code>, with <code>url</code> and{' '}
						<code>type</code> in <code>detail</code>.{' '}
						<code>before-navigate</code> can be cancelled, except
						for back and forward.
					</p>
					<PrismPlus
						codeString={navigationEvents}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Outcome', 'Meaning']}
						rows={outcomeRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>isNavigationEnabled()</code> tells you whether the
						layer is on. <code>disableNavigation()</code> removes
						it.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="supported-pages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Supported Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Navigation without a reload works between React and
						Svelte pages, in both directions. Leaving an HTML or
						HTMX page is a normal page load.
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
