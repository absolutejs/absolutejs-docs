import { animated } from '@react-spring/web';
import { FaAngular, FaHtml5, FaReact, FaVuejs } from 'react-icons/fa';
import { SiHtmx, SiSvelte } from 'react-icons/si';
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
import { AnchorHeading } from '../../utils/AnchorHeading';
import { FrameworkEcosystemDiagram } from '../../diagrams/FrameworkEcosystemDiagram';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
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
					<AnchorHeading
						level="h2"
						id="what-is-absolutejs"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What is AbsoluteJS?
					</AnchorHeading>
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
					<AnchorHeading
						level="h2"
						id="key-features"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Key Features
					</AnchorHeading>
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
					<AnchorHeading
						level="h2"
						id="framework-support"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Framework Support
					</AnchorHeading>
					<FrameworkEcosystemDiagram themeSprings={themeSprings} />
					<animated.div
						style={{
							display: 'grid',
							gap: '0.75rem',
							gridTemplateColumns: isMobile
								? 'repeat(2, 1fr)'
								: 'repeat(3, 1fr)',
							marginTop: '1.5rem'
						}}
					>
						{[
							{
								color: '#61DAFB',
								description:
									'Full SSR with streaming and hydration',
								icon: FaReact,
								isComingSoon: false,
								name: 'React'
							},
							{
								color: '#FF3E00',
								description:
									'Component SSR with client-side hydration',
								icon: SiSvelte,
								isComingSoon: false,
								name: 'Svelte'
							},
							{
								color: '#42B883',
								description:
									'SSR with props injection and hydration',
								icon: FaVuejs,
								isComingSoon: false,
								name: 'Vue'
							},
							{
								color: '#E34F26',
								description:
									'HTML pages with optional JavaScript',
								icon: FaHtml5,
								isComingSoon: false,
								name: 'HTML'
							},
							{
								color: '#3366CC',
								description:
									'HTMX-powered interactive templates',
								icon: SiHtmx,
								isComingSoon: false,
								name: 'HTMX'
							},
							{
								color: '#DD0031',
								description: 'Coming soon',
								icon: FaAngular,
								isComingSoon: true,
								name: 'Angular'
							}
						].map((fw) => (
							<animated.div
								key={fw.name}
								style={{
									alignItems: 'center',
									background: themeSprings.theme.to(
										(theme) =>
											theme.endsWith('dark')
												? 'rgba(30, 30, 46, 0.6)'
												: 'rgba(255, 255, 255, 0.8)'
									),
									border: themeSprings.themeTertiary.to(
										(color) => `1px solid ${color}`
									),
									borderLeft: `3px solid ${fw.color}`,
									borderRadius: '0.5rem',
									display: 'flex',
									gap: '0.75rem',
									opacity: fw.isComingSoon ? 0.5 : 1,
									padding: '0.75rem 1rem'
								}}
							>
								<fw.icon
									color={fw.color}
									size={24}
									style={{ flexShrink: 0 }}
								/>
								<div style={{ minWidth: 0 }}>
									<p
										style={{
											fontSize: '0.9rem',
											fontWeight: 600,
											margin: 0
										}}
									>
										{fw.name}
									</p>
									<animated.p
										style={{
											color: themeSprings.theme.to(
												(theme) =>
													theme.endsWith('dark')
														? 'rgba(232, 232, 236, 0.6)'
														: 'rgba(42, 42, 50, 0.6)'
											),
											fontSize: '0.75rem',
											lineHeight: 1.4,
											margin: 0
										}}
									>
										{fw.description}
									</animated.p>
								</div>
							</animated.div>
						))}
					</animated.div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="quick-example"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick Example
					</AnchorHeading>
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
					<AnchorHeading
						level="h2"
						id="next-steps"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Next Steps
					</AnchorHeading>
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
