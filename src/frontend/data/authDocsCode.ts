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
        scope: ['openid', 'profile', 'email']
      }
    }
  }))
  .listen(3000);`;

export const protectRoute = `\
app.get('/protected', ({ status, protectRoute }) =>
  protectRoute(
    (user) => {
      return \`Hello, \${user.name}!\`;
    },
    (error) => status(error.code, error.message)
  )
);`;

export const startOAuthFlow = `\
// Option 1: Use an anchor element
<a href="/oauth2/google/authorization">Sign in with Google</a>

// Option 2: Redirect the user to the provider's authorization URL
redirect('/oauth2/google/authorization');`;

export const checkStatus = `\
import { server } from '/src/frontend/utils/edenTreaty';

const { data, error } = await server.oauth2.status.get();

if (error) {
  console.error('Not authenticated:', error);
} else {
  console.log('User:', data.user);
}`;

export const signout = `\
import { server } from '/src/frontend/utils/edenTreaty';

const { data, error } = await server.oauth2.signout.delete();

if (error) {
  console.error('Signout failed:', error);
} else {
  console.log('Successfully signed out');
}`;

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

export const sessionConfigExample = `\
.use(await absoluteAuth<User>({
  providersConfiguration: { /* ... */ },

  // Session lifetime configuration
  sessionDurationMs: 86400000,            // 24 hours (default)
  unregisteredSessionDurationMs: 3600000, // 1 hour (default)
  cleanupIntervalMs: 300000,              // 5 minutes (default)
  maxSessions: 5,                         // Max sessions per user (default)

  // Called when sessions are cleaned up
  onSessionCleanup: async ({ removedSessions, removedUnregisteredSessions }) => {
    console.log(\`Cleaned up \${removedSessions.size} expired sessions\`);
  }
}))`;

export const cleanupSessionsExample = `\
// The cleanupSessions function is derived from the auth middleware
// and available in all route handlers

app.post('/admin/cleanup', async ({ cleanupSessions }) => {
  // Manually trigger session cleanup
  await cleanupSessions();
  return { message: 'Sessions cleaned up' };
});

// You can also use it in scheduled tasks
app.get('/health', async ({ cleanupSessions }) => {
  // Cleanup runs automatically via cleanupIntervalMs,
  // but can be triggered manually if needed
  await cleanupSessions();
  return { status: 'healthy' };
})`;
