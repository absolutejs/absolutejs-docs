/**
 * Code samples for the @absolutejs/mcp docs pages. The package serves a
 * remote Model Context Protocol endpoint — streamable HTTP, stateless —
 * from a tool/prompt/resource registry. The host supplies which tools to
 * expose and how to authorize a request into a caller; the package owns
 * the JSON-RPC protocol, protocol-version negotiation, RFC 9728 discovery
 * metadata, and the 401 challenge.
 */

export const mcpCapabilitiesGuards = `mcpServer<Caller>({
  // ...endpoint config as before

  // Refuse a single call before it runs (credits, rate limit). The
  // message comes back as an isError tool result the model can relay
  // to the user — not a crash, not a transport error.
  beforeCall: async ({ caller }) =>
    (await outOfCredits(caller))
      ? { block: 'Out of credits this cycle.' }
      : undefined,

  // Audit every call. \`meta\` carries whatever the tool handler wrote.
  onCall: ({ caller, name, ok, meta }) =>
    recordCall({ caller, name, ok, touched: meta.touched })
});`;
export const mcpCapabilitiesMeta = `// Each tools/call gets a fresh meta object shared between tools,
// beforeCall, and onCall. A tool handler can record what it touched,
// and your audit hook can read it back:
tools: ({ caller, meta }) =>
  buildAdminTools(caller, (memberId) => {
    meta.touched = memberId;
  }),
onCall: ({ meta, name, ok }) =>
  ledger.write({ tool: name, ok, member: meta.touched })`;
export const mcpCapabilitiesPrompts = `mcpServer<Caller>({
  // Server-side prompts: recipes the client shows in its picker.
  prompts: {
    definitions: {
      daily_briefing: {
        title: 'Daily briefing',
        description: 'Summarise what changed since yesterday.',
        arguments: [
          { description: 'Team to focus on', name: 'team', required: false }
        ]
      }
    },
    // Build the prompt text for prompts/get. Return null to fail the
    // request ("Prompt failed to build").
    get: async ({ name, args, caller }) => buildPromptText(name, args, caller)
  }
});`;
export const mcpCapabilitiesResources = `mcpServer<Caller>({
  // Readable resources, served on resources/list and resources/read.
  resources: {
    mimeType: 'text/markdown', // the default
    list: ({ caller }) => listResources(caller),
    read: ({ caller, uri }) => readResource(caller, uri) // string | null
  }
});`;
export const mcpCapabilitiesScopes = `// authorize returns the caller's scopes alongside the caller...
authorize: async (request) => {
  const token = await verifyBearer({
    request,
    issuer: 'https://your.app',
    requiredScope: 'mcp',
    verify: (jwt) => verifyJwt(jwt, publicJwk)
  });
  if ('error' in token) return { ok: false, reason: token.error };

  return {
    caller: { userId: token.subject },
    ok: true,
    scopes: token.scopes // parsed from the token's space-separated scope
  };
},

// ...and a tool with a \`scope\` is only listed and callable when the
// caller holds it. Tools without a scope are always available.
tools: () => ({
  delete_member: {
    description: 'Remove a member account.',
    inputSchema: { type: 'object' },
    scope: 'mcp:admin', // hidden from callers without this scope
    handler: async (args) => removeMember(args)
  }
})`;
export const mcpEndpointsChallenge = `# An unauthorized POST gets the RFC 9728 challenge...
$ curl -i -X POST https://your.app/mcp
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://your.app/.well-known/oauth-protected-resource/mcp"

# ...and the metadata document points the client at your
# authorization server.
$ curl https://your.app/.well-known/oauth-protected-resource/mcp
{
  "authorization_servers": ["https://your.app"],
  "resource": "https://your.app/mcp",
  "scopes_supported": ["openid", "mcp"]
}`;
export const mcpEndpointsQuickStart = `import { Elysia } from 'elysia';
import { mcpServer, verifyBearer } from '@absolutejs/mcp';
import { verifyJwt } from '@absolutejs/auth'; // or any JWT verifier

type Caller = { userId: string };

const server = new Elysia().use(
  mcpServer<Caller>({
    path: '/mcp',
    issuer: 'https://your.app',
    serverInfo: { name: 'your-app', title: 'Your App', version: '1.0.0' },
    instructions: 'What the model should know about this server.',
    scopesSupported: ['openid', 'mcp'],
    serveRootMetadata: true,

    // You decide who is allowed in. verifyBearer does the standard
    // OAuth access-token checks; add your own (billing, role, MFA)
    // on top.
    authorize: async (request) => {
      const token = await verifyBearer({
        request,
        issuer: 'https://your.app',
        requiredScope: 'mcp',
        verify: (jwt) => verifyJwt(jwt, publicJwk)
      });
      if ('error' in token) return { ok: false, reason: token.error };

      return { ok: true, caller: { userId: token.subject } };
    },

    // Called once per request; build the tools for this caller.
    tools: ({ caller }) => buildToolsFor(caller.userId)
  })
);`;
export const mcpEndpointsRawHandler = `import { createMcpHandler } from '@absolutejs/mcp';

// The same config, no Elysia: a single (request) => Response | null
// over web-standard Request/Response. Mount it on Bun.serve, a Hono
// route, a Next.js route handler, or Cloudflare Workers. It returns
// null when the request is not for an MCP route, so you can fall
// through to your own routing.
const mcp = createMcpHandler(config);

Bun.serve({
  fetch: async (request) =>
    (await mcp(request)) ?? new Response('Not found', { status: 404 })
});`;
export const mcpEndpointsRichResults = `tools: ({ caller }) => ({
  get_report: {
    description: 'Fetch the latest report.',
    inputSchema: { type: 'object' },
    // Behaviour hints, passed straight through on tools/list.
    annotations: { readOnlyHint: true, title: 'Get report' },
    // JSON Schema for structuredContent, advertised on tools/list.
    outputSchema: {
      properties: { revenue: { type: 'number' } },
      type: 'object'
    },
    // A handler may return a bare string (wrapped as one text block),
    // an array of content blocks, or a full McpToolResult.
    handler: async () => [
      { text: 'Q2 revenue is up 14%.', type: 'text' },
      { data: chartBase64, mimeType: 'image/png', type: 'image' },
      { name: 'Full report', type: 'resource_link', uri: 'report://q2' }
    ]
  }
})`;
export const mcpEndpointsSecondEndpoint = `// mcpServer is per-endpoint, so an admin console is the same call
// with a different scope, a stricter authorize (role + MFA + a kill
// switch, re-checked live), a rate-limit beforeCall, and an audit
// onCall.
app.use(mcpServer({ path: '/mcp' /* member */ })).use(
  mcpServer({
    path: '/mcp/admin',
    scopesSupported: ['openid', 'mcp:admin'] /* stricter */
  })
);`;
export const mcpFeedbackClient = `import { createMcpClient } from '@absolutejs/mcp';

const client = createMcpClient({
  url: 'https://their.app/mcp',
  headers: { authorization: \`Bearer \${accessToken}\` },
  // Passing onElicit is what declares the elicitation capability —
  // omit it and servers are told you cannot ask anyone. Return
  // decline (the user said no) or cancel (they dismissed it);
  // NEVER fabricate content on the user's behalf.
  onElicit: async (request) => askTheUser(request)
});

await client.initialize();
const tools = await client.listTools(); // follows nextCursor paging
const result = await client.callTool('book_table', { people: 4 });`;
export const mcpFeedbackElicitation = `mcpServer<Caller>({
  elicitation: { enabled: true },
  tools: () => ({
    book_table: {
      description: 'Book a table.',
      inputSchema: { type: 'object' },
      mayElicit: true, // opt in: this tool may ask
      handler: async (args, { canElicit, elicit }) => {
        if (!canElicit) return 'Tell me the party size first.';
        const answer = await elicit({
          message: 'How many people?',
          requestedSchema: {
            type: 'object',
            properties: { people: { type: 'integer', minimum: 1 } },
            required: ['people']
          }
        });
        if (answer.action !== 'accept') return 'No problem — cancelled.';

        return \`Booked for \${answer.content.people}.\`;
      }
    }
  })
});`;
export const mcpFeedbackMultiInstance = `elicitation: {
  enabled: true,
  // (1) The client initializes on A and calls a tool on B, which has
  //     never heard of the session. Put session state where every
  //     instance sees it. It is an id and a boolean — nothing
  //     sensitive, nothing large.
  store: {
    create: ({ canElicit }) => db.insertSession(canElicit), // → id
    get: (id) => db.findSession(id), // → { canElicit } | null
    drop: (id) => db.deleteSession(id)
  },
  // (2) The tool call and its question live on ONE instance, but the
  //     user's answer POST can land on any of them. A promise cannot
  //     move, so route the answer to the instance that is waiting —
  //     over whatever fan-out you already run (Postgres
  //     LISTEN/NOTIFY, Redis, ...).
  bus: {
    publish: (answer) => notify('mcp_elicit', answer),
    subscribe: (handler) => listen('mcp_elicit', handler)
  },
  // How long a question waits for a human before it gives up
  // (default 2 minutes).
  timeoutMs: 120000
}`;
export const mcpFeedbackTools = `import { feedbackTools, FEEDBACK_INSTRUCTIONS } from '@absolutejs/mcp';

mcpServer<Caller>({
  instructions: \`\${myInstructions} \${FEEDBACK_INSTRUCTIONS}\`,
  tools: ({ caller }) => ({
    ...myTools(caller),
    ...feedbackTools({
      caller,
      store: {
        // Each handler returns the sentence the model relays back to
        // the user — a ticket id, an SLA, a thank-you. Return nothing
        // and a sensible default is used.
        reportProblem: ({ caller, report }) => file(caller, report),
        submitFeedback: ({ caller, feedback }) => record(caller, feedback)
      }
    })
  })
});`;
