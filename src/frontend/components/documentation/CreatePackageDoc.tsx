import { animated } from "@react-spring/web";
import { PrismPlus } from "../utils/PrismPlus";
import { ThemeProps } from "../../../types/types";
import { DocLayout } from "./DocLAyout";

export const CreatePackageDoc = ({ themeSprings }: ThemeProps) => {
    return (
        <DocLayout title="Create (Scaffolding)" themeSprings={themeSprings}>
        <animated.p
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.2rem",
                lineHeight: "1.6",
                marginBottom: "2rem"
            }}
        >
            <strong>Create</strong> is AbsoluteJS's project scaffolding tool that
				helps you quickly bootstrap new applications. Instead of manually
				creating folders, installing packages, and configuring files, Create
				handles all setup through a single command with an interactive CLI
				experience.
        </animated.p>
        <animated.h2
            style={{
                color: themeSprings.contrastPrimary.get(),
                fontSize: "2rem",
                marginBottom: "1rem",
                marginTop: "2rem"
            }}  
        >
            Quick Start
        </animated.h2>
        <animated.p
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.2rem",
                lineHeight: "1.6",
                marginBottom: "1rem",
            }}
        >
            Get started with a new AbsoluteJS project in seconds:
        </animated.p>
        <PrismPlus
            language="bash"
            codeString={"bun create avsolutejs my-app"}
            themeSprings={themeSprings}
            showLineNumbers={false}
        />
        <animated.p
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.2rem",
                lineHeight: "1.6",
                marginBottom: "2rem"
            }}
        >
            The tool will guide you through an interactive setup, asking about your
			preferred frontend framework, database, authentication provider, and
			more. Once complete, you'll have a fully configured project ready to
			run.
        </animated.p>
        <animated.h2
            style={{
                color: themeSprings.contrastPrimary.get(),
                fontSize: "2rem",
                marginBottom: "1rem",
                marginTop: "2rem"
            }}  
        >
            What You Get
        </animated.h2>
        <animated.p
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.2rem",
                lineHeight: "1.6",
                marginBottom: "1rem",
            }}
        >
            After running Create, your project will include:
        </animated.p>
        <animated.ul
            style={{
                color: themeSprings.contrastSecondary.get(),
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
                <strong>Dev scripts:</strong> Commands like <code>bun run dev</code>{' '}
				and <code>bun run build</code>
            </li>
            <li style ={{ marginBottom: "0.5rem" }}>
                <strong>Database setup:</strong> Connection files and schema (if
				selected)
            </li>
        </animated.ul>
        <animated.p
            style={{
                color: themeSprings.contrastSecondary.get(),
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
                color: themeSprings.contrastPrimary.get(),
                fontSize: "2rem",
                marginBottom: "1rem",
                marginTop: "2rem"
            }}  
        >
            Command Flags
        </animated.h2>
        <animated.p
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.2rem",
                lineHeight: "1.6",
                marginBottom: "1rem",
            }}
        >
            Customize your setup with command-line flags to skip prompts or
			pre-configure options:
        </animated.p>
                <PrismPlus
                    codeString={`# Skip interactive prompts and use defaults
bun create absolutejs my-app --skip
# Choose your frontend framework
bun create absolutejs my-app --react
bun create absolutejs my-app --vue
bun create absolutejs my-app --svelte
# Set up database
bun create absolutejs my-app --db postgres
# Initialize git repository
bun create absolutejs my-app --git
# Install dependencies immediately
bun create absolutejs my-app --install`}
                    language="bash"
                    themeSprings={themeSprings}
                    showLineNumbers={false}
                />
        <animated.h2
            style={{
                color: themeSprings.contrastPrimary.get(),
                fontSize: "2rem",
                marginBottom: "1rem",
                marginTop: "2rem"
            }}  
        >
            Configuration Options
        </animated.h2>
        <animated.h3
            style={{
                color: themeSprings.contrastPrimary.get(),
                fontSize: "1.5rem",
                marginBottom: "0.75rem",
                marginTop: "1.5rem"
            }}  
        >
            Frontend Frameworks
        </animated.h3>
        <animated.ul
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.2rem",
                lineHeight: "1.8",
                marginBottom: "1.5rem",
                paddingLeft: "2rem"
            }}
        >
            <li style ={{ marginBottom: "0.5rem" }}>
                React, Vue, Svelte, Angular, or plain HTML.
            </li>
            <li style ={{ marginBottom: "0.5rem" }}>
                Multiple frameworks can be selected for multi-page applications.
            </li>
            <li style ={{ marginBottom: "0.5rem" }}>
                Each framework gets its own directory in the project structure.
            </li>
        </animated.ul>
        <animated.h3
            style={{
                fontSize: '1.5rem',
                color: themeSprings.contrastPrimary.get(),
                marginBottom: '0.75rem',
                marginTop: '1.5rem'
            }}
        >
            Database Options
        </animated.h3>
        <animated.ul
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.2rem",
                lineHeight: "1.8",
                marginBottom: "1.5rem",
                paddingLeft: "2rem"
            }}
        >
            <li style ={{ marginBottom: "0.5rem" }}>
                PostgreSQL, MySQL, SQLite, or MongoDB.
            </li>
            <li style ={{ marginBottom: "0.5rem" }}>
                Connect to hosted services like Neon
            </li>
            <li style ={{ marginBottom: "0.5rem" }}>
                Automatic Docker setup for local development databases.
            </li>
        </animated.ul>
        <animated.h3
            style={{
                fontSize: '1.5rem',
                color: themeSprings.contrastPrimary.get(),
                marginBottom: '0.75rem',
                marginTop: '1.5rem'
            }}
        >
            Additional Features
        </animated.h3>
        <animated.ul
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.5rem",
                marginBottom: "0.75rem",
                marginTop: "1.5rem"
            }}
        >
            <li style ={{ marginBottom: "0.5rem" }}>
                <strong>CSS Framework:</strong> Optional Tailwind CSS configuration
            </li>
            <li style ={{ marginBottom: "0.5rem" }}>
                <strong>Authentication:</strong> Pre-configured Absolute-Auth setup
            </li>
            <li style ={{ marginBottom: "0.5rem" }}>
                <strong>ORM:</strong> Database ORM integration (Drizzle or Prisma)
            </li>
            <li style ={{ marginBottom: "0.5rem" }}>
                <strong>Plugins:</strong> Aditional AbsoluteJS ecosystem plugins
            </li>
        </animated.ul>
        <animated.h2
            style={{
                color: themeSprings.contrastPrimary.get(),
                fontSize: "2rem",
                marginBottom: "1rem",
                marginTop: "2rem"
            }}  
        >
            Why Use Create?
        </animated.h2>
        <animated.p
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.2rem",
                lineHeight: "1.6",
                marginBottom: "1rem"
            }}
        >
            Withouth Create, stating a new project requires significant manual work:
        </animated.p>
        <animated.ul
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.2rem",
                lineHeight: "1.8",
                marginBottom: "1.5rem",
                paddingLeft: "2rem"
            }}
        >
            <li style ={{ marginBottom: "0.5rem" }}>
                Creating the folder structure
            </li>
            <li style ={{ marginBottom: "0.5rem" }}>
                Installing and configuring packages
            </li>
            <li style ={{ marginBottom: "0.5rem" }}>
                Setting up TypeScript, ESLint, and Bun configurations
            </li>
            <li style ={{ marginBottom: "0.5rem" }}>
                Configuring build tools
            </li>
            <li style ={{ marginBottom: "0.5rem" }}>
                Writing boilerplate code
            </li>
        </animated.ul>
        <animated.p
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.2rem",
                lineHeight: "1.6",
                marginBottom: "2rem"
            }}
        >
            Create automates this entire process, letting you focus on building your
			application instead of setting up infrastructure. The result is a
			production-ready project structure following AbsoluteJS best practices,
			ready to run in minutes instead of hours.
        </animated.p>
        <animated.h2
            style={{
                color: themeSprings.contrastPrimary.get(),
                fontSize: "2rem",
                marginBottom: "1rem",
                marginTop: "2rem"
            }}  
        >
            Complete Example
        </animated.h2>
        <animated.p
            style={{
                color: themeSprings.contrastSecondary.get(),
                fontSize: "1.2rem",
                lineHeight: "1.6",
                marginBottom: "1rem"
            }}
            >
                Here's a full example creating a React application
                with PostgreSQL and authentication:
            </animated.p>
            <PrismPlus
                language="bash"
                codeString={`bun create absolutejs my-app \\ 
                    --react \\ 
                    --db postgres \\
                    --db-host neon \\
                    --orm drizzle \\ 
                    --auth google\\
                    --tailwind \\ 
                    --git \\ 
                    --install \\
#Navigate and start development
cd my-app
bun run dev
#Your app is now running at http://localhost:3000`}
                themeSprings={themeSprings}
                showLineNumbers={false}
            />
            <animated.p
                style={{
                    color: themeSprings.contrastSecondary.get(),
                    fontSize: "1.2rem",
                    lineHeight: "1.6",
                    marginBottom: "1rem",
                    marginTop: "2rem"
                }}
            >
                For more information about available options, run:
            </animated.p>
            <PrismPlus
                language="bash"
                codeString="bun create absolutejs --help"
                themeSprings={themeSprings}
                showLineNumbers={false}
            />
    </DocLayout>
    );
}