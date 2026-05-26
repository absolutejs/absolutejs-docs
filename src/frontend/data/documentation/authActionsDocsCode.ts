export const actionsPipeline = `\
import { createActionPipeline } from '@absolutejs/auth';

// Ordered, composable middleware over the auth lifecycle — Auth0 Actions /
// Better Auth plugins from raw primitives. Each action targets one or more
// events; the pipeline runs them in order and short-circuits on the first
// deny/redirect. Pass results propagate to the next action.
const pipeline = createActionPipeline([
  {
    event: 'postLogin',
    handler: ({ user }) => {
      if (user?.role === 'admin' && !user.mfaEnabled) {
        return { kind: 'redirect', url: '/setup-mfa' };
      }
      return { kind: 'pass' };
    },
    name: 'enforce-mfa-for-admins'
  },
  {
    event: ['postLogin', 'postOauthCallback', 'postRegister'],
    handler: async ({ user }) => {
      await crm.upsert(user);
      return { kind: 'pass' };
    },
    name: 'sync-to-crm'
  }
]);

// Wire it into your existing lifecycle hooks. The pipeline doesn't replace
// hooks — it's a composition primitive you call from them.
auth({
  credentials: {
    onCredentialsLoginSuccess: async ({ user }) => {
      const result = await pipeline.run('postLogin', { user });
      if (result.kind === 'deny') throw new Error(result.reason);
      if (result.kind === 'redirect') redirect(result.url);
    }
  }
});`;
