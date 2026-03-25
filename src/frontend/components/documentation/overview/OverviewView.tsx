import { animated } from '@react-spring/web';
import { FaAngular, FaHtml5, FaReact, FaVuejs } from 'react-icons/fa';
import { SiHtmx, SiSvelte } from 'react-icons/si';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	installCommand,
	multiFrameworkExample,
	multiFrameworkServer,
	simpleExample,
	simpleServerExample,
	typeSafetyFlow
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
	{ href: '#multi-framework', label: 'Multi-Framework' },
	{ href: '#type-safety', label: 'Type Safety' },
	{ href: '#hmr', label: 'Universal HMR' },
	{ href: '#ecosystem', label: 'Ecosystem' },
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
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1
						style={{
							...h1Style(isMobileOrTablet),
							...gradientTextStyle
						}}
						id="overview"
					>
						AbsoluteJS
					</h1>
					<p style={paragraphLargeStyle}>
						The full-stack TypeScript framework that server-side
						renders React, Angular, Svelte, Vue, HTML, and HTMX
						from a single Elysia server — with universal HMR, end-to-end
						type safety, and a visual studio for no-code editing.
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
						Most meta-frameworks lock you into one UI library.
						AbsoluteJS doesn&apos;t. It&apos;s a platform built on
						Bun and Elysia that gives every frontend framework the
						same first-class SSR, hydration, and HMR — so you
						can pick the right tool for each page and serve them
						all from one server.
					</p>
					<p style={paragraphSpacedStyle}>
						Your landing page can be React, your admin panel
						Angular, your interactive widgets HTMX, and your
						docs plain HTML. One build, one deploy, one codebase.
						Types flow from your database schema through your
						server handlers into your components with zero code
						generation — TypeScript does all the work.
					</p>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS isn&apos;t just a renderer. It ships with
						OAuth authentication for 66+ providers, a visual page
						builder, scoped per-user server state, an opinionated
						ESLint config, and a project CLI. Everything you need
						to go from idea to production.
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
								Render React, Angular, Svelte, Vue, HTML, and
								HTMX from a single server with consistent
								patterns. Streaming HTML, automatic hydration,
								and props injection for every framework.
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
									Universal HMR
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Fast hot module replacement across all
								frameworks. DOM state preservation, CSS-only
								updates, and framework-aware reloads — your
								form inputs and scroll position survive every
								edit.
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
								Types flow from your database schema through
								server handlers to frontend components with zero
								code generation. Eden Treaty gives your client
								full type inference from your API.
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
									Absolute Studio
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								A visual page builder with drag-and-drop
								blocks, live preview, and asset management
								— no code required.
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
					<p style={paragraphSpacedStyle}>
						Every framework gets the same treatment: server-side
						rendering, client hydration, HMR, and type-safe props.
						Pick the best tool for each route.
					</p>
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
									'Streaming SSR with React Refresh HMR',
								icon: FaReact,
								name: 'React'
							},
							{
								color: '#DD0031',
								description:
									'Zoneless SSR with AOT/JIT compilation',
								icon: FaAngular,
								name: 'Angular'
							},
							{
								color: '#FF3E00',
								description:
									'Compiled SSR with CSS-only hot updates',
								icon: SiSvelte,
								name: 'Svelte'
							},
							{
								color: '#42B883',
								description:
									'SSR with template-aware HMR',
								icon: FaVuejs,
								name: 'Vue'
							},
							{
								color: '#E34F26',
								description:
									'Static pages with asset hashing',
								icon: FaHtml5,
								name: 'HTML'
							},
							{
								color: '#3366CC',
								description:
									'Server-driven UI with scoped state',
								icon: SiHtmx,
								name: 'HTMX'
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
						id="multi-framework"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Multi-Framework in One App
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use different frameworks on different routes. Your
						config declares which directories contain which
						frameworks, and AbsoluteJS builds them all in a
						single pass:
					</p>
					<PrismPlus
						codeString={multiFrameworkExample}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={multiFrameworkServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="type-safety"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Type Safety Without Codegen
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Define your schema once. Drizzle infers the types,
						your server handler passes them as props, and your
						component receives them — all checked at compile
						time. No generated files, no build step for types,
						no drift.
					</p>
					<PrismPlus
						codeString={typeSafetyFlow}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="hmr"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Universal HMR
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every framework gets fast hot module replacement with
						no configuration. AbsoluteJS detects what changed and
						picks the minimal update strategy — CSS-only swaps,
						template-only patches, or full component reloads. Form
						inputs, scroll positions, and open menus are preserved
						across edits.
					</p>
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
									React Refresh
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Component-level updates without losing state.
								Edit a component and only that component
								re-renders — useState, useRef, and context
								all survive. Powered by React&apos;s official
								Fast Refresh protocol.
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
									Angular View Transitions
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								CSS-only edits hot-swap instantly. For
								template and logic changes, the View
								Transitions API captures a screenshot while
								the app re-bootstraps with the new module
								behind it — component state is restored via{' '}
								<code>ng.getComponent</code> and the browser
								crossfades. Zero flicker.
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
									Svelte Smart Updates
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								AbsoluteJS detects whether you changed styles,
								markup, or logic. Style-only edits swap the CSS
								without touching the DOM. Template changes patch
								surgically. Full reloads only happen when
								component logic changes.
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
									Vue Change Detection
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								HMR metadata tracks what changed in each
								Single File Component — style-only, template-only,
								script, or full. Vue&apos;s HMR API applies the
								minimal update, keeping reactive state and
								computed properties intact.
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
									HTML &amp; HTMX Reload
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Scripts and stylesheets are wrapped with HMR
								hooks at build time. When you edit an HTML or
								HTMX file, only the changed scripts or styles
								reload — no full page refresh needed.
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
									DOM State Preservation
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Across all frameworks, AbsoluteJS snapshots form
								values, checkbox states, select options, scroll
								positions, and open details/dialog elements
								before each update and restores them after.
							</p>
						</animated.div>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="ecosystem"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Ecosystem
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS ships with everything you need to go from
						idea to production. Authentication, linting, state
						management, scaffolding, and a visual editor — all
						designed to work together.
					</p>
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
									@absolutejs/auth
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Drop-in OAuth authentication supporting 66+
								providers including Google, GitHub, Discord,
								and Apple. Handles PKCE, OpenID Connect, token
								refresh, and session management. Integrates
								with Elysia as a plugin — one{' '}
								<code>.use()</code> call to protect your
								routes.
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
									Absolute Studio
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								A visual page builder that runs alongside your
								dev server. Drag-and-drop blocks for headings,
								text, images, columns, and more. Edit styles
								visually, manage assets, and preview changes
								live — then drop into the Monaco code editor
								when you need full control.
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
									elysia-scoped-state
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Per-user server state that&apos;s isolated
								between visitors. Each user gets their own
								store keyed to their session — perfect for
								HTMX apps where the server manages UI state.
								Supports a preserve option to survive page
								navigations and a reset to clear state.
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
									@absolutejs/eslint
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								20+ custom lint rules designed for AbsoluteJS
								projects. Catches common SSR mistakes like
								inline prop types, unnecessary divs, deeply
								nested JSX, and short variable names. Ships
								with Prettier and Biome support out of the
								box.
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
									create-absolutejs
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Project scaffolding CLI that sets up your
								directory structure, installs dependencies,
								configures TypeScript, and wires up your
								chosen frontend framework and database. One
								command to go from nothing to a running app.
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
									AbsoluteJS CLI
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Development and production commands built in.{' '}
								<code>absolute dev</code> starts an HMR server
								with an interactive terminal.{' '}
								<code>absolute start</code> builds and runs
								for production. Includes formatting, linting,
								and system info commands.
							</p>
						</animated.div>
					</div>
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
						A minimal AbsoluteJS app with React — config, server,
						done:
					</p>
					<PrismPlus
						codeString={simpleExample}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={simpleServerExample}
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
							<strong style={strongStyle}>Quickstart</strong> —
							Build a real app with a database, typed props,
							and an API in 5 minutes
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Core Concepts</strong> —
							Learn how SSR, the build system, and routing work
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Frontends</strong> —
							Deep dives into React, Angular, Svelte, Vue, HTML,
							and HTMX
						</li>
					</ul>
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
