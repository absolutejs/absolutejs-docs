import { createHighlighterCoreSync } from '@shikijs/core';
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';
import css from '@shikijs/langs/css';
import docker from '@shikijs/langs/docker';
import html from '@shikijs/langs/html';
import javascript from '@shikijs/langs/javascript';
import json from '@shikijs/langs/json';
import shellscript from '@shikijs/langs/shellscript';
import sql from '@shikijs/langs/sql';
import svelte from '@shikijs/langs/svelte';
import toml from '@shikijs/langs/toml';
import tsx from '@shikijs/langs/tsx';
import typescript from '@shikijs/langs/typescript';
import vue from '@shikijs/langs/vue';
import yaml from '@shikijs/langs/yaml';
import catppuccinLatte from '@shikijs/themes/catppuccin-latte';
import tokyoNight from '@shikijs/themes/tokyo-night';

const languageAliases: Record<string, string> = {
	dockerfile: 'docker',
	js: 'javascript',
	markup: 'html',
	plaintext: 'text',
	sh: 'shellscript',
	ts: 'typescript',
	txt: 'text',
	xml: 'html'
};

const highlighter = createHighlighterCoreSync({
	engine: createJavaScriptRegexEngine({ forgiving: true }),
	langs: [
		css,
		docker,
		html,
		javascript,
		json,
		shellscript,
		sql,
		svelte,
		toml,
		tsx,
		typescript,
		vue,
		yaml
	],
	themes: [catppuccinLatte, tokyoNight]
});

const loadedLanguages = new Set(highlighter.getLoadedLanguages());

export const highlightCode = (code: string, language: string) =>
	highlighter.codeToHtml(code, {
		defaultColor: false,
		lang: resolveCodeLanguage(language),
		themes: { dark: 'tokyo-night', light: 'catppuccin-latte' }
	});

export const resolveCodeLanguage = (language: string) => {
	const normalized = language.toLowerCase();
	const resolved = languageAliases[normalized] ?? normalized;
	if (resolved === 'text') return 'text';

	return loadedLanguages.has(resolved) ? resolved : 'text';
};
