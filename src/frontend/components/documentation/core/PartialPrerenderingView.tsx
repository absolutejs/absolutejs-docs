import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	pprConfig,
	pprPrerenderWarning,
	pprReactPage,
	pprReactStreamSlot,
	pprResponse,
	pprServer,
	pprStaticSlot,
	pprSveltePage
} from '../../../data/documentation/partialPrerenderingDocsCode';
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

const dynamicMarkerRows: DocsTableCell[][] = [
	['React', { code: '<SuspenseSlot dynamic>' }],
	['React', { code: '<StreamSlot dynamic>' }],
	['Svelte', { code: '<StreamSlot dynamic>' }],
	['Svelte', { code: '<AwaitSlot dynamic>' }],
	[
		'Svelte',
		{
			code: '<!-- absolute:stream dynamic -->',
			suffix: ' before an {#await} block'
		}
	]
];

const tocItems: TocItem[] = [
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#static-routes', label: 'Static Routes' },
	{ href: '#dynamic-slots', label: 'Dynamic Slots' },
	{ href: '#static-slots', label: 'Static Slots' },
	{ href: '#react', label: 'React' },
	{ href: '#svelte', label: 'Svelte' },
	{ href: '#per-request', label: 'Per-Request Rendering' },
	{ href: '#revalidation', label: 'Revalidation' },
	{ href: '#development', label: 'Development' }
];

export const PartialPrerenderingView = ({
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
						id="partial-prerendering"
						style={h1Style(isMobileOrTablet)}
					>
						Partial Prerendering
					</h1>
					<p style={paragraphLargeStyle}>
						Partial prerendering serves a pre-rendered page as a
						cached shell, then streams the parts that change per
						visitor into it. You mark those parts as{' '}
						<code>dynamic</code> slots. It works for React and
						Svelte pages.
					</p>
				</animated.div>

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
						A page that is pre-rendered is the same for every
						visitor. A page rendered per request waits for all of
						its data. Partial prerendering splits the page: the
						static parts are rendered once, and only the dynamic
						slots are rendered for each request.
					</p>
					<DefinitionGrid
						items={[
							{
								description:
									'At build time, AbsoluteJS renders each route in static.routes and stores it as a shell. Static slots resolve and their results go into the shell. Dynamic slots keep their fallback, and their resolvers do not run.',
								term: '1. Capture'
							},
							{
								description:
									'A request for the route gets the cached shell at once, before the route handler runs.',
								term: '2. Serve the shell'
							},
							{
								description:
									"The route then renders with the visitor's cookies and headers. Only its dynamic slots resolve, and each one streams into the page already sent.",
								term: '3. Stream the holes'
							}
						]}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="static-routes"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Static Routes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						List the routes to pre-render in{' '}
						<code>static.routes</code>. There is no separate flag. A
						listed route becomes a partial shell when its page
						renders at least one dynamic slot. A listed route with
						no dynamic slot is pre-rendered in full.
					</p>
					<PrismPlus
						codeString={pprConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Pre-rendering runs when you start the production server
						with <code>absolute start</code>, and in{' '}
						<code>absolute compile</code>. A new build captures
						every shell again.
					</p>
					<p style={paragraphSpacedStyle}>
						A listed route that can&apos;t be pre-rendered renders
						on each request instead. Pre-rendering logs one warning
						for each such route, with the reason. A route that
						responds with an error status or with something other
						than HTML is one example.
					</p>
					<PrismPlus
						codeString={pprPrerenderWarning}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="dynamic-slots"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Dynamic Slots
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A dynamic slot is a streaming slot with the{' '}
						<code>dynamic</code> flag. Mark every slot that reads
						the request, such as a cookie or session, or that must
						be fresh on each visit.
					</p>
					<DocsTable
						columns={['Framework', 'Dynamic slot']}
						rows={dynamicMarkerRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Everything outside the dynamic slots, including the
						props the route handler passes to the page, is rendered
						once when the shell is captured. Keep per-visitor data
						inside dynamic slots.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="static-slots"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Static Slots
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A streaming slot without <code>dynamic</code> is static.
						When the shell is captured, AbsoluteJS waits for every
						static slot, including one with an <code>async</code>{' '}
						resolver, and stores its result in the shell. Every
						visitor gets that stored result. The resolver runs again
						only when the shell is captured again.
					</p>
					<PrismPlus
						codeString={pprStaticSlot}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="react"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						React
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add <code>dynamic</code> to a <code>SuspenseSlot</code>{' '}
						or <code>StreamSlot</code> from{' '}
						<code>@absolutejs/absolute/react/components</code>. Here
						the plan list is part of the shell, and the cart is
						rendered for each visitor.
					</p>
					<PrismPlus
						codeString={pprReactPage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>StreamSlot</code> takes the same flag and resolves
						to an HTML string:
					</p>
					<PrismPlus
						codeString={pprReactStreamSlot}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						React page handlers collect streaming slots by default,
						so the route needs nothing extra. The route below reads
						the user from a cookie and loads the plans that end up
						in the shell.
					</p>
					<PrismPlus
						codeString={pprServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="svelte"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Svelte
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						In Svelte, pass <code>dynamic</code> to{' '}
						<code>StreamSlot</code> or <code>AwaitSlot</code>, or
						put <code>&lt;!-- absolute:stream dynamic --&gt;</code>{' '}
						directly before an <code>{'{#await}'}</code> block.
					</p>
					<PrismPlus
						codeString={pprSveltePage}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Svelte routes opt in to streaming slots with{' '}
						<code>collectStreamingSlots: true</code>, as the{' '}
						<code>/account</code> route above does.
					</p>
					<p style={paragraphSpacedStyle}>
						The branches of a streamed <code>{'{#await}'}</code>{' '}
						block are sent as HTML strings. They can hold elements,{' '}
						<code>{'{expressions}'}</code> and{' '}
						<code>{'{@html}'}</code>. Expressions are escaped as
						Svelte escapes them. A component, <code>{'{#if}'}</code>{' '}
						or <code>{'{#each}'}</code> inside them fails the build.
						Use <code>StreamSlot</code> when the slot needs more.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="per-request"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Per-Request Rendering
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The shell is the first thing the browser receives. Time
						to first byte is the cost of reading a file, whatever
						the route handler or the slots do. Each dynamic slot
						patches into its placeholder as it resolves.
					</p>
					<PrismPlus
						codeString={pprResponse}
						language="html"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<DefinitionGrid
						items={[
							{
								description:
									"The route handler and page render run with a copy of the visitor's request, so slots see their cookies and headers. Each visitor gets their own holes.",
								term: 'Request data'
							},
							{
								description:
									"Under secureHeaders(), the shell is restamped with the request's CSP nonce, and every streamed patch carries the same nonce.",
								term: 'CSP nonce'
							},
							{
								description:
									'The response is sent with Cache-Control: private, no-cache, because the holes differ per visitor.',
								term: 'Caching'
							},
							{
								description:
									'A slot that fails or times out keeps its fallback. If the render throws, the shell keeps all its fallbacks and the error is logged.',
								term: 'Failures'
							},
							{
								description:
									'The status and headers are sent with the shell, so a partial route cannot redirect afterwards. Put auth redirects on routes that are not pre-rendered.',
								term: 'Status and redirects'
							}
						]}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="revalidation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Revalidation
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Set <code>static.revalidate</code> to a number of
						seconds. When a shell is older than that, the next
						request still gets the stored shell, and AbsoluteJS
						captures a new one in the background. Later requests get
						the new shell.
					</p>
					<p style={paragraphSpacedStyle}>
						Dynamic slots are never cached, so{' '}
						<code>revalidate</code> only controls how fresh the
						static parts of the page are.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="development"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Development
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>absolute dev</code> does not pre-render. Pages
						render in full on every request, and dynamic slots
						stream like any other slot.
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
