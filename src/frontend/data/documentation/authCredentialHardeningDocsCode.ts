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
