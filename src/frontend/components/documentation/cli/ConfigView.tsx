import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	configCommand,
	configOutput
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
	{ href: '#panels', label: 'Panels' },
	{ href: '#integrations', label: 'Integrations' },
	{ href: '#auth', label: 'Auth' }
];

export const ConfigView = ({
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
					<h1 id="config" style={h1Style(isMobileOrTablet)}>
						absolute config
					</h1>
					<p style={paragraphLargeStyle}>
						A local visual editor for your project&apos;s configuration —
						tune <code>absolute.config.ts</code>, <code>package.json</code>,
						ESLint, tsconfig, and Prettier, plus manage Integrations and
						Auth, from a browser UI that writes changes straight back to
						your files.
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
						<code>absolute config</code> starts a local server and opens
						(with <code>--open</code>) a visual editor for the config
						files in your project. Use <code>--port</code> to choose the
						port, <code>--config</code> to point at a specific
						<code>absolute.config.ts</code>, and <code>--no-https</code>{' '}
						to serve over plain HTTP. Every change is spliced back into the
						real file through the TypeScript compiler API, so your imports,
						comments, and formatting survive — only serializable values are
						editable, and fields whose value is code (a store, a callback)
						are shown read-only so the UI never clobbers them.
					</p>
					<PrismPlus
						codeString={configCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={configOutput}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="panels"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Panels
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The sidebar groups the editor into <strong>Project</strong>{' '}
						and <strong>Integrations</strong>. The Project panels each edit
						one config file:{' '}
						<code>absolute.config</code> (the <code>defineConfig</code>{' '}
						fields, introspected from the framework&apos;s build config),{' '}
						<code>package.json</code> (scripts &amp; metadata), ESLint
						(rules &amp; severities), tsconfig (compiler options), and
						Prettier (formatting). Each renders schema-driven inputs rather
						than raw JSON, and writes are minimal, targeted splices — never
						a full-file reformat.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="integrations"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Integrations
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Integrations panel is the home for the official Elysia
						plugins. <code>openapi</code> and <code>telemetry</code> are
						config-driven — toggling them flips the field in{' '}
						<code>absolute.config.ts</code> that the runtime reads to mount
						them — while <code>cors</code>, <code>jwt</code>, and{' '}
						<code>cron</code> install the package and hand you the exact{' '}
						<code>.use(...)</code> to drop into your server. It&apos;s the
						same engine as <code>absolute add &lt;plugin&gt;</code>, just
						with a button. The JWT card is deliberately framed as a token
						primitive (signing your own API tokens) and cross-links to the
						Auth panel for actual user authentication.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="auth"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Auth
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The Auth panel introspects your{' '}
						<code>@absolutejs/auth</code> setup: it AST-scans for your{' '}
						<code>auth()</code> call to show the installed version, which of
						the sixteen features (credentials, MFA, SSO, SCIM, passkeys,
						organizations, …) are configured, and the always-on core OAuth2
						routes. From there it&apos;s a wizard + dashboard hybrid — edit
						the serializable settings (route paths, session durations,
						limits) through an <code>auth.config.ts</code> created with{' '}
						<code>defineAuthSettings</code>, and scaffold a feature&apos;s
						code wiring (store + hook stubs) with one click, the same as{' '}
						<code>absolute add auth:&lt;feature&gt;</code>.
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
