import { animated } from "@react-spring/web";
import { PrismPlus } from "../utils/PrismPlus";
import { DocLayout } from "./DocLayout";
import { ThemeProps } from "../../../types/types";

const helloWorldCode = `import { Elysia } from 'elysia'

new Elysia()
  .get('/', 'Hello Elysia')
  .get('/user/:id', ({ params: { id }}) => id)
  .post('/form', ({ body }) => body)
  .listen(3000)`;

export const Overview = ({ themeSprings }: ThemeProps) => {
	return (
		<DocLayout title="Overview" themeSprings={themeSprings}>
			<animated.div
				style={{
					padding: "2rem",
					width: "100%",
					margin: "0 auto",
					maxWidth: "1200px"
				}}
			>
				<animated.p
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: "1.2rem",
						lineHeight: "1.5",
						marginBottom: "20px",
						maxWidth: "1200px",
						textAlign: "center"
					}}
				>
					AbsoluteJS brings together every aspect of modern web development:
					user interfaces, data handling, code quality, authentication, and
					testing. Instead of installing 20 different tools and spending days
					connecting them together, AbsoluteJS gives you everything you need
					in one package.
				</animated.p>
				<animated.section
					style={{
						marginBottom: "2rem",
						maxWidth: "1200px",
						width: "100%"
					}}
				>
					<animated.h2
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: "2rem",
							marginBottom: '1rem'
						}}
					>
						Why does AbsoluteJS exist?
					</animated.h2>
					<animated.p
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: "1.2rem",
							lineHeight: "1.5",
							marginBottom: '0'
						}}
					>
						Building modern web applications shouldn't require days of configuration before you write a single line of code. Most developers face the same frustrating cycle: choose from dozens of frameworks and tools, spend 2-3 days making them work together, manually sync types between database and frontend, implement Authentication from scratch for each provider, and deal with complex build configurations. AbsoluteJS solves this by using Bun as its runtime and package manager, giving you instant installs and blazing-fast performance out of the box.
					</animated.p>
				</animated.section>

				<animated.p
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: "1.2rem",
						lineHeight: "1.5",
						marginBottom: "2rem",
						maxWidth: "1200px"
					}}
				>
					AbsoluteJS was created to eliminate this friction. It provides a
					complete, pre-configured fullstack framework where everything works
					together from the start. Choose from multiple frameworks working in
					harmony. Enjoy sensible defaults with optional configuration. Experience
					automatic type syncing across your entire stack. Get authentication
					ready to use with 66 providers. Simply run one command and start
					building your actual application.
				</animated.p>

				<PrismPlus
					language="bash"
					codeString="bun create absolutejs my-app"
					themeSprings={themeSprings}
					showLineNumbers={false}
				/>

				<animated.p
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: "1.2rem",
						lineHeight: "1.5",
						marginBottom: "2rem",
						marginTop: "1rem",
						maxWidth: "1200px",
						textAlign: "center"
					}}
				>
					That's it. Your fullstack application is ready to go.
				</animated.p>

				<animated.h2
					style={{
						color: themeSprings.contrastPrimary,
						fontSize: "2rem",
						marginBottom: "1rem",
						textAlign: "center",
						marginTop: "2rem"
					}}
				>
					Simple Example
				</animated.h2>

				<animated.p
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: "1.2rem",
						lineHeight: "1.5",
						marginBottom: "1rem",
						maxWidth: "1200px",
						textAlign: "center"
					}}
				>
					Here's a complete fullstack application built with AbsoluteJS. This example shows 
					how easy it is to create a React frontend with a type safe Elysia backend.
				</animated.p>

				<PrismPlus
					language="typescript"
					codeString={`import { build, getEnvVar, handleReactPageRequest } from '@absolutejs/absolute';
import { Home } from '../frontend/pages/Home';
import { Elysia } from 'elysia';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { schema } from '../../db/schema';

const manifest = await build({
    reactDirectory: 'src/frontend'
});

const sql = neon(getEnvVar('DATABASE_URL'));
const db = drizzle(sql, { schema });

const server = new Elysia()
    .get('/', () => handleReactPageRequest(Home, manifest['HomeIndex']))
    .get('/api/users/:subject', 
        async ({ status, params: { subject } }) => {
            try {
                const [user] = await db.select()
                    .from(schema.users)
                    .where(schema.users.auth_sub.eq(subject));
                return user === undefined 
                    ? status(404, 'User not found') 
                    : user;
            } catch (error) {
                return status(500, 'Internal Server Error');
            }
        })
    .listen(3000);

export type Server = typeof server;`}
					themeSprings={themeSprings}
					showLineNumbers={false}
				/>

				<animated.div
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: "1.1rem",
						lineHeight: "1.6",
						marginTop: "2rem",
						marginBottom: "2rem",
						maxWidth: "1200px"
					}}
				>
					This example demonstrates the power of AbsoluteJS in just a few lines of code. The build function automatically compiles your React 
					components and generates a manifest for server-side rendering. Drizzle ORM connects to your database with full type safety, ensuring your queries are validated at compile time. 
					The handleReactPageRequest function seamlessly serves your React page, while the API route provides type-safe endpoints with automatic validation and error handling. 
					By exporting the server type, your frontend gets complete autocomplete and type checking when making API calls. All of this works together out of the box with zero configuration required.
				</animated.div>

				<animated.h2
					style={{
						color: themeSprings.contrastPrimary,
						fontSize: "2.5rem",
						marginBottom: "2rem",
						textAlign: "center",
						marginTop: "3rem"
					}}
				>
					Key Features
				</animated.h2>

				<animated.section
					style={{
						marginBottom: "2rem",
						maxWidth: "1200px",
						width: "100%"
					}}
				>
					<animated.h2
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: "2rem",
							marginBottom: '1rem'
						}}
					>
						1. Multi-Framework Support
					</animated.h2>
					<animated.p
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: "1.2rem",
							lineHeight: "1.5",
							marginBottom: '0'
						}}
					>
						Unlike frameworks that lock you into one framework, AbsoluteJS supports all major frameworks simultaneously. All frameworks share the same Elysia backend, same database, same authentication system, and same deployment. 
						This lets you use the best tool for each part of your app and helps you or your team try new frameworks without rebuilding everything.
					</animated.p>
				</animated.section>

				<animated.section
					style={{
						marginBottom: "2rem",
						maxWidth: "1200px",
						width: "100%"
					}}
				>
					<animated.h2
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: "2rem",
							marginBottom: '1rem'
						}}
					>
						2. Built-in Authentication with 66 Providers
					</animated.h2>
					<animated.p
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: "1.2rem",
							lineHeight: "1.5",
							marginBottom: '1rem'
						}}
					>
						Setting up OAuth manually usually takes weeks, but with AbsoluteJS it takes seconds. We've already integrated 66 OAuth providers covering social media, development tools, gaming platforms, finance, and enterprise solutions.
					</animated.p>
					<animated.ul
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: "1rem",
							lineHeight: "1.6",
							marginLeft: "2rem"
						}}
					>
						<li style={{ marginBottom: "0.5rem" }}>Elegible providers ID</li>
						<li style={{ marginBottom: "0.5rem" }}>OpenID Connect support</li>
						<li style={{ marginBottom: "0.5rem" }}>Token refresh happens automatically before expiration</li>
						<li style={{ marginBottom: "0.5rem" }}>Secure cookies for session management</li>
						<li style={{ marginBottom: "0.5rem" }}>User profile fetching</li>
					</animated.ul>
				</animated.section>

				<animated.section
					style={{
						marginBottom: "2rem",
						maxWidth: "1200px",
						width: "100%"
					}}
				>
					<animated.h2
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: "2rem",
							marginBottom: '1rem'
						}}
					>
						3. Database Flexibility
					</animated.h2>
					<animated.p
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: "1.2rem",
							lineHeight: "1.5",
							marginBottom: '1rem'
						}}
					>
						AbsoluteJS supports a wide range of databases with built-in drivers: PostgreSQL, MySQL, MariaDB, SQLite, MongoDB, CockroachDB, SQL Server, and Gel. 
						Choose the database that best fits your project's needs without worrying about configuration.
					</animated.p>
					<animated.ul
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: "1rem",
							lineHeight: "1.6",
							marginLeft: "2rem"
						}}
					>
						<li style={{ marginBottom: "0.5rem" }}>PostgreSQL: Most recommended - has the most features and is highly reliable</li>
						<li style={{ marginBottom: "0.5rem" }}>MySQL/MariaDB: Widely compatible and battle-tested</li>
						<li style={{ marginBottom: "0.5rem" }}>SQLite: No server needed, perfect for small apps and local development</li>
						<li style={{ marginBottom: "0.5rem" }}>MongoDB: Ideal for document-based data structures</li>
						<li style={{ marginBottom: "0.5rem" }}>CockroachDB: Distributed SQL database for global scale</li>
						<li style={{ marginBottom: "0.5rem" }}>SQL Server: Enterprise-grade Microsoft database</li>
						<li style={{ marginBottom: "0.5rem" }}>Gel: Modern database solution with advanced features</li>
					</animated.ul>
				</animated.section>

				<animated.section
					style={{
						marginBottom: "2rem",
						maxWidth: "1200px",
						width: "100%"
					}}
				>
					<animated.h2
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: "2rem",
							marginBottom: '1rem'
						}}
					>
						4. End-to-End Type Safety
					</animated.h2>
					<animated.p
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: "1.2rem",
							lineHeight: "1.5",
							marginBottom: '1rem'
						}}
					>
						End-to-end type safety is what sets AbsoluteJS apart. Other frameworks have types for database, backend, and frontend, but they exist in isolation. Developers manually copy types between layers, leading to sync issues and runtime errors. AbsoluteJS connects these layers through Eden Treaty and TypeScript's type inference. Your database schema types flow into your backend routes via Drizzle ORM, then Elysia infers route types automatically. Finally, Eden Treaty consumes your exported server type to provide fully typed API calls in your frontend.
					</animated.p>
					<animated.ul
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: "1rem",
							lineHeight: "1.6",
							marginLeft: "2rem"
						}}
					>
						<li style={{ marginBottom: "0.5rem" }}>Define your schema once with Drizzle ORM</li>
						<li style={{ marginBottom: "0.5rem" }}>Export your server type from your backend</li>
						<li style={{ marginBottom: "0.5rem" }}>Import the server type into Eden Treaty</li>
						<li style={{ marginBottom: "0.5rem" }}>Get complete autocomplete and type checking across your entire stack</li>
						<li style={{ marginBottom: "0.5rem" }}>Catch type mismatches at compile time, not runtime</li>
						<li style={{ marginBottom: "0.5rem" }}>Refactor with confidence knowing TypeScript will catch breaking changes</li>
					</animated.ul>
				</animated.section>

				<animated.section
					style={{
						marginBottom: "2rem",
						maxWidth: "1200px",
						width: "100%"
					}}
				>
					<animated.h2
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: "2rem",
							marginBottom: '1rem'
						}}
					>
						5. Code Quality Built-In
					</animated.h2>
					<animated.p
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: "1.2rem",
							lineHeight: "1.5",
							marginBottom: '1rem'
						}}
					>
						Writing good code is hard. Following best practices is harder. AbsoluteJS helps you write better code automatically with automatic formatting on save, consistent style across the team, and no manual formatting.
					</animated.p>
					<animated.ul
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: "1rem",
							lineHeight: "1.6",
							marginLeft: "2rem"
						}}
					>
						<li style={{ marginBottom: "0.5rem" }}>Custom ESLint rules for clean, readable, and type-safe code</li>
						<li style={{ marginBottom: "0.5rem" }}>Pre-configured formatters for consistent code style</li>
						<li style={{ marginBottom: "0.5rem" }}>Catch style issues and potential errors before they reach production</li>
						<li style={{ marginBottom: "0.5rem" }}>All configuration files remain fully editable for customization</li>
						<li style={{ marginBottom: "0.5rem" }}>Accelerate approvals in code reviews with automated checks</li>
					</animated.ul>
				</animated.section>
			</animated.div>
		</DocLayout>
	);
};
