import { animated } from "@react-spring/web";
import { FeatureSection } from "./FeatureSection";
import { PrismPlus } from "../utils/PrismPlus";
import {DocLayout} from "./DocLAyout";
import { useTheme } from "../../hooks/useTheme";
import { ThemeProps } from "../../../types/types";

const helloWorldCode = `import { Elysia } from 'elysia'

new Elysia()
  .get('/', 'Hello Elysia')
  .get('/user/:id', ({ params: { id }}) => id)
  .post('/form', ({ body }) => body)
  .listen(3000)`;
export const Overview =  ({ themeSprings }: ThemeProps) => {
	return (
	<DocLayout title="Overview" themeSprings={themeSprings}>
		<animated.p
			style={{
				color: themeSprings.contrastSecondary.get(),
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
		<animated.p
			style={{
				color: themeSprings.contrastSecondary.get(),
				fontSize: "1.2rem",
				lineHeight: "1.5",
				marginBottom: "20px",
				maxWidth: "1200px",
				textAlign: "center"
			}}
		>
			Think of it as a complete toolkit for building web applications. You
			get the frontend, backend, database, authentication, and code
			quality tools, all pre-configured and working together from day one.
		</animated.p>
		<FeatureSection
			title="Why does AbsoluteJS exist?"
			description="Building modern web applications shouldn't require days of configuration before you write a single line of code. Most developers face the same frustrating cycle: choose from dozens of frameworks and tools, spend 2-3 days making them work together, manually sync types between database and frontend, implement OAuth from scratch for each provider, and wait endlessly for slow build tools."
			themeSprings={themeSprings}
		/>
		<animated.p
			style={{
				color: themeSprings.contrastSecondary.get(),
				fontSize: "1.2rem",
				lineHeight: "1.5",
				marginBottom: "2rem",
				maxWidth: "1200px"
			}}
		>
			AbsoluteJS was created to eliminate this friction. It gives you a
			complete, pre-configured fullstack framework where everything works
			together from the start. No choosing between 20 different tools. No
			configuration files. No manual type syncing. No building
			authentication from scratch. Just run one command and start building
			your actual application.
		</animated.p>
		<animated.h2
			style={{
				color: themeSprings.contrastPrimary.get(),
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
				color: themeSprings.contrastSecondary.get(),
				fontSize: "1.2rem",
				lineHeight: "1.5",
				marginBottom: "1rem",
				maxWidth: "1200px",
				textAlign: "center"
			}}
		>
			Here's a simple hello world in Elysia, the backend framework that
			powers AbsoluteJS:
	</animated.p>
		<PrismPlus
			language="javascript"
			codeString={helloWorldCode}
			themeSprings={themeSprings}
			showLineNumbers={false}
		/>
	<animated.h2
		style={{
			color: themeSprings.contrastPrimary.get(),
			fontSize: "2.5rem",
			marginBottom: "2rem",
			textAlign: "center",
			marginTop: "3rem"
		}}
	>
		Key Features
	</animated.h2>
	<FeatureSection
		title="1. Multi-Framework Support"
		description="Unlike frameworks that lock you into React-only or Vue-only, AbsoluteJS supports all major frameworks simultaneously. All frameworks share the same Elysia backend, same database, same authentication system, and same deployment. This lets you use the best tool for each part of your app and helps you or your team try new frameworks without rebuilding everything."
		themeSprings={themeSprings}
	/>
	<FeatureSection
		title="2. Built-in Authentication with 66 Providers"
		description="Setting up OAuth manually usually takes weeks, but with AbsoluteJS it takes seconds. We've already integrated 66 OAuth providers covering social media, development tools, gaming platforms, finance, and enterprise solutions."
		themeSprings={themeSprings}
		items={[
			'API credentials added automatically',
			'Enhanced OAuth security',
			'OpenID Connect support',
			'Token refresh happens automatically before expiration',
			'Secure cookies for session management',
			'User profile fetching'
		]}
	/>
	<FeatureSection
		title="3. Database Flexibility"
		description="AbsoluteJS supports PostgreSQL, MySQL, SQLite, and MongoDB with built-in drivers:"
		themeSprings={themeSprings}
		items={[
			'PostgreSQL: Most recommended - has the most features and is more reliable',
			'MySQL/MariaDB: More widely compatible',
			'SQLite: No server needed, perfect for small apps',
			'MongoDB: Better for document databases'
		]}
	/>
	<FeatureSection
		title="4. End-to-End Type Safety"
		description="This is what sets AbsoluteJS apart. Other frameworks have types for database, backend, and frontend, but they don't connect. Developers manually copy types between files, and if someone changes one without updating the others, errors occur. With AbsoluteJS, the type flow happens automatically - when a change happens, other types update automatically so the flow never breaks."
		themeSprings={themeSprings}
		items={[
			'Refactor with confidence',
			'Autocomplete everywhere',
			'Catch errors before runtime',
			'No manual type syncing'
		]}
	/>
	<FeatureSection
		title="5. Code Quality Built-In"
		description="Writing good code is hard. Following best practices is harder. AbsoluteJS helps you write better code automatically with automatic formatting on save, consistent style across the team, and no manual formatting."
		themeSprings={themeSprings}
		items={[	
			'Learn best practices - teaches you what good code looks like',
			'Catch bugs early - prevent common errors',
			'Consistent codebase across the entire team',
			'Better readability for everyone'
		]}
	/>
	</DocLayout>
	);
};
