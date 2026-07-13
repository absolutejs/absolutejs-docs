export const syncActionsMutations = `engine.registerMutation(
  defineMutation({
    name: 'summariseTicket',
    handler: async (args: { id: string }, ctx, actions) => {
      const ticket = await db.tickets.findUnique({ where: { id: args.id } });
      if (!ticket) return null;

      // Call out to an external service — no transactional constraint.
      const stream = anthropic({ apiKey }).stream({
        messages: [{ role: 'user', content: ticket.body }]
      });
      let summary = '';
      for await (const chunk of stream) {
        if (chunk.type === 'text') summary += chunk.content;
      }

      // Write the summary back to the live tickets table; subscribers see
      // it via the existing reactive subscription.
      await actions.update('tickets', { id: args.id, summary });

      return { id: args.id, summary };
    }
  })
);

// Client-side: typed end-to-end via treaty<typeof app> + syncStore.mutate.
const result = await tickets.mutate('summariseTicket', { id });`;

export const syncJobsDefine = `import {
  createInMemoryJobStore,
  createJobRegistry,
  defineJobs,
  exponentialBackoff,
  queue,
  t
} from '@absolutejs/queue';
import { Elysia } from 'elysia';

// One typed registry: each kind has a schema and a handler. Payload types
// are inferred end-to-end — no hand-written job map, no generics.
const jobs = defineJobs({
  'email.send': t.Object({ to: t.String(), subject: t.String(), body: t.String() }),
  'webhook.deliver': t.Object({ url: t.String(), body: t.Unknown() }),
  'ticket.summarise': t.Object({ ticketId: t.String() })
});

const registry = createJobRegistry({
  jobs,
  handlers: {
    'email.send': async ({ payload }) => sendEmail(payload),
    'webhook.deliver': async ({ payload }) => fetch(payload.url, { method: 'POST', body: JSON.stringify(payload.body) }),
    'ticket.summarise': async ({ payload }) => {
      // Job handlers can run sync mutations to write back to live tables.
      await engine.runMutation('summariseTicket', { id: payload.ticketId }, {});
    }
  }
});

const store = createInMemoryJobStore();
// Production: createPostgresJobStore({ db }) from @absolutejs/queue-postgres.

const app = new Elysia().use(queue({
  store,
  registry,
  maxAttempts: 5,
  backoff: exponentialBackoff({ baseMs: 500, factor: 2, maxMs: 30_000 }),
  // Delayed one-shots, retries, dead-letter, concurrency are all built in.
}));`;

export const syncJobsEnqueue = `// Inside a mutation handler: queue durable async work that survives restarts.
engine.registerMutation(
  defineMutation({
    name: 'createTicket',
    handler: async (args: { title: string; body: string }, ctx, actions) => {
      const ticket = await actions.insert('tickets', args);
      // Fire-and-queue: the queue persists this job and a worker runs it.
      await app.queue.enqueue('ticket.summarise', { ticketId: ticket.id });

      return ticket;
    }
  })
);

// From a schedule: cron decides WHEN, the queue guarantees the work HAPPENS.
engine.registerSchedule(
  defineSchedule({
    name: 'dailyDigest',
    pattern: '0 8 * * *', // 8 AM every day
    run: async ({ db }) => {
      const users = await db.all('users');
      for (const user of users) {
        await app.queue.enqueue('email.send', {
          to: user.email,
          subject: 'Your daily digest',
          body: await renderDigest(user)
        });
      }
    }
  })
);

// One-shot delayed: 'run this 30 minutes from now.'
await app.queue.enqueue(
  'webhook.deliver',
  { url: 'https://example.com/hook', body: { event: 'order.placed' } },
  { runAt: new Date(Date.now() + 30 * 60_000) }
);`;
