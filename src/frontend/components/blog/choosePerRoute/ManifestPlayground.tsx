import { useState, type ReactNode } from 'react';
import { frameworkColor, frameworks, type FrameworkKey } from './frameworks';

const MAX_NAME_LENGTH = 28;
const HASH_LENGTH = 8;
const HASH_RADIX = 36;
const FNV_OFFSET = 2166136261;
const FNV_PRIME = 16777619;

const toPascalCase = (value: string) => {
	const words = value
		.replace(/[^A-Za-z0-9 _-]/g, '')
		.split(/[\s_-]+/)
		.filter((word) => word.length > 0);
	const joined = words
		.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
		.join('');

	return joined.length > 0 ? joined : 'Page';
};

// Illustrative only: a stable stand-in for the content hash a build writes.
const exampleHash = (seed: string) => {
	let hash = FNV_OFFSET;
	for (const character of seed) {
		hash ^= character.charCodeAt(0);
		hash = Math.imul(hash, FNV_PRIME);
	}

	return (hash >>> 0).toString(HASH_RADIX).slice(0, HASH_LENGTH);
};

const toRoute = (pascal: string) =>
	`/${pascal.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;

const fileExtensions: Record<FrameworkKey, string> = {
	angular: 'ts',
	htmx: 'html',
	react: 'tsx',
	svelte: 'svelte',
	vue: 'vue'
};

type ManifestRow = { key: string; path: string };

const manifestRows = (name: string, framework: FrameworkKey) => {
	const rows: ManifestRow[] = [];
	if (framework === 'htmx') {
		rows.push({
			key: name,
			path: `/htmx/pages/${name}.${exampleHash(`${name}htmx`)}.html`
		});
	} else {
		rows.push({
			key: name,
			path:
				framework === 'react'
					? 'Not needed: the component is imported directly'
					: `/${framework}/server/${name}.${exampleHash(`${name}${framework}`)}.js`
		});
		rows.push({
			key: `${name}Index`,
			path: `/${framework}/indexes/${name}.${exampleHash(`${name}index${framework}`)}.js`
		});
	}
	if (framework === 'vue') {
		rows.push({
			key: `${name}CompiledCSS`,
			path: `/vue/compiled/${name}.${exampleHash(`${name}vue`)}.css`
		});
	}
	rows.push({
		key: `${name}CSS`,
		path: `/styles/${name}.${exampleHash(`${name}css`)}.css`
	});

	return rows;
};

const TokenFunction = ({ children }: { children: ReactNode }) => (
	<span className="cpr-tok-fn">{children}</span>
);
const TokenString = ({ children }: { children: ReactNode }) => (
	<span className="cpr-tok-str">{children}</span>
);
const TokenKeyword = ({ children }: { children: ReactNode }) => (
	<span className="cpr-tok-kw">{children}</span>
);
const TokenComment = ({ children }: { children: ReactNode }) => (
	<span className="cpr-tok-com">{children}</span>
);

const Asset = ({ name }: { name: string }) => (
	<>
		<TokenFunction>asset</TokenFunction>(manifest,{' '}
		<TokenString>&apos;{name}&apos;</TokenString>)
	</>
);

const RouteHead = ({ route }: { route: string }) => (
	<>
		.<TokenFunction>get</TokenFunction>(
		<TokenString>&apos;{route}&apos;</TokenString>, () =&gt;
		{'\n'}
	</>
);

const HandlerCode = ({
	framework,
	name
}: {
	framework: FrameworkKey;
	name: string;
}) => {
	const route = toRoute(name);

	if (framework === 'react') {
		return (
			<>
				<RouteHead route={route} />
				{'  '}
				<TokenFunction>handleReactPageRequest</TokenFunction>({'{\n'}
				{'    '}Page: {name},{'\n'}
				{'    '}index: <Asset name={`${name}Index`} />,{'\n'}
				{'    '}props: {'{'} cssPath: <Asset name={`${name}CSS`} />{' '}
				{'}'} <TokenComment>// type-checked</TokenComment>
				{'\n  }))'}
			</>
		);
	}
	if (framework === 'svelte') {
		return (
			<>
				<RouteHead route={route} />
				{'  '}
				<TokenFunction>handleSveltePageRequest</TokenFunction>&lt;
				<TokenKeyword>typeof</TokenKeyword> {name}
				&gt;({'{\n'}
				{'    '}indexPath: <Asset name={`${name}Index`} />,{'\n'}
				{'    '}pagePath: <Asset name={name} />,{'\n'}
				{'    '}props: {'{'} cssPath: <Asset name={`${name}CSS`} />{' '}
				{'}'}
				{'\n  }))'}
			</>
		);
	}
	if (framework === 'vue') {
		return (
			<>
				<RouteHead route={route} />
				{'  '}
				<TokenFunction>handleVuePageRequest</TokenFunction>&lt;
				<TokenKeyword>typeof</TokenKeyword> {name}&gt;(
				{'{\n'}
				{'    '}headTag:{' '}
				<TokenFunction>generateHeadElement</TokenFunction>({'{\n'}
				{'      '}cssPath: [<Asset name={`${name}CSS`} />,{' '}
				<Asset name={`${name}CompiledCSS`} />]{'\n'}
				{'    '}
				{'}),\n'}
				{'    '}indexPath: <Asset name={`${name}Index`} />,{'\n'}
				{'    '}pagePath: <Asset name={name} />
				{'\n  }))'}
			</>
		);
	}
	if (framework === 'angular') {
		return (
			<>
				<RouteHead route={route} />
				{'  '}
				<TokenFunction>handleAngularPageRequest</TokenFunction>&lt;
				{name}Page.Context&gt;(
				{'{\n'}
				{'    '}headTag:{' '}
				<TokenFunction>generateHeadElement</TokenFunction>({'{'}{' '}
				cssPath: <Asset name={`${name}CSS`} /> {'}),\n'}
				{'    '}indexPath: <Asset name={`${name}Index`} />,{'\n'}
				{'    '}pagePath: <Asset name={name} />,{'\n'}
				{'    '}requestContext: {'{}'}{' '}
				<TokenComment>// read with usePageContext()</TokenComment>
				{'\n  }))'}
			</>
		);
	}

	return (
		<>
			<RouteHead route={route} />
			{'  '}
			<TokenFunction>handleHTMXPageRequest</TokenFunction>(
			<Asset name={name} />
			))
		</>
	);
};

type FrameworkPickerProps = {
	onSelect: (framework: FrameworkKey) => void;
	selected: FrameworkKey;
};

const FrameworkPicker = ({ onSelect, selected }: FrameworkPickerProps) => (
	<fieldset className="cpr-fw-row">
		<legend className="cpr-visually-hidden">Framework</legend>
		{frameworks.map((option) => (
			<button
				aria-pressed={option.key === selected}
				key={option.key}
				onClick={() => onSelect(option.key)}
				style={frameworkColor(option.color)}
				type="button"
			>
				<i className="cpr-dot" />
				{option.name}
			</button>
		))}
	</fieldset>
);

const ManifestKeys = ({ rows }: { rows: ManifestRow[] }) => (
	<dl aria-live="polite" className="cpr-keys">
		{rows.map((row) => (
			<div key={row.key}>
				<dt>{row.key}</dt>
				<dd>{row.path}</dd>
			</div>
		))}
	</dl>
);

type RoutePanelProps = { framework: FrameworkKey; name: string };

const RoutePanel = ({ framework, name }: RoutePanelProps) => (
	<div className="cpr-code">
		<div className="cpr-code-bar">
			<span>
				{framework}/pages/{name}.{fileExtensions[framework]}
			</span>
			<span>server.ts</span>
		</div>
		<pre>
			<code>
				<HandlerCode framework={framework} name={name} />
			</code>
		</pre>
	</div>
);

export const ManifestPlayground = () => {
	const [rawName, setRawName] = useState('Dashboard');
	const [framework, setFramework] = useState<FrameworkKey>('react');
	const name = toPascalCase(rawName);

	return (
		<figure className="cpr-figure">
			<div className="cpr-play">
				<div className="cpr-play-input">
					<label htmlFor="cpr-page-name">Page name</label>
					<input
						autoComplete="off"
						className="cpr-name-input"
						id="cpr-page-name"
						maxLength={MAX_NAME_LENGTH}
						onChange={(event) => setRawName(event.target.value)}
						spellCheck={false}
						value={rawName}
					/>
					<FrameworkPicker
						onSelect={setFramework}
						selected={framework}
					/>
					<ManifestKeys rows={manifestRows(name, framework)} />
					<p className="cpr-play-note">
						The hashes are examples. A real build generates them.
					</p>
				</div>
				<RoutePanel framework={framework} name={name} />
			</div>
			<figcaption className="cpr-figcaption">
				Type a page name and pick a framework to see the manifest keys
				the build creates and the route that serves the page.
			</figcaption>
		</figure>
	);
};
