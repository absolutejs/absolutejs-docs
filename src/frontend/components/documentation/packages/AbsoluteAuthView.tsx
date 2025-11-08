import { basicSetup, protectRoute, handleAuthFlow, userManagement, reactFrontend } from '../../../data/authDocsCode';
import * as styles from '../../../styles/docsStyles';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { ThemeProps } from '../../../../types/springTypes';
import { animated } from '@react-spring/web';
import { PrismPlus } from '../../utils/PrismPlus';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

const tocItems: TocItem[] = [
	{ label: 'Overview', href: '#overview' },
	{ label: 'Key Features', href: '#key-features' },
	{ label: 'Installation', href: '#installation' },
	{ label: 'Quick Start', href: '#quick-start' },
	{ label: 'Authentication Routes', href: '#authentication-routes' },
	{ label: 'User Management', href: '#user-management' },
	{ label: 'React Frontend Integration', href: '#react-frontend-integration' }
];

export const AbsoluteAuthView = ({ themeSprings }: ThemeProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				position: 'relative',
				overflowX: 'hidden',
				overflowY: 'auto'
			}}
		>

			{/* Main Content - Centered */}
			<div
				style={styles.mainContentStyle}
			>
				<h1 style={styles.h1Style} id="absolute-auth">Absolute Auth</h1>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="overview">Overview</animated.h2>
					<p style={styles.paragraphLargeStyle}>
						Absolute Auth is a comprehensive TypeScript-based authentication system built for Elysia applications.
						It provides a complete OAuth 2.0 and OpenID Connect solution with support for 50+ authentication providers
						including Google, GitHub, Discord, and many more.
					</p>
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="key-features">Key Features</animated.h2>
					<ul style={styles.listStyle}>
						<li style={styles.listItemStyle}><strong style={styles.strongStyle}>Multi-Provider Support</strong>: 50+ OAuth 2.0 and OpenID Connect providers</li>
						<li style={styles.listItemStyle}><strong style={styles.strongStyle}>Type-Safe</strong>: Full TypeScript support with comprehensive type definitions</li>
						<li style={styles.listItemStyle}><strong style={styles.strongStyle}>Session Management</strong>: Built-in session handling with automatic expiration</li>
						<li style={styles.listItemStyle}><strong style={styles.strongStyle}>Token Management</strong>: Automatic token refresh and revocation</li>
						<li style={styles.listItemStyle}><strong style={styles.strongStyle}>Route Protection</strong>: Easy-to-use route protection middleware</li>
						<li style={styles.listItemStyle}><strong style={styles.strongStyle}>Event Hooks</strong>: Customizable event handlers for all authentication flows</li>
						<li style={styles.listItemStyle}><strong style={styles.strongStyle}>PKCE Support</strong>: Automatic PKCE implementation for supported providers</li>
						<li style={styles.listItemStyle}><strong style={styles.strongStyle}>Security</strong>: Secure cookie handling and CSRF protection</li>
					</ul>
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="installation">Installation</animated.h2>
					<PrismPlus codeString={`bun install @absolutejs/auth`} language="bash" showLineNumbers={false} themeSprings={themeSprings} />
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="quick-start">Quick Start</animated.h2>
					<h3 style={styles.paragraphLargeStyle}>Basic Setup</h3>
					<PrismPlus codeString={basicSetup} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />

					<h3 style={styles.paragraphLargeStyle}>Protect Routes</h3>
					<PrismPlus codeString={protectRoute} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />

					<h3 style={styles.paragraphLargeStyle}>Handle Authentication Flow</h3>
					<PrismPlus codeString={handleAuthFlow} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="authentication-routes">Authentication Routes</animated.h2>
					<p style={styles.paragraphSpacedStyle}>The library automatically creates the following routes:</p>
					<table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
						<thead>
							<tr style={{ borderBottom: '2px solid #ddd' }}>
								<th style={{ textAlign: 'left', padding: '0.5rem' }}>Route</th>
								<th style={{ textAlign: 'left', padding: '0.5rem' }}>Method</th>
								<th style={{ textAlign: 'left', padding: '0.5rem' }}>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr style={{ borderBottom: '1px solid #ddd' }}>
								<td style={{ padding: '0.5rem' }}><code>/oauth2/:provider/authorization</code></td>
								<td style={{ padding: '0.5rem' }}>GET</td>
								<td style={{ padding: '0.5rem' }}>Initiate OAuth flow</td>
							</tr>
							<tr style={{ borderBottom: '1px solid #ddd' }}>
								<td style={{ padding: '0.5rem' }}><code>/oauth2/callback</code></td>
								<td style={{ padding: '0.5rem' }}>GET</td>
								<td style={{ padding: '0.5rem' }}>Handle OAuth callback</td>
							</tr>
							<tr style={{ borderBottom: '1px solid #ddd' }}>
								<td style={{ padding: '0.5rem' }}><code>/oauth2/status</code></td>
								<td style={{ padding: '0.5rem' }}>GET</td>
								<td style={{ padding: '0.5rem' }}>Check user authentication status</td>
							</tr>
							<tr style={{ borderBottom: '1px solid #ddd' }}>
								<td style={{ padding: '0.5rem' }}><code>/oauth2/profile</code></td>
								<td style={{ padding: '0.5rem' }}>GET</td>
								<td style={{ padding: '0.5rem' }}>Get user profile from provider</td>
							</tr>
							<tr style={{ borderBottom: '1px solid #ddd' }}>
								<td style={{ padding: '0.5rem' }}><code>/oauth2/tokens</code></td>
								<td style={{ padding: '0.5rem' }}>POST</td>
								<td style={{ padding: '0.5rem' }}>Refresh access token</td>
							</tr>
							<tr style={{ borderBottom: '1px solid #ddd' }}>
								<td style={{ padding: '0.5rem' }}><code>/oauth2/revocation</code></td>
								<td style={{ padding: '0.5rem' }}>POST</td>
								<td style={{ padding: '0.5rem' }}>Revoke access token</td>
							</tr>
							<tr>
								<td style={{ padding: '0.5rem' }}><code>/oauth2/signout</code></td>
								<td style={{ padding: '0.5rem' }}>DELETE</td>
								<td style={{ padding: '0.5rem' }}>Sign out user</td>
							</tr>
						</tbody>
					</table>
				</section>

				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="user-management">User Management</animated.h2>
					<p style={styles.paragraphSpacedStyle}>Implement custom user creation and retrieval:</p>
					<PrismPlus codeString={userManagement} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
				</section>
				<section style={styles.sectionStyle}>
					<animated.h2 style={styles.headingStyle(themeSprings)} id="react-frontend-integration">React Frontend Integration</animated.h2>
					<PrismPlus codeString={reactFrontend} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
				</section>
			</div>

			{!isMobile && <TableOfContents themeSprings={themeSprings} items={tocItems} />}
		</div>
	);
}
