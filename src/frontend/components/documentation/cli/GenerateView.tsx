import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	generateCommand,
	generateOutput
} from '../../../data/documentation/cliUtilityDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#usage', label: 'Usage' },
	{ href: '#pages', label: 'Pages' },
	{ href: '#api-and-components', label: 'API & components' }
];

export const GenerateView = ({
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
					<h1 id="generate" style={h1Style(isMobileOrTablet)}>
						absolute generate
					</h1>
					<p style={paragraphLargeStyle}>
						Scaffold a page, API plugin, or component — and have the
						route, imports, and navigation wired into your app for you.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="usage"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Usage
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>absolute generate</code> (alias <code>g</code>) has
						three subcommands — <code>page</code>, <code>api</code>,
						and <code>component</code>. It reads your{' '}
						<code>absolute.config.ts</code> to find each framework&apos;s
						directory, so <code>--framework</code> is only required when
						more than one framework is configured. Names are
						PascalCased for files and kebab-cased for routes (
						<code>user-settings</code> → <code>UserSettings.tsx</code>{' '}
						at <code>/user-settings</code>), and every generator is
						idempotent — it warns instead of overwriting.
					</p>
					<PrismPlus
						codeString={generateCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pages"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Pages
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>generate page</code> writes a minimal, idiomatic page
						for the chosen framework, then wires it in: it adds the
						route (with the correct page handler and manifest keys) to
						your <code>pagesPlugin.ts</code> — or inline in{' '}
						<code>server.ts</code> if that&apos;s where your routes
						live — editing the file through the TypeScript compiler API
						so your formatting and comments survive. Pages link to each
						other through a shared{' '}
						<code>src/frontend/shared/navData.ts</code>: JS-framework
						pages import and render it live, and static HTML/HTMX pages
						bake a snapshot that is re-synced on every generate.
						Stylesheets are detected — the page joins your app&apos;s
						shared CSS if it has one, otherwise it gets its own{' '}
						<code>indexes/&lt;name&gt;.css</code>.
					</p>
					<PrismPlus
						codeString={generateOutput}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="api-and-components"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						API &amp; components
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>generate api &lt;name&gt;</code> creates{' '}
						<code>src/backend/plugins/&lt;name&gt;Plugin.ts</code> — an
						Elysia plugin with <code>GET</code>/<code>POST</code> stubs
						under <code>/api/&lt;name&gt;</code> — and mounts it on your
						server with <code>.use(...)</code>.{' '}
						<code>generate component &lt;name&gt;</code> creates a
						reusable component in the framework&apos;s{' '}
						<code>components/</code> directory with no route. If a file
						is too customized to edit safely, the generator prints the
						exact import and wiring to paste instead, so it never
						corrupts your code. Run{' '}
						<code>absolute prettier --write</code> afterward to reflow
						the inserted lines.
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
