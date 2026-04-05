export const validationBasics = `\
import { Elysia, t } from 'elysia';

new Elysia()
  .post('/api/users', ({ body }) => createUser(body), {
    body: t.Object({
      name: t.String({ minLength: 2 }),
      email: t.String({ format: 'email' })
    })
  });`;
export const validationGuard = `\
import { Elysia, t } from 'elysia';

new Elysia()
  .guard(
    {
      headers: t.Object({
        authorization: t.TemplateLiteral('Bearer \${string}')
      })
    },
    (app) =>
      app
        .get('/api/private/profile', ({ headers }) =>
          getProfile(headers.authorization)
        )
        .get('/api/private/settings', ({ headers }) =>
          getSettings(headers.authorization)
        )
  );`;
export const validationParamsAndQuery = `\
import { Elysia, t } from 'elysia';

new Elysia()
  .get('/api/users/:id', ({ params, query }) => {
    return getUser(params.id, query.expand);
  }, {
    params: t.Object({
      id: t.String()
    }),
    query: t.Object({
      expand: t.Optional(t.Boolean())
    })
  });`;
export const validationTypedResponses = `\
import { Elysia, t } from 'elysia';

new Elysia()
  .post('/api/projects', ({ body, set }) => {
    const project = createProject(body);
    set.status = 201;
    return project;
  }, {
    body: t.Object({
      name: t.String()
    }),
    response: {
      201: t.Object({
        id: t.String(),
        name: t.String()
      }),
      400: t.Object({
        error: t.String()
      })
    }
  });`;
