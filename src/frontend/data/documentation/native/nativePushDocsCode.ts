export const localNotificationSchedule = `\
import { localNotifications } from '@absolutejs/devices';

const permission = await localNotifications.requestPermission();
if (permission.state === 'granted') {
  await localNotifications.schedule({
    id: 7,
    title: 'Pickup reminder',
    body: 'Your order is ready at 5 pm.',
    scheduledAtMs: pickupTime - 30 * 60 * 1000
  });
}`;
export const pushAuthConfig = `\
import { auth } from '@absolutejs/auth';
import { pushLifecycle } from './push';

const authApplication = await auth({
  getUser,
  providersConfiguration,
  oidc: oidcConfiguration,
  push: {
    registrar: pushLifecycle,
    tenant: (principal) => principal.user.organizationId,
    topics: (principal) => ['orders', \`store:\${principal.user.storeId}\`]
  }
});`;
export const pushEnable = `\
import { pushNotifications } from '@absolutejs/devices';

// From a "Turn on notifications" button. Asks for permission if it
// has not been asked yet, then registers this device with your server.
await pushNotifications.enable();

// Stop sending to this device.
await pushNotifications.disable();`;
export const pushLifecycleSetup = `\
import { createPushLifecycle } from '@absolutejs/dispatch';
import { createApnsAdapter } from '@absolutejs/dispatch-apns';
import { createFcmAdapter } from '@absolutejs/dispatch-fcm';
import {
  createPostgresPushFanoutClaimStore,
  createPostgresPushSubscriptionStore
} from '@absolutejs/dispatch-push-postgres';
import { createWebPush } from '@absolutejs/pwa';
import { createWebPushDispatchAdapter } from '@absolutejs/pwa/dispatch';
import {
  createPostgresIdempotentOperationStore,
  createPostgresTransactionRunner
} from '@absolutejs/reliability';

const apns = createApnsAdapter({
  bundleId: 'com.example.shop',
  keyId: process.env.APNS_KEY_ID!,
  privateKey: process.env.APNS_PRIVATE_KEY!,
  teamId: process.env.APNS_TEAM_ID!
});
const fcm = createFcmAdapter({ projectId: process.env.FCM_PROJECT_ID! });
const webPush = createWebPush({
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
  subject: 'mailto:alerts@example.com'
});

const runner = createPostgresTransactionRunner(pool);

export const pushLifecycle = createPushLifecycle({
  adapterFor: (subscription) => {
    if (subscription.platform === 'apns') return apns;
    if (subscription.platform === 'fcm') return fcm;

    return createWebPushDispatchAdapter(webPush, subscription);
  },
  claimStore: createPostgresPushFanoutClaimStore(
    createPostgresIdempotentOperationStore(runner)
  ),
  store: createPostgresPushSubscriptionStore(runner)
});`;
export const pushMobileConfig = `\
mobile: {
  appId: 'com.example.shop',
  appName: 'Shop',
  server: { productionOrigin: 'https://shop.example.com' },
  pushNotifications: {
    android: { googleServicesFile: 'google-services.json' } // the default path
  }
}`;
export const pushPwaConfig = `\
// absolute.config.ts: turn on the installable web app
pwa: {
  manifest: {
    name: 'Shop',
    shortName: 'Shop',
    icons: [{ src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }]
  }
}

// .env: the public key is built into the page; the private key stays on the server
// VAPID_PUBLIC_KEY=...
// VAPID_PRIVATE_KEY=...`;
export const pushReceive = `\
import { pushNotifications } from '@absolutejs/devices';

// A notification arrived while the app was open.
const stopReceived = await pushNotifications.onReceived((notification) => {
  showToast(notification.title, notification.body);
});

// One of your notification's action buttons was pressed. A plain tap
// already opens the notification's deepLink inside the app.
const stopActions = await pushNotifications.onAction(({ actionId, notification }) => {
  if (actionId === 'archive') archiveOrder(notification.data.orderId);
});

// When the component unmounts
await stopReceived();
await stopActions();`;
export const pushSend = `\
// Every device of one user
await pushLifecycle.send(
  { tenant: 'acme', userId: order.customerId },
  {
    title: 'Your order shipped',
    body: 'Arriving Thursday.',
    deepLink: '/orders/' + order.id,
    idempotencyKey: \`order:\${order.id}:shipped\`
  }
);

// Everyone subscribed to a topic
await pushLifecycle.send(
  { tenant: 'acme', topic: 'orders' },
  { title: 'New order', body: 'Order 1042 is waiting.' }
);`;
