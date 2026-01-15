import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	installCommand,
	simpleExample
} from '../../../data/documentation/overviewDocsCode';
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
	gradientTextStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#what-is-absolutejs', label: 'What is AbsoluteJS?' },
	{ href: '#key-features', label: 'Key Features' },
	{ href: '#framework-support', label: 'Framework Support' },
	{ href: '#quick-example', label: 'Quick Example' },
	{ href: '#next-steps', label: 'Next Steps' }
];

export const Overview = ({
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
					<h1
						style={{ ...h1Style, ...gradientTextStyle }}
						id="overview"
					>
						AbsoluteJS
					</h1>
					<p style={paragraphLargeStyle}>
						Full-stack, type-safe, batteries-included platform that
						lets you server-side render any modern front-end.
					</p>
					<div style={{ marginTop: '1.5rem' }}>
						<PrismPlus
							codeString={installCommand}
							language="bash"
							showLineNumbers={false}
							themeSprings={themeSprings}
						/>
					</div>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="what-is-absolutejs"
					>
						What is AbsoluteJS?
					</animated.h2>
					<p style={paragraphLargeStyle}>
						AbsoluteJS is a full-stack meta framework that unifies
						server-side rendering across multiple frontend
						technologies. Built on Bun and Elysia, it provides a
						single build process that handles bundling, hydration,
						and HTML streaming regardless of which UI framework you
						choose.
					</p>
					<p style={paragraphSpacedStyle}>
						Your AbsoluteJS server is an Elysia server with
						superpowers. You get all the benefits of Elysia&apos;s
						type-safe routing, plugins, and middleware system while
						AbsoluteJS handles the complexity of multi-framework
						SSR.
					</p>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="key-features"
					>
						Key Features
					</animated.h2>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
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
									Universal SSR
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Render React, Svelte, Vue, HTML, and HTMX from a
								single server with consistent patterns.
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
									Single Build
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								One build() function generates a manifest
								mapping all client and server assets per route.
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
									End-to-End Type Safety
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Consistent typing from database through server
								logic to client code with TypeScript.
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
									Zero-Config Design
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Explicit function arguments with sensible
								defaults instead of fragmented configuration
								files.
							</p>
						</animated.div>
					</div>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="framework-support"
					>
						Framework Support
					</animated.h2>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>React</strong> — Full
							SSR with streaming and hydration
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Svelte</strong> —
							Component SSR with client-side hydration
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Vue</strong> — SSR with
							props injection and hydration
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>HTML</strong> — Static
							HTML file serving
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>HTMX</strong> —
							HTMX-powered templates
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Angular</strong> —
							Coming soon
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="quick-example"
					>
						Quick Example
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Here&apos;s a minimal AbsoluteJS server with React:
					</p>
					<PrismPlus
						codeString={simpleExample}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="next-steps"
					>
						Next Steps
					</animated.h2>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Installation</strong> —
							Set up AbsoluteJS in your project
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Quickstart</strong> —
							Build your first AbsoluteJS application
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Core Concepts</strong> —
							Learn about SSR, the build system, and routing
						</li>
					</ul>
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
