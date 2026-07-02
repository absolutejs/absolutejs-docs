export const mfaChallengeComponent = `\
import { useState } from 'react';

export function MfaChallenge({ onSuccess }: { onSuccess: () => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    const res = await fetch('/auth/mfa/challenge', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ code })
    });
    if (res.ok) return onSuccess();
    setError(await res.text()); // 'Invalid MFA code' | 'Too many attempts'
  };

  return (
    <form onSubmit={submit}>
      <label>
        Authenticator code
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="123456"
        />
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Verify</button>
      <p>Lost your device? Enter one of your backup codes instead.</p>
    </form>
  );
}`;
export const mfaChallengeReact = `\
// 3. LOGIN — a normal credential login now returns mfa_required for enrolled users.
async function login(email: string, password: string) {
  const res = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.status === 'mfa_required') {
    return 'needs-second-factor'; // route to your <MfaChallenge /> screen
  }
  return 'authenticated';         // no MFA enrolled -> straight in
}

// 4. CHALLENGE — submit the authenticator (or backup) code to complete login.
//    The pending login is held in an httpOnly cookie; just keep sending credentials.
async function submitChallenge(code: string) {
  const res = await fetch('/auth/mfa/challenge', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ code }) // a backup code works here too
  });
  if (res.status === 401) {
    const msg = await res.text();
    // 'Too many attempts' -> locked out (totpMaxAttempts hit); 'Invalid MFA code' -> retry
    throw new Error(msg);
  }
  return true; // session cookie is now set — the user is fully authenticated
}`;
export const mfaEnrollReact = `\
// 1. ENROLL — call setup from an authenticated page, render the otpauth URI as a QR.
import QRCode from 'qrcode';

async function startTotpEnrollment() {
  const res = await fetch('/auth/mfa/totp/setup', {
    method: 'POST',
    credentials: 'include' // send the session cookie
  });
  const { secret, uri } = await res.json();
  const qrDataUrl = await QRCode.toDataURL(uri); // render <img src={qrDataUrl} />
  return { secret, qrDataUrl };                  // show 'secret' as a manual-entry fallback
}

// 2. CONFIRM — the user scans, types the 6-digit code; verify activates the factor.
//    Enrollment is NOT active until this succeeds — no silently-active unconfirmed secret.
async function confirmTotpEnrollment(code: string) {
  const res = await fetch('/auth/mfa/totp/verify', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ code })
  });
  if (!res.ok) throw new Error('Invalid code');
  const { backupCodes } = await res.json();
  return backupCodes; // show these ONCE — tell the user to save them. Never retrievable again.
}`;
export const mfaRoutes = `\
// --- Enrollment (caller must already be authenticated) ---
POST /auth/mfa/totp/setup    {}              -> { secret, uri }         // uri = otpauth:// for the QR
POST /auth/mfa/totp/verify   { code }        -> { backupCodes }         // activates TOTP, returns codes ONCE

// --- SMS enrollment (only when onSendSmsCode is set) ---
POST /auth/mfa/sms/setup     { phone }       -> { status: 'sent' }      // texts a verification code
POST /auth/mfa/sms/verify    { code }        -> { status: 'verified' }  // activates the SMS factor

// --- Login challenge (after login returns { status: 'mfa_required' }) ---
POST /auth/mfa/challenge     { code }                     -> { status: 'authenticated' }  // TOTP or backup code
POST /auth/mfa/challenge     { factor: 'sms', action: 'send' }   -> { status: 'sent' }
POST /auth/mfa/challenge     { factor: 'sms', code }             -> { status: 'authenticated' }

// The secret/backupCodes are returned exactly once. Never re-fetchable. Store the QR at
// enrollment and the backup codes somewhere the user can save them.`;
export const mfaServerSetup = `\
import { auth, createNeonMfaStore } from '@absolutejs/auth';

await auth<User>({
  providersConfiguration: {},
  credentials: {
    credentialStore: createNeonCredentialStore(process.env.DATABASE_URL),
    getUserByEmail: (email) => findUserByEmail(email)
    // ...password policy, email hooks, etc.
  },
  mfa: {
    mfaStore: createNeonMfaStore(process.env.DATABASE_URL),
    getUserId: (user) => user.sub,
    // Resolve the parked identity back into a user during a challenge.
    // For credentials this is just a lookup by the parked email:
    getChallengeUser: (identity) => findUserByEmail(String(identity.email)),
    // AES-GCM key (base64url) that encrypts the TOTP secret at rest. Generate once with
    // generateEncryptionKey() and keep it in your secret manager — set it in any real deploy.
    encryptionKey: process.env.MFA_ENCRYPTION_KEY,
    issuer: 'Acme',              // shown in the authenticator app
    totpMaxAttempts: 5,          // 2nd-factor lockout, independent of password lockout
    // Optional: SMS factor. Omit the block entirely for TOTP-only.
    onSendSmsCode: ({ phone, code }) => twilio.messages.create({ to: phone, body: code })
  }
});

// With credentials + mfa configured, auth() auto-wires the MFA gate: once a user has a
// verified factor, login no longer mints a session directly — it parks the login and
// returns { status: 'mfa_required' }, and only /auth/mfa/challenge completes it.`;
