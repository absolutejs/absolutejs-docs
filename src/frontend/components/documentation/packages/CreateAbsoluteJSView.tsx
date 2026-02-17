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
	strongStyle,
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle,
	tableCellStyle,
	tableCodeStyle,
	githubButtonStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle,
	featureCardStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#project-overview', label: 'Project Overview' },
	{ href: '#cli-options', label: 'CLI Options' },
	{ href: '#configuration', label: 'Configuration' }
];

const scripts = [
	{
		script: 'bun dev',
		description: 'Start the development server with hot reload'
	},
	{ script: 'bun build', description: 'Build the project for production' },
	{ script: 'bun lint', description: 'Run code quality checks' },
	{
		script: 'bun format',
		description: 'Format code with configured formatter'
	},
	{ script: 'bun typecheck', description: 'Run TypeScript type checking' },
	{
		script: 'bun db:studio',
		description: 'Open database studio (if ORM configured)'
	},
	{
		script: 'bun db:push',
		description: 'Push schema changes to database (if ORM configured)'
	},
	{
		script: 'bun db:<engine>',
		description:
			'Start local database container (if using local database without a host)'
	}
];

const cliOptions = [
	// General options
	{ flag: '--help, -h', description: 'Show help message and exit' },
	{
		flag: '--debug, -d',
		description: 'Display a summary of project configuration after creation'
	},
	{
		flag: '--skip',
		description:
			'Skip non-required prompts; uses defaults and "absolutejs-project" if no name provided'
	},
	{
		flag: '--install',
		description: 'Use the same package manager to install dependencies'
	},
	{ flag: '--git', description: 'Initialize a Git repository' },
	{ flag: '--lts', description: 'Use LTS versions of required packages' },
	{
		flag: '--directory <mode>',
		description: 'Directory-naming strategy: "default" or "custom"'
	},
	// Frontend options
	{ flag: '--react', description: 'Include a React frontend' },
	{
		flag: '--react-dir <directory>',
		description: 'Specify the directory for and use the React frontend'
	},
	{ flag: '--svelte', description: 'Include a Svelte frontend' },
	{
		flag: '--svelte-dir <directory>',
		description: 'Specify the directory for and use the Svelte frontend'
	},
	{ flag: '--vue', description: 'Include a Vue frontend' },
	{
		flag: '--vue-dir <directory>',
		description: 'Specify the directory for and use the Vue frontend'
	},
	{ flag: '--angular', description: 'Include an Angular frontend' },
	{
		flag: '--angular-dir <directory>',
		description: 'Specify the directory for and use the Angular frontend'
	},
	{ flag: '--htmx', description: 'Include an HTMX frontend' },
	{
		flag: '--htmx-dir <directory>',
		description: 'Specify the directory for and use the HTMX frontend'
	},
	{ flag: '--html', description: 'Include a plain HTML frontend' },
	{
		flag: '--html-dir <directory>',
		description: 'Specify the directory for and use the HTML frontend'
	},
	{
		flag: '--html-scripts',
		description: 'Enable HTML scripting with TypeScript'
	},
	// Database options
	{
		flag: '--db <engine>',
		description:
			'Database engine: postgresql, mysql, sqlite, mongodb, mariadb, gel, singlestore, cockroachdb, mssql, or none'
	},
	{
		flag: '--db-dir <directory>',
		description: 'Directory name for your database files'
	},
	{
		flag: '--db-host <host>',
		description: 'Database host provider: neon, planetscale, or none'
	},
	{
		flag: '--orm <orm>',
		description: 'ORM to configure: drizzle, prisma, or none'
	},
	// Auth options
	{
		flag: '--auth <plugin>',
		description: 'Pre-configured auth plugin: "abs" or none'
	},
	{
		flag: '--abs-provider',
		description:
			'A provider for Absolute-Auth (e.g., google, github, discord)'
	},
	// Build options
	{
		flag: '--assets <directory>',
		description: 'Directory name for your static assets'
	},
	{
		flag: '--build <directory>',
		description: 'Output directory for build artifacts'
	},
	// Elysia plugins
	{
		flag: '--plugin <plugin>',
		description:
			'Elysia plugin(s) to include (repeatable); "none" skips plugin setup'
	},
	// Tooling options
	{ flag: '--tailwind', description: 'Include Tailwind CSS setup' },
	{
		flag: '--tailwind-input <file>',
		description: 'Path to your Tailwind CSS entry file'
	},
	{
		flag: '--tailwind-output <file>',
		description: 'Path for the generated Tailwind CSS bundle'
	},
	{
		flag: '--biome',
		description: 'Use Biome for code quality and formatting'
	},
	{
		flag: '--eslint+prettier',
		description: 'Use ESLint + Prettier for code quality and formatting'
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
				overflowY: 'scroll',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1
						style={h1Style(isMobileOrTablet)}
						id="create-absolutejs"
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
						target="_blank"
						rel="noopener noreferrer"
						style={githubButtonStyle(themeSprings)}
					>
						View on GitHub
					</animated.a>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="quick-start"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Quick Start
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Create a new AbsoluteJS project in seconds:
					</p>
					<PrismPlus
						language="bash"
						codeString={'bun create absolutejs my-app'}
						themeSprings={themeSprings}
						showLineNumbers={false}
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
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>Frontends</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								React, Svelte, Vue, HTMX, HTML
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>Databases</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								PostgreSQL, MySQL, SQLite, MongoDB
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>Tooling</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Drizzle/Prisma, Tailwind, ESLint
							</p>
						</animated.div>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="project-overview"
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
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Script
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Description
									</animated.th>
								</tr>
							</thead>
							<tbody>
								{scripts.map((s, i) => (
									<tr key={i}>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											<code style={tableCodeStyle}>
												{s.script}
											</code>
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{s.description}
										</animated.td>
									</tr>
								))}
							</tbody>
						</animated.table>
					</div>
					<p style={paragraphSpacedStyle}>Start developing:</p>
					<PrismPlus
						language="bash"
						codeString={'cd my-app\nbun run dev'}
						themeSprings={themeSprings}
						showLineNumbers={false}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="cli-options"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CLI Options
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Customize your setup with command-line flags to skip
						prompts or pre-configure options:
					</p>
					<div style={tableContainerStyle}>
						<animated.table style={tableStyle(themeSprings)}>
							<thead>
								<tr>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Flag
									</animated.th>
									<animated.th
										style={tableHeaderStyle(themeSprings)}
									>
										Description
									</animated.th>
								</tr>
							</thead>
							<tbody>
								{cliOptions.map((opt, i) => (
									<tr key={i}>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											<code style={tableCodeStyle}>
												{opt.flag}
											</code>
										</animated.td>
										<animated.td
											style={tableCellStyle(themeSprings)}
										>
											{opt.description}
										</animated.td>
									</tr>
								))}
							</tbody>
						</animated.table>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="configuration"
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
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Local Development
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Automatic Docker Compose setup with
								pre-configured containers, environment
								variables, and scripts.
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
									Hosted Providers
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								First-class support for Neon (PostgreSQL),
								PlanetScale (MySQL), and Turso (SQLite).
							</p>
						</animated.div>
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
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Code Quality Tools
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Choose between ESLint + Prettier or Biome, both
								fully configured with sensible default rules out
								of the box.
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
									Tailwind CSS
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Optional utility-first CSS framework setup
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
									Absolute Auth
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Pre-configured OAuth 2.0 authentication
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
									ORM Integration
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Drizzle or Prisma with type-safe queries
							</p>
						</animated.div>
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
					themeSprings={themeSprings}
					items={tocItems}
					isOpen={tocOpen ?? false}
					onToggle={onTocToggle}
				/>
			)}
		</div>
	);
};
