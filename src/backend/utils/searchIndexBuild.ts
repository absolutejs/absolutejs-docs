import { createElement } from 'react';
import { renderToReadableStream } from 'react-dom/server';
import { documentationMetadataFor } from '../../frontend/data/documentation/documentationMetadata';
import { searchKeywordsFor } from '../../frontend/data/documentation/searchKeywords';
import { docsViews, sidebarCategories } from '../../frontend/data/sidebarData';
import { useTheme } from '../../frontend/hooks/useTheme';
import { isValidViewId } from '../../types/typeGuards';
import {
	isExpandableEntry,
	type DocsView,
	type StoredSearchPage,
	type StoredSearchSection
} from '../../types/types';

/*
 * Builds the docs search index by rendering every docs page and splitting it
 * into sections. It runs ahead of time (bun run search:generate), never in
 * the server: rendering all 602 views at runtime took a process from about
 * 107 to 342 MB and filled the code highlighter's cache with every code block
 * on the site, and that index build was the docs server's memory peak
 * (2026-11-01). The server reads the finished index file on the first search.
 */

type SectionHeading = { anchor: string | null; heading: string };

const TITLE_SUFFIX = / \| AbsoluteJS$/;
const ENTITIES: Record<string, string> = {
	'&#39;': "'",
	'&#x27;': "'",
	'&amp;': '&',
	'&gt;': '>',
	'&lt;': '<',
	'&nbsp;': ' ',
	'&quot;': '"'
};

const decodeEntities = (value: string) =>
	value.replace(
		/&(?:#39|#x27|amp|gt|lt|nbsp|quot);/g,
		(entity) => ENTITIES[entity] ?? entity
	);

const toText = (html: string) =>
	decodeEntities(html.replace(/<[^>]+>/g, ' '))
		.replace(/\s+/g, ' ')
		.trim();

const normalize = (value: string) => value.toLowerCase();

// Sidebar position of every page: category, then group, then its label.
const sidebarPathByView = new Map<string, { label: string; path: string[] }>();
for (const category of sidebarCategories)
	for (const entry of category.entries) {
		if (isExpandableEntry(entry))
			for (const page of entry.pages)
				sidebarPathByView.set(page.id, {
					label: page.label,
					path: [category.label, entry.label]
				});
		else if (entry.id)
			sidebarPathByView.set(entry.id, {
				label: entry.label,
				path: [category.label]
			});
	}

const SearchIndexPage = ({ view }: { view: DocsView }) => {
	const [themeSprings] = useTheme(undefined);

	return createElement(docsViews[view], {
		currentPageId: view,
		isMobileOrTablet: true,
		themeSprings,
		onNavigate: () => undefined
	});
};

// Splits a rendered page into its headings and the text under each one.
const sectionsOf = (html: string, fallbackHeading: string) => {
	const withoutChrome = html
		.replace(/<(script|style|svg|nav)\b[\s\S]*?<\/\1>/g, ' ')
		.replace(/<button\b[\s\S]*?<\/button>/g, ' ');
	const headingPattern = /<h([1-3])\b([^>]*)>([\s\S]*?)<\/h\1>/g;
	const sections: StoredSearchSection[] = [];
	let current: SectionHeading = { anchor: null, heading: fallbackHeading };
	let cursor = 0;
	const push = (body: string) => {
		const text = toText(body);
		if (!text) return;
		sections.push({
			...current,
			headingTerms: normalize(current.heading),
			text
		});
	};
	for (const match of withoutChrome.matchAll(headingPattern)) {
		push(withoutChrome.slice(cursor, match.index));
		const [, level, attributes = '', inner = ''] = match;
		const id = /\bid="([^"]+)"/.exec(attributes)?.[1] ?? null;
		current = {
			anchor: level === '1' ? null : id,
			// Anchor headings render a # link before the heading text.
			heading: toText(inner).replace(/^#\s*/, '') || fallbackHeading
		};
		cursor = (match.index ?? 0) + match[0].length;
	}
	push(withoutChrome.slice(cursor));

	return sections;
};

// renderToString is missing from the production server's react-dom build;
// the streaming renderer that serves every page is always there.
const renderPage = async (view: DocsView) => {
	const stream = await renderToReadableStream(
		createElement(SearchIndexPage, { view })
	);
	await stream.allReady;

	return new Response(stream).text();
};

const indexPage = async (
	view: DocsView,
	renderFailures: string[]
): Promise<StoredSearchPage | null> => {
	const metadata = documentationMetadataFor(view);
	const title = metadata.title.replace(TITLE_SUFFIX, '');
	const sidebar = sidebarPathByView.get(view);
	const label = sidebar?.label ?? title;
	const breadcrumb = sidebar?.path ?? [];
	let html: string;
	try {
		html = await renderPage(view);
	} catch (error) {
		renderFailures.push(
			`${view}: ${error instanceof Error ? error.message : String(error)}`
		);

		return null;
	}

	return {
		breadcrumb,
		description: metadata.description,
		fields: {
			breadcrumb: normalize(breadcrumb.join(' ')),
			description: normalize(metadata.description),
			keywords: normalize(searchKeywordsFor(view).join(' ')),
			label: normalize(label),
			title: normalize(title)
		},
		label,
		sections: sectionsOf(html, title),
		title,
		view
	};
};

/** Every docs page's search entry, rendered one at a time, with the pages
 *  that failed to render. */
export const buildSearchIndex = async () => {
	const renderFailures: string[] = [];
	const pages = await Object.keys(docsViews)
		.filter(isValidViewId)
		.reduce<Promise<StoredSearchPage[]>>(async (previous, view) => {
			const indexed = await previous;
			const page = await indexPage(view, renderFailures);
			if (page) indexed.push(page);

			return indexed;
		}, Promise.resolve([]));

	return { pages, renderFailures };
};
