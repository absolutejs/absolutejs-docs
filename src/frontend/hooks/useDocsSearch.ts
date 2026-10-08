import { useEffect, useState } from 'react';
import type { DocsSearchResult } from '../../types/types';
import { server } from '../utils/edenTreaty';

const DEBOUNCE_MS = 120;
// Matches the server's limit, so a long paste still searches.
const MAX_QUERY_LENGTH = 200;

type DocsSearchState = {
	error: boolean;
	loading: boolean;
	query: string;
	results: DocsSearchResult[];
};

// Searches page titles, headings and text as the query changes. A new query
// cancels the request for the previous one, and the last results stay on
// screen until the next ones arrive.
export const useDocsSearch = (query: string) => {
	const [state, setState] = useState<DocsSearchState>({
		error: false,
		loading: false,
		query: '',
		results: []
	});

	useEffect(() => {
		const trimmed = query.trim().slice(0, MAX_QUERY_LENGTH);
		if (trimmed === '') {
			setState({ error: false, loading: false, query: '', results: [] });

			return undefined;
		}
		const controller = new AbortController();
		setState((current) => ({ ...current, loading: true }));
		const timer = setTimeout(async () => {
			const { data, error } = await server.api.v1.search.get({
				fetch: { signal: controller.signal },
				query: { query: trimmed }
			});
			if (controller.signal.aborted) return;
			setState((current) =>
				error
					? { ...current, error: true, loading: false }
					: {
							error: false,
							loading: false,
							query: trimmed,
							results: data
						}
			);
		}, DEBOUNCE_MS);

		return () => {
			clearTimeout(timer);
			controller.abort();
		};
	}, [query]);

	return state;
};
