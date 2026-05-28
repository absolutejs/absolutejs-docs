export const syncSandboxQuickStart = `\
import { createSyncEngine, defineMutation } from '@absolutejs/sync/engine';

const engine = createSyncEngine();
engine.register(itemsCollection);

// String-form handler runs inside an @absolutejs/isolated-jsc Isolate.
// It can't reach the host's modules, closures, or globals — only the
// args / ctx clones and the actions bridge we pass in.
engine.registerMutation(defineMutation({
  name: 'addNote',
  sandboxedHandler: \`async (args, ctx, actions) => {
    if (typeof args.title !== 'string' || args.title.length === 0) {
      throw new Error('title required');
    }
    await actions.insert('notes', {
      id: crypto.randomUUID(),
      title: args.title.trim(),
      tenant: ctx.tenant,
    });
  }\`,
  sandbox: {
    backend: 'auto',       // FFI when libJSC reachable, Worker otherwise
    memoryLimit: 32,       // MB; isolate self-terminates on overage
    timeout: 5000,         // ms wall-clock per call
  },
}));

// Call exactly like a normal mutation — no API surface change.
await engine.runMutation('addNote', { title: 'first' }, { tenant: 'acme' });`;

export const syncSandboxConfig = `\
type SandboxConfig = {
  /** Heap memory cap (MB). Default 32. */
  memoryLimit?: number;
  /** Wall-clock cap per call (ms). Default 5000. */
  timeout?: number;
  /**
   * isolated-jsc backend. Defaults to 'auto' (FFI when libJSC is
   * reachable, Worker otherwise). Both backends now run the same
   * compileCallable-based hot path; pick by deployment context:
   *
   *   - 'worker': required if your handler needs Web APIs
   *     (URL, TextEncoder, WebSocket) — those live in the Bun-Worker
   *     environment, not the bare JSC C API.
   *   - 'ffi': bypass the auto-probe when you know libJSC is reachable
   *     (e.g. CI with a known image).
   *   - 'auto': default. ~6× faster cold spawn than Worker on Linux
   *     and macOS, comparable on warm dispatch.
   */
  backend?: 'auto' | 'ffi' | 'worker';
};`;

export const syncSandboxInstall = `\
# isolated-jsc is an OPTIONAL peer dep — the sandbox runner loads it
# lazily on first sandboxedHandler call, so apps that don't use one
# pay nothing.
bun add @absolutejs/isolated-jsc

# Linux only: libjavascriptcoregtk is needed for the FFI backend.
# Without it, the runner falls back to the Worker backend automatically.
sudo apt install libjavascriptcoregtk-4.1-0   # Ubuntu/Debian
# or:
sudo apt install libjavascriptcoregtk-6.0-1   # newer distros`;

export const syncSandboxBenchTable = `\
warm-dispatch p50 (sync 1.7.5 + isolated-jsc 0.8.x, WSL2, Bun 1.3.14):

  Lane                  Worker     FFI      ops/sec (best)
  --------------------- --------- --------- --------------
  Pure handler          0.09 ms   0.33 ms   7,364 (worker)
  actions.change        0.42 ms   0.92 ms   1,934 (worker)
  20-tenant cold spawn  35.4 ms   5.7 ms    6.2× (ffi wins)
                                            per-tenant

The 'auto' default lands on FFI for Linux/macOS deployments — comparable
warm dispatch, 6× faster cold spawn. Pin 'worker' only if your handler
needs Web APIs (URL, TextEncoder, WebSocket) or hammers a single isolate
with many awaited actions per call.`;

export const syncSandboxArchitecture = `\
// What the engine does the first time a sandboxedHandler mutation runs:
//
//   1. createIsolatedRunner({ policy, pool })
//      → creates a keyed pool of JSC VMs (Bun Worker on Worker backend,
//        libJSC via bun:ffi on FFI backend).
//
//   2. createContext()
//      → fresh global scope, hardened (no fetch, Bun, process, …).
//
//   3. setGlobal('__dispatch', new Reference(...))
//      → installs a SINGLE Reference that routes actions.* calls back to
//        the host. It closes over a per-mutation callMap, keyed by
//        a per-call integer callId. Concurrent calls are safe because
//        each has its own callId → its own actions slot.
//
//   4. runner.precompile(name, wrappedSource, { key })
//      → compiles ONCE per tenant/mutation key. The compiled function takes
//        (callId, args, ctx)
//        and builds the in-VM actions shim that dispatches through
//        __dispatch with its callId.
//
// Per call (after that):
//
//   const callId = nextCallId++;
//   callMap.set(callId, actions);
//   try {
//     return await runner.call(name, wrappedSource, [callId, args, ctx], {
//       key,
//       run: { timeout },
//     });
//   } finally {
//     callMap.delete(callId);
//   }
//
// Per-call hot path: one JSObjectCallAsFunction (FFI) or one postMessage
// (Worker). No per-call eval, no per-call setGlobal, no Reference alloc.`;

export const syncSandboxLimits = `\
// Things sandboxedHandler doesn't (and won't) do:
//
//   1. Host modules / closures
//      The string source evaluates inside the isolate's VM. It can't
//      import('your-helpers') or reference variables from the surrounding
//      file. Use the actions bridge for engine ops, ctx for per-request
//      data, and args for request input. That's the entire surface.
//
//   2. Web APIs on the FFI backend
//      URL, TextEncoder, WebSocket, structured-clone, Web Crypto — those
//      live in the Bun-Worker environment, not the JSC C API. On FFI
//      they're undefined. Pin sandbox: { backend: 'worker' } if you need
//      them. Math, JSON, Promise, the typed-array suite, setTimeout,
//      console all work on both backends.
//
//   3. Synchronous fetch / direct DB access
//      The sandbox is for logic, not capability bypass. If your handler
//      needs to query something the engine doesn't already give it,
//      either pre-fetch on the host and pass via args, or expose a
//      capability via ctx (it's structured-cloned in, so put plain data
//      not functions there).
//
//   4. Long-running work
//      Default timeout is 5000 ms wall-clock per call. On Worker the
//      isolate is terminated on timeout (next call respawns); on FFI a
//      TerminationException is thrown into the script and the isolate
//      keeps running. Either way the caller gets a TimeoutError.
//
//   5. Memory limit isn't a hard cap
//      Polled every 50 ms via bun:jsc.memoryUsage on Worker; checked by
//      JSC's watchdog on FFI. A burst above the limit between checks
//      can briefly exceed it before the isolate self-terminates. Set
//      generously — the default 32 MB is too small for many real
//      handlers; 128 is a more realistic starting point.`;

export const syncSandboxPerfArc = `\
// Five rounds of bench-driven optimization (full history in
// benchmarks/sync/RESULTS.md):
//
//   1.7.2  router Reference + reused context        FFI pure 4.69 → 2.47 ms
//   0.5    fold cleanup eval into read eval         (unwrap: 3 → 2 evals/call)
//   1.7.3  sync IIFE wrap (skip Promise for sync)   FFI pure 2.47 → 0.29 ms
//   0.5.1  microtask-first pump fast path           FFI actions 6.62 → 0.71 ms
//   0.6    Context.compileCallable primitive        per-call: no eval, no setGlobal
//   1.7.5  callId routing (dispatch installed once) FFI pure 0.96 → 0.33 ms
//
// Total: 14× faster on the pure FFI lane, 7× on actions FFI, 10× on
// pure Worker. The bench is the spec — 1.7.4 caught its own regression
// in the post-publish re-run, fixed same-day as 1.7.5.
//
// We're at the floor for the current architecture. Further wins would
// need Bun/JSC API-level work (shared event loops for cheaper async
// host-fn pumps). Until then, both backends sit at sub-millisecond p50
// for the warm cases that matter.`;
