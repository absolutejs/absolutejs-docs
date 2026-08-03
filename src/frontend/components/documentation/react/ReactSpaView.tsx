import { animated } from '@react-spring/web';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid } from '../../utils/DefinitionGrid';
import { StepFlow } from '../../utils/StepFlow';
import {
	reactSpaHandler,
	reactSpaPage,
	wildcardRoutePattern
} from '../../../data/documentation/spaDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#wildcard-route', label: 'Wildcard Route' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#page-component', label: 'Page Component' },
	{ href: '#redirects', label: 'Redirects' }
];

type SpaListProps = {
	themeSprings: ThemeSprings;
};

const PrimitivesList = ({ themeSprings }: SpaListProps) => (
	<DefinitionGrid
		items={[
			{
				description: (
					<>
						server-side router that takes a fixed{' '}
						<code>location</code> prop. The page handler injects the
						request pathname so SSR resolves the right route.
					</>
				),
				term: 'StaticRouter'
			},
			{
				description: (
					<>
						client-side router that reads from{' '}
						<code>window.location</code>. Used after hydration for
						client-side navigation via{' '}
						<code>history.pushState</code>.
					</>
				),
				term: 'BrowserRouter'
			},
			{
				description:
					'declarative path matching. React Router v6+ uses specificity ranking — longest static prefix wins, no manual ordering required.',
				term: 'Routes / Route'
			},
			{
				description: (
					<>
						client-side navigation anchor. Renders a real{' '}
						<code>{'<a href>'}</code> for progressive enhancement;
						click is intercepted on same-origin URLs.
					</>
				),
				term: 'Link'
			},
			{
				description:
					'hooks for reading the current location and navigating programmatically.',
				term: 'useLocation / useNavigate'
			}
		]}
		themeSprings={themeSprings}
	/>
);

const RequestFlowList = ({ themeSprings }: SpaListProps) => (
	<StepFlow
		steps={[
			{
				description: 'pass the Elysia request through.',
				title: 'request field on handleReactPageRequest input'
			},
			{
				description: (
					<>
						and auto-injects it into <code>props.url</code> if you
						didn't already pass one.
					</>
				),
				title: 'The handler reads new URL(request.url).pathname'
			},
			{
				description: (
					<>
						and feeds it to{' '}
						<code>{'<StaticRouter location={url}>'}</code> for SSR.
					</>
				),
				title: 'Your page component receives url as a prop'
			},
			{
				description: (
					<>
						the page swaps to <code>{'<BrowserRouter>'}</code> which
						reads from <code>window.location</code> directly.
					</>
				),
				title: 'On the client, url is undefined (no request to derive it from)'
			}
		]}
		themeSprings={themeSprings}
	/>
);

export const ReactSpaView = ({
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
					<h1 id="react-spa" style={h1Style(isMobileOrTablet)}>
						React SPA
					</h1>
					<p style={paragraphLargeStyle}>
						Drive client-side sub-route navigation inside a React
						page using <code>react-router</code>. AbsoluteJS
						forwards the request URL into the page so SSR resolves
						the right route on every load — including refresh and
						deep-link entry.
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
						React Router has battle-tested SSR support via{' '}
						<code>StaticRouter</code> on the server and{' '}
						<code>BrowserRouter</code> on the client. AbsoluteJS
						doesn't ship a wrapper — you install{' '}
						<code>react-router</code> and use it directly. The
						adapter's only job is to plumb the request URL into your
						page so the server-side router has something to match
						against.
					</p>
					<RequestFlowList themeSprings={themeSprings} />
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
						responds for every sub-URL the page's router knows
						about:
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
						didn't supply your own <code>url</code> prop):
					</p>
					<PrismPlus
						codeString={reactSpaHandler}
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
						The page swaps between <code>StaticRouter</code>{' '}
						(server) and <code>BrowserRouter</code> (client). The{' '}
						<code>url</code> prop is undefined on the client, which
						is the cue to switch:
					</p>
					<PrismPlus
						codeString={reactSpaPage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrimitivesList themeSprings={themeSprings} />
					<p style={paragraphSpacedStyle}>
						In React Router v7, <code>BrowserRouter</code>,{' '}
						<code>StaticRouter</code>, <code>Routes</code>,{' '}
						<code>Route</code>, and <code>Link</code> all import
						from the <code>react-router</code> package — not{' '}
						<code>react-router-dom</code>, which is now a re-export
						shim.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="redirects"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Redirects
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						React Router supports redirects via thrown{' '}
						<code>Response</code> objects from loaders and actions.
						In the AbsoluteJS adapter, catch the thrown{' '}
						<code>Response</code> in your Elysia handler and return
						it directly — Elysia treats it as the outbound response
						and the browser sees a real HTTP redirect. For
						pre-render redirects without a loader, perform the check
						in the route handler before calling{' '}
						<code>handleReactPageRequest</code>.
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
