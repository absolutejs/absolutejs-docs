export const pluginsAlertSinks = `\
import {
  discordAlertPlugin,
  pagerdutyAlertPlugin,
  slackAlertPlugin
} from '@absolutejs/auth/plugins';

// Three audit sinks for the events you actually wake up for — login_failed_lockout,
// password_changed, mfa_disabled, impersonation_started, abuse_blocked, etc. Each
// plugin is a thin function (~20 LOC) that returns an AuditSink; you decide which
// events to forward by filtering in the auditSinks pipeline.
const slack = slackAlertPlugin({
  webhookUrl: process.env.SLACK_SECURITY_WEBHOOK,
  events: ['impersonation_started', 'mfa_disabled', 'login_failed_lockout']
});
const pagerduty = pagerdutyAlertPlugin({
  routingKey: process.env.PAGERDUTY_ROUTING_KEY,
  events: ['abuse_blocked'] // page on hostile traffic
});
const discord = discordAlertPlugin({
  webhookUrl: process.env.DISCORD_SECURITY_WEBHOOK
});

await auth<User>({
  providersConfiguration: {},
  audit: {
    auditStore: createNeonAuditStore(process.env.DATABASE_URL),
    sinks: [slack, pagerduty, discord]
  }
});`;
export const pluginsGeoDeny = `\
import {
  denyDisposableEmailPlugin,
  geoBlockPlugin
} from '@absolutejs/auth/plugins';

// denyDisposableEmail: drop signups from throwaway-mail providers (mailinator,
// 10minutemail, ...) — returns { allow, reason? }. Plug it into your register hook:
const checkEmail = denyDisposableEmailPlugin();
credentials: {
  // ...the rest of your credentials config
  onCreateCredentialUser: ({ email, ...extra }) => {
    const verdict = checkEmail(email);
    if (!verdict.allow) {
      throw new Error(verdict.reason ?? 'disposable_email');
    }
    return createUser({ email, ...extra });
  }
}

// geoBlock: allow / deny by ISO-3166 country code from any header signal you
// already have (cf-ipcountry, x-vercel-ip-country, x-client-country, ...). Returns
// (headers) => boolean — true means block. Pair with the abuse block's onRequest:
const blockedCountry = geoBlockPlugin({
  denyCountries: ['RU', 'KP', 'IR'] // or allowCountries: ['US', 'CA', 'GB']
});
abuse: {
  // ...the rest of your abuse config
  shouldBlock: (request) => blockedCountry(request.headers)
}`;
export const pluginsPosthog = `\
import { posthogIdentifyPlugin } from '@absolutejs/auth/plugins';

// posthogIdentify: stream every audit event into PostHog as $identify — login,
// MFA enrollment, password reset, impersonation, etc. — keyed by the audit
// event's userId. Returns an AuditSink, so it composes with the alert plugins.
await auth<User>({
  providersConfiguration: {},
  audit: {
    auditStore: createNeonAuditStore(process.env.DATABASE_URL),
    sinks: [
      slackAlertPlugin({ webhookUrl: process.env.SLACK_WEBHOOK }),
      posthogIdentifyPlugin({
        host: 'https://us.i.posthog.com',
        projectApiKey: process.env.POSTHOG_KEY
      })
    ]
  }
});`;
