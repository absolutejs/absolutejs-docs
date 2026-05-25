import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	addAuthCommand,
	addAuthOutput,
	addCommand,
	addIntegrationCommand,
	addIntegrationOutput,
	addOutput,
	htmxCommand,
	htmxOutput,
	removeCommand,
	removeOutput
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
	{ href: '#add', label: 'Adding a framework' },
	{ href: '#integrations', label: 'Adding integrations' },
	{ href: '#auth-features', label: 'Scaffolding auth features' },
	{ href: '#remove', label: 'Removing a framework' },
	{ href: '#htmx', label: 'Self-hosting htmx' }
];

export const FrameworksView = ({
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
					<h1 id="add-remove" style={h1Style(isMobileOrTablet)}>
						Add &amp; remove frameworks
					</h1>
					<p style={paragraphLargeStyle}>
						Start with one framework and add another whenever you need
						it — AbsoluteJS handles the dependencies, config, and a
						working starter page for you.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="add"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Adding a framework
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>absolute add &lt;framework&gt;</code> installs the
						version-aligned dependencies with <code>bun add</code>,
						inserts the framework&apos;s directory into{' '}
						<code>absolute.config.ts</code>, and scaffolds a minimal
						starter page — wiring its route, navigation, and stylesheet
						in exactly like <code>generate page</code>. Pass{' '}
						<code>--no-install</code> to configure and scaffold without
						touching dependencies. It&apos;s idempotent: adding a
						framework that&apos;s already configured just prints a note.
					</p>
					<PrismPlus
						codeString={addCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={addOutput}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="integrations"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Adding integrations
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>add</code> also installs and wires the official Elysia
						plugins. <code>absolute add openapi</code> and{' '}
						<code>absolute add telemetry</code> are config-driven — they
						flip the field in <code>absolute.config.ts</code> that the
						runtime reads to mount them (and install the package when one
						is needed) — while <code>cors</code>, <code>jwt</code>, and{' '}
						<code>cron</code> install the package and print the exact{' '}
						<code>.use(...)</code> to add to your server. The same plugins
						are available as one-click toggles in the Integrations panel of{' '}
						<code>absolute config</code>.
					</p>
					<PrismPlus
						codeString={addIntegrationCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={addIntegrationOutput}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="auth-features"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Scaffolding auth features
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>absolute add auth:&lt;feature&gt;</code> scaffolds the
						starter code wiring for an <code>@absolutejs/auth</code>{' '}
						feature — a typed <code>&lt;feature&gt;Config.ts</code> with the
						required store (seeded with an in-memory factory) and hook stubs
						(<code>TODO</code>s) plus sensible defaults — and prints the
						spread to add to your <code>auth()</code> call. Targets include{' '}
						<code>mfa</code>, <code>credentials</code>, <code>sso</code>,{' '}
						<code>passwordless</code>, <code>webauthn</code>,{' '}
						<code>organizations</code>, and more. The Auth panel in{' '}
						<code>absolute config</code> exposes the same scaffolds as a
						button per unconfigured feature.
					</p>
					<PrismPlus
						codeString={addAuthCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={addAuthOutput}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="remove"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Removing a framework
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>absolute remove &lt;framework&gt;</code> drops the
						directory entry from <code>absolute.config.ts</code> but
						never deletes your source — that&apos;s too easy to regret.
						It tells you which routing files still call the
						framework&apos;s page handler so you can clean them up, and{' '}
						<code>--prune</code> additionally uninstalls the
						framework&apos;s dependencies.
					</p>
					<PrismPlus
						codeString={removeCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={removeOutput}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="htmx"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Self-hosting htmx
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						htmx&apos;s own guidance is to download a pinned copy into
						your project rather than rely on a CDN, so AbsoluteJS
						vendors a known-good htmx build and{' '}
						<code>absolute add htmx</code> places it for you offline.
						The <code>absolute htmx</code> command reports the version
						you have installed, and{' '}
						<code>absolute htmx &lt;version&gt;</code> (or{' '}
						<code>latest</code>) fetches any release from jsDelivr and
						swaps it in — so you upgrade with one command instead of
						hand-managing the file.
					</p>
					<PrismPlus
						codeString={htmxCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={htmxOutput}
						language="bash"
						showLineNumbers={false}
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
