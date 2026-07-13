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
