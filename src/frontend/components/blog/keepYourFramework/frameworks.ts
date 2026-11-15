import type { CSSProperties } from 'react';
import type { ArticleSection } from '../shared/SectionRail';

export type FrameworkKey =
	| 'react'
	| 'svelte'
	| 'vue'
	| 'angular'
	| 'html'
	| 'htmx';

export type ChapterFramework = {
	chapterId: string;
	color: string;
	createFlag: string;
	docs: { href: string; label: string };
	file: string;
	gain: string;
	handler: string;
	home: string;
	key: FrameworkKey;
	name: string;
};

// One entry per chapter, in the docs site's order. `file` is the editor tab
// each chapter opens on; `gain` is the one line on that tab's front sheet.
export const chapterFrameworks: ChapterFramework[] = [
	{
		chapterId: 'react',
		color: 'var(--fw-react)',
		createFlag: '--react',
		docs: { href: '/documentation/react-overview', label: 'React docs' },
		file: 'Page.tsx',
		gain: 'Typed props from an ordinary route, streaming by default, opt-in Server Components, and forms that work without JavaScript.',
		handler: 'handleReactPageRequest',
		home: 'Next.js 16',
		key: 'react',
		name: 'React'
	},
	{
		chapterId: 'svelte',
		color: 'var(--fw-svelte)',
		createFlag: '--svelte',
		docs: { href: '/documentation/svelte-overview', label: 'Svelte docs' },
		file: 'Page.svelte',
		gain: 'Props checked where the route calls the page, {#await} that hydrates, and a router with real redirects.',
		handler: 'handleSveltePageRequest',
		home: 'SvelteKit 3',
		key: 'svelte',
		name: 'Svelte'
	},
	{
		chapterId: 'vue',
		color: 'var(--fw-vue)',
		createFlag: '--vue',
		docs: { href: '/documentation/vue-overview', label: 'Vue docs' },
		file: 'Page.vue',
		gain: 'Pages that ship zero JavaScript, server data with no refetch, and type errors in well under a second.',
		handler: 'handleVuePageRequest',
		home: 'Nuxt 4',
		key: 'vue',
		name: 'Vue'
	},
	{
		chapterId: 'angular',
		color: 'var(--fw-angular)',
		createFlag: '--angular',
		docs: {
			href: '/documentation/angular-overview',
			label: 'Angular docs'
		},
		file: 'page.component.ts',
		gain: 'Template edits that keep state, zoneless SSR on Bun, and @defer streamed from the server.',
		handler: 'handleAngularPageRequest',
		home: 'Angular CLI 22',
		key: 'angular',
		name: 'Angular'
	},
	{
		chapterId: 'html',
		color: 'var(--fw-html)',
		createFlag: '--html',
		docs: { href: '/documentation/html-overview', label: 'HTML docs' },
		file: 'Page.html',
		gain: 'Hashed assets, responsive images, layouts and partials, and an island from any framework.',
		handler: 'handleHTMLPageRequest',
		home: 'Hand-written HTML, or Astro 7',
		key: 'html',
		name: 'HTML'
	},
	{
		chapterId: 'htmx',
		color: 'var(--fw-htmx)',
		createFlag: '--htmx',
		docs: { href: '/documentation/htmx-overview', label: 'HTMX docs' },
		file: 'Page.htmx.html',
		gain: 'Typed fragment routes, pinned htmx, and per-visitor state that survives a server edit.',
		handler: 'handleHTMXPageRequest',
		home: 'htmx and a server you bolt on',
		key: 'htmx',
		name: 'HTMX'
	}
];

export const articleSections: ArticleSection[] = [
	{ id: 'package-deal', title: 'The package deal' },
	...chapterFrameworks.map((framework) => ({
		id: framework.chapterId,
		title: framework.name
	})),
	{ id: 'each-other', title: 'From each other' },
	{ id: 'questions', title: 'Questions' }
];

export type FrameworkColorStyle = CSSProperties & { '--fw-color': string };

export const frameworkColor = (color: string): FrameworkColorStyle => ({
	'--fw-color': color
});
