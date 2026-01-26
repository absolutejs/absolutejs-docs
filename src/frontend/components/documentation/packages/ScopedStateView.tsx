import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	scopedStateAccess,
	scopedStateHtmxExample,
	scopedStateHtmxHtml,
	scopedStateInstallation,
	scopedStatePreserve,
	scopedStateReset,
	scopedStateSetup
} from '../../../data/documentation/scopedStateDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle,
	githubButtonStyle
} from '../../../styles/docsStyles';
import {
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#why-scoped-state', label: 'Why Scoped State?' },
	{ href: '#installation', label: 'Installation' },
	{ href: '#getting-started', label: 'Getting Started' },
	{ href: '#accessing-state', label: 'Accessing State' },
	{ href: '#preserve-option', label: 'Preserve Option' },
	{ href: '#resetting-state', label: 'Resetting State' },
	{ href: '#htmx-integration', label: 'HTMX Integration' },
	{ href: '#how-it-works', label: 'How It Works' }
];

export const ScopedStateView = ({
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
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="scoped-state">
						Elysia Scoped State
					</h1>
					<p style={paragraphLargeStyle}>
						An Elysia plugin for per-user session state management.
						Store and retrieve data tied to individual users across
						requests with automatic session handling.
					</p>
					<animated.a
						href="https://github.com/alexkahndev/elysia-scoped-state"
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
						id="why-scoped-state"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Why Scoped State?
					</AnchorHeading>
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
									Per-User Isolation
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Each user gets their own state slice. Button
								clicks and interactions only affect that
								user&apos;s data.
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
									Automatic Sessions
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								A secure session cookie is automatically created
								on first visit. No manual session management
								required.
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
									HTMX Perfect
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Ideal for HTMX apps where server endpoints need
								to maintain user-specific state across partial
								page updates.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>Type Safe</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Full TypeScript support with typed state access
								through the <code>scopedStore</code> context
								property.
							</p>
						</animated.div>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="installation"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Installation
					</AnchorHeading>
					<PrismPlus
						codeString={scopedStateInstallation}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="getting-started"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Getting Started
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Initialize the plugin with your state schema. Each key
						defines a piece of state with an initial value:
					</p>
					<PrismPlus
						codeString={scopedStateSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="accessing-state"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Accessing State
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Access your scoped state through the{' '}
						<code>scopedStore</code> context property. Each user
						sees and modifies only their own state:
					</p>
					<PrismPlus
						codeString={scopedStateAccess}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="preserve-option"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Preserve Option
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Mark state as <code>preserve: true</code> to keep it
						across page refreshes and navigation. Without this,
						state resets when users refresh the page or navigate
						away. Useful for user preferences and session data that
						should persist:
					</p>
					<PrismPlus
						codeString={scopedStatePreserve}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="resetting-state"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Resetting State
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>resetScopedStore()</code> to programmatically
						reset the user&apos;s state to initial values. This
						respects preserve flags by default. Pass{' '}
						<code>true</code> to ignore preserve flags and reset
						everything:
					</p>
					<PrismPlus
						codeString={scopedStateReset}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="htmx-integration"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						HTMX Integration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Scoped state shines with HTMX. Each user&apos;s button
						clicks and interactions only affect their own count,
						cart, or other state:
					</p>
					<PrismPlus
						codeString={scopedStateHtmxExample}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1.5rem'
						}}
					>
						The HTML uses HTMX attributes to call these endpoints:
					</p>
					<PrismPlus
						codeString={scopedStateHtmxHtml}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>User A</strong> clicks
							increment 3 times → sees count of 3
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>User B</strong> visits
							the same page → sees count of 0 (their own state)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>User B</strong> clicks
							increment → sees count of 1 (independent from User
							A)
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="how-it-works"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How It Works
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The plugin uses a secure session cookie to identify
						users and maintain their state server-side:
					</p>
					<ol style={{ ...listStyle, marginTop: '1rem' }}>
						<li style={listItemStyle}>
							On first request, a secure{' '}
							<code>user_session_id</code> cookie is created
						</li>
						<li style={listItemStyle}>
							Each subsequent request uses this cookie to retrieve
							the user&apos;s state
						</li>
						<li style={listItemStyle}>
							State is stored server-side, keyed by session ID
						</li>
					</ol>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
							marginBottom: '1.5rem',
							marginTop: '1.5rem'
						}}
					>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>User A</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Visits <code>/api/count</code> → sees 0
								<br />
								Calls <code>/api/increment</code> → sees 1
								<br />
								Calls <code>/api/increment</code> → sees 2
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>User B</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Visits <code>/api/count</code> → sees 0 (own
								state)
								<br />
								Calls <code>/api/increment</code> → sees 1
								<br />
								Independent from User A
							</p>
						</animated.div>
					</div>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Automatic Session ID
							</strong>
							: A <code>user_session_id</code> cookie is created
							on first request
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Server-Side Storage
							</strong>
							: State is stored in memory on the server, keyed by
							session ID
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Isolation</strong>: Each
							session ID maps to a completely separate state
							object
						</li>
					</ul>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
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
