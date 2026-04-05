import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	configWithDb,
	createCommand,
	dashboardComponent,
	devCommand,
	edenTreatySetup,
	edenUsage,
	envSetup,
	homePageComponent,
	runDev,
	schemaSetup,
	serverWithAuth
} from '../../../data/documentation/quickstartDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { QuickstartFeatureCards } from './QuickstartFeatureCards';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { primaryColor } from '../../../styles/colors';

const tocItems: TocItem[] = [
	{ href: '#scaffold', label: '1. Scaffold' },
	{ href: '#env', label: '2. Environment' },
	{ href: '#schema', label: '3. Schema' },
	{ href: '#config', label: '4. Config' },
	{ href: '#pages', label: '5. Pages' },
	{ href: '#server', label: '6. Server + Auth' },
	{ href: '#eden', label: '7. Type-Safe Client' },
	{ href: '#dev', label: '8. Run It' }
];

export const QuickstartView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
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
					<h1 id="quickstart" style={h1Style(isMobileOrTablet)}>
						Quickstart
					</h1>
					<p style={paragraphLargeStyle}>
						Build a blog with Google OAuth, a database, typed props,
						and a type-safe API client, all in one codebase.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<p style={paragraphSpacedStyle}>
						This guide walks through building a real app. By the end
						you&apos;ll have Google authentication, a users table,
						server-rendered pages with typed props, a protected
						dashboard, a validated JSON API, and a client
						that&apos;s fully typed against your server.
					</p>
					<QuickstartFeatureCards themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="scaffold"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						1. Scaffold the Project
					</AnchorHeading>
					<PrismPlus
						codeString={createCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1rem' }}>
						This sets up a React project with PostgreSQL, Drizzle
						ORM, Google OAuth, and Tailwind dependencies installed,
						ready to go. The <code>--skip</code> flag uses defaults
						for everything else.{' '}
						<animated.span
							onClick={() => {
								onNavigate('create-absolutejs');
								window.scrollTo({ behavior: 'smooth', top: 0 });
							}}
							style={{
								color: primaryColor,
								cursor: 'pointer',
								fontWeight: 500,
								textDecoration: 'underline'
							}}
						>
							See all CLI options
						</animated.span>
						.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="env"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						2. Set Up Environment Variables
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add your database URL and Google OAuth credentials. You
						can get Google credentials from the{' '}
						<a
							href="https://console.cloud.google.com/apis/credentials"
							rel="noopener noreferrer"
							style={{
								color: primaryColor,
								textDecoration: 'underline'
							}}
							target="_blank"
						>
							Google Cloud Console
						</a>
						:
					</p>
					<PrismPlus
						codeString={envSetup}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="schema"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						3. Define Your Schema
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Your database schema is the single source of truth for
						types. Drizzle infers <code>User</code> and{' '}
						<code>Post</code> directly from the table definitions :
						no codegen, no drift:
					</p>
					<PrismPlus
						codeString={schemaSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="config"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						4. Configure the Build
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Tell AbsoluteJS where your frontend code lives:
					</p>
					<PrismPlus
						codeString={configWithDb}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						5. Build the Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A public home page that shows posts and a login link,
						and a protected dashboard for authenticated users. Props
						are typed against your schema; change a column and
						TypeScript shows every page that needs updating:
					</p>
					<PrismPlus
						codeString={homePageComponent}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						The dashboard receives a <code>User</code>, guaranteed
						by the <code>protectRoute</code> guard on the server:
					</p>
					<PrismPlus
						codeString={dashboardComponent}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="server"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						6. Wire Up the Server with Auth
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The server brings it all together. One{' '}
						<code>.use(absoluteAuth())</code> call adds Google OAuth
						with automatic user creation, session management, and a{' '}
						<code>protectRoute</code> guard. The <code>App</code>{' '}
						type export powers the type-safe client:
					</p>
					<PrismPlus
						codeString={serverWithAuth}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="eden"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						7. Type-Safe Client with Eden Treaty
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Eden Treaty takes the type of your server and gives your
						client full autocomplete, compile-time route checking,
						and typed responses, including the auth status endpoint:
					</p>
					<PrismPlus
						codeString={edenTreatySetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						Every API call is type-safe:
					</p>
					<PrismPlus
						codeString={edenUsage}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="dev"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						8. Run It
					</AnchorHeading>
					<PrismPlus
						codeString={runDev}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1rem' }}>
						Or use the AbsoluteJS CLI directly:
					</p>
					<PrismPlus
						codeString={devCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1rem' }}>
						Open http://localhost:3000. Click &quot;Sign in with
						Google&quot; to test the full OAuth flow. AbsoluteJS
						handles the redirect, callback, token exchange, and
						session creation automatically. Edit any component and
						HMR updates it instantly with your form inputs and
						scroll position preserved.
					</p>
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
