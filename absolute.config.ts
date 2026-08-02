import { defineConfig } from '@absolutejs/absolute';
import { blog } from './src/shared/blog';
import { documentationSitemapRoutes } from './src/frontend/data/sidebarData';

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
		routes: () => [...blog.sitemapRoutes(), ...documentationSitemapRoutes]
	}
});
