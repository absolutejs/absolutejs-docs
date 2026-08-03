import { readFileSync } from 'fs';
import process from 'node:process';
import { Glob } from 'bun';
import { resolveCodeLanguage } from '../src/frontend/components/utils/codeHighlighter';

// Every language used by a documentation code sample must resolve to a
// grammar loaded in the shiki bundle (codeHighlighter.ts). Anything else
// silently renders as plain text, so this check fails the build instead.
const plainTextLanguages = new Set(['plain', 'plaintext', 'text', 'txt']);
const exampleFileLimit = 3;

const languagePattern = /language(?:="([A-Za-z0-9-]+)"|:\s*'([A-Za-z0-9-]+)')/g;

const collectLanguages = (
	filePath: string,
	usage: Map<string, Set<string>>
) => {
	const content = readFileSync(filePath, 'utf8');
	for (const match of content.matchAll(languagePattern)) {
		const language = (match[1] ?? match[2] ?? '').toLowerCase();
		if (!language) continue;
		const files = usage.get(language) ?? new Set<string>();
		files.add(filePath);
		usage.set(language, files);
	}
};

const usageByLanguage = new Map<string, Set<string>>();
const sourceGlob = new Glob('src/frontend/**/*.{ts,tsx}');
for (const filePath of sourceGlob.scanSync('.')) {
	collectLanguages(filePath, usageByLanguage);
}

const failures = [...usageByLanguage.entries()].filter(([language]) => {
	if (plainTextLanguages.has(language)) return false;

	return resolveCodeLanguage(language) === 'text';
});

if (failures.length > 0) {
	console.error(
		'Code sample languages missing from the shiki bundle (add the grammar to src/frontend/components/utils/codeHighlighter.ts or fix the language tag):'
	);
	console.error(
		failures
			.map(
				([language, files]) =>
					`- ${language} (${[...files].slice(0, exampleFileLimit).join(', ')})`
			)
			.join('\n')
	);
	process.exit(1);
}

console.warn(
	`Verified ${usageByLanguage.size} code sample languages against the shiki bundle.`
);
