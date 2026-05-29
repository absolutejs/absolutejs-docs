export const guestSession = `\
import { createAnonymousSession, isAnonymousSession } from '@absolutejs/auth';

// Mint a guest session (a trial, or a cart before sign-up). guestUser is your own
// throwaway object — give it a recognizable id:
await createAnonymousSession({
  authSessionStore,
  cookie: user_session_id,
  guestUser: { sub: 'guest:' + crypto.randomUUID() },
  inMemorySession: session
});

// Detect a guest session (e.g. to show a "sign up to save your work" banner):
if (isAnonymousSession(session)) {
  // ...
}

// Upgrade: read the guest session's user to migrate its data, then run a normal
// login / register — that rotates the cookie to a real session.`;
export const multiSession = `\
import {
  addToSessionRing,
  listRingSessions,
  removeFromSessionRing,
  switchActiveSession
} from '@absolutejs/auth';

// After each successful login, add the new session to the ring. The active
// session stays in the normal user_session_id cookie; the ring is a second cookie.
addToSessionRing(session_ring, newSessionId);

// Render an account switcher (drops expired sessions):
const accounts = await listRingSessions({ authSessionStore, ring: session_ring });
// -> [{ sessionId, user }, ...]

// Switch the active account:
switchActiveSession({
  activeCookie: user_session_id,
  ring: session_ring,
  sessionId
});

// Sign one account out (falls back to another ring member, or clears):
await removeFromSessionRing({
  activeCookie: user_session_id,
  authSessionStore,
  ring: session_ring,
  sessionId
});`;
export const refreshSessionUser = `\
import { refreshUserSessions } from '@absolutejs/auth';

// The 'user' that protectRoute / userStatus hand you is the snapshot serialized
// into the session at login (auth_sessions.user_json) — it is NOT re-read from your
// own user table on each request. So a change you make AFTER login (a role grant, a
// ban, a tier change) stays invisible to that user's live sessions, and role-gated
// routes keep returning 403 even though the DB row is correct.

// Fix: after the DB write in your own mutator, push the fresh user into every active
// session for that user. refreshUserSessions returns the number of sessions updated.
const assignRole = async (sub: string, role: string) => {
  const [user] = await db
    .update(users)
    .set({ roles: sql\`array_append(\${users.roles}, \${role})\` })
    .where(eq(users.sub, sub))
    .returning();

  await refreshUserSessions({
    authSessionStore,
    getUserId: (candidate) => candidate.sub,
    user,        // the freshly-read row — you supply it; the library is user-model agnostic
    userId: sub
  });
};

// Now the next request sees the new role from the snapshot — no re-login, no per-request
// DB read inside protectRoute:
app.get('/admin/api/stats', ({ protectRoute }) =>
  protectRoute(async (sessionUser) => {
    if (!sessionUser.roles.includes('admin')) return new Response('', { status: 403 });
    // ...
  })
);`;
