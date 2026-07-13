import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	compileCommand,
	compileDynamicFiles,
	compileOutput,
	compilePackageJson,
	compileRun,
	compileRuntimeFiles
} from '../../../data/documentation/staticDocsCode';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { TerminalFrame } from '../../utils/TerminalFrame';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { CompileCliOptions } from './CompileCliOptions';
import { CompileEmbeddedGrid } from './CompileEmbeddedGrid';

const compileOutputText = compileOutput.replace('$ absolute compile\n\n', '');

const tocItems: TocItem[] = [
	{ href: '#compiling', label: 'Compiling Your App' },
	{ href: '#running', label: 'Running the Binary' },
	{ href: '#whats-embedded', label: "What's Embedded" },
	{ href: '#runtime-contract', label: 'Runtime Contract' },
	{ href: '#runtime-files', label: 'Runtime Files' },
	{ href: '#caveats', label: 'Caveats' },
	{ href: '#cli-options', label: 'CLI Options' },
	{ href: '#package-scripts', label: 'Package Scripts' }
];

const RuntimeContractList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Pre-rendered pages</strong> are served
			immediately from the executable and then hydrate on the client.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Runtime fallback</strong> handles API
			routes, dynamic pages, redirects, headers, cookies, request bodies,
			errors, and not-found boundaries.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Environment vars</strong> come from the
			process running the executable. Code that reads env at module load
			runs when the executable starts; code that reads env inside a
			handler runs per request.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Concurrent builds</strong> or compiles
			targeting the same output directory are serialized so they cannot
			corrupt each other's output.
		</li>
	</ul>
);

const CompileCaveatsList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			The final executable is intended to run without your source tree or{' '}
			<code>node_modules</code>, but it still needs whatever external
			services your app uses, such as databases, queues, object storage,
			or third-party APIs.
		</li>
		<li style={listItemStyle}>
			Compile embeds static assets and supported runtime file references.
			It does not snapshot arbitrary runtime directories or user-generated
			data.
		</li>
		<li style={listItemStyle}>
			The last build or compile that targets an output directory owns that
			directory. Workspace projects should use separate{' '}
			<code>buildDirectory</code> values unless they intentionally want
			last-write-wins output.
		</li>
	</ul>
);

export const CompileView = ({
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
					<h1 id="compile" style={h1Style(isMobileOrTablet)}>
						Compile
					</h1>
					<p style={paragraphLargeStyle}>
						Compile your entire app into a single standalone
						executable: no runtime, no node_modules, no external
						files needed.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="compiling"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Compiling Your App
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>absolute compile</code> command builds your
						assets, pre-renders all pages, and compiles everything
						into a single binary using Bun's{' '}
						<code>bun build --compile</code>:
					</p>
					<PrismPlus
						codeString={compileCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<TerminalFrame
						command="absolute compile"
						output={compileOutputText}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="running"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Running the Binary
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The compiled binary is fully self-contained. Copy it to
						any machine and run it: no Bun, no Node.js, no source
						files, and no <code>node_modules</code> needed:
					</p>
					<PrismPlus
						codeString={compileRun}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="whats-embedded"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What's Embedded
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The compiled binary includes everything your app needs
						to run:
					</p>
					<CompileEmbeddedGrid themeSprings={themeSprings} />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="runtime-contract"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Runtime Contract
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>absolute compile</code> uses the same production
						build pipeline as <code>absolute start</code>. It builds
						the app, bundles the production server, pre-renders the
						discovered/static pages, and embeds a runtime fallback
						for routes that still need server handling.
					</p>
					<RuntimeContractList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="runtime-files"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Runtime Files
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Compile can embed server-side files when the path is
						static enough to discover at compile time. These
						patterns are supported:
					</p>
					<PrismPlus
						codeString={compileRuntimeFiles}
						language="ts"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Fully dynamic file paths cannot be discovered safely.
						Keep user uploads, generated files, SQLite databases,
						and other mutable runtime data outside the executable
						and read them from a configured runtime path.
					</p>
					<PrismPlus
						codeString={compileDynamicFiles}
						language="ts"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="caveats"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Caveats
					</AnchorHeading>
					<CompileCaveatsList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="cli-options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CLI Options
					</AnchorHeading>
					<CompileCliOptions />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="package-scripts"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Package Scripts
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add these scripts to your <code>package.json</code> for
						easy access:
					</p>
					<PrismPlus
						codeString={compilePackageJson}
						language="json"
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
