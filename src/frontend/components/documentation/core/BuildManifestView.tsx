import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	assetFunction,
	buildOptions,
	buildSignature,
	manifestStructure,
	multiFrameworkBuild,
	simpleReactBuild,
	tailwindConfig
} from '../../../data/documentation/buildManifestDocsCode';
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
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { PrismPlus } from '../../utils/PrismPlus';
import { BuildPipelineDiagram } from '../../diagrams/BuildPipelineDiagram';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#build-function', label: 'The build() Function' },
	{ href: '#configuration', label: 'Configuration' },
	{ href: '#manifest', label: 'The Manifest' },
	{ href: '#asset-lookup', label: 'Asset Lookup' },
	{ href: '#tailwind', label: 'Tailwind CSS' },
	{ href: '#build-options', label: 'Build Options' }
];

export const BuildManifestView = ({
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
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="build-and-manifest">
						Build &amp; Manifest
					</h1>
					<p style={paragraphLargeStyle}>
						The build system that bundles your frontend code and
						creates the asset manifest.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="build-function"
					>
						The build() Function
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						The build() function is the core of AbsoluteJS. It scans
						your frontend directories, bundles all components, and
						returns a manifest mapping entry points to their bundled
						assets.
					</p>
					<BuildPipelineDiagram themeSprings={themeSprings} />
					<PrismPlus
						codeString={buildSignature}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="configuration"
					>
						Configuration
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						For a simple React app, you only need to specify the
						React directory:
					</p>
					<PrismPlus
						codeString={simpleReactBuild}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						For multi-framework apps, specify multiple directories:
					</p>
					<PrismPlus
						codeString={multiFrameworkBuild}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="manifest"
					>
						The Manifest
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						The manifest is an object that maps entry point names to
						their bundled file paths:
					</p>
					<PrismPlus
						codeString={manifestStructure}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Entry point names
							</strong>{' '}
							— Derived from your component file names (e.g.,
							Home.tsx → HomeIndex)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Hashed paths</strong> —
							Include content hashes for cache busting
						</li>
					</ul>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="asset-lookup"
					>
						Asset Lookup with asset()
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Use the asset() function to look up bundled paths from
						the manifest:
					</p>
					<PrismPlus
						codeString={assetFunction}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="tailwind"
					>
						Tailwind CSS Integration
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Enable Tailwind CSS by providing the config and CSS
						paths:
					</p>
					<PrismPlus
						codeString={tailwindConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<animated.h2
						style={gradientHeadingStyle(themeSprings)}
						id="build-options"
					>
						Build Options
					</animated.h2>
					<p style={paragraphSpacedStyle}>
						Additional build options can be passed via the options
						parameter:
					</p>
					<PrismPlus
						codeString={buildOptions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
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
