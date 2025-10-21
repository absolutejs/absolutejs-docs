import { CodeBlock, BashCodeBlock } from '../../utils/CodeBlock';
import { authDocsCode } from '../../../data/authDocsCode';
import { h1Style, sectionStyle, headingStyle, paragraphLargeStyle, paragraphSpacedStyle, strongStyle, listStyle, listItemStyle, codeWrapperStyle } from '../../../styles/docsStyles';

const basicSetup = await CodeBlock({ code: authDocsCode.basicSetup });
const protectRoute = await CodeBlock({ code: authDocsCode.protectRoute });
const handleAuthFlow = await CodeBlock({ code: authDocsCode.handleAuthFlow });
const reactFrontend = await CodeBlock({ code: authDocsCode.reactFrontend });
const userManagement = await CodeBlock({ code: authDocsCode.userManagement });

export const AbsoluteAuthView = () => (
    <div
        style={{
			display: 'flex',
			flex: 1,
			flexDirection: 'column',
			padding: '2rem',
			lineHeight: '1.7',
			overflowX: 'hidden',
			overflowY: 'auto'
		}}
    >
        <link rel='stylesheet' href='https://esm.sh/@shikijs/twoslash@latest/style-rich.css' />
        <h1 style={h1Style}>Absolute Auth</h1>

        <section style={sectionStyle}>
            <h2 style={headingStyle}>Overview</h2>
            <p style={paragraphLargeStyle}>
                Absolute Auth is a comprehensive TypeScript-based authentication system built for Elysia applications.
                It provides a complete OAuth 2.0 and OpenID Connect solution with support for 50+ authentication providers
                including Google, GitHub, Discord, and many more.
            </p>
        </section>

        <section style={sectionStyle}>
            <h2 style={headingStyle}>Key Features</h2>
            <ul style={listStyle}>
                <li style={listItemStyle}><strong style={strongStyle}>Multi-Provider Support</strong>: 50+ OAuth 2.0 and OpenID Connect providers</li>
                <li style={listItemStyle}><strong style={strongStyle}>Type-Safe</strong>: Full TypeScript support with comprehensive type definitions</li>
                <li style={listItemStyle}><strong style={strongStyle}>Session Management</strong>: Built-in session handling with automatic expiration</li>
                <li style={listItemStyle}><strong style={strongStyle}>Token Management</strong>: Automatic token refresh and revocation</li>
                <li style={listItemStyle}><strong style={strongStyle}>Route Protection</strong>: Easy-to-use route protection middleware</li>
                <li style={listItemStyle}><strong style={strongStyle}>Event Hooks</strong>: Customizable event handlers for all authentication flows</li>
                <li style={listItemStyle}><strong style={strongStyle}>PKCE Support</strong>: Automatic PKCE implementation for supported providers</li>
                <li style={listItemStyle}><strong style={strongStyle}>Security</strong>: Secure cookie handling and CSRF protection</li>
            </ul>
        </section>

        <section style={sectionStyle}>
            <h2 style={headingStyle}>Installation</h2>
            <BashCodeBlock>
                {`bun install absolute-auth`}
            </BashCodeBlock>
        </section>

        <section style={sectionStyle}>
            <h2 style={headingStyle}>Quick Start</h2>
            <h3 style={paragraphLargeStyle}>1. Basic Setup</h3>
            <div style={codeWrapperStyle}>
                <div dangerouslySetInnerHTML={{ __html: basicSetup }} />
            </div>

            <h3 style={paragraphLargeStyle}>2. Protect Routes</h3>
            <div style={codeWrapperStyle}>
                <div dangerouslySetInnerHTML={{ __html: protectRoute }} />
            </div>

            <h3 style={paragraphLargeStyle}>3. Handle Authentication Flow</h3>
            <div style={codeWrapperStyle}>
                <div dangerouslySetInnerHTML={{ __html: handleAuthFlow }} />
            </div>
        </section>

        <section style={sectionStyle}>
            <h2 style={headingStyle}>Authentication Routes</h2>
            <p style={paragraphSpacedStyle}>The library automatically creates the following routes:</p>
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

        <section style={sectionStyle}>
            <h2 style={headingStyle}>User Management</h2>
            <p style={paragraphSpacedStyle}>Implement custom user creation and retrieval:</p>
            <div style={codeWrapperStyle}>
                <div dangerouslySetInnerHTML={{ __html: userManagement }} />
            </div>
        </section>
        <section style={sectionStyle}>
            <h2 style={headingStyle}>React Frontend Integration</h2>
            <div style={codeWrapperStyle}>
                <div dangerouslySetInnerHTML={{ __html: reactFrontend }} />
            </div>
        </section>
    </div>
);