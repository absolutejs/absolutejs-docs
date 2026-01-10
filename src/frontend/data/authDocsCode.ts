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
// Option 1: Redirect the user to the provider's authorization URL
redirect('/oauth2/google/authorization');

// Option 2: Use an anchor element
<a href="/oauth2/google/authorization">Sign in with Google</a>`;

export const checkStatus = `\
import { server } from './eden/treaty';

const { data, error } = await server.oauth2.status.get();

if (error) {
  console.error('Not authenticated:', error);
} else {
  console.log('User:', data.user);
}`;

export const signout = `\
import { server } from './eden/treaty';

await server.oauth2.signout.delete();`;

export const userManagement = `\
onCallbackSuccess: async ({ authProvider, tokenResponse, session, userSessionId }) =>
  instantiateUserSession({
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
  })`;
