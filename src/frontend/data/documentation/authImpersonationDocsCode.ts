export const impersonationEnd = `\
import { endImpersonation, isImpersonating } from '@absolutejs/auth';

// One-click exit — restores the admin's original session if it's still valid,
// otherwise clears the cookie. Emits an 'impersonation_ended' audit event.
const { restored } = await endImpersonation({
  authSessionStore,
  cookie: user_session_id,
  inMemorySession: session,
  emit: auditEmit
});

// Detect an impersonated session anywhere (e.g. to show a banner) — userStatus
// surfaces the same 'impersonator' field:
if (isImpersonating(session)) {
  // render: "Viewing as alice@acme.com — exit impersonation"
}`;
export const impersonationStart = `\
import { startImpersonation } from '@absolutejs/auth';

// In your own admin route — gate it behind admin auth AND a step-up
// (requireRecentAuth); 'reason' is required and recorded.
await startImpersonation({
  authSessionStore,
  cookie: user_session_id,
  getUserId: (user) => user.sub,
  impersonator: {
    actorId: admin.id,
    actorEmail: admin.email,
    reason: 'Support ticket #4821'
  },
  inMemorySession: session,
  user: targetUser, // resolved from your store
  emit: auditEmit // optional: emits 'impersonation_started'
});

// The session is now the target user, stamped with the impersonator (RFC 8693
// actor semantics) and time-boxed. The admin's original session is preserved so
// endImpersonation can return them to it.`;
