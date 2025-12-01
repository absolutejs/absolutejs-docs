export const basicSetup = `\
import { Elysia } from 'elysia';
import { absoluteAuth } from '@absolutejs/auth';
import { getEnv } from '@absolutejs/absolute';

const app = new Elysia()
  .use(absoluteAuth<User>({
    providersConfiguration: {
      google: {
        credentials: {
          clientId: getEnv('GOOGLE_CLIENT_ID'),
          clientSecret: getEnv('GOOGLE_CLIENT_SECRET'),
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
    (user) => {
      return \`Hello, \${user.name}!\`;
    },
    (error) => {
      console.error('Authentication failed:', error);
      return 'Please log in';
    }
  )
);`;

export const startOAuthFlow = `\
// Redirect the user to the provider's authorization URL
redirect('/oauth2/google/authorization');`;

export const checkStatus = `\
const response = await fetch('/oauth2/status', {
  headers: { cookie: cookie.toString() }
});

const data = await response.json();
// data is either: { user } or an auth error`

export const signout = `await fetch('/oauth2/signout', { method: 'DELETE' });`

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
