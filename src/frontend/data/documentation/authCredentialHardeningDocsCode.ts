export const backgroundEmailScan = `\
import { runEmailBreachScan } from '@absolutejs/auth';

// 0.37.0: re-scan existing user EMAILS against HaveIBeenPwned's breached-account
// database on a schedule (the email counterpart to the login-time password check).
// Store-agnostic — supply iterateEmails as a cursor-paged callback so the package
// doesn't need to know your user table shape. HIBP rate-limited by default (1700ms);
// requires the paid breachedaccount API key.
const summary = await runEmailBreachScan({
  hibpApiKey: process.env.HIBP_API_KEY,
  iterateEmails: async (cursor) => {
    const rows = await db.execute(
      \`SELECT email, id FROM users WHERE id > $1 ORDER BY id LIMIT 500\`,
      [cursor ?? '']
    );
    return {
      emails: rows.map(r => r.email),
      nextCursor: rows.at(-1)?.id
    };
  },
  onBreachFound: async ({ email, breaches }) => {
    await mailer.send({ to: email, template: 'breach_notice', data: { breaches } });
    await auditStore.append('email_breach_detected', { email, count: breaches.length });
  }
});
console.log(\`scanned \${summary.scanned}, found breaches for \${summary.breached}\`);`;
export const breachCheckOnLogin = `\
import { auth } from '@absolutejs/auth';

// Turnkey: let the credentials block run the login-time HIBP check for you.
// On a successful login it adds passwordCompromised to the response — it never
// blocks (the user is already authenticated), so prompt a reset on the next
// screen. Fails open on a HIBP outage.
auth({
  credentials: {
    // ...credentialStore, getUserByEmail, onCreateCredentialUser, etc.
    checkBreachesOnLogin: true
  }
});

// client, after POST /auth/login:
// if (data.passwordCompromised) showResetPasswordPrompt();`;
export const compromisedCredential = `\
import { isPasswordCompromised } from '@absolutejs/auth';

// On a SUCCESSFUL credential login (the one moment you hold the plaintext),
// re-check it against HaveIBeenPwned. A password that was fine at sign-up may
// later appear in a breach — the login-time half of Auth0 "Credential Guard".
if (await isPasswordCompromised(password)) {
  // force a reset + notify; fails open on a HIBP outage
  return status('OK', { status: 'password_reset_required' });
}`;
export const emailValidation = `\
import { validateEmailDeliverability } from '@absolutejs/auth';

// In your register flow, before creating the user. checkMx does a DNS lookup;
// disposableDomains extends the built-in disposable list.
const result = await validateEmailDeliverability(email, {
  checkMx: true,
  disposableDomains: ['corporate-blocklist.example']
});

if (!result.ok) {
  // result.reason is 'invalid_format' | 'disposable' | 'no_mx'
  return status('Bad Request', result.reason);
}`;
export const enumerationResistance = `\
import { auth } from '@absolutejs/auth';

auth({
  credentials: {
    // Registration is enumeration-safe by DEFAULT: a duplicate email returns the
    // SAME generic response a new pending registration does — it never says
    // "email already registered". onExistingAccount nudges the real owner out of
    // band. (Full indistinguishability assumes requireEmailVerification: true.)
    requireEmailVerification: true,
    onExistingAccount: ({ email }) =>
      mailer.send({ to: email, template: 'you_already_have_an_account' }),

    // Opt back into the explicit 409 if you'd rather surface it:
    // revealRegistrationConflicts: true,
    // ...credentialStore, getUserByEmail, onCreateCredentialUser, onSendEmail
  }
});

// Login is timing-equalized too: a request for an email that doesn't exist burns
// the same argon2id work a real verify would, so response time can't be used to
// enumerate which addresses are registered.`;
export const originAllowlist = `\
import { auth } from '@absolutejs/auth';

auth({
  credentials: {
    // Reject login/register requests whose Origin header isn't one of yours
    // (login/registration CSRF defense).
    trustedOrigins: ['https://app.example.com', 'https://www.example.com'],

    // Roll it out REPORT-ONLY first on a login path — observe the real Origin set
    // before you block anyone. enforce defaults to true (secure by default); set
    // it false to log-don't-block. onUntrustedOrigin fires in BOTH modes, so it
    // drives the report-only rollout and stays useful once you enforce.
    enforceTrustedOrigins: false,
    onUntrustedOrigin: ({ origin, request }) =>
      logger.warn('untrusted origin', {
        origin,
        path: new URL(request.url).pathname
      })
  }
});`;
export const pruneInactiveUsersExample = `\
import { pruneInactiveUsers } from '@absolutejs/auth';

// 0.37.0: walk the user population, identify anyone past olderThanDays + delete
// (or just list in dryRun). Pure orchestrator — onDelete decides what "prune"
// means in your system (soft-delete, hard-delete, disable+notify).
const result = await pruneInactiveUsers({
  olderThanDays: 365,
  dryRun: false,
  iterateUsers: async (cursor) => {
    const rows = await db.execute(
      \`SELECT id AS user_id, last_login_at_ms AS "lastLoginAt", created_at_ms AS "createdAt"
       FROM users WHERE id > $1 ORDER BY id LIMIT 500\`,
      [cursor ?? '']
    );
    return { users: rows, nextCursor: rows.at(-1)?.user_id };
  },
  onDelete: async (userId) => {
    await db.execute(\`UPDATE users SET disabled_at = now() WHERE id = $1\`, [userId]);
    await auditStore.append('user_pruned_inactive', { userId });
  }
});
console.log(\`scanned \${result.scanned}, pruned \${result.prunedUserIds.length}\`);`;
export const requireAuthGuard = `\
import { Elysia } from 'elysia';
import { requireAuthPlugin } from '@absolutejs/auth';

// Fail-closed counterpart to protectRoutePlugin: MOUNTING it guards every route
// in scope by default. An unauthenticated request is rejected with 401 in
// onBeforeHandle, before the handler runs — so forgetting a per-route check can't
// silently leave a route public (protectRoutePlugin's opt-in failure mode).
const app = new Elysia()
  .use(requireAuthPlugin({ authSessionStore }))
  .get('/me', ({ user }) => user)          // user is guaranteed present here
  .get('/settings', () => renderSettings());`;
export const safeRedirectAndCookie = `\
import {
  isSafeLocalPath,
  toSafeLocalPath,
  readSessionCookie
} from '@absolutejs/auth';

// Don't hand-roll the "is this returnUrl same-origin?" check. A naive
// startsWith('/') && !startsWith('//') still accepts '/\\evil.com', which
// browsers fold to the protocol-relative '//evil.com' — an open redirect.
const target = isSafeLocalPath(returnUrl) ? returnUrl : '/'; // predicate
const safe = toSafeLocalPath(returnUrl); // or coerce, fallback '/'

// Reading the session id OUTSIDE Elysia's cookie plugin (your own middleware, a
// rate limiter)? Use the anchored reader so a decoy 'xuser_session_id=' can't
// shadow the real cookie:
const sessionId = readSessionCookie(request);`;
export const secureCookieDefaults = `\
import { auth } from '@absolutejs/auth';

// Session cookies are Secure by DEFAULT. Only the explicit development / test
// environments opt out (so http://localhost and test runners still round-trip
// cookies) — every other case, including a production deploy that forgot to set
// NODE_ENV, gets Secure cookies. That closes the "session id sent over plaintext
// HTTP" gap without you having to remember a flag.
auth({
  // Force it either way when you need to — e.g. behind a proxy that terminates
  // TLS but forwards the request as http:  cookieSecure: true
  credentials: { /* ...credentialStore, getUserByEmail, onSendEmail */ }
});`;
