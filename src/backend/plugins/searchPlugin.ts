import { env } from 'process';
import { Elysia, t } from 'elysia';
import { getDocsSearchIndex, searchDocs } from '../utils/searchIndex';

const MAX_QUERY_LENGTH = 200;
const WARM_DELAY_MS = 2_000;

// Production builds the index shortly after boot so the first search is
// instant; development builds it on the first search instead of on every
// server restart.
if (env.NODE_ENV === 'production')
	setTimeout(() => void getDocsSearchIndex(), WARM_DELAY_MS);

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
