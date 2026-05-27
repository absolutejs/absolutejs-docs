export const clientUsage = `\
import { createAuthClient } from '@absolutejs/auth/client';

// Framework-agnostic SDK over every endpoint your auth() mounted. Every method
// returns { data, error } so you can branch without try/catch. Override routes
// if you mounted any of them at a custom path; pass a custom fetch for tests.
const client = createAuthClient({
  baseUrl: '',                  // default: relative paths
  credentials: 'same-origin',   // default; sends the session cookie
  routes: { login: '/api/v2/login' } // optional overrides
});

const { data, error } = await client.signIn.email({ email, password });
if (error) showError(error.message);
else if (data.status === 'mfa_required') openMfaPrompt();
else if (data.passwordCompromised) showResetBanner();
else go('/profile');

await client.passwordless.requestMagicLink({ email });
await client.mfa.challenge({ code });
const sessions = await client.sessions.list();`;
export const passkeyAutofill = `\
import { createAuthClient } from '@absolutejs/auth/client';
import { usePasskeyAutofill } from '@absolutejs/auth/react';

// 0.37.0: WebAuthn conditional-UI. Mount on the sign-in page with an
// <input autocomplete="username webauthn"> and call start() in an effect;
// the browser surfaces the user's saved passkeys directly in its autofill
// dropdown — one tap and you're authenticated. @simplewebauthn/browser is
// an optional peer dep loaded dynamically; non-passkey consumers pay nothing.

const client = createAuthClient();

function SignInForm() {
  const { start, data, error, isPending } = usePasskeyAutofill(client);
  useEffect(() => { void start(); }, [start]);

  return (
    <form>
      <input
        name="email"
        autoComplete="username webauthn"
      />
      <input name="password" type="password" autoComplete="current-password" />
      <button disabled={isPending}>Sign in</button>
      {data?.status === 'authenticated' && <Redirect to="/dashboard" />}
      {error && <p>{error.message}</p>}
    </form>
  );
}`;
export const reactHooks = `\
import { createAuthClient } from '@absolutejs/auth/client';
import {
  useMagicLink,
  useMfaChallenge,
  useSessions,
  useSignIn
} from '@absolutejs/auth/react';

// React peer-dep is optional. The hooks are thin: { isPending, data, error,
// mutate, reset } over the client (or { isPending, data, error, refetch,
// revoke } for the sessions query). Bring your own form / styling.
const client = createAuthClient();

function SignInForm() {
  const { mutate, isPending, error, data } = useSignIn(client);
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      mutate({
        email: form.get('email') as string,
        password: form.get('password') as string
      });
    }}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button disabled={isPending}>Sign in</button>
      {error && <p>{error.message}</p>}
      {data?.status === 'mfa_required' && <MfaPrompt />}
    </form>
  );
}

// Vue / Solid / Svelte composables wrap the same client — same shapes,
// different reactivity. 0.33.0 shipped the sibling sub-exports:
// @absolutejs/auth/vue, @absolutejs/auth/solid, @absolutejs/auth/svelte.`;
export const upgradeToPasskey = `\
import { useUpgradeToPasskey } from '@absolutejs/auth/react';

// 0.37.0: "save a passkey to this device?" prompt for password users.
// shouldPrompt is true iff the signed-in user has zero passkeys; register()
// runs the WebAuthn registration ceremony and refetches the list.
function PostSignInPasskeyPrompt({ client }) {
  const { shouldPrompt, register, isPending } = useUpgradeToPasskey(client);
  if (!shouldPrompt) return null;

  return (
    <Banner>
      Save a passkey to this device for faster sign-in next time?
      <button onClick={() => register()} disabled={isPending}>
        Save passkey
      </button>
    </Banner>
  );
}`;

