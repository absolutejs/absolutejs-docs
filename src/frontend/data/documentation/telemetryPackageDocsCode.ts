/**
 * Content for the @absolutejs/telemetry docs page. The substrate's
 * OpenTelemetry surface — type-replicated, peer-dep-free, opt-in via
 * tracerProvider. Distinct from the CLI telemetry opt-out page.
 */

export const telemetryQuickStart = `import { createSyncEngine } from '@absolutejs/sync';
import { trace, NodeTracerProvider } from '@opentelemetry/sdk-trace-node';

// Wire any standard OTel provider to your substrate package:
const provider = new NodeTracerProvider();
provider.register();

const engine = createSyncEngine({ tracerProvider: provider });

// With no tracerProvider, every substrate package uses a noop tracer.
// Spans are emitted regardless — the noop drops them; a real provider
// records them. No code path branches on \"is OTel installed.\"`;

export const telemetryWhy = `# Why a separate telemetry package

  Every substrate library wants to emit OTel spans without forcing
  consumers to install @opentelemetry/api. @absolutejs/telemetry is
  the shared layer that lets every package say "trace this if a
  provider is wired, otherwise no-op."

  Three properties make it work:

  1. Type-replicated OTel surface. The Tracer / Span / TracerProvider
     types match @opentelemetry/api's structural shape — a NodeTracer
     provider plugs in without an adapter. We do NOT take
     @opentelemetry/api as a peer-dep; the types are duplicated and
     structurally compatible.

  2. A noop tracer that returns no-op spans. Calling startSpan()
     without a provider is a no-allocation pass-through.
     tracerOrNoop(provider, name) is the single entry point every
     substrate package uses.

  3. ABS_ATTRS semantic conventions. Standard attribute names
     (abs.tenant, abs.engine.id, abs.collection, …) so spans from
     different substrate packages correlate via consistent keys.

  Pre-G2 every substrate package would have either (a) reinvented
  noop spans inline, or (b) forced @opentelemetry/api as a hard dep.
  Both lose.`;

export const telemetryTracerOrNoop = `# tracerOrNoop — the canonical entry point

  Every substrate package's tracer line looks the same:

    import { tracerOrNoop } from '@absolutejs/telemetry';

    const tracer = tracerOrNoop(
      options.tracerProvider,           // user-supplied; may be undefined
      '@absolutejs/<pkg-name>'          // tracer name (becomes resource.name)
    );

  - Provider undefined → returns the shared noop tracer. Zero
    allocations, no-op spans.
  - Provider defined   → returns provider.getTracer(name, version).
    Any OTel-compatible provider works (NodeTracerProvider, the
    OpenTelemetry Collector SDK, a custom one).

  Then in code:

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

export const telemetryWithSpan = `# withSpan — the common pattern, wrapped

  Most call sites repeat the same try/finally pattern. withSpan
  collapses it into a single async wrapper that captures success /
  error status automatically:

    import { withSpan, ABS_ATTRS } from '@absolutejs/telemetry';

    const result = await withSpan(
      tracer,
      'sync.runMutation',
      { attributes: { [ABS_ATTRS.mutation]: name } },
      async (span) => {
        span.setAttribute(ABS_ATTRS.mutationAttempt, attempt);
        return await invoke(args);
      }
    );

  - OK status set on resolve.
  - exception recorded + ERROR status + rethrow on reject.
  - span.end() called in finally.

  A withSpanSync variant exists for the same pattern in synchronous
  code paths.`;

export const telemetryAbsAttrs = `# ABS_ATTRS — shared semantic conventions

  Every substrate package uses the SAME attribute keys so spans across
  packages correlate without per-package translation:

    abs.tenant                  → tenant / shard key (universal)
    abs.shard.id                → cluster member id

    // sync
    abs.engine.id, abs.collection, abs.mutation,
    abs.mutation.attempt, abs.subscription.id, abs.batch.size,
    abs.cluster.origin

    // queue
    abs.job.id, abs.job.kind, abs.job.attempt,
    abs.job.max_attempts, abs.worker.id

    // runtime
    abs.runtime.key, abs.runtime.pid, abs.runtime.port,
    abs.runtime.exit_reason, abs.runtime.readiness_ms

    // router
    abs.route.shard, abs.route.decision

    // secrets
    abs.secret.name, abs.secret.fingerprint

    // audit
    abs.audit.kind

  Use them as TypeScript keys, not raw strings — ABS_ATTRS.tenant is
  type-checked; 'abs.tenant' is a typo waiting to happen:

    span.setAttribute(ABS_ATTRS.tenant, ctx.tenantId);`;

export const telemetryReadActive = `# readActiveTraceId — correlate logs to traces

  When you want the active trace id in a non-OTel surface (a log
  line, an audit event, an error response), readActiveTraceId() does
  the dynamic import dance for you:

    import { readActiveTraceId } from '@absolutejs/telemetry';

    const traceId = await readActiveTraceId();
    log.error({ traceId, err }, 'failed to process job');

  Implementation detail: the module specifier is built at runtime
  (['@opentelemetry', 'api'].join('/')) so bundlers don't statically
  resolve @opentelemetry/api as a hard dep. Returns undefined when
  @opentelemetry/api isn't installed or no active context exists.

  The same trick powers tracerOrNoop's optional provider — telemetry
  remains peer-dep-free for consumers who don't run OTel.`;

export const telemetryCoverage = `# What's already instrumented

  G2 closed across the substrate: every package below already calls
  tracerOrNoop and emits spans with ABS_ATTRS keys. You wire ONE
  TracerProvider on your app and every span lights up.

    @absolutejs/sync         → sync.runMutation, sync.subscribe,
                               sync.applyChange, sync.cluster.publish
    @absolutejs/queue        → queue.enqueue, queue.worker.process,
                               queue.worker.retry
    @absolutejs/runtime      → runtime.spawn, runtime.exit,
                               runtime.health-check
    @absolutejs/router       → router.route (decision attr),
                               router.shard-resolve
    @absolutejs/secrets      → secrets.read, secrets.rotate
    @absolutejs/rate-limit   → rate-limit.check, rate-limit.block
    @absolutejs/isolated-jsc → isolate.spawn, isolate.invoke,
                               isolate.hibernate, isolate.resume

  Every span carries abs.tenant when available, so a single trace
  view can filter "show me everything for tenant-7."`;
