export const basicSetup = `\
import { Elysia } from 'elysia';
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
  .listen(3000);`;

export const protectRoute = `\
app.get('/protected', ({ protectRoute }) =>
  protectRoute(
    (user) => \`Hello \${user.name}!\`,
    () => 'Please log in'
  )
);`;

export const handleAuthFlow = `\
// Redirect to provider authorization
app.get('/login/:provider', ({ params, redirect }) => {
  return redirect(\`/oauth2/\${params.provider}/authorization\`);
});

// Check user status
app.get('/status', async ({ cookie }) => {
  const response = await fetch('/oauth2/status', {
    headers: { cookie: cookie.toString() }
  });
  return response.json();
});`;

export const userManagement = `\
const config = {
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
};`;

export const reactFrontend = `\
import { useState, useEffect } from 'react';

// Frontend authentication hook
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
};`;
