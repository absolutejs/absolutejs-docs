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
