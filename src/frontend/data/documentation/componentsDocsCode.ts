export const headPropsReference = `\
type Metadata = {
  title?: string;
  description?: string;
  icon?: string;
  font?: string;
  cssPath?: string | string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
    type?: string;
    siteName?: string;
    locale?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    site?: string;
    creator?: string;
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
    maxSnippet?: number;
    maxImagePreview?: string;
    maxVideoPreview?: number;
  };
  meta?: MetaTag[];
};

type MetaTag = {
  name?: string;
  property?: string;
  content: string;
};`;
export const headReactBasic = `\
import { Head } from '@absolutejs/absolute/react/components';

export const HomePage = () => (
  <html>
    <Head
      title="My App"
      description="A modern web application built with AbsoluteJS"
      icon="/favicon.ico"
    />
    <body>
      <h1>Welcome</h1>
    </body>
  </html>
);`;
export const headReactFull = `\
import { Head } from '@absolutejs/absolute/react/components';

export const BlogPost = ({ title, excerpt, slug, coverImage }) => (
  <html>
    <Head
      title={title}
      description={excerpt}
      icon="/favicon.ico"
      font="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
      cssPath={['/styles/global.css', '/styles/blog.css']}
      canonical={\`https://mysite.com/blog/\${slug}\`}
      openGraph={{
        title,
        description: excerpt,
        url: \`https://mysite.com/blog/\${slug}\`,
        image: coverImage,
        imageAlt: \`Cover image for \${title}\`,
        imageWidth: 1200,
        imageHeight: 630,
        type: 'article',
        siteName: 'My App',
        locale: 'en_US'
      }}
      twitter={{
        card: 'summary_large_image',
        title,
        description: excerpt,
        image: coverImage,
        imageAlt: \`Cover image for \${title}\`,
        site: '@myapp',
        creator: '@author'
      }}
      robots={{
        index: true,
        follow: true,
        noarchive: false,
        nosnippet: false,
        noimageindex: false,
        maxSnippet: -1,
        maxImagePreview: 'large',
        maxVideoPreview: -1
      }}
      meta={[
        { name: 'author', content: 'Jane Doe' },
        { property: 'article:published_time', content: '2026-03-28' }
      ]}
    />
    <body>
      <article>
        <h1>{title}</h1>
      </article>
    </body>
  </html>
);`;
export const headSvelteBasic = `\
<script>
  import Head from '@absolutejs/absolute/svelte/components/Head.svelte';
</script>

<html>
  <Head
    title="My App"
    description="A modern web application built with AbsoluteJS"
    icon="/favicon.ico"
  />
  <body>
    <h1>Welcome</h1>
  </body>
</html>`;
export const jsonLdReactBasic = `\
import { JsonLd } from '@absolutejs/absolute/react/components';

export const BlogPost = ({ title, author, datePublished, image }) => (
  <html>
    <head>
      <title>{title}</title>
      <JsonLd
        schema={{
          '@type': 'Article',
          headline: title,
          author: {
            '@type': 'Person',
            name: author
          },
          datePublished,
          image
        }}
      />
    </head>
    <body>
      <article>
        <h1>{title}</h1>
      </article>
    </body>
  </html>
);`;
export const jsonLdReactMultiple = `\
import { JsonLd } from '@absolutejs/absolute/react/components';

export const HomePage = () => (
  <html>
    <head>
      <title>My App</title>
      <JsonLd
        schema={[
          {
            '@type': 'Organization',
            name: 'My Company',
            url: 'https://mysite.com',
            logo: 'https://mysite.com/logo.png',
            sameAs: [
              'https://twitter.com/mycompany',
              'https://github.com/mycompany'
            ]
          },
          {
            '@type': 'WebSite',
            name: 'My App',
            url: 'https://mysite.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://mysite.com/search?q={search_term}',
              'query-input': 'required name=search_term'
            }
          }
        ]}
      />
    </head>
    <body>
      <h1>Welcome</h1>
    </body>
  </html>
);`;
export const jsonLdSchemaTypes = `\
type JsonLdSchema =
  | PersonSchema
  | OrganizationSchema
  | WebSiteSchema
  | ArticleSchema
  | ProductSchema
  | ReviewSchema
  | BreadcrumbListSchema
  | FAQPageSchema
  | EventSchema
  | RecipeSchema
  | VideoObjectSchema
  | HowToSchema
  | LocalBusinessSchema
  | SoftwareApplicationSchema
  | JobPostingSchema;

// Each schema requires '@type' and its type-specific fields.
// The '@context' is automatically added by the JsonLd component.

// Examples:
type ArticleSchema = {
  '@type': 'Article';
  headline: string;
  author?: PersonSchema | OrganizationSchema;
  datePublished?: string;
  dateModified?: string;
  image?: string | string[];
  publisher?: OrganizationSchema;
};

type OrganizationSchema = {
  '@type': 'Organization';
  name: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
};

type WebSiteSchema = {
  '@type': 'WebSite';
  name: string;
  url: string;
  potentialAction?: Record<string, unknown>;
};`;
export const jsonLdSvelteBasic = `\
<script>
  import JsonLd from '@absolutejs/absolute/svelte/components/JsonLd.svelte';

  const { title, author, datePublished, image } = $props();
</script>

<html>
  <head>
    <title>{title}</title>
    <JsonLd
      schema={{
        '@type': 'Article',
        headline: title,
        author: {
          '@type': 'Person',
          name: author
        },
        datePublished,
        image
      }}
    />
  </head>
  <body>
    <article>
      <h1>{title}</h1>
    </article>
  </body>
</html>`;
