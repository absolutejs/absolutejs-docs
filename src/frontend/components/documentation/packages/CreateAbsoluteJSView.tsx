import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	mainContentStyle,
	h1Style,
	headingStyle,
	listStyle,
	listItemStyle,
	paragraphLargeStyle,
	paragraphStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#quick-start', label: 'Quick Start' },
	{ href: '#project-overview', label: 'Project Overview' },
	{ href: '#reference', label: 'Reference' },
	{ href: '#configuration-options', label: 'Configuration Options' }
];

export const CreateAbsoluteJSView = ({ themeSprings }: ThemeProps) => {
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
				<animated.h1 style={h1Style}>Create-AbsoluteJS</animated.h1>
				<p style={paragraphLargeStyle}>
					Create-AbsoluteJS is a scaffolding tool that helps you
					quickly bootstrap new applications. Instead of manually
					creating folders, installing packages, and configuring
					files, Create-AbsoluteJS handles all setup through a single
					command with an interactive CLI experience.
				</p>
				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="quick-start"
					>
						Quick Start
					</animated.h2>
					<p style={paragraphStyle}>
						Create a new AbsoluteJS project in seconds:
					</p>
					<PrismPlus
						language="bash"
						codeString={'bun create absolutejs my-app'}
						themeSprings={themeSprings}
						showLineNumbers={false}
					/>
					<p style={paragraphStyle}>
						The CLI will guide you through an interactive setup,
						asking about:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>Frontend frameworks</li>
						<li style={listItemStyle}>Database engine</li>
						<li style={listItemStyle}>Authentication provider</li>
						<li style={listItemStyle}>ORM</li>
						<li style={listItemStyle}>Code quality tools</li>
						<li style={listItemStyle}>Additional plugins</li>
					</ul>
					<p style={paragraphStyle}>
						Once complete, your project will be fully configured and
						ready for development.
					</p>
				</section>
				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="project-overview"
					>
						Project Overview
					</animated.h2>
					<p style={paragraphStyle}>
						After running Create-AbsoluteJS, your project will
						include:
					</p>
					<ul
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '0.75rem',
							listStyle: 'disc',
							marginBottom: '2rem',
							marginLeft: '1.5rem'
						}}
					>
						<li style={listItemStyle}>
							An organized src/ folder with separate frontend and
							backend directories
						</li>
						<li style={listItemStyle}>
							Pre-configured settings in tsconfig.json,
							eslint.config.mjs, and other files
						</li>
						<li style={listItemStyle}>
							Pre-built package.json with all necessary
							dependencies installed
						</li>
						<li style={listItemStyle}>
							Generated connection files and schema if a local
							database option is selected
						</li>
					</ul>
					<p style={paragraphStyle}>
						The following scripts are available:
					</p>
					<ul
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '0.75rem',
							listStyle: 'disc',
							marginBottom: '2rem',
							marginLeft: '1.5rem'
						}}
					>
						<li style={listItemStyle}>
							bun dev - Start the development server
						</li>
						<li style={listItemStyle}>
							bun build - Build the project for production
						</li>
						<li style={listItemStyle}>
							bun lint - Run code quality checks
						</li>
						<li style={listItemStyle}>bun format - Format code</li>
						<li style={listItemStyle}>
							bun typecheck - Type check code
						</li>
						<li style={listItemStyle}>
							bun db:studio - Open database studio (if ORM is
							present)
						</li>
						<li style={listItemStyle}>
							bun db:&lt;engine&gt; - Open database shell (if
							local database option is selected)
						</li>
					</ul>
					<p style={paragraphStyle}>Start developing:</p>
					<PrismPlus
						language="bash"
						codeString={'cd my-app\nbun run dev'}
						themeSprings={themeSprings}
						showLineNumbers={false}
					/>
				</section>
				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="reference"
					>
						Reference
					</animated.h2>
					<p style={paragraphStyle}>
						Customize your setup with command-line flags to skip
						prompts or pre-configure options:
					</p>
					<PrismPlus
						language="text"
						codeString={`\
Usage: create-absolute [options] [project-name]

Arguments:
	project-name                    Name of the application to create.
									If omitted, defaults to 'absolutejs-project'

Options:
	--help, -h                      Show this help message and exit
	--debug, -d                     Display a summary of the project configuration after creation

	--angular                       Include an Angular frontend
	--angular-dir <directory>       Specify the directory for and use the Angular frontend
	--assets <directory>            Directory name for your static assets
	--auth <plugin>                 Pre-configured auth plugin (currently only "absolute-auth") or 'none'
	--biome                         Use Biome for code quality and formatting
	--build <directory>             Output directory for build artifacts
	--db <engine>                   Database engine (postgresql | mysql | sqlite | mongodb | mariadb 
													| gel | singlestore | cockroachdb | mssql) or 'none'
	--db-dir <directory>            Directory name for your database files
	--db-host <host>                Database host provider (neon | planetscale) or 'none'
	--directory <mode>              Directory-naming strategy: "default" or "custom"
	--eslint+prettier               Use ESLint + Prettier for code quality and formatting
	--git                           Initialize a Git repository
	--html                          Include a plain HTML frontend
	--html-dir <directory>          Specify the directory for and use the HTML frontend
	--html-scripts                  Enable HTML scripting with TypeScript
	--htmx                          Include an HTMX frontend
	--htmx-dir <directory>          Specify the directory for and use the HTMX frontend
	--install                       Use the same package manager to install dependencies
	--lts                           Use LTS versions of required packages
	--orm <orm>                     ORM to configure: "drizzle" | "prisma" | 'none'
	--plugin <plugin>               Elysia plugin(s) to include (repeatable); 'none' skips plugin setup
	--react                         Include a React frontend
	--react-dir <directory>         Specify the directory for and use the React frontend
	--skip                          Skip non-required prompts; uses 'none' for all optional configs
	--svelte                        Include a Svelte frontend
	--svelte-dir <directory>        Specify the directory for and use the Svelte frontend
	--tailwind                      Include Tailwind CSS setup
	--tailwind-input <file>         Path to your Tailwind CSS entry file
	--tailwind-output <file>        Path for the generated Tailwind CSS bundle
	--vue                           Include a Vue frontend
	--vue-dir <directory>           Specify the directory for and use the Vue frontend`}
						themeSprings={themeSprings}
						showLineNumbers={false}
						wrapLongLines={false}
					/>
				</section>
				<section style={sectionStyle}>
					<animated.h2
						style={headingStyle(themeSprings)}
						id="configuration-options"
					>
						Configuration Options
					</animated.h2>
					<animated.h2
						style={headingStyle(themeSprings, true)}
					>
						Frontend Frameworks
					</animated.h2>
					<p style={paragraphStyle}>
						Create-AbsoluteJS supports multiple frontend frameworks
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							React, Vue, Svelte, Angular, HTMX, HTML
						</li>
						<li style={listItemStyle}>
							Multiple frameworks can be selected
						</li>
						<li style={listItemStyle}>
							Each framework gets its own directory in the project
							structure
						</li>
					</ul>
					<animated.h2 style={headingStyle(themeSprings, true)}>
						Database Options
					</animated.h2>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							PostgreSQL, MySQL, SQLite, MongoDB, MariaDB, GEL,
							SingleStore, CockroachDB, SQL Server
						</li>
						<li style={listItemStyle}>
							Local development: Automatic Docker Compose setup
							with pre-configured containers, environment
							variables, and scripts
						</li>
						<li style={listItemStyle}>
							Hosted providers: First-class support for Neon
							(PostgreSQL), PlanetScale (MySQL), and Turso
							(SQLite)
						</li>
					</ul>
					<animated.h2 style={headingStyle(themeSprings, true)}>
						Additional Features
					</animated.h2>
					<ul style={listStyle}>
						<li style={listItemStyle}>Tailwind CSS (optional)</li>
						<li style={listItemStyle}>
							Pre-configured Absolute Auth setup
						</li>
						<li style={listItemStyle}>
							Drizzle or Prisma integration
						</li>
					</ul>
				</section>
				<section
					style={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem',
						marginTop: '3rem',
						paddingBottom: '2rem'
					}}
				>
					<p style={paragraphStyle}>
						Ready to try it out? Explore a live example:
					</p>
					<animated.a
						href="#"
						onClick={(e) => e.preventDefault()}
						style={{
							background: themeSprings.themePrimary,
							borderRadius: '8px',
							color: themeSprings.contrastPrimary,
							cursor: 'pointer',
							fontSize: '1.1rem',
							fontWeight: '600',
							padding: '12px 32px',
							textDecoration: 'none',
							transition: 'transform 0.2s, opacity 0.2s'
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'scale(1.05)';
							e.currentTarget.style.opacity = '0.9';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'scale(1)';
							e.currentTarget.style.opacity = '1';
						}}
					>
						Try on CodeSandbox
					</animated.a>
				</section>
			</div>
			{!isMobile && (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			)}
		</div>
	);
};
