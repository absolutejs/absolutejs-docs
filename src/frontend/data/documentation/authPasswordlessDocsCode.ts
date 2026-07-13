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
