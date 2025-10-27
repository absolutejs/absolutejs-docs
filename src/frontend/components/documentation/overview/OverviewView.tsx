import { animated } from "@react-spring/web";
import { providerOptions } from "@absolutejs/auth";
import { PrismPlus } from "../../utils/PrismPlus";
import { ThemeProps } from "../../../../types/springTypes";
import { h1Style, headingStyle, sectionStyle, paragraphStyle, listStyle, listItemStyle, paragraphLargeStyle, paragraphSpacedStyle, mainContentStyle } from "../../../styles/docsStyles";
import { TableOfContents, TocItem } from "../../utils/TableOfContents";

const tocItems: TocItem[] = [
  { label: "Why AbsoluteJS?", href: "#why-absolutejs" },
  { label: "Simple Example", href: "#simple-example" },
  { label: "Multi-Framework Support", href: "#multi-framework-support" },
  { label: "Built-in Authentication", href: "#built-in-authentication" },
  { label: "Database Flexibility", href: "#database-flexibility" },
  { label: "End-to-End Type Safety", href: "#end-to-end-type-safety" },
  { label: "Code Quality Built-In", href: "#code-quality-built-in" }
];

export const Overview = ({ themeSprings }: ThemeProps) => (
  <div
    style={{
      display: "flex",
      flex: 1,
      position: "relative",
      overflowX: "hidden",
      overflowY: "auto"
    }}
  >
    <div style={mainContentStyle}>
      <h1 style={h1Style} >
        Overview
      </h1>
      <p style={paragraphLargeStyle}>
        AbsoluteJS brings together every aspect of modern web development:
        user interfaces, data handling, code quality, authentication, and
        testing. AbsoluteJS preconfigurates everything you need into one,
        and ready to go package.
      </p>

      <section style={sectionStyle}>
        <animated.h2 style={headingStyle(themeSprings)} id="why-absolutejs">
          Why AbsoluteJS?
        </animated.h2>
        <p style={paragraphSpacedStyle}>
          Building modern web applications shouldn't require days of configuration before you write a single line of code. Most developers face the same frustrating cycle: choose from dozens of frameworks and tools, spend 2-3 days making them work together, manually sync types between database and frontend, implement Authentication from scratch for each provider, and deal with complex build configurations. AbsoluteJS solves this by using Bun as its runtime and package manager, giving you instant installs and blazing-fast performance out of the box.
        </p>

        <p style={paragraphSpacedStyle}>
          AbsoluteJS was created to eliminate this friction. It provides a
          complete, pre-configured fullstack framework where everything works
          together from the start. Choose from multiple frameworks working in
          harmony. Enjoy sensible defaults with optional configuration. Experience
          automatic type syncing across your entire stack. Get authentication
          ready to use with {providerOptions.length} providers. Simply run one command and start
          building your actual application.
        </p>

        <PrismPlus
          language="bash"
          codeString="bun create absolutejs my-app"
          themeSprings={themeSprings}
          showLineNumbers={false}
        />

        <p style={paragraphStyle}>
          That's it. Your fullstack application is ready to go.
        </p>
      </section>

      <section style={sectionStyle}>
        <animated.h2 style={headingStyle(themeSprings)} id="simple-example">
          Simple Example
        </animated.h2>

        <p style={paragraphStyle}>
          Here's a complete fullstack application built with AbsoluteJS. This example shows
          how easy it is to create a React frontend with a type safe Elysia backend.
        </p>

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

        <p style={paragraphStyle}>
          This example demonstrates the power of AbsoluteJS in just a few lines of code. The build function automatically compiles your React
          components and generates a manifest for server-side rendering. Drizzle ORM connects to your database with full type safety, ensuring your queries are validated at compile time.
          The handleReactPageRequest function seamlessly serves your React page, while the API route provides type-safe endpoints with automatic validation and error handling.
          By exporting the server type, your frontend gets complete autocomplete and type checking when making API calls. All of this works together out of the box with zero configuration required.
        </p>
      </section>

      <section style={sectionStyle}>
        <animated.h2 style={headingStyle(themeSprings)} id="key-features">
          Key Features
        </animated.h2>

        <section style={sectionStyle}>
          <animated.h2 style={headingStyle(themeSprings, true)} id="multi-framework-support">
            Multi-Framework Support
          </animated.h2>
          <p style={paragraphStyle}>
            Unlike frameworks that lock you into one framework, AbsoluteJS supports all major frameworks simultaneously. All frameworks share the same Elysia backend, same database, same authentication system, and same deployment.
            This lets you use the best tool for each part of your app and helps you or your team try new frameworks without rebuilding everything.
          </p>
          </section>

          <section style={sectionStyle}>
            <animated.h2 style={headingStyle(themeSprings, true)} id="built-in-authentication">
              Built-in Authentication with {providerOptions.length} Providers
            </animated.h2>
            <p style={paragraphStyle}>
              Setting up Authentication manually usually takes weeks, but with AbsoluteJS it takes seconds. We've already integrated {providerOptions.length} authentication providers covering social media, development tools, gaming platforms, finance, and enterprise solutions.
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>
                Eligible providers ID
              </li>
              <li style={listItemStyle}>
                OpenID Connect support
              </li>
              <li style={listItemStyle}>
                Token refresh happens automatically before expiration
              </li>
              <li style={listItemStyle}>
                Secure cookies for session management
              </li>
              <li style={listItemStyle}>
                User profile fetching
              </li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <animated.h2 style={headingStyle(themeSprings, true)} id="database-flexibility">
              Database Flexibility
            </animated.h2>
            <p style={paragraphStyle}>
              AbsoluteJS supports a wide range of databases with built-in drivers: PostgreSQL, MySQL, MariaDB, SQLite, MongoDB, CockroachDB, SQL Server, and Gel.
              Choose the database that best fits your project's needs without worrying about configuration.
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>
                PostgreSQL: Most recommended - has the most features and is highly reliable
              </li>
              <li style={listItemStyle}>
                MySQL/MariaDB: Widely compatible and battle-tested
              </li>
              <li style={listItemStyle}>
                SQLite: No server needed, perfect for small apps and local development
              </li>
              <li style={listItemStyle}>
                MongoDB: Ideal for document-based data structures
              </li>
              <li style={listItemStyle}>
                CockroachDB: Distributed SQL database for global scale
              </li>
              <li style={listItemStyle}>
                SQL Server: Enterprise-grade Microsoft database
              </li>
              <li style={listItemStyle}>
                Gel: Modern database solution with advanced features
              </li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <animated.h2 style={headingStyle(themeSprings, true)} id="end-to-end-type-safety">
              End-to-End Type Safety
            </animated.h2>
            <p style={paragraphStyle}>
              End-to-end type safety is what sets AbsoluteJS apart. Other frameworks have types for database, backend, and frontend, but they exist in isolation. Developers manually copy types between layers, leading to sync issues and runtime errors. AbsoluteJS connects these layers through Eden Treaty and TypeScript's type inference. Your database schema types flow into your backend routes via Drizzle ORM, then Elysia infers route types automatically. Finally, Eden Treaty consumes your exported server type to provide fully typed API calls in your frontend.
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>
                Define your schema once with Drizzle ORM
              </li>
              <li style={listItemStyle}>
                Export your server type from your backend
              </li>
              <li style={listItemStyle}>
                Import the server type into Eden Treaty
              </li>
              <li style={listItemStyle}>
                Get complete autocomplete and type checking across your entire stack
              </li>
              <li style={listItemStyle}>
                Catch type mismatches at compile time, not runtime
              </li>
              <li style={listItemStyle}>
                Refactor with confidence knowing TypeScript will catch breaking changes
              </li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <animated.h2 style={headingStyle(themeSprings, true)} id="code-quality-built-in">
              Code Quality Built-In
            </animated.h2>
            <p style={paragraphStyle}>
              Writing good code is hard. Following best practices is harder. AbsoluteJS streamlines this process with preconfigured formatting and linting setups you can enable through simple commands—keeping your code consistent across every file and team member
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>
                Custom ESLint rules for clean, readable, and type-safe code
              </li>
              <li style={listItemStyle}>
                Pre-configured formatters for consistent code style
              </li>
              <li style={listItemStyle}>
                Catch style issues and potential errors before they reach production
              </li>
              <li style={listItemStyle}>
                All configuration files remain fully editable for customization
              </li>
              <li style={listItemStyle}>
                Accelerate approvals in code reviews with automated checks
              </li>
            </ul>
          </section>
        </section>
    </div>
    <TableOfContents themeSprings={themeSprings} items={tocItems} />
  </div>
);
