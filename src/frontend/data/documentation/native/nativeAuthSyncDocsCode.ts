export const authPageCode = `\
import { createAuthClient } from '@absolutejs/auth/client';

const authClient = createAuthClient();

// In the app this opens your sign-in page in the system browser,
// with the email filled in, and returns once the user is signed in.
await authClient.signIn.email({ email, password });

const { data } = await authClient.status();
const signedIn = Boolean(data?.user);

await authClient.signOut();`;
export const authServerSetup = `\
import { auth } from '@absolutejs/auth';

const authApplication = await auth({
  getUser,
  providersConfiguration,
  oidc: {
    // ...your issuer configuration
    socketTicketStore // lets Sync open authenticated sockets from the app
  }
});`;
export const httpPageCode = `\
import { AbsoluteHttpError, http } from '@absolutejs/http';

type Order = { id: string; total: number };

try {
  const orders = await http.get<Order[]>('/api/orders');
  render(orders);
} catch (error) {
  if (error instanceof AbsoluteHttpError && error.status === 401) showSignIn();
  else throw error;
}`;
export const syncEvents = `\
addEventListener('absolute:sync-status', (event) => {
  const { connection, pending, deadLetters } = event.detail;
  showSyncBadge({ connection, pending, failed: deadLetters });
});

addEventListener('absolute:sync-schema', (event) => {
  if (event.detail.state === 'failed') showUpdateRequired(event.detail.code);
});`;
export const syncLocalSchema = `\
{
  "absolutejs": {
    "sync": {
      "localSchema": {
        "version": 2,
        "migrations": [
          {
            "toVersion": 2,
            "operations": [
              { "type": "rename-field", "collection": "orders", "from": "sum", "to": "total" }
            ]
          }
        ],
        "localData": {
          "collections": [
            {
              "match": "orders",
              "sensitivity": "private",
              "protection": "required",
              "onProtectionUnavailable": "memory-only",
              "evictionPriority": "critical"
            },
            {
              "match": "catalog*",
              "sensitivity": "public",
              "protection": "none",
              "evictionPriority": "disposable",
              "maxAgeMs": 604800000
            }
          ],
          "mutations": [
            {
              "match": "createOrder",
              "sensitivity": "private",
              "protection": "required",
              "conflict": { "strategy": "client-wins", "maxAttempts": 5 }
            }
          ],
          "maxBytesPerNamespace": 52428800
        }
      }
    }
  }
}`;
export const syncPageCode = `\
import { createSyncCollection } from '@absolutejs/sync/client';

const orders = createSyncCollection({
  url: 'wss://shop.example.com/sync/ws',
  collection: 'orders',
  params: { status: 'open' }
});

orders.subscribe((state) => render(state.data));

// Applied on screen immediately, queued while offline,
// and reconciled with the server when the app reconnects.
await orders.mutate({
  name: 'createOrder',
  args: { total: 42 },
  optimistic: (draft) => draft.set({ id: tempId, total: 42, status: 'open' })
});`;
export const syncRemediation = `\
import { getAbsoluteMobileSyncRemediation } from '@absolutejs/absolute/mobile';

const remediation = getAbsoluteMobileSyncRemediation();
if (remediation) {
  const { deadLetters } = await remediation.inspect();
  for (const failed of deadLetters) {
    if (failed.kind === 'retryable') await remediation.retry(failed.operationId);
    else if (failed.kind === 'conflict') showConflict(failed);
  }
}`;
