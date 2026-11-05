export const isolateCapabilities = `export default {
  async fetch(request: Request, env: Env) {
    const { rows } = await env.database.execute(
      'select id, name from products where id = $1',
      [new URL(request.url).searchParams.get('id')]
    );
    const rates = await env.fetch('https://api.example.com/rates');

    return Response.json({ rates: JSON.parse(rates.body), rows });
  }
};`;

export const isolateDeclaration = `{
  "version": 1,
  "runtime": {
    "tier": "isolate",
    "contract": "fetch-v1",
    "entrypoint": "src/handler.ts"
  }
}`;

export const isolateHandler = `export default {
  async fetch(request: Request, env: Env, ctx: Context) {
    ctx.state.visits = (ctx.state.visits ?? 0) + 1;

    return Response.json({ visits: ctx.state.visits });
  }
};`;

export const isolateOptions = `{
  "version": 1,
  "egress": { "hosts": ["api.example.com"] },
  "runtime": {
    "tier": "isolate",
    "contract": "fetch-v1",
    "entrypoint": "src/handler.ts",
    "timeoutMs": 5000,
    "hibernateAfterMs": 60000,
    "capabilities": {
      "database": { "access": "read-write", "maxRows": 500, "timeoutMs": 2000 },
      "fetch": {
        "methods": ["GET", "POST"],
        "requestsPerMinute": 120,
        "maxResponseBytes": 524288
      }
    }
  }
}`;
