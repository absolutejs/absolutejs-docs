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
);`;
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
);`;
