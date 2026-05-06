import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	errorConventionBasic,
	errorComponentReact,
	errorComponentSvelte,
	errorComponentVue,
	errorComponentAngular,
	errorComponentHtml,
	notFoundReact,
	notFoundAngular,
	errorFallbackChain,
	pageSpecificExample
} from '../../../data/documentation/errorBoundariesDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import { ErrorBoundariesConventionFilesList } from './ErrorBoundariesConventionFilesList';
import { ErrorBoundariesHowItWorksList } from './ErrorBoundariesHowItWorksList';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#convention-files', label: 'Convention Files' },
	{ href: '#error-pages', label: 'Error Pages' },
	{ href: '#page-specific-errors', label: 'Page-Specific Errors' },
	{ href: '#not-found-pages', label: 'Not-Found Pages' },
	{ href: '#universal-html-fallback', label: 'Universal HTML Fallback' },
	{ href: '#fallback-chain', label: 'Fallback Chain' },
	{ href: '#multi-framework', label: 'Multi-Framework' },
	{ href: '#example-project', label: 'Example Project' }
];

export const ErrorBoundariesView = ({
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
					<h1 id="error-boundaries" style={h1Style(isMobileOrTablet)}>
						Error Boundaries
					</h1>
					<p style={paragraphLargeStyle}>
						Convention-based error and not-found pages that activate
						automatically. Drop a file, get resilient error
						handling.
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
						AbsoluteJS uses a file convention to detect error and
						not-found pages. During the build, it scans your pages
						directories for files matching the convention patterns.
						At runtime, when SSR throws an error, AbsoluteJS
						catches it and renders the matching error convention
						component instead of crashing.
					</p>
					<ErrorBoundariesHowItWorksList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="convention-files"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Convention Files
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Place these files alongside your page components. The
						naming pattern tells AbsoluteJS what each file does:
					</p>
					<PrismPlus
						codeString={errorConventionBasic}
						language="bash"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ErrorBoundariesConventionFilesList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="error-pages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Error Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						An error convention component receives a flat{' '}
						<code>ErrorPageProps</code> object —{' '}
						<code>{'{ name, message, stack? }'}</code>, a
						serializable subset of <code>Error</code>. Here is a
						React example:
					</p>
					<PrismPlus
						codeString={errorComponentReact}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The shape is{' '}
						<code>
							{
								'Pick<Error, "name" | "message" | "stack">'
							}
						</code>
						. In production <code>stack</code> is omitted; in
						development the full stack trace is included for
						debugging.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="page-specific-errors"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page-Specific Errors
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Name an error file after the page it belongs to. For
						example, <code>Home.error.tsx</code> only activates
						when <code>Home.tsx</code> throws. This lets you show
						different error UI per page while keeping a generic
						fallback.
					</p>
					<PrismPlus
						codeString={pageSpecificExample}
						language="bash"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="not-found-pages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Not-Found Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>not-found.tsx</code> convention file handles
						404 responses. When a request hits a route that does
						not exist, AbsoluteJS renders this component with a 404
						status code.
					</p>
					<PrismPlus
						codeString={notFoundReact}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						For function-style not-found pages (Angular, plain
						HTML-string renderers), use{' '}
						<code>defineRenderNotFoundPage</code>. The helper types
						the return as a real HTML document — the string must
						start with <code>{'<!DOCTYPE html>'}</code>:
					</p>
					<PrismPlus
						codeString={notFoundAngular}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="universal-html-fallback"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Universal HTML Fallback
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Drop an <code>error.html</code> into <em>any</em>{' '}
						configured framework's pages directory — no extra
						config flag, no dedicated dir. Any framework that
						fails to render its own error page falls through to it.
						Tokens are replaced server-side from the thrown{' '}
						<code>Error</code>: <code>{'{{name}}'}</code>,{' '}
						<code>{'{{message}}'}</code>,{' '}
						<code>{'{{stack}}'}</code> (HTML-escaped;{' '}
						<code>stack</code> blanks in production).
					</p>
					<PrismPlus
						codeString={errorComponentHtml}
						language="markup"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The <code>not-found.html</code> equivalent is the
						project-wide 404 fallback when no framework registers
						its own.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="fallback-chain"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fallback Chain
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When an error occurs, AbsoluteJS resolves the error
						page using a priority chain. The most specific match
						wins:
					</p>
					<PrismPlus
						codeString={errorFallbackChain}
						language="bash"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						If no convention file exists at any level, AbsoluteJS
						falls back to its built-in <code>ssrErrorPage()</code>{' '}
						which renders a minimal error screen.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="multi-framework"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Multi-Framework
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Error conventions work across all supported
						frameworks. Each framework uses its own syntax but
						follows the same file naming pattern and receives the
						same flat <code>ErrorPageProps</code> shape.
					</p>
					<AnchorHeading
						id="svelte-error"
						level="h3"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Svelte
					</AnchorHeading>
					<PrismPlus
						codeString={errorComponentSvelte}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<AnchorHeading
						id="vue-error"
						level="h3"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Vue
					</AnchorHeading>
					<PrismPlus
						codeString={errorComponentVue}
						language="markup"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<AnchorHeading
						id="angular-error"
						level="h3"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Angular
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Angular convention error pages use the function-style{' '}
						<code>defineRenderErrorPage</code> helper. The helper
						types the return as a real HTML document so missing
						doctypes fail to type-check rather than slipping into
						runtime:
					</p>
					<PrismPlus
						codeString={errorComponentAngular}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="example-project"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Example Project
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						See a full working example with error boundaries
						configured for multiple frameworks in the{' '}
						<a
							href="https://github.com/alexkahndev/absolutejs-error-boundaries-example"
							rel="noopener noreferrer"
							style={{ color: 'inherit' }}
							target="_blank"
						>
							error-boundaries-example
						</a>{' '}
						repository.
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
