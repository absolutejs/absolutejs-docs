export const cibaApproval = `\
// In your approval UI, the user clicks Approve / Deny — call into
// the package's imperative API to record the decision.

import {
  approveBackchannelAuth,
  denyBackchannelAuth
} from '@absolutejs/auth';

// Approve route handler
app.post('/approve/:authReqId', async ({ params, store }) => {
  await approveBackchannelAuth({
    authReqId: params.authReqId,
    config: oidcConfig
  });
  return { ok: true };
});

// The client's next poll on /oauth2/token receives the token set.`;
export const cibaConfig = `\
// 0.36.0 adds OpenID Client-Initiated Backchannel Authentication
// (CIBA) — the "approve on your phone" flow used by banking, healthcare,
// and call-center scenarios where the user isn't at a browser.
//
// Poll-mode only in this release: the client polls /token until the
// user approves. Ping + push modes follow when a consumer asks.

import { auth, createInMemoryBackchannelAuthStore } from '@absolutejs/auth';

const app = await auth({
  oidc: {
    // ... your usual OIDC config
    backchannelAuthStore: createInMemoryBackchannelAuthStore(),

    // Resolve "who is the user from this login_hint?" The hint can be
    // an email, phone, external id — whatever your customers send.
    resolveBackchannelUser: async ({ loginHint }) => {
      const user = await myDb.findUserByEmail(loginHint);
      return user ? { sub: user.id } : undefined;
    },

    // Out-of-band: push a notification to the user's second device so
    // they can approve. The package never owns this transport — we
    // hand you the context, you wire your FCM / APNs / SMS / email.
    onBackchannelAuthRequest: async (context) => {
      await myPushService.send(context.userSub, {
        title: 'Approve sign-in?',
        bindingMessage: context.bindingMessage
      });
    }
  }
});`;
export const cibaFlow = `\
# 1. Client (RP) initiates the flow:
POST /oauth2/bc-authorize
  client_id=acme-rp
  login_hint=alice@example.com
  binding_message="Transfer $500 to Bob?"
  scope=openid

# Returns:
{ "auth_req_id": "urn:...", "expires_in": 300, "interval": 5 }

# 2. Client polls /token with the CIBA grant:
POST /oauth2/token
  client_id=acme-rp
  client_secret=...
  grant_type=urn:openid:params:grant-type:ciba
  auth_req_id=urn:...

# 3. Responses progress:
#    { "error": "authorization_pending" }  — user hasn't decided yet
#    { "error": "slow_down" }               — polling too fast
#    { "access_token": "...", "id_token": "...", ... }  — approved
#    { "error": "access_denied" }           — rejected
#    { "error": "expired_token" }           — TTL elapsed`;
