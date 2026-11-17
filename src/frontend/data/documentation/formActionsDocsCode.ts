export const formActionsClient = `// src/frontend/actions.ts
import { createFormActionClient } from '@absolutejs/absolute/react/hooks';
import type { server } from '../backend/server';

export const actions = createFormActionClient<typeof server>();`;
export const formActionsContext = `// src/backend/auth.ts
export const auth = new Elysia({ name: 'auth' }).derive('global', ({ request }) => ({
  user: readSession(request) // { id: string; name: string } | null
}));

// src/backend/server.ts
new Elysia()
  .use(absolutejs)
  .use(auth)
  .post(
    '/actions/rename',
    { form: t.Object({ name: t.String({ minLength: 2 }) }) },
    // user is typed from auth's derive
    ({ body, user }) => ({ renamedBy: user?.name ?? 'nobody', to: body.name })
  );`;
export const formActionsDefine = `// src/backend/server.ts
import { prepare } from '@absolutejs/absolute';
import { Elysia, t } from 'elysia';

const { absolutejs } = await prepare();

export const server = new Elysia()
  .use(absolutejs)
  .post(
    '/actions/signup',
    {
      form: t.Object({
        email: t.String({ error: 'Enter a valid email', format: 'email' }),
        name: t.String({ error: 'Use at least 2 characters', minLength: 2 })
      })
    },
    ({ body, fail }) => {
      if (body.email.endsWith('@taken.dev'))
        return fail({ email: 'That email is already registered' });

      return { greeting: \`Welcome, \${body.name}\` };
    }
  );`;
export const formActionsEden = `import { treaty } from '@elysia/eden';
import type { server } from '../backend/server';

const api = treaty<typeof server>(window.location.origin);

const { data, error } = await api.actions.signup.post({
  email: 'ada@example.com',
  name: 'Ada'
});

if (error) {
  // error.status is 422
  // error.value is { status: 'error', errors: { email?: string; name?: string }, message?: string }
  console.log(error.value.errors);
} else {
  // data is { greeting: string }
  console.log(data.greeting);
}

// Type error: property 'email' is missing
await api.actions.signup.post({ name: 'Ada' });`;
export const formActionsEnhanceScript = `// src/frontend/html/scripts/enhance-contact.ts
import { enhanceForms } from '@absolutejs/absolute/client';

enhanceForms();`;
export const formActionsHtmlPage = `<!-- src/frontend/html/pages/Contact.html -->
<!doctype html>
<html lang="en">
  <head>
    <title>Contact</title>
    <script type="module" src="../scripts/enhance-contact.ts"></script>
  </head>
  <body>
    <form method="post" action="/actions/contact" data-absolute-action>
      <select name="topic">
        <option value="sales">Sales</option>
        <option value="support">Support</option>
      </select>
      <textarea name="message"></textarea>
      <p data-action-error="message" hidden></p>
      <p data-action-message></p>
      <button type="submit">Send</button>
    </form>
  </body>
</html>`;
export const formActionsHtmxAction = `import type { ActionResult } from '@absolutejs/absolute';

.post(
  '/actions/subscribe',
  {
    form: {
      body: t.Object({
        email: t.String({ error: 'Enter a valid email', format: 'email' })
      }),
      htmx: (result: ActionResult<{ email: string }>) =>
        result.status === 'success'
          ? \`<p id="subscribe-result">Subscribed \${result.data?.email}</p>\`
          : \`<p id="subscribe-result">\${result.errors.email ?? result.message}</p>\`
    }
  },
  ({ body }) => ({ email: body.email })
)`;
export const formActionsHtmxPage = `<!-- src/frontend/htmx/pages/Subscribe.html -->
<form
  method="post"
  action="/actions/subscribe"
  data-absolute-action
  hx-post="/actions/subscribe"
  hx-target="#subscribe-result"
  hx-swap="outerHTML"
>
  <input name="email" type="email" />
  <p data-action-error="email" hidden></p>
  <p data-action-success hidden>You are subscribed.</p>
  <button type="submit">Subscribe</button>
</form>
<p id="subscribe-result"></p>`;
export const formActionsOptions = `.post(
  '/actions/change-password',
  {
    // Runs after validation, before the handler. Return a status to stop.
    beforeHandle: ({ status, user }) =>
      user ? undefined : status(401, 'Sign in first'),
    form: {
      body: t.Object({
        confirm: t.Boolean({ error: 'Tick the box to confirm' }),
        password: t.String({ minLength: 12 })
      }),
      // Also accept posts from this origin.
      csrf: { trustedOrigins: ['https://admin.example.com'] },
      // Refuse bodies over 64 KiB with 413 before reading them.
      maxBodySize: 64 * 1024,
      // Don't send typed values back after a failed post without JavaScript.
      preserveValues: false,
      redirect: '/account'
    },
    // Declare each status the route returns besides the form's 422.
    response: { 401: t.String() }
  },
  ({ body, fail, user }) =>
    body.confirm
      ? { changedFor: user?.name }
      : fail({ confirm: 'Tick the box to confirm' })
)`;
export const formActionsPlainElysia = `import { formActions } from '@absolutejs/absolute';

// Only for an Elysia app that doesn't use prepare()
new Elysia().use(formActions()).post('/actions/signup', { form: schema }, handler);`;
export const formActionsReactPage = `// src/frontend/react/pages/Signup.tsx
import type { ActionState } from '@absolutejs/absolute';
import { actions } from '../../actions';

type SignupProps = {
  signupState: ActionState | null;
};

export const Signup = ({ signupState }: SignupProps) => {
  const form = actions.useFormAction('/actions/signup', {
    initialState: signupState
  });

  return (
    <html lang="en">
      <head>
        <title>Sign up</title>
      </head>
      <body>
        <form {...form.formProps}>
          <input defaultValue={form.values.name} name="name" />
          {form.errors.name && <p>{form.errors.name}</p>}
          <input defaultValue={form.values.email} name="email" />
          {form.errors.email && <p>{form.errors.email}</p>}
          <button disabled={form.pending} type="submit">
            Sign up
          </button>
        </form>
        {form.state.status === 'success' && <p>{form.data?.greeting}</p>}
      </body>
    </html>
  );
};`;
export const formActionsRedirect = `.post(
  '/actions/contact',
  {
    form: {
      body: t.Object({
        message: t.String({ error: 'Write at least 10 characters', minLength: 10 }),
        topic: t.String()
      }),
      // A path, or a function of the handler's data
      redirect: (data: { ticket: string }) => \`/thanks?ticket=\${data.ticket}\`
    }
  },
  ({ body }) => ({ ticket: \`T-\${body.topic}\` })
)`;
export const formActionsServer = `// src/backend/server.ts
import { asset } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { actions } from '../frontend/actions';
import { Signup } from '../frontend/react/pages/Signup';

// …the signup route from above, then:
  .get('/signup', (): Promise<Response> =>
    handleReactPageRequest({
      Page: Signup,
      index: asset(manifest, 'SignupIndex'),
      props: { signupState: actions.getActionState('/actions/signup') ?? null }
    })
  );`;
export const formActionsStateTypes = `import type { FormActionStateOf } from '@absolutejs/absolute';
import type { server } from '../backend/server';

type SignupState = FormActionStateOf<typeof server, '/actions/signup'>;
// | { status: 'idle' }
// | { status: 'success'; data?: { greeting: string }; redirect?: string }
// | {
//     status: 'error';
//     errors: { email?: string; name?: string };
//     message?: string;
//     values?: { email?: string | string[]; name?: string | string[] };
//   }`;
