/**
 * Content for the @absolutejs/telemetry docs page. A shared
 * OpenTelemetry layer — type-replicated, peer-dep-free, opt-in via
 * tracerProvider. Distinct from the CLI telemetry opt-out page.
 */

export const telemetryQuickStart = `import { createSyncEngine } from '@absolutejs/sync';
import { trace, NodeTracerProvider } from '@opentelemetry/sdk-trace-node';

// Wire any standard OTel provider to an AbsoluteJS package:
const provider = new NodeTracerProvider();
provider.register();

const engine = createSyncEngine({ tracerProvider: provider });

// With no tracerProvider, the package uses a noop tracer. Spans are
// emitted regardless — the noop drops them; a real provider records
// them. No code path branches on "is OTel installed."`;
export const telemetryReadActive = `import { readActiveTraceId } from '@absolutejs/telemetry';

const traceId = await readActiveTraceId();
log.error({ traceId, err }, 'failed to process job');`;
export const telemetryTracerOrNoop = `import { ABS_ATTRS, tracerOrNoop } from '@absolutejs/telemetry';

const tracer = tracerOrNoop(
  options.tracerProvider,    // user-supplied; may be undefined
  '@absolutejs/<pkg-name>'   // tracer name (becomes resource.name)
);

// Then in code:
const span = tracer.startSpan('sync.runMutation', {
  attributes: {
    [ABS_ATTRS.tenant]: ctx.tenantId,
    [ABS_ATTRS.mutation]: name,
  },
});
try {
  // …work…
  span.setStatus({ code: 1 /* OK */ });
} catch (e) {
  span.recordException(e);
  span.setStatus({ code: 2 /* ERROR */, message: String(e) });
  throw e;
} finally {
  span.end();
}`;
export const telemetryWithSpan = `import { withSpan, ABS_ATTRS } from '@absolutejs/telemetry';

const result = await withSpan(
  tracer,
  'sync.runMutation',
  { attributes: { [ABS_ATTRS.mutation]: name } },
  async (span) => {
    span.setAttribute(ABS_ATTRS.mutationAttempt, attempt);
    return await invoke(args);
  }
);`;
