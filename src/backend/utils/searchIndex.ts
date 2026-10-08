import { sleep } from 'bun';
import { createElement } from 'react';
import { renderToReadableStream } from 'react-dom/server';
import { documentationMetadataFor } from '../../frontend/data/documentation/documentationMetadata';
import { searchKeywordsFor } from '../../frontend/data/documentation/searchKeywords';
import { docsViews, sidebarCategories } from '../../frontend/data/sidebarData';
import { useTheme } from '../../frontend/hooks/useTheme';
import { isValidViewId } from '../../types/typeGuards';
import {
	isExpandableEntry,
	type DocsSearchResult,
	type DocsView
} from '../../types/types';

type IndexedSection = {
	anchor: string | null;
	heading: string;
	headingTerms: string;
	text: string;
	textLower: string;
};

type IndexedPage = {
	breadcrumb: string[];
	description: string;
	fields: {
		breadcrumb: string;
		description: string;
		keywords: string;
		label: string;
		title: string;
	};
	label: string;
	sections: IndexedSection[];
	title: string;
	view: string;
};

type SectionHeading = { anchor: string | null; heading: string };

const MAX_RESULTS = 20;
const MAX_QUERY_TERMS = 8;
const MIN_TERM_LENGTH = 2;
const SNIPPET_RADIUS = 90;
const MAX_BODY_HITS = 5;
const MAX_BODY_SCORE = 12;
const NOT_FOUND = -1;
const OVERVIEW_LABELS = new Set(['guide', 'overview']);
// How much a query term counts in each place it can appear. A page's title,
// sidebar label and search keywords outweigh any amount of body text, and a
// section's overview answers a query that names the section.
const WEIGHTS: Record<
	| 'breadcrumb'
	| 'description'
	| 'heading'
	| 'headingPhrase'
	| 'keywords'
	| 'label'
	| 'overview'
	| 'title'
	| 'titlePhrase',
	number
> = {
	breadcrumb: 4,
	description: 3,
	heading: 6,
	headingPhrase: 10,
	keywords: 8,
	label: 10,
	overview: 25,
	title: 12,
	titlePhrase: 15
};
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

const termsOf = (query: string) =>
	[
		...new Set(
			normalize(query)
				.split(/[^a-z0-9@./-]+/)
				.map((term) => term.replace(/^[./-]+|[./-]+$/g, ''))
				.filter((term) => term.length >= MIN_TERM_LENGTH)
		)
	].slice(0, MAX_QUERY_TERMS);

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
	const sections: IndexedSection[] = [];
	let current: SectionHeading = { anchor: null, heading: fallbackHeading };
	let cursor = 0;
	const push = (body: string) => {
		const text = toText(body);
		if (!text) return;
		sections.push({
			...current,
			headingTerms: normalize(current.heading),
			text,
			textLower: normalize(text)
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

const indexPage = async (view: DocsView): Promise<IndexedPage | null> => {
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

let indexPromise: Promise<IndexedPage[]> | undefined;
const renderFailures: string[] = [];

// Renders one page per turn of the event loop, so building the index never
// holds up requests.
const buildIndex = async () => {
	const pages = await Object.keys(docsViews)
		.filter(isValidViewId)
		.reduce<Promise<IndexedPage[]>>(async (previous, view) => {
			const indexed = await previous;
			await sleep(0);
			const page = await indexPage(view);
			if (page) indexed.push(page);

			return indexed;
		}, Promise.resolve([]));
	if (renderFailures.length > 0)
		console.warn(
			`[search] ${renderFailures.length} docs pages could not be indexed; first: ${renderFailures[0]}`
		);

	return pages;
};

export const getDocsSearchIndex = () => {
	indexPromise ??= buildIndex();

	return indexPromise;
};

const containsWord = (haystack: string, term: string) => {
	let index = haystack.indexOf(term);
	while (index !== NOT_FOUND) {
		const before = index === 0 ? ' ' : haystack[index - 1];
		if (!before || !/[a-z0-9]/.test(before)) return true;
		index = haystack.indexOf(term, index + 1);
	}

	return false;
};

const countHits = (haystack: string, term: string, limit: number) => {
	let count = 0;
	let index = haystack.indexOf(term);
	while (index !== NOT_FOUND && count < limit) {
		count += 1;
		index = haystack.indexOf(term, index + term.length);
	}

	return count;
};

const snippetOf = (section: IndexedSection, terms: string[]) => {
	const positions = terms
		.map((term) => section.textLower.indexOf(term))
		.filter((position) => position !== NOT_FOUND);
	if (positions.length === 0)
		return section.text.slice(0, SNIPPET_RADIUS * 2);
	const center = Math.min(...positions);
	const start = Math.max(0, center - SNIPPET_RADIUS);
	const end = Math.min(section.text.length, center + SNIPPET_RADIUS);

	return `${start > 0 ? '…' : ''}${section.text.slice(start, end).trim()}${end < section.text.length ? '…' : ''}`;
};

const scoreSection = (section: IndexedSection, terms: string[]) =>
	terms.reduce(
		(score, term) =>
			score +
			(containsWord(section.headingTerms, term) ? WEIGHTS.heading : 0) +
			countHits(section.textLower, term, MAX_BODY_HITS),
		0
	);

const scorePage = (page: IndexedPage, terms: string[], phrase: string) => {
	let score = 0;
	for (const term of terms) {
		const fieldScore =
			(containsWord(page.fields.title, term) ? WEIGHTS.title : 0) +
			(containsWord(page.fields.label, term) ? WEIGHTS.label : 0) +
			(containsWord(page.fields.keywords, term) ? WEIGHTS.keywords : 0) +
			(containsWord(page.fields.breadcrumb, term)
				? WEIGHTS.breadcrumb
				: 0) +
			(containsWord(page.fields.description, term)
				? WEIGHTS.description
				: 0);
		const inBody = page.sections.some(
			(section) =>
				section.headingTerms.includes(term) ||
				section.textLower.includes(term)
		);
		if (fieldScore === 0 && !inBody) return null;
		score += fieldScore;
		if (
			OVERVIEW_LABELS.has(page.fields.label) &&
			containsWord(page.fields.breadcrumb, term)
		)
			score += WEIGHTS.overview;
	}
	if (phrase.includes(' ')) {
		if (page.fields.title.includes(phrase)) score += WEIGHTS.titlePhrase;
		else if (
			page.sections.some((section) =>
				section.headingTerms.includes(phrase)
			)
		)
			score += WEIGHTS.headingPhrase;
	}

	return score;
};

export const searchDocs = async (query: string) => {
	const terms = termsOf(query);
	if (terms.length === 0) return [];
	const phrase = normalize(query).trim();
	const index = await getDocsSearchIndex();
	const results: Array<DocsSearchResult & { score: number }> = [];
	for (const page of index) {
		const pageScore = scorePage(page, terms, phrase);
		if (pageScore === null) continue;
		const ranked = page.sections
			.map((section) => ({
				score: scoreSection(section, terms),
				section
			}))
			.sort((left, right) => right.score - left.score);
		const [best] = ranked;
		const bodyScore = Math.min(best?.score ?? 0, MAX_BODY_SCORE);
		const section =
			best && best.score > 0 ? best.section : page.sections[0];
		const snippet = section ? snippetOf(section, terms) : '';
		results.push({
			anchor: section?.anchor ?? null,
			breadcrumb: page.breadcrumb,
			heading: section?.anchor ? section.heading : null,
			score: pageScore + bodyScore,
			snippet: snippet || page.description,
			title: page.title,
			view: page.view
		});
	}

	return results
		.sort((left, right) => right.score - left.score)
		.slice(0, MAX_RESULTS)
		.map(
			(result): DocsSearchResult => ({
				anchor: result.anchor,
				breadcrumb: result.breadcrumb,
				heading: result.heading,
				snippet: result.snippet,
				title: result.title,
				view: result.view
			})
		);
};
