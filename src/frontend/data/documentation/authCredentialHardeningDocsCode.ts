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
