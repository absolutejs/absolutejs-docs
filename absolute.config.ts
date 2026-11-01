import { defineConfig } from '@absolutejs/absolute';
import { blog } from './src/shared/blog';

export default defineConfig({
	assetsDirectory: './src/backend/assets',
	publicDirectory: './public',
	reactDirectory: './src/frontend',
	sitemap: {
		baseUrl: blog.site.baseUrl,
		exclude: ['/profile', '/signup', '/signup/telemetry', '/telemetry'],
		overrides: Object.fromEntries(
			blog.posts.map((post) => [
				`${blog.site.basePath}/${post.slug}`,
				{
					changefreq: 'monthly' as const,
					lastmod: post.updatedAt ?? post.publishedAt,
					priority: 0.8
				}
			])
		),
		// Imported only when the sitemap is built: a top-level import loaded
		// every docs page, its data and the highlighter wherever the config was
		// read, including the production server at each boot (2026-11-01).
		routes: async () => {
			const { documentationSitemapRoutes } = await import(
				'./src/frontend/data/sidebarData'
			);

			return [...blog.sitemapRoutes(), ...documentationSitemapRoutes];
		}
	}
});
