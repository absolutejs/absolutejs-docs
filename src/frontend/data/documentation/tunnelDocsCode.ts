type TerminalSession = {
	command: string;
	output: string;
};

export const tunnelClientConfig = `\
// absolute.config.ts — point your dev server at the relay.
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  dev: {
    tunnel: {
      relay: 'https://my-relay-xxxxx.ondigitalocean.app',
      token: process.env.ABSOLUTE_TUNNEL_TOKEN // same secret as the relay
    }
  }
});`;
export const tunnelClientEnv = `\
# Or configure it entirely from the environment (no config edits):
ABSOLUTE_TUNNEL_RELAY=https://my-relay-xxxxx.ondigitalocean.app
ABSOLUTE_TUNNEL_TOKEN=<the same long random secret the relay uses>`;
export const tunnelDevOutput: TerminalSession = {
	command: 'bun run dev',
	output: `\
  ABSOLUTEJS v0.19.0  dev

  ➜  Local:   http://localhost:3000/
  ➜  Public:  https://my-relay-xxxxx.ondigitalocean.app/`
};
export const tunnelRelayCommand = `\
# The relay is a built-in CLI command — no app code to write.
absolute tunnel-relay

# It reads three env vars:
#   PORT                        (the public port; App Platform injects it)
#   ABSOLUTE_TUNNEL_TOKEN       (shared secret; the dev client must match)
#   ABSOLUTE_TUNNEL_PUBLIC_URL  (the relay's own public URL, optional)
#
# Single-tenant per token: one dev machine at a time. Give each developer
# their own relay (or token) if you need several.`;
export const tunnelRelayDeploy = `\
# 1. Put the relay template in its own git repo. It's a one-line app:
#    package.json -> "start": "absolute tunnel-relay"

# 2. Pick a long random shared secret (the dev client must present it):
openssl rand -hex 32

# 3. Deploy to any always-on host with a public URL. On DigitalOcean
#    App Platform (Docker source, http_port 8080):
doctl apps create --spec .do/app.yaml

# 4. After the first deploy you get a URL like
#    https://my-relay-xxxxx.ondigitalocean.app — set it as
#    ABSOLUTE_TUNNEL_PUBLIC_URL and redeploy.`;
export const tunnelSecurity = `\
// The relay is gated by the shared token. Treat it like a credential:
//   - Generate it with 'openssl rand -hex 32' (don't reuse).
//   - Keep it in .env, never commit it.
//   - Rotate it by changing both the relay env var and the dev client.
//
// The relay forwards EVERY public request to your local machine while
// 'bun run dev' is connected, so only run it during active development and
// stop the dev server when you're done. The relay is for dev ingress only —
// production traffic should hit your deployed app directly.`;
export const tunnelWebhookExample = `\
# Example: Twilio voice + SMS webhooks during local development.
# Point your number's webhooks at the Public URL the dev server printed:

#   Voice    A CALL COMES IN   ->  https://my-relay-xxxxx.ondigitalocean.app/v1/voice/phone/twiml
#   Messaging A MESSAGE COMES IN -> https://my-relay-xxxxx.ondigitalocean.app/v1/sms/intake

# Twilio's Media Streams (WSS) work too — the relay multiplexes the
# WebSocket back to your local server over the same control connection.
# Edit your handler, save, and the next call hits the new code instantly.`;
export const tunnelWhy = `\
# Your laptop is behind NAT — the internet can't reach it.
# Webhook providers (Twilio, Stripe, GitHub, OAuth callbacks) need a
# PUBLIC https URL to POST to. The usual options:
#
#   1. Deploy on every change         -> slow feedback loop
#   2. A third-party tunnel service   -> another dependency + account
#
# AbsoluteJS ships its own reverse tunnel instead: you run a tiny relay
# on any always-on host with a public URL, and 'bun run dev' dials OUT to
# it. The relay forwards public traffic back down that connection to your
# local server. Pure Bun, no third-party tunnel service.`;
