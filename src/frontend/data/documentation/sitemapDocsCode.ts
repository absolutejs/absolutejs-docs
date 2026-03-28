export const sitemapZeroConfig = `\
// absolute.config.ts — sitemap is automatic
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend'
  // That's it. Sitemap generation is built in.
  // On server start, AbsoluteJS discovers your page routes
  // and writes sitemap.xml to the build directory.
});`;

export const sitemapOutput = `\
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mysite.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mysite.com/about</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mysite.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

export const sitemapCustomConfig = `\
// absolute.config.ts — with sitemap options
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend',
  publicDirectory: './public',
  sitemap: {
    // Override the auto-detected origin (for production behind a proxy)
    baseUrl: 'https://mysite.com',

    // Default values for all routes
    defaultChangefreq: 'daily',
    defaultPriority: 0.7,

    // Exclude specific routes from the sitemap
    exclude: [
      '/admin',           // exact match
      /^\\/internal/,      // regex pattern
      '/dashboard'
    ],

    // Per-route overrides
    overrides: {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/about': { priority: 0.5, changefreq: 'monthly' },
      '/blog': { lastmod: '2026-03-28', priority: 0.9 }
    }
  }
});`;

export const sitemapDynamicRoutes = `\
// absolute.config.ts — with dynamic routes
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend',
  publicDirectory: './public',
  sitemap: {
    baseUrl: 'https://mysite.com',

    // Provide additional routes that can't be auto-discovered
    // (e.g. parameterized routes like /blog/:slug)
    routes: async () => {
      const posts = await db.query('SELECT slug FROM posts');
      return posts.map(p => \`/blog/\${p.slug}\`);
    }
  }
});`;

export const sitemapTypeReference = `\
type SitemapConfig = {
  baseUrl?: string;
  exclude?: (string | RegExp)[];
  defaultChangefreq?: ChangeFrequency;
  defaultPriority?: number;
  overrides?: Record<string, SitemapRouteOverride>;
  routes?: () => string[] | Promise<string[]>;
};

type ChangeFrequency =
  | 'always' | 'hourly' | 'daily'
  | 'weekly' | 'monthly' | 'yearly' | 'never';

type SitemapRouteOverride = {
  changefreq?: ChangeFrequency;
  priority?: number;
  lastmod?: string;
};`;
