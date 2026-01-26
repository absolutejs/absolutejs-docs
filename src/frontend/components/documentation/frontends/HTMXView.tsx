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
	htmxScopedStateSetup
} from '../../../data/documentation/htmlHtmxDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
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
	{ href: '#build-config', label: 'Build Configuration' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#example', label: 'Example' },
	{ href: '#api-endpoints', label: 'API Endpoints' },
	{ href: '#scoped-state', label: 'Per-User State' }
];

export const HTMXView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');
	const showDesktopToc = !isMobileOrTablet;

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'scroll',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="htmx">
						HTMX
					</h1>
					<p style={paragraphLargeStyle}>
						Build interactive applications with HTMX&apos;s
						HTML-over-the-wire approach.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="build-config"
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
						level="h2"
						id="page-handler"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Handler
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pass the path to the built HTML file to{' '}
						<code>handleHTMXPageRequest</code>:
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
						level="h2"
						id="example"
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
						level="h2"
						id="api-endpoints"
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
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Return HTML</strong>:
							Endpoints return HTML strings that HTMX injects into
							the page
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Type-safe data</strong>:
							Your data fetching is still fully typed even though
							the response is HTML
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								No JSON serialization
							</strong>
							: Skip the JSON/parse cycle for simpler data flow
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="scoped-state"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Per-User State with Scoped State
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When building interactive HTMX applications, you often
						need state that&apos;s specific to each user. For
						example, a counter button should only increment that
						user&apos;s count, not everyone&apos;s. The{' '}
						<code>elysia-scoped-state</code> plugin solves this by
						automatically managing per-user sessions.
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
						The HTML stays the same, but now each user&apos;s
						interactions only affect their own state:
					</p>
					<PrismPlus
						codeString={htmxScopedStateHtml}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Automatic sessions
							</strong>
							: A secure <code>user_session_id</code> cookie is
							created on first visit
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>User isolation</strong>:
							Each user&apos;s <code>scopedStore</code> is
							completely independent
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								No client-side state
							</strong>
							: All state lives on the server, perfect for
							HTMX&apos;s HTML-over-the-wire approach
						</li>
					</ul>
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1rem'
						}}
					>
						See the{' '}
						<a
							href="#"
							onClick={(e) => {
								e.preventDefault();
								onNavigate('scoped-state');
							}}
							style={{
								color: 'inherit',
								textDecoration: 'underline'
							}}
						>
							Scoped State documentation
						</a>{' '}
						for more details on configuration options and advanced
						usage.
					</p>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					themeSprings={themeSprings}
					items={tocItems}
					isOpen={tocOpen ?? false}
					onToggle={onTocToggle}
				/>
			)}
		</div>
	);
};
