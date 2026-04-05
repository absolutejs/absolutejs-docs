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
	gradientHeadingStyle,
	gradientTextStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { FrameworkEcosystemDiagram } from '../../diagrams/FrameworkEcosystemDiagram';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { OverviewFeatureCard } from './OverviewFeatureCard';
import { OverviewFrameworkCard } from './OverviewFrameworkCard';
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

type OverviewCardItem = {
	body: string;
	title: string;
};

type FrameworkCardItem = {
	color: string;
	description: string;
	icon: typeof FaAngular;
	name: string;
};

type NextStepItem = {
	label: string;
	text: string;
};

const keyFeatureCards: OverviewCardItem[] = [
	{
		body: 'Render React, Angular, Svelte, Vue, HTML, and HTMX from a single server with consistent patterns. Streaming HTML, automatic hydration, and props injection for every framework.',
		title: 'Universal SSR'
	},
	{
		body: 'Fast hot module replacement across all frameworks. DOM state preservation, CSS-only updates, and framework-aware reloads: your form inputs and scroll position survive every edit.',
		title: 'Universal HMR'
	},
	{
		body: 'Types flow from your database schema through server handlers to frontend components with zero code generation. Eden Treaty gives your client full type inference from your API.',
		title: 'End-to-End Type Safety'
	},
	{
		body: 'A visual page builder with drag-and-drop blocks, live preview, and asset management: no code required.',
		title: 'Absolute Studio'
	}
];

const frameworkCards: FrameworkCardItem[] = [
	{
		color: '#61DAFB',
		description: 'Streaming SSR with React Refresh HMR',
		icon: FaReact,
		name: 'React'
	},
	{
		color: '#DD0031',
		description: 'Zoneless SSR with AOT/JIT compilation',
		icon: FaAngular,
		name: 'Angular'
	},
	{
		color: '#FF3E00',
		description: 'Compiled SSR with CSS-only hot updates',
		icon: SiSvelte,
		name: 'Svelte'
	},
	{
		color: '#42B883',
		description: 'SSR with template-aware HMR',
		icon: FaVuejs,
		name: 'Vue'
	},
	{
		color: '#E34F26',
		description: 'Static pages with asset hashing',
		icon: FaHtml5,
		name: 'HTML'
	},
	{
		color: '#3366CC',
		description: 'Server-driven UI with scoped state',
		icon: SiHtmx,
		name: 'HTMX'
	}
];

const hmrCards: OverviewCardItem[] = [
	{
		body: "Component-level updates without losing state. Edit a component and only that component re-renders: useState, useRef, and context all survive. Powered by React's official Fast Refresh protocol.",
		title: 'React Refresh'
	},
	{
		body: 'CSS-only edits hot-swap instantly. For template and logic changes, the View Transitions API captures a screenshot while the app re-bootstraps with the new module behind it. Component state is restored via ng.getComponent and the browser crossfades. Zero flicker.',
		title: 'Angular View Transitions'
	},
	{
		body: 'AbsoluteJS detects whether you changed styles, markup, or logic. Style-only edits swap the CSS without touching the DOM. Template changes patch surgically. Full reloads only happen when component logic changes.',
		title: 'Svelte Smart Updates'
	},
	{
		body: "HMR metadata tracks what changed in each Single File Component: style-only, template-only, script, or full. Vue's HMR API applies the minimal update, keeping reactive state and computed properties intact.",
		title: 'Vue Change Detection'
	},
	{
		body: 'Scripts and stylesheets are wrapped with HMR hooks at build time. When you edit an HTML or HTMX file, only the changed scripts or styles reload: no full page refresh needed.',
		title: 'HTML & HTMX Reload'
	},
	{
		body: 'Across all frameworks, AbsoluteJS snapshots form values, checkbox states, select options, scroll positions, and open details/dialog elements before each update and restores them after.',
		title: 'DOM State Preservation'
	}
];

const ecosystemCards: OverviewCardItem[] = [
	{
		body: 'Drop-in OAuth authentication supporting 66+ providers including Google, GitHub, Discord, and Apple. Handles PKCE, OpenID Connect, token refresh, and session management. Integrates with Elysia as a plugin: one .use() call to protect your routes.',
		title: '@absolutejs/auth'
	},
	{
		body: 'A visual page builder that runs alongside your dev server. Drag-and-drop blocks for headings, text, images, columns, and more. Edit styles visually, manage assets, and preview changes live: then drop into the Monaco code editor when you need full control.',
		title: 'Absolute Studio'
	},
	{
		body: "Per-user server state that's isolated between visitors. Each user gets their own store keyed to their session: perfect for HTMX apps where the server manages UI state. Supports a preserve option to survive page navigations and a reset to clear state.",
		title: 'elysia-scoped-state'
	},
	{
		body: '20+ custom lint rules designed for AbsoluteJS projects. Catches common SSR mistakes like inline prop types, unnecessary divs, deeply nested JSX, and short variable names. Ships with Prettier and Biome support out of the box.',
		title: '@absolutejs/eslint'
	},
	{
		body: 'Project scaffolding CLI that sets up your directory structure, installs dependencies, configures TypeScript, and wires up your chosen frontend framework and database. One command to go from nothing to a running app.',
		title: 'create-absolutejs'
	},
	{
		body: 'Development and production commands built in. absolute dev starts an HMR server with an interactive terminal. absolute start builds and runs for production. Includes formatting, linting, and system info commands.',
		title: 'AbsoluteJS CLI'
	}
];

const nextStepItems: NextStepItem[] = [
	{
		label: 'Quickstart',
		text: 'Build a real app with a database, typed props, and an API in 5 minutes'
	},
	{
		label: 'Core Concepts',
		text: 'Learn how SSR, the build system, and routing work'
	},
	{
		label: 'Frontends',
		text: 'Deep dives into React, Angular, Svelte, Vue, HTML, and HTMX'
	}
];

const renderOverviewCardGrid = (
	items: OverviewCardItem[],
	themeSprings: DocsViewProps['themeSprings'],
	isMobile: boolean
) => (
	<div
		style={{
			display: 'grid',
			gap: '1rem',
			gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
			marginTop: '1rem'
		}}
	>
		{items.map((item) => (
			<OverviewFeatureCard
				key={item.title}
				themeSprings={themeSprings}
				title={item.title}
			>
				{item.body}
			</OverviewFeatureCard>
		))}
	</div>
);

const renderFrameworkCardGrid = (
	themeSprings: DocsViewProps['themeSprings'],
	isMobile: boolean
) => (
	<animated.div
		style={{
			display: 'grid',
			gap: '0.75rem',
			gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
			marginTop: '1.5rem'
		}}
	>
		{frameworkCards.map((item) => (
			<OverviewFrameworkCard
				color={item.color}
				description={item.description}
				icon={item.icon}
				key={item.name}
				name={item.name}
				themeSprings={themeSprings}
			/>
		))}
	</animated.div>
);

const renderNextSteps = () => (
	<ul style={listStyle}>
		{nextStepItems.map((item) => (
			<li key={item.label} style={listItemStyle}>
				<strong style={strongStyle}>{item.label}</strong>: {item.text}
			</li>
		))}
	</ul>
);

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
						id="overview"
						style={{
							...h1Style(isMobileOrTablet),
							...gradientTextStyle
						}}
					>
						AbsoluteJS
					</h1>
					<p style={paragraphLargeStyle}>
						The full-stack TypeScript framework that server-side
						renders React, Angular, Svelte, Vue, HTML, and HTMX from
						a single Elysia server: with universal HMR, end-to-end
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
						id="what-is-absolutejs"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What is AbsoluteJS?
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						Most meta-frameworks lock you into one UI library.
						AbsoluteJS doesn&apos;t. It&apos;s a platform built on
						Bun and Elysia that gives every frontend framework the
						same first-class SSR, hydration, and HMR: so you can
						pick the right tool for each page and serve them all
						from one server.
					</p>
					<p style={paragraphSpacedStyle}>
						Your landing page can be React, your admin panel
						Angular, your interactive widgets HTMX, and your docs
						plain HTML. One build, one deploy, one codebase. Types
						flow from your database schema through your server
						handlers into your components with zero code generation.
						TypeScript does all the work.
					</p>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS isn&apos;t just a renderer. It ships with
						OAuth authentication for 66+ providers, a visual page
						builder, scoped per-user server state, an opinionated
						ESLint config, and a project CLI. Everything you need to
						go from idea to production.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="key-features"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Key Features
					</AnchorHeading>
					{renderOverviewCardGrid(
						keyFeatureCards,
						themeSprings,
						isMobile
					)}
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="framework-support"
						level="h2"
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
					{renderFrameworkCardGrid(themeSprings, isMobile)}
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="multi-framework"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Multi-Framework in One App
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use different frameworks on different routes. Your
						config declares which directories contain which
						frameworks, and AbsoluteJS builds them all in a single
						pass:
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
						id="type-safety"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Type Safety Without Codegen
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Define your schema once. Drizzle infers the types, your
						server handler passes them as props, and your component
						receives them: all checked at compile time. No generated
						files, no build step for types, no drift.
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
						id="hmr"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Universal HMR
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every framework gets fast hot module replacement with no
						configuration. AbsoluteJS detects what changed and picks
						the minimal update strategy: CSS-only swaps,
						template-only patches, or full component reloads. Form
						inputs, scroll positions, and open menus are preserved
						across edits.
					</p>
					{renderOverviewCardGrid(hmrCards, themeSprings, isMobile)}
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="ecosystem"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Ecosystem
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS ships with everything you need to go from
						idea to production. Authentication, linting, state
						management, scaffolding, and a visual editor: all
						designed to work together.
					</p>
					{renderOverviewCardGrid(
						ecosystemCards,
						themeSprings,
						isMobile
					)}
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="quick-example"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick Example
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A minimal AbsoluteJS app with React includes three
						pieces: config, server, and done.
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
						id="next-steps"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Next Steps
					</AnchorHeading>
					{renderNextSteps()}
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
