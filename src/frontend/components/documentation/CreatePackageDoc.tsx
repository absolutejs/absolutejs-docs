import { animated } from "@react-spring/web";
import { ThemeProps } from "../../../../types/springTypes";
import { PrismPlus } from "../../utils/PrismPlus";

export const CreateAbsoluteJSView = ({ themeSprings }: ThemeProps) => {
    return (
        <animated.div
				style={{
					padding: "2rem 2rem 4rem 2rem",
					maxWidth: "1100px",
					width: "100%",
					margin: "0 auto"

				}}
			>
                <animated.h1
                    style={{
                        color: themeSprings.contrastPrimary,
                        fontSize: "3rem",
                        marginBottom: "1rem"
                    }}
                >
                    Create-AbsoluteJS
                </animated.h1>
                <animated.p
                style={{
                    color: themeSprings.contrastSecondary,
                    fontSize: "1.2rem",
                    lineHeight: "1.6",
                    marginBottom: "2rem"
                }}
            >
                <strong>Create-AbsoluteJS</strong> is a scaffolding tool that helps you 
                    quickly bootstrap new applications. Instead of manually
                    creating folders, installing packages, and configuring files. Create-AbsoluteJS
                    handles all setup through a single command with an interactive CLI
                    experience.
            </animated.p>
            <animated.h2
                style={{
                    color: themeSprings.contrastPrimary,
                    fontSize: "2rem",
                    marginBottom: "1rem",
                    marginTop: "2rem"
                }}  
            >
                Quick Start
            </animated.h2>
            <animated.p
                style={{
                    color: themeSprings.contrastSecondary,
                    fontSize: "1.2rem",
                    lineHeight: "1.6",
                    marginBottom: "1rem",
                }}
            >
                Get started with a new AbsoluteJS project in seconds:
            </animated.p>
            <PrismPlus
                language="bash"
                codeString={"bun create absolutejs my-app"}
                themeSprings={themeSprings}
                showLineNumbers={false}
            />
            <animated.p
                style={{
                    color: themeSprings.contrastSecondary,
                    fontSize: "1.2rem",
                    lineHeight: "1.6",
                    marginBottom: "2rem"
                }}
            >
                The tool will guide you through an interactive setup, asking about your
                preferred frontend framework, database, authentication provider, ORM, code quality tools,
                and plugins. Once complete, you'll have a fully configured project ready to
                run.
            </animated.p>
            <animated.h2
                style={{
                    color: themeSprings.contrastPrimary,
                    fontSize: "2rem",
                    marginBottom: "1rem",
                    marginTop: "2rem"
                }}  
            >
                What You Get
            </animated.h2>
            <animated.p
                style={{
                    color: themeSprings.contrastSecondary,
                    fontSize: "1.2rem",
                    lineHeight: "1.6",
                    marginBottom: "1rem",
                }}
            >
                After running Create-AbsoluteJS, your project will include:
            </animated.p>
            <animated.ul
                style={{
                    color: themeSprings.contrastSecondary,
                    fontSize: "1.2rem",
                    lineHeight: "1.8",
                    marginBottom: "2rem",
                    marginLeft: "2rem"
                }}
            >
                <li style ={{ marginBottom: "0.5rem" }}>
                    <strong>Organized structure:</strong> A <code>src</code> folder with
                    separate frontend and backend directories
                </li>
                <li style ={{ marginBottom: "0.5rem" }}>
                    <strong>Ready configuration:</strong> Pre-configured{' '}
                    <code>tsconfig.json</code>, <code>eslint.config.mjs</code>, and other
                    settings
                </li>
                <li style ={{ marginBottom: "0.5rem" }}>
                    <strong>Correct dependencies:</strong> <code>package.json</code> with
                    all necessary packages.
                </li>
                <li style ={{ marginBottom: "0.5rem" }}>
                    <strong>Dev scripts:</strong> Essential commands for development and production.
                    <ul style={{ marginTop: "0.5rem", marginLeft: "1.5rem", listStyleType: "circle" }}>
                        <li style={{marginBottom: "0.25rem"}}><code>bun run dev</code> - Start the development server with hot reloading</li>
                        <li style={{marginBottom: "0.25rem"}}><code>bun run build</code> - Build the project for production</li>
                        <li style={{marginBottom: "0.25rem"}}><code>bun run lint</code> - Run the configured linter ESLint, Biome, or Prettier to check and format code quality.</li>
                        <li style={{marginBottom: "0.25rem"}}>
                            If there is a database configured:
                            <ul style={{ marginTop: "0.25rem", marginLeft: "1.5rem", listStyleType: "square" }}>
                                <li style={{marginBottom: "0.25rem"}}><code>bun db: studio</code> - pulls up the database tables</li>
                            </ul>
                        </li>
                        <li style={{marginBottom: "0.25rem"}}>
                            If drizzle:
                            <ul style={{ marginTop: "0.25rem", marginLeft: "1.5rem", listStyleType: "square" }}>
                                <li style={{marginBottom: "0.25rem"}}><code>bun db: push</code> - runs drizzle-kit to push schema changes</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li style ={{ marginBottom: "0.5rem" }}>
                    <strong>Database setup:</strong> Generates connection files and schema when selected.
                </li>
            </animated.ul>
            <animated.p
                style={{
                    color: themeSprings.contrastSecondary,
                    fontSize: "1.2rem",
                    lineHeight: "1.6",
                    marginBottom: "1rem"
                }}
            >
                Simply navigate into your project and start development:
            </animated.p>
            <PrismPlus
                language="bash"
                codeString={"cd my-app\nbun run dev"}
                themeSprings={themeSprings}
                showLineNumbers={false}
            />
            <animated.h2
                style={{
                    color: themeSprings.contrastPrimary,
                    fontSize: "2rem",
                    marginBottom: "1rem",
                    marginTop: "2rem"
                }}  
            >
                Command Flags
            </animated.h2>
            <animated.p
                style={{
                    color: themeSprings.contrastSecondary,
                    fontSize: "1.2rem",
                    lineHeight: "1.6",
                    marginBottom: "1rem",
                }}
            >
                Customize your setup with command-line flags to skip prompts or
                pre-configure options:
            </animated.p>
                    <PrismPlus
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
                        language="bash"
                        themeSprings={themeSprings}
                        showLineNumbers={false}
                    />
            <animated.h2
                style={{
                    color: themeSprings.contrastPrimary,
                    fontSize: "2rem",
                    marginBottom: "1rem",
                    marginTop: "2rem"
                }}  
            >
                Configuration Options
            </animated.h2>
            <animated.h3
                style={{
                    color: themeSprings.contrastPrimary,
                    fontSize: "1.5rem",
                    marginBottom: "0.75rem",
                    marginTop: "1.5rem"
                }}  
            >
                Frontend Frameworks
            </animated.h3>
            <animated.ul
                style={{
                    color: themeSprings.contrastSecondary,
                    fontSize: "1.2rem",
                    lineHeight: "1.8",
                    marginBottom: "1.5rem",
                    paddingLeft: "2rem"
                }}
            >
                <li style ={{ marginBottom: "0.5rem" }}>
                    React, Vue, Svelte, Angular, HTMLX or plain HTML.
                </li>
                <li style ={{ marginBottom: "0.5rem" }}>
                    Multiple frameworks can be selected for one application.
                </li>
                <li style ={{ marginBottom: "0.5rem" }}>
                    Each framework gets its own directory in the project structure.
                </li>
            </animated.ul>
            <animated.h3
                style={{
                    fontSize: '1.5rem',
                    color: themeSprings.contrastPrimary,
                    marginBottom: '0.75rem',
                    marginTop: '1.5rem'
                }}
            >
                Database Options
            </animated.h3>
            <animated.ul
                style={{
                    color: themeSprings.contrastSecondary,
                    fontSize: "1.2rem",
                    lineHeight: "1.8",
                    marginBottom: "1.5rem",
                    paddingLeft: "2rem"
                }}
            >
                <li style ={{ marginBottom: "0.5rem" }}>
                    <strong>Database Engines:</strong> PostgreSQL, MySQL, SQLite, MongoDB, MariaDB, GEL, SingleStore, CockroachDB, or SQL Server.
                </li>
                <li style ={{ marginBottom: "0.5rem" }}>
                    <strong>Local development:</strong> Automatic Docker Compose setup with pre-configured containers, environment variables, and database scripts.
                </li>
                <li style ={{ marginBottom: "0.5rem" }}>
                    <strong>Hosted providers:</strong> First-class support for cloud database including Neon - PostgreSQL, PlanetScale - MySQL, and Turso - 
                    SQLite.
                </li>
            </animated.ul>
            <animated.h3
                style={{
                    fontSize: '1.5rem',
                    color: themeSprings.contrastPrimary,
                    marginBottom: '0.75rem',
                    marginTop: '1.5rem'
                }}
            >
                Additional Features
            </animated.h3>
            <animated.ul
                style={{
                    color: themeSprings.contrastSecondary,
                    fontSize: "1.2rem",
                    marginBottom: "0.75rem",
                    marginTop: "1.5rem"
                }}
            >
                <li style ={{ marginBottom: "0.5rem" }}>
                    <strong>CSS Framework:</strong> Optional Tailwind CSS configuration.
                </li>
                <li style ={{ marginBottom: "0.5rem" }}>
                    <strong>Authentication:</strong> Pre-configured Absolute-Authentication setup
                </li>
                <li style ={{ marginBottom: "0.5rem" }}>
                    <strong>ORM:</strong> Choose a database ORM integration — Drizzle or Prisma
                </li>
            </animated.ul>
            <animated.h2
                style={{
                    color: themeSprings.contrastPrimary,
                    fontSize: "2rem",
                    marginBottom: "1rem",
                    marginTop: "2rem"
                }}  
            >
                Try It Out
            </animated.h2>
            <animated.p
                style={{
                    color: themeSprings.contrastSecondary,
                    fontSize: "1.2rem",
                    lineHeight: "1.6",
                    marginBottom: "1.5rem"
                }}
                >
                    Try our interactive sandbox to explore the CLI experience directly in your browser.
            </animated.p>
            <animated.button
                style={{
                    backgroundColor: themeSprings.themePrimary,
                    color: themeSprings.contrastPrimary,
                    padding: "1rem 2rem",
                    fontSize: "1.1rem",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginBottom: "2rem"
                }}
                onClick={() => window.location.href = '/sandbox'}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 255, 255, 0.84)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                }}
            >
                Open Interactive Sandbox
            </animated.button>    
        </animated.div>
    );
}
