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
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import {
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
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
					<h1 style={h1Style(isMobileOrTablet)} id="quickstart">
						Quickstart
					</h1>
					<p style={paragraphLargeStyle}>
						Build a blog with Google OAuth, a database, typed props,
						and a type-safe API client — all in one codebase.
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
					<div
						style={{
							display: 'grid',
							gap: '0.75rem',
							gridTemplateColumns: isMobile
								? '1fr'
								: '1fr 1fr 1fr',
							marginTop: '1rem'
						}}
					>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									fontWeight: 600,
									marginBottom: '0.25rem'
								}}
							>
								<strong style={strongStyle}>Auth</strong>
							</p>
							<p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
								Google OAuth with session management
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									fontWeight: 600,
									marginBottom: '0.25rem'
								}}
							>
								<strong style={strongStyle}>SSR + DB</strong>
							</p>
							<p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
								Server-rendered pages with Drizzle types
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									fontWeight: 600,
									marginBottom: '0.25rem'
								}}
							>
								<strong style={strongStyle}>
									API + Client
								</strong>
							</p>
							<p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
								Validated endpoints with Eden Treaty
							</p>
						</animated.div>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="scaffold"
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
						ORM, Google OAuth, and Tailwind — dependencies
						installed, ready to go. The <code>--skip</code> flag
						uses defaults for everything else.{' '}
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
						level="h2"
						id="env"
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
							target="_blank"
							rel="noopener noreferrer"
							style={{
								color: primaryColor,
								textDecoration: 'underline'
							}}
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
						level="h2"
						id="schema"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						3. Define Your Schema
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Your database schema is the single source of truth for
						types. Drizzle infers <code>User</code> and{' '}
						<code>Post</code> directly from the table definitions —
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
						level="h2"
						id="config"
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
						level="h2"
						id="pages"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						5. Build the Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A public home page that shows posts and a login link,
						and a protected dashboard for authenticated users. Props
						are typed against your schema — change a column and
						TypeScript shows every page that needs updating:
					</p>
					<PrismPlus
						codeString={homePageComponent}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						The dashboard receives a <code>User</code> — guaranteed
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
						level="h2"
						id="server"
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
						level="h2"
						id="eden"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						7. Type-Safe Client with Eden Treaty
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Eden Treaty takes the type of your server and gives your
						client full autocomplete, compile-time route checking,
						and typed responses — including the auth status
						endpoint:
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
						level="h2"
						id="dev"
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
						Google&quot; to test the full OAuth flow — AbsoluteJS
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
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
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
