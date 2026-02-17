import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	buildOnce,
	hydrationExample,
	propsInjection,
	renderToStream
} from '../../../data/documentation/ssrModelDocsCode';
import {
	h1Style,
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
import { SSRLifecycleDiagram } from '../../diagrams/SSRLifecycleDiagram';

const tocItems: TocItem[] = [
	{ href: '#how-ssr-works', label: 'How SSR Works' },
	{ href: '#build-once', label: 'Build Once, Serve Many' },
	{ href: '#streaming', label: 'Streaming Responses' },
	{ href: '#hydration', label: 'Hydration' },
	{ href: '#props-serialization', label: 'Props Serialization' }
];

export const SSRModelView = ({
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
				overflowY: 'scroll',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style(isMobileOrTablet)} id="ssr-model">
						SSR Model
					</h1>
					<p style={paragraphLargeStyle}>
						Understanding how AbsoluteJS handles server-side
						rendering across multiple frameworks.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="how-ssr-works"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How SSR Works in AbsoluteJS
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS provides a unified SSR model that works the
						same way regardless of which frontend framework you use.
					</p>
					<SSRLifecycleDiagram themeSprings={themeSprings} />
					<p style={paragraphSpacedStyle}>
						The SSR lifecycle has two distinct phases: a one-time{' '}
						<strong style={strongStyle}>startup phase</strong> when
						your server boots, and a{' '}
						<strong style={strongStyle}>request phase</strong> that
						repeats for each incoming request.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="build-once"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Build Once, Serve Many
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The build() function runs once when your server starts.
						It scans your frontend directories, bundles all
						components, and returns a manifest:
					</p>
					<PrismPlus
						codeString={buildOnce}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphLargeStyle, marginTop: '1.5rem' }}>
						This manifest is then used by page handlers to locate
						the correct assets for each route.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="streaming"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Streaming Responses
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS uses streaming to send HTML progressively to
						the browser. This means users see content faster, even
						for complex pages:
					</p>
					<PrismPlus
						codeString={renderToStream}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="hydration"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Hydration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						After the HTML arrives, the client-side JavaScript
						&quot;hydrates&quot; the page, attaching event handlers
						and making it interactive:
					</p>
					<PrismPlus
						codeString={hydrationExample}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="props-serialization"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Props Serialization
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Props passed to your components are automatically
						serialized and made available on both server and client:
					</p>
					<PrismPlus
						codeString={propsInjection}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphLargeStyle, marginTop: '1.5rem' }}>
						Props must be serializable (no functions, circular
						references, or class instances).
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
