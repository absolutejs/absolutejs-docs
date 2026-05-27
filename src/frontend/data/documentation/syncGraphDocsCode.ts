export const syncGraphProblem = `// The default reactive-query path:
engine.registerReactive(
  defineReactiveQuery<Task, string>({
    key: (task) => task.id,
    name: 'tasksByAssignee',
    run: async ({ db, params }) => {
      // db.all reads the whole table on every change to 'tasks',
      // then we filter + sort in JS. O(table size) per change.
      const all = await db.all<Task>('tasks');

      return all
        .filter((task) => task.assignee === params)
        .sort((a, b) => a.priority - b.priority);
    }
  })
);

// At 100k rows in the table, ONE mutation to ONE matching row costs
// ~580 ms to propagate to a ranged subscriber. Not the engine's
// fault — that's the cost of "re-run the whole filter on every change."`;

export const syncGraphSolution = `// The same query, wired through the operator graph:
engine.registerGraph(
  defineGraphCollection<Task, string>({
    key: (task) => task.id,
    name: 'tasksByAssigneeGraph',
    query: query<Task, string>({
      table: 'tasks',
      key: (task) => task.id,
      // SQL pushdown: hydrate the source with the FILTERED row set,
      // not the whole table. Runs once per subscriber, not per change.
      hydrate: (assignee) =>
        prisma.task.findMany({
          where: { assignee },
          orderBy: { priority: 'asc' }
        }),
      // Scope incremental changes: a row that fails this predicate
      // leaves the view; a row that passes it joins.
      match: (task, assignee) => task.assignee === assignee
    }).orderBy({
      key: (task) => task.id,
      compare: (a, b) => a.priority - b.priority
    })
  })
);

// Same workload, same hardware: at 100k rows, live-update p50 is now
// ~42 ms — bounded, independent of table size. The operator graph
// routes the changed row through this subscriber's pipeline; the
// other 99,800+ rows aren't touched.`;

export const syncGraphBuilder = `import {
  defineGraphCollection,
  query
} from '@absolutejs/sync/engine';

const ordersByUser = defineGraphCollection<DenormalisedOrder, { userId: number }>({
  name: 'ordersByUser',
  key: (row) => row.id,
  query: query<Order, { userId: number }>({
    table: 'orders',
    key: (order) => order.id,
    hydrate: ({ userId }) =>
      prisma.order.findMany({ where: { userId, status: 'open' } }),
    match: (order, { userId }) =>
      order.userId === userId && order.status === 'open'
  })
    // Project each row into its display shape.
    .map((order) => ({
      id: order.id,
      total: order.total,
      placedAt: order.createdAt
    }))
    // Join in the line items (incremental — adding an item updates the
    // matching order's row, not every order).
    .join(
      {
        table: 'orderItems',
        key: (item) => item.id,
        hydrate: ({ userId }) =>
          prisma.orderItem.findMany({
            where: { order: { userId, status: 'open' } }
          }),
        match: (item, _params, ctx: { orderIds: Set<number> }) =>
          ctx.orderIds.has(item.orderId)
      },
      {
        on: (order) => order.id,
        rightOn: (item) => item.orderId,
        select: (order, item) => ({ ...order, item }),
        key: (out) => \`\${out.id}:\${out.item.id}\`
      }
    )
    // Keep the top 50, sorted by recency.
    .orderBy({
      key: (row) => row.id,
      compare: (a, b) => b.placedAt - a.placedAt,
      limit: 50
    })
});`;

export const syncGraphWhen = `# When to reach for defineGraphCollection

Use it when the query body would otherwise be O(table size) on every change:

  - filtered subscriptions over big tables (\`where assignee = \$me\`)
  - top-N + ORDER BY (\`limit 50 ORDER BY priority desc\`)
  - joins (\`orders\` + their \`orderItems\`)
  - aggregations (\`groupBy\` + sum/count)
  - any case where you'd otherwise re-read the table and filter in JS

Stick with defineReactiveQuery when:

  - the query genuinely depends on every row (e.g. a global count)
  - the table is small enough that O(table) is cheap (< ~1k rows)
  - the query is one-off / not subscribed to under load`;

export const syncGraphComparison = `| Path                       | 100k-row live update p50 | Engine cost shape       |
| -------------------------- | ------------------------ | ----------------------- |
| db.all + JS filter         | ~580 ms                  | O(table size) per change|
| defineGraphCollection      | **~42 ms**               | O(diff) per change      |
|                            | **13.8x speedup**        |                         |

(Same workload, same hardware, same engine. Full bench in
absolutejs/benchmarks under sync/scripts/reactive/.)`;
