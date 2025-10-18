import { CodeBlock } from '../../utils/CodeBlock';

export const AbsoluteAuthView = () => (
    <div
        style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            padding: '1rem 2rem'
        }}
    >
        <h1>Absolute Auth</h1>

        <section>
            <h2>Overview</h2>
            <p>
                Absolute Auth is a comprehensive TypeScript-based authentication system built for Elysia applications.
                It provides a complete OAuth 2.0 and OpenID Connect solution with support for 50+ authentication providers
                including Google, GitHub, Discord, and many more.
            </p>
        </section>

        <section>
            <h2>Key Features</h2>
            <ul>
                <li><strong>Multi-Provider Support</strong>: 50+ OAuth 2.0 and OpenID Connect providers</li>
                <li><strong>Type-Safe</strong>: Full TypeScript support with comprehensive type definitions</li>
                <li><strong>Session Management</strong>: Built-in session handling with automatic expiration</li>
                <li><strong>Token Management</strong>: Automatic token refresh and revocation</li>
                <li><strong>Route Protection</strong>: Easy-to-use route protection middleware</li>
                <li><strong>Event Hooks</strong>: Customizable event handlers for all authentication flows</li>
                <li><strong>PKCE Support</strong>: Automatic PKCE implementation for supported providers</li>
                <li><strong>Security</strong>: Secure cookie handling and CSRF protection</li>
            </ul>
        </section>

        <section>
            <h2>Installation</h2>
            <CodeBlock language="bash">{`bun add @absolutejs/auth`}</CodeBlock>
        </section>

        <section>
            <h2>Quick Start</h2>
            <h3>1. Basic Setup</h3>
            <CodeBlock language="typescript">{`import { Elysia } from 'elysia';
import { absoluteAuth } from '@absolutejs/auth';

const app = new Elysia()
  .use(await absoluteAuth({
    providersConfiguration: {
      google: {
        credentials: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          redirectUri: 'http://localhost:3000/oauth2/callback'
        },
        scope: ['profile', 'email']
      }
    }
  }))
  .listen(3000);`}</CodeBlock>

            <h3>2. Protect Routes</h3>
            <CodeBlock language="typescript">{`app.get('/protected', ({ protectRoute }) =>
  protectRoute(
    (user) => \`Hello \${user.name}!\`,
    () => 'Please log in'
  )
);`}</CodeBlock>

            <h3>3. Handle Authentication Flow</h3>
            <CodeBlock language="typescript">{`// Redirect to provider authorization
app.get('/login/:provider', ({ params, redirect }) => {
  return redirect(\`/oauth2/\${params.provider}/authorization\`);
});

// Check user status
app.get('/status', async ({ cookie }) => {
  const response = await fetch('/oauth2/status', {
    headers: { cookie: cookie.toString() }
  });
  return response.json();
});`}</CodeBlock>
        </section>

        <section>
            <h2>Authentication Routes</h2>
            <p>The library automatically creates the following routes:</p>
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

        <section>
            <h2>User Management</h2>
            <p>Implement custom user creation and retrieval:</p>
            <CodeBlock language="typescript">{`const config = {
  providersConfiguration,
  onCallbackSuccess: async ({ authProvider, tokenResponse, session, userSessionId }) => {
    return instantiateUserSession({
      authProvider,
      tokenResponse,
      session,
      userSessionId,
      getUser: async (userIdentity) => {
        // Find user in your database
        return await db.users.findByAuthSub(userIdentity.sub);
      },
      onNewUser: async (userIdentity) => {
        // Create new user in your database
        return await db.users.create({
          authSub: userIdentity.sub,
          email: userIdentity.email,
          name: userIdentity.name
        });
      }
    });
  }
};`}</CodeBlock>
        </section>

        <section>
            <h2>Supported Providers</h2>
            <p>Absolute Auth supports 50+ authentication providers:</p>
            <h3>Popular Providers</h3>
            <ul>
                <li>Google - OAuth 2.0 with OpenID Connect</li>
                <li>GitHub - OAuth 2.0</li>
                <li>Discord - OAuth 2.0 with OpenID Connect</li>
                <li>Microsoft Entra ID - OAuth 2.0 with OpenID Connect</li>
                <li>Apple - OAuth 2.0 with PKCE</li>
                <li>Facebook - OAuth 2.0</li>
                <li>Twitter - OAuth 2.0</li>
                <li>LinkedIn - OAuth 2.0 with OpenID Connect</li>
            </ul>
            <h3>Enterprise Providers</h3>
            <ul>
                <li>Auth0 - OAuth 2.0 with OpenID Connect</li>
                <li>Okta - OAuth 2.0 with OpenID Connect</li>
                <li>Keycloak - OAuth 2.0 with OpenID Connect</li>
                <li>WorkOS - OAuth 2.0 with OpenID Connect</li>
            </ul>
            <h3>Gaming & Social</h3>
            <ul>
                <li>Twitch - OAuth 2.0 with OpenID Connect</li>
                <li>Steam - OAuth 2.0</li>
                <li>Epic Games - OAuth 2.0</li>
                <li>Battle.net - OAuth 2.0</li>
            </ul>
        </section>

        <section>
            <h2>React Frontend Integration</h2>
            <CodeBlock language="typescript">{`// Frontend authentication hook
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/oauth2/status')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  const login = (provider: string) => {
    window.location.href = \`/oauth2/\${provider}/authorization\`;
  };

  const logout = async () => {
    await fetch('/oauth2/signout', { method: 'DELETE' });
    setUser(null);
  };

  return { user, loading, login, logout };
};`}</CodeBlock>
        </section>
    </div>
);