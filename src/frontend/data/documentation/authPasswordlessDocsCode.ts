export const passwordlessRoutes = `\
// Magic links (mounted when onSendMagicLink is set):
POST /auth/passwordless/magic-link          { email }   -> emails a one-time link
POST /auth/passwordless/magic-link/verify   { token }   -> session

// Email / SMS OTP (mounted when onSendOtp is set):
POST /auth/passwordless/otp                 { email }   -> sends a 6-digit code
POST /auth/passwordless/otp/verify          { email, code } -> session

// The token is delivered out-of-band and never returned from the (unauthenticated)
// request route. Both verify routes mint the same SessionData as every other flow.`;
export const passwordlessSetup = `\
import {
  auth,
  createNeonPasswordlessTokenStore
} from '@absolutejs/auth';

await auth<User>({
  providersConfiguration: {},
  passwordless: {
    passwordlessTokenStore: createNeonPasswordlessTokenStore(process.env.DATABASE_URL),
    getUserByEmail: (email) => findUserByEmail(email),
    onCreateUser: ({ email }) => createUser({ email }), // optional: signup on first login
    // each flow mounts only when its send hook is present:
    onSendMagicLink: ({ email, token }) =>
      sendEmail(email, \`https://app.example.com/login?token=\${token}\`),
    onSendOtp: ({ email, code }) => sendEmail(email, \`Your code: \${code}\`)
  }
});`;
export const webauthnFlow = `\
// Registration (add a passkey to the authenticated caller):
POST /auth/webauthn/register/options
POST /auth/webauthn/register/verify

// Authentication (passwordless, discoverable-credential sign-in -> session):
POST /auth/webauthn/authenticate/options
POST /auth/webauthn/authenticate/verify

// A short-lived, single-use cookie binds an options request to its verify
// request. The signature counter is persisted and bumped on each assertion to
// detect cloned authenticators.`;
export const webauthnSetup = `\
import {
  auth,
  createNeonWebAuthnCredentialStore
} from '@absolutejs/auth';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse
} from '@simplewebauthn/server';

await auth<User>({
  providersConfiguration: {},
  webauthn: {
    credentialStore: createNeonWebAuthnCredentialStore(process.env.DATABASE_URL),
    getUserId: (user) => user.sub,
    getWebAuthnUser: (userId) => findUserBySub(userId),
    rpId: 'example.com',
    rpName: 'Acme',
    origin: 'https://app.example.com',
    // dependency-light: you wrap a vetted lib (the package never bundles the
    // CBOR / COSE / attestation footgun):
    webauthnAdapter: {
      createRegistrationOptions: (req) => generateRegistrationOptions(/* … */),
      verifyRegistration: (req) => verifyRegistrationResponse(/* … */),
      createAuthenticationOptions: (req) => generateAuthenticationOptions(/* … */),
      verifyAuthentication: (req) => verifyAuthenticationResponse(/* … */)
    }
  }
});`;
