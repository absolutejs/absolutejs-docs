import { animated } from "@react-spring/web";
import { ThemeProps } from "../../../../types/springTypes";
import { PrismPlus } from "../../utils/PrismPlus";
import * as styles from "../../../styles/docsStyles";
import { TableOfContents, TocItem } from "../../utils/TableOfContents";

const tocItems: TocItem[] = [
	{ label: "Quick Start", href: "#quick-start" },
	{ label: "What You Get", href: "#what-you-get" },
	{ label: "Command Flags", href: "#command-flags" },
	{ label: "Configuration Options", href: "#configuration-options" },
	{ label: "Try It Out", href: "#try-it-out" }
];

export const CreateAbsoluteJSView = ({ themeSprings }: ThemeProps) => (
	// TODO: Fix div sizing (overflowing due to CLI codeblock)
	<div
		style={{
			display: "flex",
			flex: 1,
			position: "relative",
			overflowX: "hidden",
			overflowY: "auto"
		}}
	>
		<div style={styles.mainContentStyle}>
			<section>
				<animated.h1 style={styles.h1Style}>
					Create-AbsoluteJS
				</animated.h1>
				<p style={styles.paragraphLargeStyle}>
					<strong>Create-AbsoluteJS</strong> is a scaffolding tool that helps you
					quickly bootstrap new applications. Instead of manually
					creating folders, installing packages, and configuring files, Create-AbsoluteJS
					handles all setup through a single command with an interactive CLI
					experience.
				</p>
				<animated.h2 style={styles.headingStyle(themeSprings)} id="quick-start">
					Quick Start
				</animated.h2>
				<p style={styles.paragraphStyle}>
					Get started with a new AbsoluteJS project in seconds:
				</p>
				<PrismPlus
					language="bash"
					codeString={"bun create absolutejs my-app"}
					themeSprings={themeSprings}
					showLineNumbers={false}
				/>
				<p style={styles.paragraphStyle}>
					The tool will guide you through an interactive setup, asking about your
					preferred frontend framework, database, authentication provider, ORM, code quality tools,
					and plugins. Once complete, you'll have a fully configured project ready to
					run.
				</p>
				<animated.h2 style={styles.headingStyle(themeSprings)} id="what-you-get">
					What You Get
				</animated.h2>
				<p style={styles.paragraphStyle}>
					After running Create-AbsoluteJS, your project will include:
				</p>
				<ul style={styles.listStyle}>
					<li style={styles.listItemStyle}>
						<strong>Organized structure:</strong> A <code>src</code> folder with
						separate frontend and backend directories
					</li>
					<li style={styles.listItemStyle}>
						<strong>Ready configuration:</strong> Pre-configured{' '}
						<code>tsconfig.json</code>, <code>eslint.config.mjs</code>, and other
						settings
					</li>
					<li style={styles.listItemStyle}>
						<strong>Correct dependencies:</strong> <code>package.json</code> with
						all necessary packages.
					</li>
					<li style={styles.listItemStyle}>
						<strong>Dev scripts:</strong> Essential commands for development and production.
						<ul style={styles.listStyle}>
							<li style={styles.listItemStyle}><code>bun run dev</code> - Start the development server with hot reloading</li>
							<li style={styles.listItemStyle}><code>bun run build</code> - Build the project for production</li>
							<li style={styles.listItemStyle}><code>bun run lint</code> - Run the configured linter ESLint, Biome, or Prettier to check and format code quality.</li>
							<li style={styles.listItemStyle}>
								If there is a database configured:
								<ul style={styles.listStyle}>
									<li style={styles.listItemStyle}><code>bun db: studio</code> - pulls up the database tables</li>
								</ul>
							</li>
							<li style={styles.listItemStyle}>
								If drizzle:
								<ul style={styles.listStyle}>
									<li style={styles.listItemStyle}><code>bun db: push</code> - runs drizzle-kit to push schema changes</li>
								</ul>
							</li>
						</ul>
					</li>
					<li style={styles.listItemStyle}>
						<strong>Database setup:</strong> Generates connection files and schema when selected.
					</li>
				</ul>
				<p style={styles.paragraphStyle}>
					Simply navigate into your project and start development:
				</p>
				<PrismPlus
					language="bash"
					codeString={"cd my-app\nbun run dev"}
					themeSprings={themeSprings}
					showLineNumbers={false}
				/>
				<animated.h2 style={styles.headingStyle(themeSprings)} id="command-flags">
					Command Flags
				</animated.h2>
				<p style={styles.paragraphStyle}>
					Customize your setup with command-line flags to skip prompts or
					pre-configure options:
				</p>
				<PrismPlus
					language="bash"
					codeString={`Usage: create-absolute [options] [project-name]

    Arguments:
      project-name                    Name of the application to create.
                                      If omitted, you'll be prompted to enter one.

    Options:
      --help, -h                      Show this help message and exit
      --debug, -d                     Display a summary of the project configuration after creation

      --angular                       Include an Angular frontend
      --angular-dir <directory>       Specify the directory for and use the Angular frontend
      --assets <directory>            Directory name for your static assets
      --auth <plugin>                 Pre-configured auth plugin (currently only "absolute-auth") or 'none'
      --biome                         Use Biome for code quality and formatting
      --build <directory>             Output directory for build artifacts
      --db <engine>                   Database engine (postgresql | mysql | sqlite | mongodb | mariadb | gel | singlestore | cockroachdb | mssql) or 'none'
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
				/>
				<animated.h2 style={styles.headingStyle(themeSprings)} id="configuration-options">
					Configuration Options
				</animated.h2>
				<animated.h2 style={styles.headingStyle(themeSprings)}>
					Frontend Frameworks
				</animated.h2>
				<ul style={styles.listStyle}>
					<li style={styles.listItemStyle}>
						React, Vue, Svelte, Angular, HTMLX or plain HTML.
					</li>
					<li style={styles.listItemStyle}>
						Multiple frameworks can be selected for one application.
					</li>
					<li style={styles.listItemStyle}>
						Each framework gets its own directory in the project structure.
					</li>
				</ul>
				<animated.h2 style={styles.headingStyle(themeSprings)}>
					Database Options
				</animated.h2>
				<ul style={styles.listStyle}>
					<li style={styles.listItemStyle}>
						<strong>Database Engines:</strong> PostgreSQL, MySQL, SQLite, MongoDB, MariaDB, GEL, SingleStore, CockroachDB, or SQL Server.
					</li>
					<li style={styles.listItemStyle}>
						<strong>Local development:</strong> Automatic Docker Compose setup with pre-configured containers, environment variables, and database scripts.
					</li>
					<li style={styles.listItemStyle}>
						<strong>Hosted providers:</strong> First-class support for cloud database including Neon - PostgreSQL, PlanetScale - MySQL, and Turso - 
						SQLite.
					</li>
				</ul>
				<animated.h2 style={styles.headingStyle(themeSprings)}>
					Additional Features
				</animated.h2>
				<ul style={styles.listStyle}>
					<li style={styles.listItemStyle}>
						<strong>CSS Framework:</strong> Optional Tailwind CSS configuration.
					</li>
					<li style={styles.listItemStyle}>
						<strong>Authentication:</strong> Pre-configured Absolute-Authentication setup
					</li>
					<li style={styles.listItemStyle}>
						<strong>ORM:</strong> Choose a database ORM integration — Drizzle or Prisma
					</li>
				</ul>
				<animated.h2 style={styles.headingStyle(themeSprings)} id="try-it-out">
					Try It Out
				</animated.h2>
				<p style={styles.paragraphStyle}>
					Try our interactive sandbox to explore the CLI experience directly in your browser.
				</p>
				<button onClick={() => window.location.href = '/sandbox'}> {/* TODO: Fix */}
					Open Interactive Sandbox
				</button>
			</section>
		</div>
		<TableOfContents items={tocItems} themeSprings={themeSprings} />
	</div>
);
