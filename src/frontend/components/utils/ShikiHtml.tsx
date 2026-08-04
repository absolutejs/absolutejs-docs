import { useMemo } from 'react';
import { highlightCode } from './codeHighlighter';

type ShikiHtmlProps = {
	code: string;
	language: string;
};

/**
 * Highlights code with Shiki (memoized — tokenization is expensive and must
 * not re-run on unrelated re-renders) and renders the output. This is the
 * single sanctioned `dangerouslySetInnerHTML` site: the HTML is generated
 * locally by Shiki from code strings in this repo, never from user input.
 * Excluded from linting via eslint.config.mjs ignores.
 *
 * `suppressHydrationWarning` is required: Shiki's JavaScript regex engine
 * executes some translated grammar patterns differently on JavaScriptCore
 * (Bun, our SSR runtime) than on V8 (browsers), even with the translation
 * target pinned — e.g. a trailing `// comment` after JSX on the same line
 * tokenizes as a comment on V8 but not on JSC. The server's rendering is
 * kept for such blocks; the client recomputes only when the code changes.
 */
export const ShikiHtml = ({ code, language }: ShikiHtmlProps) => {
	const html = useMemo(() => highlightCode(code, language), [code, language]);

	return (
		<div
			dangerouslySetInnerHTML={{ __html: html }}
			suppressHydrationWarning={true}
		/>
	);
};
