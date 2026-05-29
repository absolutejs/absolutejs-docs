export const syncUnsafeHostSignature = `\
// Without an unsafeHost map, the sandbox is hermetic — the wrapped
// signature is still 4-arity but the 4th param's Proxy throws on every
// access. This is BY DESIGN: a sandboxed handler with no opt-in can't
// reach the outside world by accident.
defineMutation({
  name: 'safe:doWork',
  sandboxedHandler: \`async (args, ctx, actions, unsafeHost) => {
    // unsafeHost.anything() throws "not declared" — there's no map.
    await actions.insert('items', { ...args, status: 'done' });
    return { ok: true };
  }\`,
});

// Opting in is explicit. Each entry the model can call must be NAMED
// here. The names you pick are what shows up in the handler source —
// so name them visibly: chargeStripe, sendSlackPing, pushToSqs.
defineMutation({
  name: 'payments:checkout',
  sandboxedHandler: \`async (args, ctx, actions, unsafeHost) => {
    const order = await actions.insert('orders', {
      ...args, status: 'pending',
    });
    const receipt = await unsafeHost.chargeStripe({
      amount: order.amount,
      token: args.token,
    });
    await actions.update('orders', {
      id: order.id, status: 'paid', receiptId: receipt.id,
    });
    return order;
  }\`,
  sandbox: {
    unsafeHost: {
      chargeStripe: ({ amount, token }) =>
        stripe.charges.create({ amount, source: token }),
      // Add more as needed. Each name is a hole in the sandbox.
    },
  },
});`;

export const syncUnsafeHostName = `\
// The name was chosen deliberately to be LOUD. The alternatives we
// considered and rejected:
//
//   ctx.runAction(...)  // Convex's name — opaque, hides the danger
//   host.fnName(...)    // too generic, doesn't say what changes
//   escape.fnName(...)  // doesn't describe the surface
//   effects.fnName(...) // hides the "you broke determinism" angle
//
// 'unsafeHost' is the right name because every time it appears in
// source code, the reader knows:
//
//   - "Host" — this leaves the sandbox.
//   - "Unsafe" — the deterministic-mutation guarantees stop here.
//
// Three syllables in a code-review diff. Easy to grep for in CI
// (\`grep -r 'unsafeHost\\.' src/\`). Easy to enforce a policy that
// every entry in the unsafeHost map needs a security review.`;

export const syncUnsafeHostRetry = `\
// Retry-fires-twice pitfall. The sandbox runs inside the engine's
// per-call retry + DB-transaction wrapper. If the handler throws AFTER
// an unsafeHost call has already run AND the engine retries, the
// host fn fires AGAIN. The mutation's writes are transactional and
// safe; the host fn is not.
//
// Options, in order of preference:
//
// 1. Make the host fn idempotent at the protocol layer.
//    Stripe takes an Idempotency-Key header that returns the same
//    response for the same key — pass args.orderId.
defineMutation({
  name: 'payments:checkout',
  retry: { maxAttempts: 3 },
  sandboxedHandler: \`async (args, ctx, actions, unsafeHost) => {
    const order = await actions.insert('orders', { ...args });
    // Same orderId every attempt → Stripe returns the cached response.
    const receipt = await unsafeHost.chargeStripe({
      idempotencyKey: order.id,
      amount: order.amount,
      token: args.token,
    });
    await actions.update('orders', { id: order.id, status: 'paid' });
    return order;
  }\`,
  sandbox: {
    unsafeHost: {
      chargeStripe: ({ idempotencyKey, amount, token }) =>
        stripe.charges.create(
          { amount, source: token },
          { idempotencyKey },
        ),
    },
  },
});

// 2. Skip retries for the mutation.
//    Remove the retry option — the engine commits once, fails loudly
//    on conflict. Best when the host fn has no idempotency story.
//
// 3. Move it to a separate workflow.
//    If the host fn fundamentally shouldn't retry, model it as a
//    follow-up step (a schedule, a job, an HTTP-route side effect)
//    that runs AFTER the mutation commits. The mutation's writes are
//    safely atomic; the host call sits outside the transaction loop.`;

export const syncUnsafeHostErrors = `\
// Failure modes are explicit.
//
// 1. Undeclared name. The sandbox-side Proxy lets you access any
//    property, but the engine refuses anything not in your config:
defineMutation({
  name: 'badEscape',
  sandboxedHandler: \`async (args, ctx, actions, unsafeHost) => {
    return await unsafeHost.notDeclared({ x: 1 });
  }\`,
  sandbox: { unsafeHost: { onlyThis: () => 'ok' } },
});
//   → throws: "sandboxedHandler called unsafeHost.notDeclared() but
//     it was not declared in the mutation's sandbox.unsafeHost
//     config. Declare it (and only the host fns you intend to expose)
//     to opt in to the escape hatch."
//
// 2. Host fn throws. The thrown error structured-clones across the
//    isolate boundary and reaches the handler as a normal JS Error.
//    Use try/catch in the sandbox source — same shape as catching a
//    fetch failure.
defineMutation({
  name: 'payments:checkout',
  sandboxedHandler: \`async (args, ctx, actions, unsafeHost) => {
    try {
      const receipt = await unsafeHost.chargeStripe(args);
      await actions.update('orders', { id: args.orderId, status: 'paid' });
      return { ok: true, receipt };
    } catch (e) {
      await actions.update('orders', { id: args.orderId, status: 'failed' });
      return { ok: false, error: e.message };
    }
  }\`,
  sandbox: { unsafeHost: { chargeStripe: stripeChargeFn } },
});`;
