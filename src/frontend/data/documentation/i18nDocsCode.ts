export const i18nBrowserHelpers = `\
import {
  createTranslator,
  formatMessage,
  localeDirection,
  localizePath,
  negotiateLocale,
  parseAcceptLanguage
} from '@absolutejs/absolute/i18n';

const routing = { defaultLocale: 'en', locales: ['en', 'fr', 'ar'] };

localizePath('/fr/about', 'en', routing); // '/about'
localizePath('/about', 'ar', routing); // '/ar/about'
negotiateLocale(parseAcceptLanguage('fr-CA,fr;q=0.9'), routing.locales, 'en'); // 'fr'
localeDirection('he-IL'); // 'rtl'
formatMessage('fr', '{count, plural, one {# fichier} other {# fichiers}}', {
  count: 2
}); // '2 fichiers'

// A translator over a payload the server sent
const { t } = createTranslator<typeof en>(payload);`;

export const i18nDefine = `\
// src/i18n/index.ts
import { defineI18n } from '@absolutejs/absolute';
import en from './messages/en';

export const i18n = defineI18n({
  defaultLocale: 'en',
  loaders: {
    ar: () => import('./messages/ar'),
    fr: () => import('./messages/fr')
  },
  locales: ['en', 'fr', 'ar'],
  messages: en
});`;

export const i18nDefineOptions = `\
defineI18n({
  defaultLocale: 'en',
  loaders: { fr: () => import('./messages/fr') },
  locales: ['en', 'fr'],
  messages: en,

  // 'prefix' (default) | 'domain' | 'negotiate'
  strategy: 'prefix',
  // prefix only: serve the default locale under /en too
  prefixDefault: false,
  // prefix + prefixDefault: 307 unprefixed page navigations to a locale
  redirect: false,
  // domain only: locale → host
  domains: { en: 'example.com', fr: 'example.fr' },
  // Cookie that remembers a visitor's choice (default 'locale')
  cookieName: 'locale',
  // Route param that carries the locale (default 'locale')
  localeParam: 'locale',
  // Origin for absolute hreflang URLs (default: the request's origin)
  baseUrl: 'https://example.com'
});`;

export const i18nMessages = `\
// src/i18n/messages/en.ts
import { defineMessages } from '@absolutejs/absolute/i18n';

export default defineMessages({
  cart: {
    count:
      '{count, plural, =0 {Your cart is empty} one {# item} other {# items}}'
  },
  common: {
    greeting: 'Hello, {name}!',
    updated: 'Updated {when, date, medium}'
  }
});`;

export const i18nReactPage = `\
// src/frontend/react/pages/About.tsx
import type { AlternateLink, I18nPayload } from '@absolutejs/absolute/i18n';
import { Head } from '@absolutejs/absolute/react/components';
import { I18nProvider, useI18n } from '@absolutejs/absolute/react/hooks';
import type en from '../../../i18n/messages/en';

type AboutProps = {
  alternates: AlternateLink[];
  i18n: I18nPayload;
};

const Greeting = () => {
  const { formatNumber, t } = useI18n<typeof en>();

  return (
    <main>
      <h1>{t('common.greeting', { name: 'Ada' })}</h1>
      <p>{t('cart.count', { count: 3 })}</p>
      <p>{formatNumber(1234.5)}</p>
    </main>
  );
};

export const About = ({ alternates, i18n }: AboutProps) => (
  <html dir={i18n.dir} lang={i18n.locale}>
    <Head alternates={alternates} title="About" />
    <body>
      <I18nProvider value={i18n}>
        <Greeting />
      </I18nProvider>
    </body>
  </html>
);`;

export const i18nServer = `\
// src/backend/server.ts
import { asset, i18nPlugin, prepare } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import { i18n } from '../i18n';
import { About } from '../frontend/react/pages/About';

const { absolutejs, manifest } = await prepare();

export const server = new Elysia()
  .use(absolutejs)
  .use(i18nPlugin(i18n))
  // Serves /about, /fr/about and /ar/about. /de/about is a 404.
  .get('/:locale?/about', ({ i18n: requestI18n }) =>
    handleReactPageRequest({
      Page: About,
      index: asset(manifest, 'AboutIndex'),
      props: {
        alternates: requestI18n.alternates(),
        i18n: requestI18n.payload(['common', 'cart'])
      }
    })
  )
  .get('/:locale?/hello', ({ i18n: requestI18n, locale }) => ({
    greeting: requestI18n.t('common.greeting', { name: 'Ada' }),
    locale,
    // '/fr/about'
    path: requestI18n.localizePath('/about', 'fr')
  }));`;

export const i18nSitemap = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  sitemap: {
    baseUrl: 'https://example.com',
    i18n: { defaultLocale: 'en', locales: ['en', 'fr', 'ar'] }
  }
});`;

export const i18nStandalone = `\
import { i18n } from './i18n';

// Outside a request: scripts, tests, emails
const fr = await i18n.translator('fr');
fr.t('cart.count', { count: 1 }); // '1 article'
fr.formatList(['a', 'b', 'c']); // 'a, b et c'
fr.formatRelativeTime(-1, 'day'); // 'il y a 1 jour'

const payload = await i18n.payload('fr', ['cart']);
const setCookie = i18n.cookie('fr'); // 'locale=fr; Path=/; Max-Age=31536000; SameSite=Lax'`;

export const i18nSveltePage = `\
<!-- src/frontend/svelte/pages/Welcome.svelte -->
<script lang="ts">
  import type { I18nPayload } from '@absolutejs/absolute/i18n';
  import { setI18n } from '@absolutejs/absolute/svelte';
  import type en from '../../../i18n/messages/en';
  import CartSummary from '../components/CartSummary.svelte';

  let { i18n }: { i18n: I18nPayload } = $props();

  const { t } = setI18n<typeof en>(i18n);
</script>

<svelte:head>
  <meta charset="utf-8" />
  <title>Welcome</title>
</svelte:head>

<main>
  <h1>{t('common.greeting', { name: 'Ada' })}</h1>
  <CartSummary count={0} />
</main>

<!-- src/frontend/svelte/components/CartSummary.svelte -->
<script lang="ts">
  import { getI18n } from '@absolutejs/absolute/svelte';
  import type en from '../../../i18n/messages/en';

  let { count }: { count: number } = $props();

  const { t } = getI18n<typeof en>();
</script>

<p>{t('cart.count', { count })}</p>`;

export const i18nSvelteRoute = `\
.get('/:locale?/welcome', ({ i18n: requestI18n }) =>
  handleSveltePageRequest<typeof Welcome>({
    indexPath: asset(manifest, 'WelcomeIndex'),
    pagePath: asset(manifest, 'Welcome'),
    props: { i18n: requestI18n.payload(['common', 'cart']) }
  })
)`;

export const i18nTranslation = `\
// src/i18n/messages/fr.ts
import type { Translation } from '@absolutejs/absolute/i18n';
import type en from './en';

export default {
  cart: {
    count:
      '{count, plural, =0 {Votre panier est vide} one {# article} other {# articles}}'
  },
  common: {
    greeting: 'Bonjour, {name} !',
    updated: 'Mis à jour le {when, date, medium}'
  }
} satisfies Translation<typeof en>;`;

export const i18nTypeErrors = `\
const { t } = useI18n<typeof en>();

t('common.greeting', { name: 'Ada' }); // OK
t('cart.count', { count: 3 }); // OK

t('common.greting', { name: 'Ada' }); // Error: unknown key
t('cart.count'); // Error: missing { count }
t('cart.count', { count: 'three' }); // Error: count must be a number

// Error: 'updated' is missing from common
const de: Translation<typeof en> = {
  cart: { count: '...' },
  common: { greeting: '...' }
};`;
