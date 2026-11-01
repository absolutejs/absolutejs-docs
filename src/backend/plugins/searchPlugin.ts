import { Elysia, t } from 'elysia';
import { searchDocs } from '../utils/searchIndex';

const MAX_QUERY_LENGTH = 200;

// The index is a prebuilt file (scripts/generateSearchIndex.ts), read on the
// first search: there is nothing to warm at boot.
export const searchPlugin = new Elysia().get(
	'/api/v1/search',
	{
		query: t.Object({ query: t.String({ maxLength: MAX_QUERY_LENGTH }) })
	},
	async ({ query: { query }, set }) => {
		set.headers['cache-control'] = 'public, max-age=300';

		return searchDocs(query);
	}
);
