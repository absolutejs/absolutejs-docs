import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	apiCommand,
	apiOutput
} from '../../../data/documentation/cliUtilityDocsCode';
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#usage', label: 'Usage' },
	{ href: '#openapi', label: 'OpenAPI' }
];

export const ApiView = ({
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
					<h1 id="api" style={h1Style(isMobileOrTablet)}>
						absolute api
					</h1>
					<p style={paragraphLargeStyle}>
						Your API surface at a glance — and a real OpenAPI spec
						generated from the types you already wrote.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="usage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS wires <code>@elysiajs/openapi</code> into the dev
						runtime, so a Scalar UI is live at <code>/openapi</code>{' '}
						with zero setup. <code>absolute api</code> reads that
						generated spec and lists the app&apos;s real routes
						(dev-machinery excluded), method-colored, with a hint of
						each route&apos;s params and body. <code>--open</code>{' '}
						launches the Scalar UI in your browser; <code>--json</code>{' '}
						prints the spec.
					</p>
					<PrismPlus
						codeString={apiCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="openapi"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						OpenAPI
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Because your params, query, body, and response are Elysia{' '}
						<code>t.Object(...)</code> schemas — already JSON Schema —{' '}
						<code>@elysiajs/openapi</code> turns them into accurate,
						importable API docs with zero annotation: the types you
						wrote to validate requests become your docs. Toggle and
						customize it with <code>openapi</code> in{' '}
						<code>absolute.config.ts</code> (on by default in dev,
						opt-in for production) — set the path, swap Scalar for
						Swagger, or override the title and version.
					</p>
					<PrismPlus
						codeString={apiOutput}
						language="bash"
						showLineNumbers={false}
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
