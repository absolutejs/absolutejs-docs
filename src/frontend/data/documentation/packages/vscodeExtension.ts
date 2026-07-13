import { PackageDocData } from '../../../../types/packageDocs';

export const vscodeExtensionPackageData: PackageDocData = {
	category: 'Dev Tools',
	description:
		'VS Code support for AbsoluteJS projects, starting with HTML and HTMX island authoring. Raw HTML editors do not read framework runtime types or TypeScript DOM declarations the way TSX and SFC tooling does, so the extension uses VS Code HTML custom data to bring hover docs, autocomplete and enumerated value suggestions to plain .html files. It is the dedicated home for AbsoluteJS editor tooling.',
	features: [
		{
			description:
				'Hover and autocomplete docs for the absolute-island and abs-htmx-stream-slot tags in plain HTML files.',
			title: 'Island tag docs'
		},
		{
			description:
				'Attribute docs for island authoring (framework, component, hydrate, props), HTMX streaming authoring and AbsoluteJS transport markers such as data-absolute-slot.',
			title: 'Attribute documentation'
		},
		{
			description:
				'Enumerated completions for the framework attribute (react, svelte, vue, angular) and hydrate modes (load, idle, visible, none).',
			title: 'Enumerated value suggestions'
		},
		{
			description:
				'Go-to-definition from AbsoluteJS style module imports such as *.module.scss.',
			title: 'Style module navigation'
		}
	],
	installCommand: 'code --install-extension AbsoluteJS.absolutejs-vscode',
	links: [
		{
			href: 'https://marketplace.visualstudio.com/items?itemName=AbsoluteJS.absolutejs-vscode',
			label: 'VS Code Marketplace'
		},
		{
			href: 'https://github.com/absolutejs/vscode-extension',
			label: 'GitHub'
		}
	],
	name: 'VS Code Extension',
	notes: [
		{
			body: 'Early 0.0.x. Today the extension focuses on plain .html files, where TypeScript declarations alone are not enough; activation also covers JavaScript and TypeScript (including JSX/TSX) files.',
			title: 'Alpha',
			variant: 'warning'
		}
	],
	npmName: 'absolutejs-vscode',
	samples: [
		{
			code: `# From the Marketplace
code --install-extension AbsoluteJS.absolutejs-vscode

# Or install a packaged .vsix directly
code --install-extension absolutejs-vscode-0.0.9.vsix`,
			description:
				'Install from the CLI, or via Extensions > ... > Install from VSIX... inside VS Code.',
			heading: 'Install',
			language: 'bash'
		},
		{
			code: `<!-- Hover any tag or attribute for docs; values are autocompleted -->
<absolute-island
	framework="react"
	component="Counter"
	hydrate="visible"
	props='{"start":0}'
></absolute-island>

<abs-htmx-stream-slot
	src="/api/feed"
	trigger="load"
	swap="innerHTML"
	target="#feed"
></abs-htmx-stream-slot>`,
			description:
				'The extension documents both tags and suggests enumerated values for framework and hydrate in plain HTML files.',
			heading: 'Island Authoring in HTML',
			language: 'html'
		}
	],
	status: 'alpha',
	tagline:
		'Hover docs, autocomplete and go-to-definition for AbsoluteJS island authoring in plain HTML files.',
	version: '0.0.9'
};
