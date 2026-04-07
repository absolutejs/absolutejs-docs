import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
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
import { AnchorHeading } from '../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import {
	streamingRawFrameworkSnippet,
	streamingTransportModes
} from '../../../data/documentation/streamingDocsCode';

const tocItems: TocItem[] = [
	{ href: '#what-it-is', label: 'What It Is' },
	{ href: '#authoring-models', label: 'Raw vs Framework' },
	{ href: '#current-transport', label: 'Current Transport' },
	{ href: '#raw-slots', label: 'Raw Slots' },
	{ href: '#framework-primitives', label: 'Framework Primitives' },
	{ href: '#detached-transport', label: 'Detached Transport' }
];

const AuthoringLayerList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Raw slots</strong> : you own the
			fallback HTML and the resolved HTML directly. This is the
			lowest-level transport API and the correct abstraction for plain
			HTML. HTMX gets its own native streaming primitive.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Framework primitives</strong> : you
			author fallback and resolved UI with JSX, Svelte markup, Vue
			templates, or Angular template syntax. AbsoluteJS lowers that into
			the same slot transport underneath.
		</li>
	</ul>
);

export const OutOfOrderStreamingView = ({
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
						id="out-of-order-streaming"
						style={h1Style(isMobileOrTablet)}
					>
						Out-of-Order Streaming
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS can stream async regions independently of DOM
						order. The page shell and slot fallbacks render
						immediately, then each slot resolves whenever its server
						work finishes.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="what-it-is"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What It Is
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Out-of-order streaming means your fastest server work
						can reach the browser first even if that region appears
						later in the document. Declaration order stays stable in
						the HTML, but slot resolution order is independent.
					</p>
					<p style={paragraphSpacedStyle}>
						This is useful for dashboards, feeds, sidebars, and any
						page where one expensive query should not block the rest
						of the response.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="authoring-models"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Raw Slots vs Framework Primitives
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS exposes one streaming engine through two
						authoring layers:
					</p>
					<AuthoringLayerList />
					<p style={paragraphSpacedStyle}>
						The transport is shared. The difference is the authoring
						surface.
					</p>
					<PrismPlus
						codeString={streamingRawFrameworkSnippet}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="current-transport"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Current Transport
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The shipped implementation keeps one HTML document
						response open and streams slot patches through that
						document. This is the most SSR-native model and works
						across the supported frameworks.
					</p>
					<PrismPlus
						codeString={streamingTransportModes}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="raw-slots"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Raw Slots
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use raw slots when you want direct control over
						placeholder and resolved HTML. Plain HTML keeps the
						transport explicit by passing
						<code>streamingSlots</code> to{' '}
						<code>handleHTMLPageRequest</code>. HTMX uses{' '}
						<code>&lt;abs-htmx-stream-slot&gt;</code>, which
						AbsoluteJS lowers to native <code>hx-get</code> fragment
						requests.
					</p>
					<p style={paragraphSpacedStyle}>
						For raw HTML slots, the placeholder element's{' '}
						<code>id</code> should match the slot <code>id</code>{' '}
						exactly. <code>data-absolute-slot="true"</code> marks
						the node as a streaming slot, and the runtime patches
						that exact element by <code>id</code>.
					</p>
					<p style={paragraphSpacedStyle}>
						This page is the transport overview. The concrete
						raw-slot examples and API details should live on the
						HTML and HTMX pages, where the authoring model is
						specific to those surfaces.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="framework-primitives"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Framework Primitives
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Framework primitives give you the same out-of-order
						transport but let you author fallback and resolved UI in
						the framework's native syntax.
					</p>
					<p style={paragraphSpacedStyle}>
						In practice, that means React exposes{' '}
						<code>SuspenseSlot</code> and <code>StreamSlot</code>,
						Svelte exposes <code>AwaitSlot</code> and{' '}
						<code>StreamSlot</code>, Vue exposes{' '}
						<code>SuspenseSlot</code> and <code>StreamSlot</code>,
						and Angular supports both raw streaming slot components
						and lowered <code>@defer</code> boundaries.
					</p>
					<p style={paragraphSpacedStyle}>
						This page is the transport overview. The
						framework-specific component pages should hold the
						concrete framework examples and API details for those
						primitives.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="detached-transport"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Detached Transport
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS also has a planned second transport mode
						where the initial document can close earlier and late
						slot updates can arrive over a secondary channel such as
						streaming fetch or SSE. That is not the current default
						and should be treated as a follow-on enhancement, not as
						missing functionality in the current feature.
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
