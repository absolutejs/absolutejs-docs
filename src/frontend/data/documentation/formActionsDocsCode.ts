export const formActionsDefine = `// src/actions.ts
import { defineAction } from '@absolutejs/absolute';
import { t } from 'elysia';

export const signup = defineAction('/actions/signup', {
  body: t.Object({
    email: t.String({ error: 'Enter a valid email', format: 'email' }),
    name: t.String({ error: 'Use at least 2 characters', minLength: 2 })
  }),
  handler: ({ body, fail }) => {
    if (body.email.endsWith('@taken.dev'))
      return fail({ email: 'That email is already registered' });

    return { greeting: \`Welcome, \${body.name}\` };
  }
});`;

export const formActionsEden = `import { treaty } from '@elysia/eden';
import type { server } from '../backend/server';

const api = treaty<typeof server>(window.location.origin);

const { data, error } = await api.actions.signup.post({
  email: 'ada@example.com',
  name: 'Ada'
});

if (error) {
  // error.status is 422
  // error.value is { status: 'error', errors: { email?: string; name?: string } }
  console.log(error.value);
} else {
  // data is { status: 'success', data: { greeting: 'Welcome, Ada' } }
  console.log(data);
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

export const formActionsHtmxAction = `export const subscribe = defineAction('/actions/subscribe', {
  body: t.Object({
    email: t.String({ error: 'Enter a valid email', format: 'email' })
  }),
  handler: ({ body }) => ({ email: body.email }),
  htmx: (result) =>
    result.status === 'success'
      ? \`<p id="subscribe-result">Subscribed \${result.data?.email}</p>\`
      : \`<p id="subscribe-result">\${result.errors.email ?? result.message}</p>\`
});`;

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

export const formActionsOptions = `export const changePassword = defineAction('/actions/change-password', {
  // Runs after validation, before the handler. Return a response to stop.
  beforeHandle: ({ request }) =>
    request.headers.get('cookie')?.includes('session=')
      ? undefined
      : new Response('Sign in first', { status: 401 }),
  body: t.Object({
    confirm: t.Boolean({ error: 'Tick the box to confirm' }),
    password: t.String({ minLength: 12 })
  }),
  // Also accept posts from this origin.
  csrf: { trustedOrigins: ['https://admin.example.com'] },
  handler: ({ body, fail }) =>
    body.confirm
      ? { changed: true }
      : fail({ confirm: 'Tick the box to confirm' }),
  // Refuse bodies over 64 KiB with 413 before reading them.
  maxBodySize: 64 * 1024,
  // Don't send typed values back after a failed post without JavaScript.
  preserveValues: false,
  redirect: '/account'
});`;

export const formActionsReactPage = `// src/frontend/react/pages/Signup.tsx
import type { ActionStateOf } from '@absolutejs/absolute';
import { useFormAction } from '@absolutejs/absolute/react/hooks';
import type { signup } from '../../../actions';

type SignupProps = {
  signupState?: ActionStateOf<typeof signup>;
};

export const Signup = ({ signupState }: SignupProps) => {
  const form = useFormAction<typeof signup>('/actions/signup', {
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

export const formActionsRedirect = `export const contact = defineAction('/actions/contact', {
  body: t.Object({
    message: t.String({ error: 'Write at least 10 characters', minLength: 10 }),
    topic: t.String()
  }),
  handler: ({ body }) => ({ ticket: \`T-\${body.topic}\` }),
  // A string, or a function of the handler's result
  redirect: (data) => \`/thanks?ticket=\${data.ticket}\`
});`;

export const formActionsServer = `// src/backend/server.ts
import { asset, getActionState, prepare } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import { signup } from '../actions';
import { Signup } from '../frontend/react/pages/Signup';

const { absolutejs, manifest } = await prepare();

export const server = new Elysia()
  .use(absolutejs)
  .use(signup)
  .get('/signup', () =>
    handleReactPageRequest({
      Page: Signup,
      index: asset(manifest, 'SignupIndex'),
      props: { signupState: getActionState(signup) }
    })
  );`;

export const formActionsStateTypes = `import type { ActionStateOf } from '@absolutejs/absolute';
import type { signup } from '../actions';

type SignupState = ActionStateOf<typeof signup>;
// | { status: 'idle' }
// | { status: 'success'; data?: { greeting: string }; redirect?: string }
// | {
//     status: 'error';
//     errors: { email?: string; name?: string };
//     message?: string;
//     values?: { email?: string | string[]; name?: string | string[] };
//   }`;
