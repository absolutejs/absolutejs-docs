import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	i18nBrowserHelpers,
	i18nDefine,
	i18nDefineOptions,
	i18nMessages,
	i18nReactPage,
	i18nServer,
	i18nSitemap,
	i18nStandalone,
	i18nSvelteRoute,
	i18nSveltePage,
	i18nTranslation,
	i18nTypeErrors
} from '../../../data/documentation/i18nDocsCode';
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
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid } from '../../utils/DefinitionGrid';
import { DocsTable, DocsTableCell } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const strategyRows: DocsTableCell[][] = [
	[
		{ code: 'prefix', suffix: ' (default)' },
		'The first path segment: /fr/about. Unprefixed paths are the default locale. With prefixDefault, unprefixed paths negotiate instead.'
	],
	[
		{ code: 'domain' },
		'The request host, mapped through domains. An unknown host negotiates.'
	],
	[
		{ code: 'negotiate' },
		'One URL for every locale: the locale cookie, then Accept-Language, then the default.'
	]
];

const paramTypeRows: DocsTableCell[][] = [
	[{ code: '{name}' }, { code: 'string | number | bigint | Date' }],
	[
		{ code: '{count, plural, …}' },
		{ code: 'number', suffix: ' (also selectordinal and number)' }
	],
	[
		{ code: '{when, date, …}' },
		{ code: 'Date | number', suffix: ' (also time)' }
	],
	[{ code: '{kind, select, …}' }, { code: 'string' }]
];

const tocItems: TocItem[] = [
	{ href: '#messages', label: 'Message Catalogs' },
	{ href: '#define-i18n', label: 'defineI18n' },
	{ href: '#i18n-plugin', label: 'i18nPlugin' },
	{ href: '#react', label: 'React' },
	{ href: '#svelte', label: 'Svelte' },
	{ href: '#type-safety', label: 'Type Safety' },
	{ href: '#formatting', label: 'Formatting' },
	{ href: '#hreflang-sitemap', label: 'hreflang & Sitemap' },
	{ href: '#browser-helpers', label: 'Browser Helpers' },
	{ href: '#outside-requests', label: 'Outside a Request' }
];

export const I18nView = ({
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
					<h1 id="i18n" style={h1Style(isMobileOrTablet)}>
						Internationalization
					</h1>
					<p style={paragraphLargeStyle}>
						AbsoluteJS resolves each request&apos;s locale, formats
						ICU messages with the platform&apos;s <code>Intl</code>,
						and type-checks message keys and parameters against your
						default catalog. React and Svelte pages translate on the
						server and hydrate with the same messages.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="messages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Message Catalogs
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Write the default locale&apos;s catalog as a TypeScript
						module and wrap it in <code>defineMessages()</code>. It
						returns the object unchanged, typed with its literal
						strings, which is what lets <code>t()</code> check keys
						and parameters. Top-level keys are namespaces.
					</p>
					<PrismPlus
						codeString={i18nMessages}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Type every other locale as{' '}
						<code>Translation&lt;typeof en&gt;</code>: the same tree
						with string leaves. A missing key is a type error.
					</p>
					<PrismPlus
						codeString={i18nTranslation}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Messages use ICU syntax: arguments, <code>plural</code>{' '}
						(with <code>=N</code>, <code>offset:</code> and{' '}
						<code>#</code>), <code>selectordinal</code>,{' '}
						<code>select</code>, <code>number</code>, and{' '}
						<code>date</code>/<code>time</code> styles, nested.
						Plurals follow the locale&apos;s own rules.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="define-i18n"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						defineI18n
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>defineI18n()</code> from{' '}
						<code>@absolutejs/absolute</code> takes your locales,
						the default catalog as <code>messages</code>, and a
						loader for each other locale. Other catalogs load on
						first use and are cached. Each is merged over the
						default catalog, so a gap falls back to the default
						language.
					</p>
					<PrismPlus
						codeString={i18nDefine}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<code>loaders</code> must cover every locale except the
						default one; a missing loader is a type error. The
						remaining options control how a request&apos;s locale is
						chosen:
					</p>
					<PrismPlus
						codeString={i18nDefineOptions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['strategy', 'Where the locale comes from']}
						rows={strategyRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="i18n-plugin"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						i18nPlugin
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Pass the instance to <code>i18nPlugin()</code> and use
						it on your server. Under the <code>prefix</code>{' '}
						strategy, register localized routes with an optional{' '}
						<code>:locale</code> param.
					</p>
					<PrismPlus
						codeString={i18nServer}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DefinitionGrid
						items={[
							{
								description:
									'Every handler gets locale and an i18n object: t(), the format helpers, payload(), alternates() and localizePath().',
								term: 'Context'
							},
							{
								description:
									'i18n.payload(namespaces) returns this locale’s messages for hydration. List namespaces so a page ships only what it uses, and pass the result as a page prop.',
								term: 'payload()'
							},
							{
								description:
									'Every response gets Content-Language. When the locale came from the cookie or Accept-Language, it also gets Vary: Accept-Language, Cookie.',
								term: 'Headers'
							},
							{
								description:
									'A :locale param that is not a configured locale gets a 404.',
								term: 'Unknown locales'
							},
							{
								description:
									'getRequestLocale() returns the current request’s locale and text direction, for code that has no access to the handler context.',
								term: 'getRequestLocale()'
							}
						]}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="react"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						React
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Wrap the page in <code>I18nProvider</code> with the
						payload prop, and call <code>useI18n()</code> below it.
						Both come from{' '}
						<code>@absolutejs/absolute/react/hooks</code>. Pass your
						default catalog&apos;s type to the hook to check keys
						and parameters. The page sets <code>lang</code> and{' '}
						<code>dir</code> on <code>&lt;html&gt;</code> itself.
					</p>
					<PrismPlus
						codeString={i18nReactPage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The payload travels with the page&apos;s other props, so
						the browser hydrates with the same messages and adds no
						extra script.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="svelte"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Svelte
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Call <code>setI18n()</code> in the page with the payload
						prop. It returns the page&apos;s translator and shares
						it with every component below, which reads it with{' '}
						<code>getI18n()</code>. Both come from{' '}
						<code>@absolutejs/absolute/svelte</code>. AbsoluteJS
						writes the request&apos;s <code>lang</code> and{' '}
						<code>dir</code> on <code>&lt;html&gt;</code> for Svelte
						pages.
					</p>
					<PrismPlus
						codeString={i18nSveltePage}
						language="svelte"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={i18nSvelteRoute}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="type-safety"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Type Safety
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Keys and ICU parameters are read from the default
						catalog&apos;s literal strings. No code generation is
						involved.
					</p>
					<PrismPlus
						codeString={i18nTypeErrors}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Argument', 'Parameter type']}
						rows={paramTypeRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						A message without arguments takes no params object. A
						JSON catalog still works, but TypeScript widens its
						strings, so only keys are checked.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="formatting"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Formatting
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every translator, on the server or in a component, has
						the same methods. Formatters are cached per locale and
						options.
					</p>
					<DefinitionGrid
						items={[
							{
								description:
									'Formats the message at a dot-separated key. A key missing from the catalog renders as the key itself, and a missing parameter renders as {name}.',
								term: 't(key, params)'
							},
							{
								description:
									'Whether the loaded catalog has a message at the key.',
								term: 'has(key)'
							},
							{
								description:
									'Intl.NumberFormat, Intl.DateTimeFormat, Intl.RelativeTimeFormat and Intl.ListFormat for the locale.',
								term: 'formatNumber, formatDate, formatRelativeTime, formatList'
							},
							{
								description:
									"The translator's locale and its text direction, 'ltr' or 'rtl'.",
								term: 'locale, dir'
							}
						]}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="hreflang-sitemap"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						hreflang &amp; Sitemap
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>i18n.alternates()</code> returns one link per
						locale plus <code>x-default</code> for the current path.
						Pass the list to the <code>alternates</code> field of{' '}
						<code>Metadata</code>. The React and Svelte{' '}
						<code>Head</code> components and{' '}
						<code>generateHeadElement</code> render it as{' '}
						<code>
							&lt;link rel=&quot;alternate&quot; hreflang&gt;
						</code>{' '}
						tags. Under the <code>negotiate</code> strategy the list
						is empty, because every locale shares one URL.
					</p>
					<p style={paragraphSpacedStyle}>
						Set <code>sitemap.i18n</code> with the same locales to
						list every page once per locale, each with{' '}
						<code>xhtml:link</code> alternates. Routes registered as{' '}
						<code>/:locale?/…</code> or <code>/:locale/…</code> are
						listed under their unprefixed path.
					</p>
					<PrismPlus
						codeString={i18nSitemap}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="browser-helpers"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Browser Helpers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>@absolutejs/absolute/i18n</code> holds the
						browser-safe pieces: <code>defineMessages</code>, the
						message formatter, the routing helpers and{' '}
						<code>createTranslator</code>. Use them for language
						switchers and plain scripts.
					</p>
					<PrismPlus
						codeString={i18nBrowserHelpers}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						The entry also exports <code>parseMessage</code>,{' '}
						<code>alternateLinks</code>, <code>localeFromPath</code>
						, <code>stripLocalePrefix</code>,{' '}
						<code>matchLocale</code>, <code>readCookie</code>,{' '}
						<code>lookupMessage</code>, <code>isI18nPayload</code>{' '}
						and <code>isMessageTree</code>, plus the i18n types.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="outside-requests"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Outside a Request
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The instance <code>defineI18n()</code> returns works on
						its own. Use it in scripts, tests and emails.
					</p>
					<PrismPlus
						codeString={i18nStandalone}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
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
