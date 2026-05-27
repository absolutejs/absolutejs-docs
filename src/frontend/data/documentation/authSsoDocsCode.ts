export const portalSetup = `\
import { auth, createNeonSetupSessionStore, createSetupSession } from '@absolutejs/auth';

await auth<User>({
  providersConfiguration: {},
  portal: {
    setupSessionStore: createNeonSetupSessionStore(process.env.DATABASE_URL),
    ssoConnectionStore, // same stores the sso / scim blocks use -> changes go live
    scimTokenStore
  }
});

// Generate a scoped, time-boxed link to hand a customer's IT admin (wrap this in
// your own RBAC-protected admin route — the plaintext token is returned once):
const { token } = await createSetupSession({
  capabilities: ['sso_oidc', 'sso_saml', 'scim'],
  organizationId: 'acme',
  setupSessionStore
});
const setupUrl = \`https://app.example.com/enterprise/setup?token=\${token}\`;

// The admin's page calls GET /auth/portal/session (Bearer = token) for the
// service-provider URLs, then PUTs /auth/portal/connection/{oidc,saml} and
// POSTs /auth/portal/scim/token. Headless JSON — build the UI in any framework.`;
export const scimAttributeMapping = `\
import { defineScimAttributeMap } from '@absolutejs/auth';

// 0.38.0: the Okta admin's eternal pain — IdP attributes don't match your user
// model 1:1. defineScimAttributeMap is the declarative bidirectional mapping
// between an enterprise extension URI's claims and your custom fields. The
// package threads inbound JSON through fromScim (lands on input.custom for
// every create/replace hook); toScim flows the other way.
const ENTERPRISE = 'urn:ietf:params:scim:schemas:extension:enterprise:2.0:User';

const enterpriseMap = defineScimAttributeMap({
  fromScim: (body) => {
    const ext = body[ENTERPRISE] as Record<string, unknown> | undefined;
    return {
      reporting_to: typeof ext?.manager === 'string' ? ext.manager : undefined,
      department: typeof ext?.department === 'string' ? ext.department : undefined
    };
  },
  toScim: (custom) => ({
    [ENTERPRISE]: { manager: custom.reporting_to, department: custom.department }
  }),
  // Declared schemas show up in /Schemas + /ResourceTypes so the IdP knows
  // what extensions you support.
  schemas: [{
    id: ENTERPRISE,
    name: 'EnterpriseUser',
    attributes: [
      { name: 'manager', type: 'string', multiValued: false },
      { name: 'department', type: 'string', multiValued: false }
    ]
  }]
});

auth({
  scim: {
    customAttributes: enterpriseMap,
    onScimUserCreate: async ({ input, organizationId }) => {
      const user = await myDb.users.create({
        email: input.email,
        managerId: input.custom?.reporting_to,
        department: input.custom?.department,
        organizationId
      });
      return { id: user.id, ...input };
    }
  }
});`;
export const scimGroupDelta = `\
import { diffScimGroupMembers } from '@absolutejs/auth';

// 0.38.0: small set-diff helper for onScimGroupReplace — compute the deltas
// against your existing membership table without rolling your own loop.
onScimGroupReplace: async ({ id, input, organizationId }) => {
  const current = await myDb.groups.findById(id, { include: 'members' });
  const { added, removed } = diffScimGroupMembers(
    current.members.map(m => ({ value: m.userId })),
    input.members
  );

  await Promise.all([
    ...added.map(m => myDb.groups.addMember(id, m.value)),
    ...removed.map(m => myDb.groups.removeMember(id, m.value))
  ]);

  return { ...input, id };
}`;
export const scimSetup = `\
import { auth, createNeonScimTokenStore, createScimToken } from '@absolutejs/auth';

await auth<User>({
  providersConfiguration: {},
  scim: {
    scimTokenStore: createNeonScimTokenStore(process.env.DATABASE_URL),
    // map SCIM <-> your user table (Groups hooks are optional -> /Groups 501s):
    getScimUser: ({ id }) => toScimUser(findUser(id)),
    listScimUsers: () => allUsers().map(toScimUser),
    onScimUserCreate: ({ input }) => createUser(input),
    onScimUserReplace: ({ id, input }) => updateUser(id, input),
    onScimUserDeactivate: ({ id }) => disableUser(id)
  }
});

// SCIM 2.0 at {scimRoute=/scim/v2}/Users (+ /Groups + /ServiceProviderConfig),
// per-org bearer auth. Mint a token for an IdP (plaintext returned once):
const { token } = await createScimToken(scimTokenStore, 'acme');`;
export const ssoConnections = `\
import { auth, createNeonSsoConnectionStore } from '@absolutejs/auth';

await auth<User>({
  providersConfiguration: {},
  sso: {
    ssoConnectionStore: createNeonSsoConnectionStore(process.env.DATABASE_URL),
    // resolve the verified SSO identity to your user (throw to reject):
    getSsoUser: async (identity) => {
      const email = identity.email?.toLowerCase();
      return (await findUserByEmail(email)) ?? createUser({ email });
    }
  }
});

// Per-organization connections (the WorkOS model). Mounts
// GET /sso/oidc/:org/authorize + /callback once an OIDC connection exists.`;
export const ssoDiscovery = `\
// Home-realm discovery: route a user to their org's connection by email domain.
await auth<User>({
  providersConfiguration: {},
  sso: {
    ssoConnectionStore,
    getSsoUser,
    getOrganizationByEmailDomain: (domain) =>
      domain === 'acme.com' ? 'acme' : undefined
  }
});

// Mounts GET /sso/authorize?email=user@acme.com -> 302 to the org's
// OIDC/SAML authorize route.`;
export const ssoOidc = `\
// Enterprise OIDC is discovery-driven: store only the issuer + client creds.
// The authorize/token/JWKS endpoints are resolved at runtime, and the id_token
// is verified in-house against the issuer's JWKS (RS256/ES256 — no 'jose' dep).
await ssoConnectionStore.saveConnection({
  type: 'oidc',
  organizationId: 'acme',
  connectionId: crypto.randomUUID(),
  enabled: true,
  config: {
    issuer: 'https://acme.okta.com',
    clientId: '…',
    clientSecret: '…',
    redirectUri: 'https://app.example.com/sso/oidc/acme/callback',
    scopes: ['openid', 'email', 'profile']
  },
  createdAt: Date.now(),
  updatedAt: Date.now()
});`;
export const ssoSaml = `\
// SAML XML-DSig is a security footgun, so the package never bundles a SAML lib.
// Supply a SamlAdapter wrapping a vetted dep (e.g. @node-saml/node-saml). The
// package owns route wiring, cookies, and session minting; the adapter owns XML.
await auth<User>({
  providersConfiguration: {},
  sso: {
    ssoConnectionStore,
    getSsoUser,
    samlAdapter: {
      createAuthorizationUrl: (req) => saml.getAuthorizeUrl(req),
      validateAssertion: (req) => saml.validatePostResponse(req),
      getServiceProviderMetadata: (req) => saml.getMetadata(req),
      // optional SLO methods enable signed Single Logout:
      createLogoutRequestUrl: (req) => saml.getLogoutUrl(req),
      validateLogoutRequest: (req) => saml.validateRedirect(req)
    }
  }
});

// Mounts GET /sso/saml/:org/authorize, POST /sso/saml/:org/acs,
// GET /sso/saml/:org/metadata, and the /logout + /slo Single-Logout endpoints.`;
export const ssoSamlIdp = `\
import {
  auth,
  createNeonSamlServiceProviderStore,
  samlIdpRoutes
} from '@absolutejs/auth';

// SAML 2.0 IdP role — the inverse of ssoSaml. The package is now the issuer of
// assertions to legacy SaaS relying parties (Salesforce, Workday, Concur — every
// app older than OIDC that still demands SAML SSO). Same delegation philosophy:
// you supply a SamlIdpAdapter wrapping a vetted XML-DSig library; the package
// owns route wiring + SP store + auto-POST form generation.
const samlServiceProviderStore = createNeonSamlServiceProviderStore(
  process.env.DATABASE_URL
);
await samlServiceProviderStore.saveServiceProvider({
  entityId: 'https://acme.salesforce.com',
  acsUrl: 'https://acme.salesforce.com/?so=00D...',
  certificate: '-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----'
});

const idpRoutes = samlIdpRoutes<User>({
  idpAdapter: yourSamlIdpAdapter, // wraps @node-saml/node-saml or samlify
  idpEntityId: 'https://id.yourapp.com/sso/saml/idp',
  samlServiceProviderStore,
  getNameId: (user) => user.email,
  getSamlAttributes: (user) => ({
    email: user.email,
    firstName: user.firstName,
    groups: user.groups
  }),
  loginUrl: '/signin'
});

// Mounts:
//   POST {ssoRoute}/saml/idp/sso                    (HTTP-POST binding)
//   GET  {ssoRoute}/saml/idp/sso                    (HTTP-Redirect binding)
//   GET  {ssoRoute}/saml/idp/sso/initiate?sp=...    (IdP-initiated SSO — no AuthnRequest)
//   GET  {ssoRoute}/saml/idp/metadata
//
// SP-initiated flow: parse the AuthnRequest twice (first to learn the Issuer,
// then with the SP's cert to verify the signature). Use the session if present;
// otherwise redirect to loginUrl with return_to. IdP-initiated flow: the user is
// already signed in to your app, they pick an SP, and the package POSTs the
// assertion straight to the SP's ACS URL.`;
