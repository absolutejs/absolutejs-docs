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
	slug: 'why-citra',
	sourceUrl: 'https://github.com/absolutejs/citra',
	tags: ['Citra', 'OAuth', 'TypeScript'],
	title: 'Why Citra: A Complete OAuth Library Built to Last'
});

export const eugeneGraves = defineAuthor({
	id: 'eugene-graves',
	kind: 'person',
	name: 'Eugene Graves III',
	role: 'Core developer · Building with AbsoluteJS since 2025',
	url: 'https://github.com/eugenegraves'
});

export const choosePerRoutePost = definePost({
	author: eugeneGraves,
	description:
		"A core developer's account of building production apps on AbsoluteJS: the conventions, the dev loop, the sharp edges, and what it lets you do that you couldn't before.",
	publishedAt: '2026-11-12',
	slug: 'choose-per-route',
	sourceUrl: 'https://github.com/absolutejs/absolutejs',
	tags: ['AbsoluteJS', 'Developer Experience', 'Bun', 'Elysia', 'TypeScript'],
	title: 'Choose Per Route: What Building With AbsoluteJS Is Actually Like'
});

export const blog = createBlog({
	posts: [choosePerRoutePost, whyCitraPost],
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
