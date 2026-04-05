import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	mainContentStyle,
	h1Style,
	sectionStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	githubButtonStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { CreateAbsoluteJSFeatureCard } from './CreateAbsoluteJSFeatureCard';
import { CreateAbsoluteJSDataTable } from './CreateAbsoluteJSDataTable';

const tocItems: TocItem[] = [
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#project-overview', label: 'Project Overview' },
	{ href: '#cli-options', label: 'CLI Options' },
	{ href: '#configuration', label: 'Configuration' }
];

type ScriptItem = {
	description: string;
	script: string;
};

const scripts: ScriptItem[] = [
	{
		description: 'Start the development server with hot reload',
		script: 'bun dev'
	},
	{ description: 'Build the project for production', script: 'bun build' },
	{ description: 'Run code quality checks', script: 'bun lint' },
	{
		description: 'Format code with configured formatter',
		script: 'bun format'
	},
	{ description: 'Run TypeScript type checking', script: 'bun typecheck' },
	{
		description: 'Open database studio (if ORM configured)',
		script: 'bun db:studio'
	},
	{
		description: 'Push schema changes to database (if ORM configured)',
		script: 'bun db:push'
	},
	{
		description:
			'Start local database container (if using local database without a host)',
		script: 'bun db:<engine>'
	}
];

type CliOption = {
	description: string;
	flag: string;
};

const cliOptions: CliOption[] = [
	// General options
	{ description: 'Show help message and exit', flag: '--help, -h' },
	{
		description:
			'Display a summary of project configuration after creation',
		flag: '--debug, -d'
	},
	{
		description:
			'Skip non-required prompts; uses defaults and "absolutejs-project" if no name provided',
		flag: '--skip'
	},
	{
		description: 'Use the same package manager to install dependencies',
		flag: '--install'
	},
	{ description: 'Initialize a Git repository', flag: '--git' },
	{ description: 'Use LTS versions of required packages', flag: '--lts' },
	{
		description: 'Directory-naming strategy: "default" or "custom"',
		flag: '--directory <mode>'
	},
	// Frontend options
	{ description: 'Include a React frontend', flag: '--react' },
	{
		description: 'Specify the directory for and use the React frontend',
		flag: '--react-dir <directory>'
	},
	{ description: 'Include a Svelte frontend', flag: '--svelte' },
	{
		description: 'Specify the directory for and use the Svelte frontend',
		flag: '--svelte-dir <directory>'
	},
	{ description: 'Include a Vue frontend', flag: '--vue' },
	{
		description: 'Specify the directory for and use the Vue frontend',
		flag: '--vue-dir <directory>'
	},
	{ description: 'Include an Angular frontend', flag: '--angular' },
	{
		description: 'Specify the directory for and use the Angular frontend',
		flag: '--angular-dir <directory>'
	},
	{ description: 'Include an HTMX frontend', flag: '--htmx' },
	{
		description: 'Specify the directory for and use the HTMX frontend',
		flag: '--htmx-dir <directory>'
	},
	{ description: 'Include a plain HTML frontend', flag: '--html' },
	{
		description: 'Specify the directory for and use the HTML frontend',
		flag: '--html-dir <directory>'
	},
	{
		description: 'Enable HTML scripting with TypeScript',
		flag: '--html-scripts'
	},
	// Database options
	{
		description:
			'Database engine: postgresql, mysql, sqlite, mongodb, mariadb, gel, singlestore, cockroachdb, mssql, or none',
		flag: '--db <engine>'
	},
	{
		description: 'Directory name for your database files',
		flag: '--db-dir <directory>'
	},
	{
		description: 'Database host provider: neon, planetscale, or none',
		flag: '--db-host <host>'
	},
	{
		description: 'ORM to configure: drizzle, prisma, or none',
		flag: '--orm <orm>'
	},
	// Auth options
	{
		description: 'Pre-configured auth plugin: "abs" or none',
		flag: '--auth <plugin>'
	},
	{
		description:
			'A provider for Absolute-Auth (e.g., google, github, discord)',
		flag: '--abs-provider'
	},
	// Build options
	{
		description: 'Directory name for your static assets',
		flag: '--assets <directory>'
	},
	{
		description: 'Output directory for build artifacts',
		flag: '--build <directory>'
	},
	// Elysia plugins
	{
		description:
			'Elysia plugin(s) to include (repeatable); "none" skips plugin setup',
		flag: '--plugin <plugin>'
	},
	// Tooling options
	{ description: 'Include Tailwind CSS setup', flag: '--tailwind' },
	{
		description: 'Path to your Tailwind CSS entry file',
		flag: '--tailwind-input <file>'
	},
	{
		description: 'Path for the generated Tailwind CSS bundle',
		flag: '--tailwind-output <file>'
	},
	{
		description: 'Use Biome for code quality and formatting',
		flag: '--biome'
	},
	{
		description: 'Use ESLint + Prettier for code quality and formatting',
		flag: '--eslint+prettier'
	}
];

export const CreateAbsoluteJSView = ({
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
						id="create-absolutejs"
						style={h1Style(isMobileOrTablet)}
					>
						Create AbsoluteJS
					</h1>
					<p style={paragraphLargeStyle}>
						Scaffolding tool that bootstraps new AbsoluteJS
						applications with an interactive CLI. Configure
						frameworks, databases, auth, and tooling in one command.
					</p>
					<animated.a
						href="https://github.com/absolutejs/create-absolutejs"
						rel="noopener noreferrer"
						style={githubButtonStyle(themeSprings)}
						target="_blank"
					>
						View on GitHub
					</animated.a>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="quick-start"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick Start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Create a new AbsoluteJS project in seconds:
					</p>
					<PrismPlus
						codeString={'bun create absolutejs my-app'}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The CLI guides you through an interactive setup for:
					</p>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile
								? '1fr'
								: 'repeat(3, 1fr)',
							marginBottom: '1.5rem',
							marginTop: '1rem'
						}}
					>
						<CreateAbsoluteJSFeatureCard
							themeSprings={themeSprings}
							title="Frontends"
						>
							React, Svelte, Vue, HTMX, HTML
						</CreateAbsoluteJSFeatureCard>
						<CreateAbsoluteJSFeatureCard
							themeSprings={themeSprings}
							title="Databases"
						>
							PostgreSQL, MySQL, SQLite, MongoDB
						</CreateAbsoluteJSFeatureCard>
						<CreateAbsoluteJSFeatureCard
							themeSprings={themeSprings}
							title="Tooling"
						>
							Drizzle/Prisma, Tailwind, ESLint
						</CreateAbsoluteJSFeatureCard>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="project-overview"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Project Overview
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						After running Create-AbsoluteJS, your project includes
						an organized src/ folder with separate frontend and
						backend directories, pre-configured settings, and all
						necessary dependencies installed.
					</p>
					<animated.h3
						style={gradientHeadingStyle(themeSprings, true)}
					>
						Available Scripts
					</animated.h3>
					<CreateAbsoluteJSDataTable
						codeHeader="Script"
						rows={scripts.map((s) => ({
							code: s.script,
							description: s.description
						}))}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>Start developing:</p>
					<PrismPlus
						codeString={'cd my-app\nbun run dev'}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="cli-options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CLI Options
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Customize your setup with command-line flags to skip
						prompts or pre-configure options:
					</p>
					<CreateAbsoluteJSDataTable
						codeHeader="Flag"
						rows={cliOptions.map((opt) => ({
							code: opt.flag,
							description: opt.description
						}))}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="configuration"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Configuration Options
					</AnchorHeading>

					<animated.h3
						style={gradientHeadingStyle(themeSprings, true)}
					>
						Database Options
					</animated.h3>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
							marginBottom: '1.5rem',
							marginTop: '1rem'
						}}
					>
						<CreateAbsoluteJSFeatureCard
							themeSprings={themeSprings}
							title="Local Development"
						>
							Automatic Docker Compose setup with pre-configured
							containers, environment variables, and scripts.
						</CreateAbsoluteJSFeatureCard>
						<CreateAbsoluteJSFeatureCard
							themeSprings={themeSprings}
							title="Hosted Providers"
						>
							First-class support for Neon (PostgreSQL),
							PlanetScale (MySQL), and Turso (SQLite).
						</CreateAbsoluteJSFeatureCard>
					</div>

					<animated.h3
						style={gradientHeadingStyle(themeSprings, true)}
					>
						Additional Features
					</animated.h3>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile
								? '1fr'
								: 'repeat(2, 1fr)',
							marginBottom: '2rem',
							marginTop: '1rem'
						}}
					>
						<CreateAbsoluteJSFeatureCard
							themeSprings={themeSprings}
							title="Code Quality Tools"
						>
							Choose between ESLint + Prettier or Biome, both
							fully configured with sensible default rules out of
							the box.
						</CreateAbsoluteJSFeatureCard>
						<CreateAbsoluteJSFeatureCard
							themeSprings={themeSprings}
							title="Tailwind CSS"
						>
							Optional utility-first CSS framework setup
						</CreateAbsoluteJSFeatureCard>
						<CreateAbsoluteJSFeatureCard
							themeSprings={themeSprings}
							title="Absolute Auth"
						>
							Pre-configured OAuth 2.0 authentication
						</CreateAbsoluteJSFeatureCard>
						<CreateAbsoluteJSFeatureCard
							themeSprings={themeSprings}
							title="ORM Integration"
						>
							Drizzle or Prisma with type-safe queries
						</CreateAbsoluteJSFeatureCard>
					</div>
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
