export const otelWireup = `\
// 0.35.0 ships OpenTelemetry instrumentation behind a single optional
// peer dependency. Install @opentelemetry/api alongside any exporter
// (Jaeger, Tempo, Honeycomb, Datadog, etc.) and the package emits a
// span per auth surface — no other config needed.
//
// Spans cover: authorize, callback, token, signin, signup, MFA
// challenge/verify, refresh, revoke, webhook delivery, FGA check.

import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  serviceName: 'my-app',
  traceExporter: new OTLPTraceExporter({ url: process.env.OTEL_ENDPOINT })
});
await sdk.start();

// Nothing else to do — every call into @absolutejs/auth shows up in
// your tracing backend. Spans carry attributes like \`auth.client_id\`,
// \`auth.user_sub\`, \`auth.scopes\`, \`auth.grant_type\`.`;

export const zeroCost = `\
// The dynamic import keeps non-tracing consumers paying nothing. If
// @opentelemetry/api isn't installed, every span call short-circuits
// at the first await and never loads the module. Same pattern the
// SDK uses for its other optional peer deps (passkey browser, etc.).
//
// This means you can ship a production app with no observability
// dependency at all — and add OTel later by installing one package.`;
