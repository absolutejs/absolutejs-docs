import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	rscAsyncPage,
	rscClientComponent,
	rscConfig,
	rscInstall,
	rscLayout,
	rscRoute,
	rscSecureHeaders,
	rscSlots
} from '../../../data/documentation/reactServerComponentsDocsCode';
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
import { DefinitionGrid } from '../../utils/DefinitionGrid';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const pageKeyRows: DocsTableCell[][] = [
	[{ code: 'pages/Dashboard.tsx' }, { code: 'DashboardRSC' }],
	[{ code: 'pages/HomeRSC.tsx' }, { code: 'HomeRSC' }],
	[
		{ code: 'pages/HomeRSC.tsx' },
		{
			code: 'HomeRSCRSC',
			suffix: ' (deprecated alias, warns once in dev)'
		}
	]
];

const tocItems: TocItem[] = [
	{ href: '#setup', label: 'Setup' },
	{ href: '#page-keys', label: 'Page Keys' },
	{ href: '#async-pages', label: 'Async Pages' },
	{ href: '#client-components', label: 'Client Components' },
	{ href: '#serving', label: 'Serving a Page' },
	{ href: '#streaming', label: 'Streaming' },
	{ href: '#absolute-components', label: 'AbsoluteJS Components' },
	{ href: '#csp-nonce', label: 'CSP Nonce' }
];

export const ReactServerComponentsView = ({
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
						id="react-server-components"
						style={h1Style(isMobileOrTablet)}
					>
						Server Components
					</h1>
					<p style={paragraphLargeStyle}>
						React Server Components are an opt-in page type for
						React. A server component runs only on the server. It
						can be async and read data directly, and its code never
						ships to the browser. Components marked{' '}
						<code>&apos;use client&apos;</code> render on the server
						and hydrate in the browser. You serve each page from an
						ordinary Elysia route.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="setup"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Setup
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Server components need{' '}
						<code>react-server-dom-webpack</code>. Install it at the
						same version as <code>react</code>, 19.2.3 or later. The
						build reads it from your project and fails with an
						install instruction when it is missing.
					</p>
					<PrismPlus
						codeString={rscInstall}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Then set <code>reactServerComponentsDirectory</code> in{' '}
						<code>absolute.config.ts</code>. It is separate from{' '}
						<code>reactDirectory</code>, so your existing React
						pages build and render exactly as before.
					</p>
					<PrismPlus
						codeString={rscConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Each file directly in the directory&apos;s{' '}
						<code>pages</code> folder is a page. Put shared server
						and client components anywhere else, for example in a{' '}
						<code>components</code> folder.
					</p>
					<PrismPlus
						codeString={rscLayout}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="page-keys"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Keys
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A page&apos;s manifest key is its file name with{' '}
						<code>RSC</code> appended. A file whose name already
						ends in <code>RSC</code> keeps its name, so{' '}
						<code>pages/HomeRSC.tsx</code> is{' '}
						<code>&apos;HomeRSC&apos;</code>. Its old doubled key,{' '}
						<code>&apos;HomeRSCRSC&apos;</code>, still points to the
						same bundle as a deprecated alias.
					</p>
					<DocsTable
						columns={['Page file', 'asset(manifest, …) key']}
						rows={pageKeyRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						If <code>pages/Home.tsx</code> and{' '}
						<code>pages/HomeRSC.tsx</code> both exist,{' '}
						<code>Home.tsx</code> keeps <code>HomeRSC</code>,{' '}
						<code>HomeRSC.tsx</code> stays at{' '}
						<code>HomeRSCRSC</code>, and the build warns about the
						clash.
					</p>
					<p style={paragraphSpacedStyle}>
						The page component is the export named after the file (
						<code>Dashboard</code> for <code>Dashboard.tsx</code>),
						or the default export.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="async-pages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Async Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A page is a server component that renders the whole
						document, from <code>&lt;html&gt;</code> down. It can be
						an <code>async</code> function and await your database
						or API calls directly. Nested server components can be
						async too.
					</p>
					<PrismPlus
						codeString={rscAsyncPage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>getProject</code> and <code>getActivity</code> run
						on the server. Their code and the data modules they
						import stay out of the browser bundle. Page props go to
						the server component only; they are not written into the
						page as hydration props.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="client-components"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Client Components
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add <code>&apos;use client&apos;</code> at the top of a
						file to make its exports client components. They can use
						state, effects and event handlers. The server renders
						them into the HTML, and the browser hydrates them.
					</p>
					<PrismPlus
						codeString={rscClientComponent}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DefinitionGrid
						items={[
							{
								description:
									'Props passed from a server component to a client component cross to the browser, so they must be serializable. Pass data, not event handlers.',
								term: 'Serializable props'
							},
							{
								description:
									'The browser downloads only the client components a page renders. Each one is loaded as its own chunk.',
								term: 'Per-page loading'
							},
							{
								description:
									'A client component can import anything, including components from your reactDirectory.',
								term: 'Imports'
							}
						]}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="serving"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Serving a Page
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Call <code>handleReactServerPageRequest</code> from{' '}
						<code>@absolutejs/absolute/react</code> in any Elysia
						route. Pass the page&apos;s key as <code>page</code> and
						its props as <code>props</code>.
					</p>
					<PrismPlus
						codeString={rscRoute}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>page</code> is a manifest key, not a component, so
						the handler can&apos;t infer the page&apos;s props. Pass
						the props type as the generic, as above, to have{' '}
						<code>props</code> checked.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="streaming"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Streaming
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						React&apos;s <code>&lt;Suspense&gt;</code> streams. In
						the dashboard above, the shell and the{' '}
						<code>Loading activity...</code> fallback arrive first,
						and the activity list streams in when{' '}
						<code>getActivity</code> resolves.
					</p>
					<p style={paragraphSpacedStyle}>
						<code>SuspenseSlot</code> and <code>StreamSlot</code>{' '}
						also work inside server components.{' '}
						<code>SuspenseSlot</code> takes React content: a{' '}
						<code>fallback</code> plus <code>resolve</code>,{' '}
						<code>promise</code> or a render-prop{' '}
						<code>children</code>. <code>StreamSlot</code> resolves
						to an HTML string.
					</p>
					<PrismPlus
						codeString={rscSlots}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The handler collects streaming slots by default. Pass{' '}
						<code>collectStreamingSlots: false</code> to turn that
						off for a route; slots there keep their fallback.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="absolute-components"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						AbsoluteJS Components
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Import from{' '}
						<code>@absolutejs/absolute/react/components</code>{' '}
						directly in a server component. You don&apos;t need to
						wrap these in your own{' '}
						<code>&apos;use client&apos;</code> file.
					</p>
					<DefinitionGrid
						items={[
							{
								description:
									'SuspenseSlot, StreamSlot, Head, Image and JsonLd render on the server.',
								term: 'Server rendered'
							},
							{
								description:
									'Link and usePrefetch come from a client module. A server component can render <Link>, and it hydrates as a client component. Its props must be serializable.',
								term: 'Client components'
							}
						]}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="csp-nonce"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CSP Nonce
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						With <code>secureHeaders()</code> in use, every inline
						script a server components page writes carries the
						request&apos;s nonce. That covers the inlined server
						payload, React&apos;s streaming scripts and slot
						patches. The hydration entry script gets it too. No page
						code is needed.
					</p>
					<PrismPlus
						codeString={rscSecureHeaders}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
