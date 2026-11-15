import { animated } from '@react-spring/web';
import { DocsViewProps, ThemeProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	cspDefaultPolicy,
	cspDevAdditions,
	cspNoncePage,
	cspNonceServerHelper,
	secureHeadersCustomize,
	secureHeadersRemoteFonts,
	secureHeadersSetup
} from '../../../data/documentation/securityHeadersDocsCode';
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

const tocItems: TocItem[] = [
	{ href: '#setup', label: 'Setup' },
	{ href: '#default-policy', label: 'Default Policy' },
	{ href: '#nonce-coverage', label: 'What Carries the Nonce' },
	{ href: '#your-own-scripts', label: 'Your Own Scripts' },
	{ href: '#customizing', label: 'Customizing' },
	{ href: '#fonts', label: 'Fonts' },
	{ href: '#prerendered-pages', label: 'Pre-rendered Pages' }
];

const headerRows: DocsTableCell[][] = [
	[{ code: 'Content-Security-Policy' }, 'The policy below, with a nonce'],
	[{ code: 'X-Content-Type-Options' }, { code: 'nosniff' }],
	[{ code: 'Referrer-Policy' }, { code: 'strict-origin-when-cross-origin' }],
	[
		{ code: 'Permissions-Policy' },
		{ code: 'camera=(), geolocation=(), microphone=(), payment=(), usb=()' }
	]
];

const optionRows: DocsTableCell[][] = [
	[
		{ code: 'contentSecurityPolicy.directives' },
		'Directive name to a list of sources. Each one replaces the default for that directive. false removes it.'
	],
	[
		{ code: 'contentSecurityPolicy.reportOnly' },
		'Send Content-Security-Policy-Report-Only instead of Content-Security-Policy.'
	],
	[
		{ code: 'contentSecurityPolicy: false' },
		'Send no policy and turn nonces off.'
	],
	[
		{ code: 'frameAncestors' },
		"The frame-ancestors sources. Default ['self']. false omits it."
	],
	[
		{ code: 'permissionsPolicy' },
		'Feature to allowlist. Replaces the whole default header. false omits it.'
	],
	[{ code: 'referrerPolicy' }, 'Header value. false omits it.'],
	[{ code: 'contentTypeOptions' }, 'false omits X-Content-Type-Options.']
];

const NonceCoverageList = ({ themeSprings }: ThemeProps) => (
	<DefinitionGrid
		items={[
			{
				description:
					'Page bootstraps and initial props for React, Svelte, Vue, Angular and Ember, plus the module preload links for page bundles.',
				term: 'Hydration data'
			},
			{
				description:
					'The streaming-slot runtime and every patch script it sends as slots resolve.',
				term: 'Streamed slots'
			},
			{
				description:
					'Island state, the island bootstrap, and each island stylesheet. Svelte and Vue island styles ship as a linked stylesheet per island, added with the nonce on the pages that render that island. Angular pages and islands pass the nonce to Angular in the browser, so styles it adds after hydration are allowed.',
				term: 'Islands'
			},
			{
				description:
					'Inline page CSS and the styles Svelte and Angular render.',
				term: 'Styles'
			},
			{
				description:
					'Every inline script and style in your HTML and HTMX page files gets the nonce. htmx is configured to put it on its indicator styles.',
				term: 'HTML & HTMX'
			},
			{
				description:
					'The HMR client and the styles Angular adds on a hot update.',
				term: 'Dev server'
			},
			{
				description: 'Speculation rules and the error pages.',
				term: 'Other output'
			}
		]}
		themeSprings={themeSprings}
	/>
);

export const SecurityHeadersView = ({
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
					<h1 id="security-headers" style={h1Style(isMobileOrTablet)}>
						Security Headers
					</h1>
					<p style={paragraphLargeStyle}>
						<code>secureHeaders()</code> sends a strict
						Content-Security-Policy with a new nonce on every
						request, plus the usual security headers. AbsoluteJS
						puts that nonce on every inline script and style it
						writes, so hydration, islands and streaming keep working
						under the policy.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="setup"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Setup
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The plugin is opt-in. Register it before{' '}
						<code>absolutejs</code>.
					</p>
					<PrismPlus
						codeString={secureHeadersSetup}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Every response then carries these headers:
					</p>
					<DocsTable
						columns={['Header', 'Default']}
						rows={headerRows}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="default-policy"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Default Policy
					</AnchorHeading>
					<PrismPlus
						codeString={cspDefaultPolicy}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Scripts run only with the request&apos;s nonce. There is
						no <code>&apos;unsafe-inline&apos;</code> for scripts.{' '}
						<code>&apos;strict-dynamic&apos;</code> lets a script
						that has the nonce load others, so hydration chunks,
						islands and lazy routes work without being listed.
					</p>
					<p style={paragraphSpacedStyle}>
						Inline <code>&lt;style&gt;</code> elements need the
						nonce too. <code>style=&quot;&quot;</code> attributes
						are allowed, because frameworks write them (Vue{' '}
						<code>:style</code>, Svelte <code>style:</code>) and
						they can&apos;t run script.
					</p>
					<p style={paragraphSpacedStyle}>
						Under <code>absolute dev</code> the policy also allows
						the HMR WebSocket on the current host and{' '}
						<code>&apos;unsafe-eval&apos;</code>, which
						Angular&apos;s dev compiler needs. Production builds
						don&apos;t get either.
					</p>
					<PrismPlus
						codeString={cspDevAdditions}
						language="text"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="nonce-coverage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What Carries the Nonce
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each request gets a new 128-bit random nonce. AbsoluteJS
						adds it to every inline <code>&lt;script&gt;</code> and{' '}
						<code>&lt;style&gt;</code> it writes, in development and
						in production:
					</p>
					<NonceCoverageList themeSprings={themeSprings} />
					<p style={paragraphSpacedStyle}>
						On React, Svelte, Vue and Angular pages the nonce is
						added where each script is written, not by rewriting the
						finished HTML. A script injected through{' '}
						<code>dangerouslySetInnerHTML</code>,{' '}
						<code>v-html</code> or <code>{'{@html}'}</code> stays
						blocked. That is what the policy is for.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="your-own-scripts"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Your Own Scripts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						An inline script you write on a framework page needs the
						nonce. In a React page, call <code>getCspNonce()</code>{' '}
						from <code>@absolutejs/absolute/react</code>. During
						server rendering it returns the request&apos;s nonce. In
						the browser it returns the same value, read from the
						page&apos;s own scripts, so the page hydrates with the
						nonce it was rendered with. It returns{' '}
						<code>undefined</code> when <code>secureHeaders()</code>{' '}
						isn&apos;t in use.
					</p>
					<PrismPlus
						codeString={cspNoncePage}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Browsers hide the <code>nonce</code> attribute once the
						page loads. React 19.2 reports that as a hydration
						mismatch in development, and{' '}
						<code>suppressHydrationWarning</code> keeps it quiet.
						React 19.3 reads the nonce the browser kept and
						doesn&apos;t warn.
					</p>
					<p style={paragraphSpacedStyle}>
						External <code>&lt;script src&gt;</code> tags you add to
						a framework page need the nonce as well:{' '}
						<code>&apos;strict-dynamic&apos;</code> ignores host
						allowlists.
					</p>
					<p style={paragraphSpacedStyle}>
						In server code, read the nonce for the request being
						handled. Route handlers get it in the context as{' '}
						<code>cspNonce</code>. <code>getCspNonce()</code> from{' '}
						<code>@absolutejs/absolute</code> returns the same value
						in any server code that runs for the request, and{' '}
						<code>undefined</code> when <code>secureHeaders()</code>{' '}
						isn&apos;t in use. The root package is server code, so a
						page component imports <code>getCspNonce</code> from{' '}
						<code>@absolutejs/absolute/react</code> instead.
					</p>
					<PrismPlus
						codeString={cspNonceServerHelper}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="customizing"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Customizing
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every directive and header can be changed or turned off.
					</p>
					<PrismPlus
						codeString={secureHeadersCustomize}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<DocsTable
						columns={['Option', 'Effect']}
						rows={optionRows}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						A directive you set replaces the default one, so list
						every source you still want. The nonce is still added to{' '}
						<code>script-src</code> and <code>style-src</code>. If
						you set <code>script-src</code>, keep{' '}
						<code>&apos;strict-dynamic&apos;</code> in it so the
						scripts AbsoluteJS loads keep running.
					</p>
					<p style={paragraphSpacedStyle}>
						<code>reportOnly: true</code> sends the same policy as{' '}
						<code>Content-Security-Policy-Report-Only</code>. The
						browser reports violations in the console and blocks
						nothing, which is a safe way to try a policy on a live
						site.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="fonts"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Fonts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The default policy loads fonts and stylesheets from your
						own origin only. A stylesheet from{' '}
						<code>fonts.googleapis.com</code> is blocked, and so is
						the <code>font</code> prop of <code>Head</code>, which
						links one. Self-host your fonts with the{' '}
						<code>fonts</code> config (see{' '}
						<a
							href="/documentation/fonts"
							onClick={(event) => {
								event.preventDefault();
								onNavigate('fonts');
							}}
							style={{
								color: 'inherit',
								textDecoration: 'underline'
							}}
						>
							Fonts
						</a>
						). Its tags are links, not inline styles, so they need
						no nonce.
					</p>
					<p style={paragraphSpacedStyle}>
						To keep loading fonts from Google, extend the policy:
					</p>
					<PrismPlus
						codeString={secureHeadersRemoteFonts}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="prerendered-pages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Pre-rendered Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						When a page is pre-rendered or re-rendered by ISR under{' '}
						<code>secureHeaders()</code>, the nonce that render used
						is stored with it. Each time the page is served, that
						value is replaced with the request&apos;s nonce, and the
						response gets that request&apos;s policy. Markup
						injected into the page couldn&apos;t have known the
						render-time nonce, so it stays blocked.
					</p>
					<p style={paragraphSpacedStyle}>
						A page pre-rendered without <code>secureHeaders()</code>{' '}
						has no nonce on its scripts. It is served without a
						Content-Security-Policy header, and the server logs a
						warning naming it. Rebuild with{' '}
						<code>secureHeaders()</code> in use to cover it.
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
