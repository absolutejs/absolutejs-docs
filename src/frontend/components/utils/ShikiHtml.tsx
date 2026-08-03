type ShikiHtmlProps = {
	html: string;
};

/**
 * Renders pre-highlighted Shiki output. This is the single sanctioned
 * `dangerouslySetInnerHTML` site: the HTML is generated locally by Shiki from
 * code strings in this repo, never from user input. Excluded from linting via
 * eslint.config.mjs ignores.
 */
export const ShikiHtml = ({ html }: ShikiHtmlProps) => (
	<div dangerouslySetInnerHTML={{ __html: html }} />
);
