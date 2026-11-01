import { join } from 'node:path';
import process from 'node:process';
import { file } from 'bun';
import type {
	DocsSearchResult,
	StoredSearchPage,
	StoredSearchSection
} from '../../types/types';

/*
 * Docs search. The index is built ahead of time (searchIndexBuild.ts, run by
 * bun run search:generate) and read from its file on the first search, so
 * the server never renders the whole site to build it.
 */

type IndexedSection = StoredSearchSection & { textLower: string };
type IndexedPage = Omit<StoredSearchPage, 'sections'> & {
	sections: IndexedSection[];
};

export const SEARCH_INDEX_PATH = join(
	'src',
	'backend',
	'generated',
	'searchIndex.json'
);

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

let indexPromise: Promise<IndexedPage[]> | undefined;

const loadIndex = async () => {
	const stored: StoredSearchPage[] = await file(
		join(process.cwd(), SEARCH_INDEX_PATH)
	).json();

	// The file leaves out each section's lowercase text, which is as large
	// as the text itself; it is rebuilt once here.
	return stored.map(
		(page): IndexedPage => ({
			...page,
			sections: page.sections.map((section) => ({
				...section,
				textLower: normalize(section.text)
			}))
		})
	);
};

export const getDocsSearchIndex = () => {
	indexPromise ??= loadIndex().catch((error: unknown) => {
		indexPromise = undefined;
		throw error;
	});

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
