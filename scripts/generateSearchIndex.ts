/*
 * Writes the docs search index (src/backend/generated/searchIndex.json) by
 * rendering every docs page. `--check` fails when the committed file is not
 * what the current pages produce, so a docs change cannot ship a stale index.
 *
 *   bun run search:generate   rewrite the index
 *   bun run check:search      fail if it is out of date
 */
import process from 'node:process';
import { file as bunFile, write } from 'bun';
import { SEARCH_INDEX_PATH } from '../src/backend/utils/searchIndex';
import { buildSearchIndex } from '../src/backend/utils/searchIndexBuild';

const { pages, renderFailures } = await buildSearchIndex();
if (renderFailures.length > 0) {
	console.error(
		`${renderFailures.length} docs pages could not be rendered for search:\n${renderFailures.join('\n')}`
	);
	process.exit(1);
}

// One page per line: a docs change rewrites the lines of the pages it
// touched, not the whole file.
const contents = `[\n${pages.map((page) => JSON.stringify(page)).join(',\n')}\n]\n`;
const file = bunFile(SEARCH_INDEX_PATH);

if (process.argv.includes('--check')) {
	const committed = (await file.exists()) ? await file.text() : '';
	if (committed !== contents) {
		console.error(
			`${SEARCH_INDEX_PATH} is out of date. Run \`bun run search:generate\` and commit it.`
		);
		process.exit(1);
	}
	console.warn(`${SEARCH_INDEX_PATH} is current (${pages.length} pages).`);
} else {
	await write(file, contents);
	console.warn(`Wrote ${SEARCH_INDEX_PATH} (${pages.length} pages).`);
}
