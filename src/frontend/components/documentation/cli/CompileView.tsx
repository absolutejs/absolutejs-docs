import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	compileCommand,
	compileOutput,
	compilePackageJson,
	compileRun
} from '../../../data/documentation/staticDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
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
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#compiling', label: 'Compiling Your App' },
	{ href: '#running', label: 'Running the Binary' },
	{ href: '#whats-embedded', label: "What's Embedded" },
	{ href: '#cli-options', label: 'CLI Options' },
	{ href: '#package-scripts', label: 'Package Scripts' }
];

export const CompileView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');
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
					<h1 style={h1Style(isMobileOrTablet)} id="compile">
						Compile
					</h1>
					<p style={paragraphLargeStyle}>
						Compile your entire app into a single standalone
						executable — no runtime, no node_modules, no external
						files needed.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="compiling"
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
					<PrismPlus
						codeString={compileOutput}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="running"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Running the Binary
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The compiled binary is fully self-contained. Copy it to
						any machine and run it — no Bun, no Node.js, no
						dependencies:
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
						level="h2"
						id="whats-embedded"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						What's Embedded
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The compiled binary includes everything your app needs
						to run:
					</p>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
							marginBottom: '1.5rem',
							marginTop: '1.5rem'
						}}
					>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Pre-rendered Pages
								</strong>
							</p>
							<p
								style={{
									fontSize: '0.95rem',
									lineHeight: 1.6
								}}
							>
								All pages are pre-rendered at compile time and
								embedded as static HTML that hydrates on the
								client.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Client Bundles
								</strong>
							</p>
							<p
								style={{
									fontSize: '0.95rem',
									lineHeight: 1.6
								}}
							>
								JavaScript bundles for React, Svelte, Vue,
								Angular, and HTML — all framework client code.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>Web Workers</strong>
							</p>
							<p
								style={{
									fontSize: '0.95rem',
									lineHeight: 1.6
								}}
							>
								Worker scripts are embedded and served from
								Bun's virtual filesystem. Workers load and
								execute normally.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Static Assets
								</strong>
							</p>
							<p
								style={{
									fontSize: '0.95rem',
									lineHeight: 1.6
								}}
							>
								CSS, images, SVGs, fonts, favicons — every asset
								is embedded with correct MIME types and cache
								headers.
							</p>
						</animated.div>
					</div>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="cli-options"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CLI Options
					</AnchorHeading>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>[entry]</strong> —
							Server entry file (defaults to{' '}
							<code>src/backend/server.ts</code>)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>--outdir</strong> —
							Build output directory (defaults to{' '}
							<code>dist</code>)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>--outfile</strong> —
							Compiled binary path (defaults to{' '}
							<code>compiled-server</code>)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>--config</strong> — Path
							to <code>absolute.config.ts</code>
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="package-scripts"
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
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					themeSprings={themeSprings}
					items={tocItems}
					isOpen={tocOpen ?? false}
					onToggle={onTocToggle}
				/>
			)}
		</div>
	);
};
