import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	reactBuild,
	reactHandler,
	reactHydration,
	reactIndexFile,
	reactPageComponent,
	reactPreserveFiles,
	reactStreaming,
	reactTypeSafetyServer,
	reactTypeSafetyTypes
} from '../../../data/documentation/reactDocsCode';
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
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#build-config', label: 'Build Configuration' },
	{ href: '#page-handler', label: 'Page Handler' },
	{ href: '#page-components', label: 'Page Components' },
	{ href: '#type-safety', label: 'Type Safety' },
	{ href: '#hydration', label: 'Hydration' },
	{ href: '#index-files', label: 'Index Files' },
	{ href: '#streaming', label: 'Streaming SSR' }
];

export const ReactView = ({
	currentPageId,
	onNavigate,
	themeSprings
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="react">
						React
					</h1>
					<p style={paragraphLargeStyle}>
						Build fully server-rendered React applications with
						complete type safety from your database to your
						components.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="build-config"
					>
						Build Configuration
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Add React to your build by specifying the directory
						containing your React components:
					</p>
					<PrismPlus
						codeString={reactBuild}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="page-handler"
					>
						Page Handler
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Use <code>handleReactPageRequest</code> to render your
						components. Pass the component, its bundled index file,
						and optional props:
					</p>
					<PrismPlus
						codeString={reactHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="page-components"
					>
						Page Components
					</animated.h2>
					<p style={paragraphLargeStyle}>
						In AbsoluteJS, React components render the complete HTML
						document including html, head, and body tags. This gives
						you full control over meta tags, scripts, and page
						structure.
					</p>
					<p style={paragraphSpacedStyle}>
						Props passed from your server are fully typed and
						available in your component:
					</p>
					<PrismPlus
						codeString={reactPageComponent}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="type-safety"
					>
						End-to-End Type Safety
					</animated.h2>
					<p style={paragraphLargeStyle}>
						AbsoluteJS provides complete type safety from your
						database queries through your server handlers to your
						React components. TypeScript catches errors at compile
						time, not runtime.
					</p>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
							marginBottom: '1.5rem',
							marginTop: '1rem'
						}}
					>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Compile-Time Errors
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Missing or incorrectly typed props are caught by
								TypeScript before your code runs.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Refactoring Safety
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Rename a field in your database schema and
								TypeScript shows every place that needs
								updating.
							</p>
						</animated.div>
					</div>
					<p style={paragraphSpacedStyle}>
						Define your database schema and infer types directly
						from your table definitions using Drizzle:
					</p>
					<PrismPlus
						codeString={reactTypeSafetyTypes}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Use those types in your server handlers to ensure props
						match your components:
					</p>
					<PrismPlus
						codeString={reactTypeSafetyServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Schema → Types</strong>:
							Drizzle infers types directly from your table
							definitions
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Types → Server</strong>:
							Your inferred types flow into route handlers and
							props
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Props → Component
							</strong>
							: React receives correctly typed props on both
							server and client
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="hydration"
					>
						Hydration
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS automatically handles React hydration. Your
						component renders on the server, then React
						&quot;hydrates&quot; it on the client to make it
						interactive:
					</p>
					<PrismPlus
						codeString={reactHydration}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="index-files"
					>
						Index Files
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS automatically generates index files for
						client-side hydration. You never need to write these
						yourself — the build system creates them based on your
						page components.
					</p>
					<p style={paragraphSpacedStyle}>
						By default, these generated files are deleted after
						bundling. To inspect them, enable{' '}
						<code>preserveIntermediateFiles</code>:
					</p>
					<PrismPlus
						codeString={reactPreserveFiles}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Here&apos;s what a generated index file looks like:
					</p>
					<PrismPlus
						codeString={reactIndexFile}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="streaming"
					>
						Streaming SSR
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS uses React&apos;s streaming SSR to send HTML
						progressively to the browser:
					</p>
					<PrismPlus
						codeString={reactStreaming}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{!isMobile && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
		</div>
	);
};
