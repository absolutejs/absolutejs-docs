import { createBlog, defineAuthor, definePost } from '@absolutejs/blog';

export const alexKahn = defineAuthor({
	id: 'alex-kahn',
	kind: 'person',
	name: 'Alex Kahn',
	role: 'Creator of Citra',
	url: 'https://github.com/alexkahndev'
});

export const whyCitraPost = definePost({
	author: alexKahn,
	description:
		'Why Citra treats OAuth provider differences as typed configuration instead of a reason to abandon the abstraction.',
	publishedAt: '2026-07-31',
	slug: 'why-citra-typed-oauth',
	sourceUrl: 'https://github.com/absolutejs/citra',
	tags: ['Citra', 'OAuth', 'TypeScript'],
	title: 'Why Citra: A Complete OAuth Library Built to Last'
});

export const blog = createBlog({
	posts: [whyCitraPost],
	site: {
		baseUrl: 'https://absolutejs.com',
		description:
			'Engineering notes, design decisions, and lessons from building the AbsoluteJS ecosystem.',
		feed: {
			copyright: 'AbsoluteJS'
		},
		name: 'AbsoluteJS Blog',
		publisher: {
			logoUrl: 'https://absolutejs.com/assets/png/absolutejs-logo.png',
			name: 'AbsoluteJS',
			url: 'https://absolutejs.com'
		},
		titleSuffix: 'AbsoluteJS',
		twitterSite: '@absolute_js'
	}
});

export const blogPosts = blog.all();
