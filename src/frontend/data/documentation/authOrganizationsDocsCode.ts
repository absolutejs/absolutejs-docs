export const invitations = `\
// The same flow is available as pure, reusable operations (e.g. to seed an org
// during signup) — no HTTP layer required:
import {
  createOrganization,
  inviteToOrganization,
  acceptInvitation
} from '@absolutejs/auth';

const org = await createOrganization({
  organizationStore,
  name: 'Acme',
  ownerUserId: user.sub
});

const { token } = await inviteToOrganization({
  organizationStore,
  organizationId: org.organizationId,
  email: 'teammate@acme.com',
  roles: ['member']
});

// The invitee accepts (single-use, hashed-at-rest token) -> active membership:
await acceptInvitation({ organizationStore, token, userId: invitee.sub });`;
export const organizationsSetup = `\
import { auth, createNeonOrganizationStore } from '@absolutejs/auth';

await auth<User>({
  providersConfiguration: {},
  organizations: {
    organizationStore: createNeonOrganizationStore(process.env.DATABASE_URL),
    getUserId: (user) => user.sub,
    onSendInvitation: ({ email, token, organizationId }) =>
      sendInviteEmail(email, organizationId, token)
  }
});

// Mounts: GET  /auth/organizations            (the caller's orgs)
//         POST /auth/organizations            (create -> caller becomes owner)
//         POST /auth/organizations/:org/invitations
//         POST /auth/organizations/invitations/accept   { token }
//         GET/DELETE members + invitations    (gated to active members)`;
export const protectPermissionUsage = `\
// auth() exposes a protectPermission derive alongside protectRoute. It delegates
// the decision to your hasPermission hook: 401 when unauthenticated, 403 when
// denied (denials emit an authorization_denied audit event).
app.get('/org/:organizationId/billing', ({ params, protectPermission }) =>
  protectPermission(
    { organizationId: params.organizationId, permission: 'billing:read' },
    (user) => getBilling(params.organizationId)
  )
);`;
export const rolesResolver = `\
import {
  auth,
  createNeonRoleStore,
  createMembershipPermissionResolver
} from '@absolutejs/auth';

const roleStore = createNeonRoleStore(process.env.DATABASE_URL);

await auth<User>({
  providersConfiguration: {},
  organizations: { organizationStore, getUserId },
  roles: { roleStore, organizationStore, getUserId },
  // Turnkey RBAC: a member's org-scoped roles resolve to permissions.
  authorization: {
    hasPermission: createMembershipPermissionResolver({
      getUserId,
      organizationStore,
      roleStore
    })
  }
});

// Define roles (org-scoped or global). A '*' permission grants everything:
await roleStore.saveRole({
  slug: 'admin',
  organizationId: 'acme',
  permissions: ['billing:read', 'billing:write', 'members:manage'],
  createdAt: Date.now(),
  updatedAt: Date.now()
});`;
