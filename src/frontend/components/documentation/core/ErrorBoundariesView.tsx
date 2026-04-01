import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	errorConventionBasic,
	errorComponentReact,
	errorComponentSvelte,
	errorComponentVue,
	errorComponentAngular,
	notFoundReact,
	errorFallbackChain,
	pageSpecificExample
} from '../../../data/documentation/errorBoundariesDocsCode';
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
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style(isMobileOrTablet)} id="error-boundaries">
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
						level="h2"
						id="how-it-works"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How It Works
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS uses a file convention to detect error and
						not-found pages. During the build, it scans your pages
						directory for files matching the convention patterns. At
						runtime, when SSR throws an error, AbsoluteJS catches it
						and renders the matching error convention component
						instead of crashing.
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Auto-detection</strong>{' '}
							— the build scans for <code>error.tsx</code>,{' '}
							<code>*.error.tsx</code>, and{' '}
							<code>not-found.tsx</code> files
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>SSR catch</strong> —
							when a page throws during server-side rendering, the
							error is caught and the convention component
							receives it as a prop
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Client hydration
							</strong>{' '}
							— the error page hydrates on the client just like
							any other page
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="convention-files"
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
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>error.tsx</strong> —
							default error page for all pages in that framework
							directory
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Page.error.tsx</strong>{' '}
							— page-specific error boundary that overrides the
							default for that page only
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>not-found.tsx</strong> —
							custom 404 page rendered when no route matches
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="error-pages"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Error Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						An error convention component receives an{' '}
						<code>error</code> prop with <code>message</code> and an
						optional <code>stack</code>. Here is a React example:
					</p>
					<PrismPlus
						codeString={errorComponentReact}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The <code>error</code> prop is always an object with{' '}
						<code>{'{ message: string; stack?: string }'}</code>. In
						production, <code>stack</code> is omitted for security.
						In development, the full stack trace is included for
						debugging.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="page-specific-errors"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Page-Specific Errors
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Name an error file after the page it belongs to. For
						example, <code>Home.error.tsx</code> only activates when{' '}
						<code>Home.tsx</code> throws. This lets you show
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
						level="h2"
						id="not-found-pages"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Not-Found Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>not-found.tsx</code> convention file handles
						404 responses. When a request hits a route that does not
						exist, AbsoluteJS renders this component with a 404
						status code.
					</p>
					<PrismPlus
						codeString={notFoundReact}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="fallback-chain"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fallback Chain
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When an error occurs, AbsoluteJS resolves the error page
						using a priority chain. The most specific match wins:
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
						level="h2"
						id="multi-framework"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Multi-Framework
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Error conventions work across all supported frameworks.
						Each framework uses its own syntax but follows the same
						file naming pattern and receives the same error prop
						shape.
					</p>
					<AnchorHeading
						level="h3"
						id="svelte-error"
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
						level="h3"
						id="vue-error"
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
						level="h3"
						id="angular-error"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Angular
					</AnchorHeading>
					<PrismPlus
						codeString={errorComponentAngular}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="example-project"
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
							target="_blank"
							rel="noopener noreferrer"
							style={{ color: 'inherit' }}
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
