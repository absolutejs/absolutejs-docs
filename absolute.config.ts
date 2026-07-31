import { defineConfig } from '@absolutejs/absolute';
import { blog } from './src/shared/blog';

export default defineConfig({
	assetsDirectory: './src/backend/assets',
	reactDirectory: './src/frontend',
	sitemap: {
		baseUrl: blog.site.baseUrl,
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
		routes: () => blog.sitemapRoutes()
	}
});
