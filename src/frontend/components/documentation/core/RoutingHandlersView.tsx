import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	basicRouting,
	cookiesAndHeaders,
	elysiaRouting,
	pageHandlerPattern,
	queryParams,
	routeParams
} from '../../../data/documentation/routingHandlersDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { RequestAnatomyDiagram } from '../../diagrams/RequestAnatomyDiagram';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#basic-routing', label: 'Basic Routing' },
	{ href: '#route-parameters', label: 'Route Parameters' },
	{ href: '#query-parameters', label: 'Query Parameters' },
	{ href: '#cookies-headers', label: 'Cookies & Headers' },
	{ href: '#elysia-patterns', label: 'Elysia Patterns' },
	{ href: '#page-handlers', label: 'Page Handlers' }
];

export const RoutingHandlersView = ({
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
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1
						style={h1Style(isMobileOrTablet)}
						id="routing-and-handlers"
					>
						Routing &amp; Handlers
					</h1>
					<p style={paragraphLargeStyle}>
						Define routes with Elysia and render pages with
						AbsoluteJS page handlers.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="basic-routing"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Basic Routing
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Routes are defined using Elysia&apos;s routing methods.
						Each route handler returns a page handler call:
					</p>
					<RequestAnatomyDiagram themeSprings={themeSprings} />
					<PrismPlus
						codeString={basicRouting}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="route-parameters"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Route Parameters
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Dynamic route segments are defined with colons and
						accessed via params:
					</p>
					<PrismPlus
						codeString={routeParams}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="query-parameters"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Query Parameters
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Access query string parameters via the query object:
					</p>
					<PrismPlus
						codeString={queryParams}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="cookies-headers"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Cookies &amp; Headers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Access cookies and headers directly in your route
						handlers:
					</p>
					<PrismPlus
						codeString={cookiesAndHeaders}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="elysia-patterns"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Elysia Patterns
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Your AbsoluteJS server IS an Elysia server. All Elysia
						routing patterns work including groups, guards, and type
						derivation:
					</p>
					<PrismPlus
						codeString={elysiaRouting}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="page-handlers"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page Handlers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each frontend framework has its own page handler with a
						consistent pattern:
					</p>
					<PrismPlus
						codeString={pageHandlerPattern}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphLargeStyle, marginTop: '1.5rem' }}>
						See the Page Handlers reference for detailed
						documentation on each handler.
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
