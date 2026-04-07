import type { ReactNode } from 'react';
import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	htmxApiEndpoint,
	htmxBuild,
	htmxExample,
	htmxHandler,
	htmxScopedStateHtml,
	htmxScopedStateSetup,
	htmxStreamingEndpoints,
	htmxStreamingPage
} from '../../../data/documentation/htmlHtmxDocsCode';
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
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#build-config', label: 'Build Configuration' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#example', label: 'Example' },
	{ href: '#api-endpoints', label: 'API Endpoints' },
	{ href: '#out-of-order-streaming', label: 'Out-of-Order Streaming' },
	{ href: '#scoped-state', label: 'Per-User State' }
];

type HtmxFeatureListProps = {
	items: Array<{
		label: ReactNode;
		text: string;
	}>;
};

const HtmxFeatureList = ({ items }: HtmxFeatureListProps) => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		{items.map((item, index) => (
			<li key={index} style={listItemStyle}>
				{item.label}: {item.text}
			</li>
		))}
	</ul>
);

export const HTMXOverviewView = ({
	currentPageId,
	onNavigate,
	themeSprings,
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
					<h1 id="htmx" style={h1Style(isMobileOrTablet)}>
						HTMX
					</h1>
					<p style={paragraphLargeStyle}>
						Build interactive applications with HTMX's
						HTML-over-the-wire model and native fragment updates.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="build-config"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Build Configuration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add HTMX to your build by specifying the directory
						containing your HTMX pages:
					</p>
					<PrismPlus
						codeString={htmxBuild}
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
						Pass the path to the built HTML file to{' '}
						<code>handleHTMXPageRequest</code>. HTMX interactivity
						stays in the document and your endpoints, not in a
						page-local sidecar.
					</p>
					<PrismPlus
						codeString={htmxHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="example"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Example
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						HTMX pages use HTML attributes to trigger server
						requests and update the DOM:
					</p>
					<PrismPlus
						codeString={htmxExample}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="api-endpoints"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						API Endpoints
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						HTMX requests are handled by regular Elysia endpoints
						that return HTML fragments:
					</p>
					<PrismPlus
						codeString={htmxApiEndpoint}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<HtmxFeatureList
						items={[
							{
								label: (
									<strong style={strongStyle}>
										Return HTML
									</strong>
								),
								text: 'Endpoints return HTML strings that HTMX injects into the page'
							},
							{
								label: (
									<strong style={strongStyle}>
										Type-safe data
									</strong>
								),
								text: 'Your data fetching is still fully typed even though the response is HTML'
							},
							{
								label: (
									<strong style={strongStyle}>
										No JSON serialization
									</strong>
								),
								text: 'Skip the JSON/parse cycle for simpler data flow'
							}
						]}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="out-of-order-streaming"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Out-of-Order Streaming
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						HTMX gets its own first-class primitive:{' '}
						<code>&lt;abs-htmx-stream-slot&gt;</code>. AbsoluteJS
						lowers each tag into native HTMX markup, so the browser
						still performs normal <code>hx-get</code> fragment
						requests and swaps in the returned HTML when that
						endpoint finishes.
					</p>
					<PrismPlus
						codeString={htmxStreamingPage}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						The server stays explicit: serve the page with{' '}
						<code>handleHTMXPageRequest</code> and expose one
						fragment endpoint per region. The authored HTMX page
						stays declarative, while AbsoluteJS handles the lowering
						step.
					</p>
					<PrismPlus
						codeString={htmxStreamingEndpoints}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="scoped-state"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Per-User State with Scoped State
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When building interactive HTMX applications, you often
						need state that's specific to each user. For example, a
						counter button should only increment that user's count,
						not everyone's. The <code>elysia-scoped-state</code>{' '}
						plugin solves this by automatically managing per-user
						sessions.
					</p>
					<p style={paragraphSpacedStyle}>
						Without scoped state, all users would share the same
						server state. With scoped state, each user gets their
						own isolated state slice:
					</p>
					<PrismPlus
						codeString={htmxScopedStateSetup}
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
						The HTML stays the same, but now each user's
						interactions only affect their own state:
					</p>
					<PrismPlus
						codeString={htmxScopedStateHtml}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<HtmxFeatureList
						items={[
							{
								label: (
									<strong style={strongStyle}>
										Automatic sessions
									</strong>
								),
								text: 'A secure user_session_id cookie is created on first visit'
							},
							{
								label: (
									<strong style={strongStyle}>
										User isolation
									</strong>
								),
								text: "Each user's scopedStore is completely independent"
							}
						]}
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
		</div>
	);
};
