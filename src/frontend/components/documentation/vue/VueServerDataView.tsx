import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	vueServerDataBasic,
	vueServerDataClientOnly,
	vueServerDataHandler,
	vueServerDataKeys,
	vueServerDataNone,
	vueServerDataPayload
} from '../../../data/documentation/vueServerDataDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#use-server-data', label: 'useServerData' },
	{ href: '#return-values', label: 'Return Values' },
	{ href: '#hydration', label: 'Hydration' },
	{ href: '#keys', label: 'Keys and Values' },
	{ href: '#errors', label: 'Errors' },
	{ href: '#client-none', label: "client: 'none'" }
];

const returnRows: DocsTableCell[][] = [
	[
		{ code: 'data' },
		{ code: 'Ref<T | null>' },
		'The loaded value. T is the loader’s resolved type.'
	],
	[
		{ code: 'error' },
		{ code: 'Ref<Error | null>' },
		'The last failure, on the server or in the browser.'
	],
	[
		{ code: 'pending' },
		{ code: 'Ref<boolean>' },
		'True while a load is in flight.'
	],
	[
		{ code: 'refresh' },
		{ code: '() => Promise<void>' },
		'Loads again in the browser, aborting a load in flight.'
	]
];

const runRows: DocsTableCell[][] = [
	['First load of a hydrated page', 'Runs once', 'Reads the page, no fetch'],
	['Client-side route change to the component', 'No', 'Runs'],
	['The same component mounting again', 'No', 'Runs'],
	[{ code: "client: 'none'" }, 'Runs once', 'No client code is sent'],
	[{ code: 'server: false' }, 'Skipped, renders pending', 'Runs'],
	['Page that exports routes (SPA shell)', 'Skipped', 'Runs'],
	[
		{ code: 'collectStreamingSlots: true' },
		'Runs once',
		'Reads the page, no fetch'
	]
];

export const VueServerDataView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const showDesktopToc = !isMobileOrTablet;

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 id="vue-server-data" style={h1Style(isMobileOrTablet)}>
						Server Data
					</h1>
					<p style={paragraphLargeStyle}>
						<code>useServerData</code> loads data while a Vue page
						renders on the server and sends it to the browser with
						the page. Hydration reads that value instead of fetching
						again.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="use-server-data"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						useServerData
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Call <code>useServerData(key, loader)</code> in{' '}
						<code>{'<script setup>'}</code> or <code>setup()</code>.
						Import it from <code>@absolutejs/absolute/vue</code>.
						The loader receives an <code>AbortSignal</code> and
						returns a promise. On the server it runs in Vue&apos;s{' '}
						<code>onServerPrefetch</code>, so the page renders with
						the data in place.
					</p>
					<PrismPlus
						codeString={vueServerDataBasic}
						language="vue"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The route handler doesn&apos;t change. Register the page
						as usual.
					</p>
					<PrismPlus
						codeString={vueServerDataHandler}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="return-values"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Return Values
					</AnchorHeading>
					<DocsTable
						columns={['Name', 'Type', 'Meaning']}
						rows={returnRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						In the browser the signal aborts when the component
						unmounts or <code>refresh()</code> starts a new load.
						Pass it to <code>fetch</code> so stale requests are
						cancelled.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="hydration"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Hydration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						After rendering, the page handler writes every value it
						loaded into one inline script before the page&apos;s
						module script. A page that loaded no server data gets no
						script.
					</p>
					<PrismPlus
						codeString={vueServerDataPayload}
						language="html"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The JSON is escaped so a value can&apos;t close the
						script element. When the page hydrates,{' '}
						<code>useServerData</code> reads its key from the
						payload and doesn&apos;t call the loader. Each entry is
						used once, so later mounts of the component load in the
						browser.
					</p>
					<DocsTable
						columns={['Situation', 'Server', 'Browser']}
						rows={runRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Pass <code>{'{ server: false }'}</code> to always load
						in the browser. The server renders the pending state.
					</p>
					<PrismPlus
						codeString={vueServerDataClientOnly}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="keys"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Keys and Values
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A key must be unique among the{' '}
						<code>useServerData</code> calls of one request. Outside
						production, two calls with one key fail the page with an
						error that names the key. In production the second call
						logs a warning and loads in the browser. When a
						component appears more than once, put its identity in
						the key.
					</p>
					<PrismPlus
						codeString={vueServerDataKeys}
						language="vue"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Results travel as JSON. Dates arrive as strings,{' '}
						<code>undefined</code> becomes <code>null</code>, and a
						value JSON can&apos;t encode, such as a cycle or a{' '}
						<code>BigInt</code>, becomes that key&apos;s error.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="errors"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Errors
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A loader that throws on the server doesn&apos;t fail the
						page. The component renders with <code>error</code> set,
						and the browser hydrates with an <code>Error</code> of
						the same <code>name</code>. Outside production the
						message is the original one. In production it is
						replaced with <code>Loading server data failed.</code>{' '}
						so server details don&apos;t reach the page. The
						original error is logged on the server.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="client-none"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						client: &apos;none&apos;
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						A page registered with{' '}
						<code>client: &apos;none&apos;</code> is rendered on the
						server only. It ships no script: no props script, no
						module script and no server data payload.{' '}
						<code>indexPath</code> is optional, and the build skips
						that page&apos;s client bundle.{' '}
						<code>useServerData</code> still runs on the server, so
						the HTML includes the data.
					</p>
					<PrismPlus
						codeString={vueServerDataNone}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The build finds the <code>client</code> value in the
						handler source. A string literal or a <code>const</code>{' '}
						in the same file works. A value it can&apos;t know at
						build time keeps the client bundle; the page still
						renders without scripts.
					</p>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					isOpen={tocOpen ?? false}
					items={tocItems}
					onToggle={onTocToggle}
					themeSprings={themeSprings}
				/>
			)}
		</div>
	);
};
