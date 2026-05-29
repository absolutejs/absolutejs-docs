export const syncCodeModeFactory = `\
// @absolutejs/sync@1.10.0 — new /code-mode subpath.
import { createSyncEngine } from '@absolutejs/sync/engine';
import { engineMutationsAsHostTools } from '@absolutejs/sync/code-mode';
import { codeModeTool } from '@absolutejs/ai/tools';

const engine = createSyncEngine();
// ... registerMutation('comments:create', ...) etc. ...

// Wrap the engine's mutation surface as a Code Mode host-tool map.
const hostTools = engineMutationsAsHostTools<{ userId: string }>({
  engine,
  // Called ONCE per Code Mode invocation; threaded through every
  // mutation in that script.
  ctx: () => ({ userId: currentSessionUserId() }),
  mutations: [
    {
      name: 'comments:create',
      description: 'Post a comment on a resource.',
      tsSignature:
        '(args: { resourceId: string; body: string }) => ' +
        'Promise<{ id: string; body: string; authorId: string }>',
    },
    {
      name: 'comments:toggleReaction',
      description: 'Toggle an emoji reaction on a comment.',
      tsSignature:
        '(args: { commentId: string; emoji: string }) => ' +
        'Promise<{ added: boolean }>',
    },
  ],
});

// Plug the host-tool map into ai's codeModeTool. The model sees ONE
// tool called \`run_code\`; its description is the auto-generated
// prompt listing every host fn with its TS signature.
const aiTool = codeModeTool({ tools: hostTools });`;

export const syncCodeModeChain = `\
// What the model emits — one function body, multiple host calls,
// one returned value. The intermediate results never enter the
// conversation context.
const c = await comments_create({
  resourceId: 'shared-discussion',
  body: 'Looks great @alice!',
});
await comments_toggleReaction({ commentId: c.id, emoji: '🎉' });
log('done with', c.id);
return { commentId: c.id, body: c.body };`;

export const syncCodeModeNaming = `\
// Engine mutation names use \`:\` (e.g. 'comments:create') because
// they're addressing, not identifiers. The host-tool map auto-derives
// JS-safe names by replacing non-identifier chars with \`_\`:
//
//   'comments:create'          → comments_create
//   'comments:toggleReaction'  → comments_toggleReaction
//   'favorites:togglePin'      → favorites_togglePin
//
// Override per-mutation with \`hostFnName\` when the derived name would
// collide or when you want something terser for the model prompt:
{
  name: 'comments:create',
  description: 'Post a comment.',
  hostFnName: 'post_comment',
  tsSignature: '(args: { resourceId: string; body: string }) => Promise<Comment>',
}

// Build-time errors surface at boot, not at the first model call:
//   - "mutation 'never:registered' is not registered on the engine"
//   - "duplicate host-fn name 'comments_create'"`;

export const syncCodeModeSemantics = `\
// v0.1 partial-failure semantics — READ CAREFULLY.
//
// Each \`runMutation\` call in the model's script runs in its own DB
// transaction (the engine's per-call retry + tx wrapper). If
// mutation 3/5 throws, mutations 1–2 are already committed. The
// model gets the error and can decide whether to compensate (e.g.
// by calling a delete mutation in a follow-up turn).
//
// Cross-mutation atomicity (all-or-nothing across N runMutations) is
// NOT provided in v0.1. It would need a new engine batch primitive
// that holds one tx open across multiple handlers — a deliberate
// v0.2 followup. Shipping the v0.1 surface honestly beats promising
// transactional semantics the engine can't keep.
//
// In practice: design the host fns so each one is independently
// safe to commit. Idempotent mutations (e.g. favorites:toggle on
// a deterministic row id) make this easy.

// What the model sees if mutation 2 throws:
try {
  const c = await comments_create({ resourceId: 'r', body: '...' });
  await comments_toggleReaction({ commentId: c.id, emoji: '!!' });
  // Throws — reaction was rejected (e.g. emoji not in allowlist).
} catch (e) {
  log('rolling back:', e.message);
  // The comment was committed. We have to undo it explicitly.
  // (A delete mutation would go here in a real app.)
  return { error: e.message, partiallyCommitted: ['comment'] };
}`;

export const syncCodeModeDemo = `\
// Worked example in examples/sync — the React page's CodeModePanel
// posts to /sync/code-mode/run. The server wires the host-tool
// factory + codeModeTool inside the route handler.
.post(
  '/sync/code-mode/run',
  async ({ body }) => {
    ensureDemoUser(body.userId);   // host-side bookkeeping

    const hostTools = engineMutationsAsHostTools<{ userId: string }>({
      engine,
      ctx: () => ({ userId: body.userId }),
      mutations: [
        { name: 'comments:create',         description: '...', tsSignature: '...' },
        { name: 'comments:toggleReaction', description: '...', tsSignature: '...' },
        { name: 'favorites:toggle',        description: '...', tsSignature: '...' },
      ],
    });
    const tool = codeModeTool({ timeout: 5000, tools: hostTools });

    // codeModeTool returns a JSON string; parse for the client.
    const raw = await tool.handler({ code: body.code });
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  },
  { body: t.Object({ code: t.String(), userId: t.String() }) },
);`;
