import type { ReactNode } from 'react';
import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	assetFunction,
	buildOptions,
	cliCommands,
	configFile,
	manifestStructure,
	multiFrameworkConfig,
	prepareFunction,
	simpleReactConfig,
	tailwindConfig
} from '../../../data/documentation/buildManifestDocsCode';
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
import { BuildPipelineDiagram } from '../../diagrams/BuildPipelineDiagram';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#config-file', label: 'Configuration File' },
	{ href: '#prepare', label: 'The prepare() Function' },
	{ href: '#configuration', label: 'Configuration Examples' },
	{ href: '#manifest', label: 'The Manifest' },
	{ href: '#asset-lookup', label: 'Asset Lookup' },
	{ href: '#tailwind', label: 'Tailwind CSS' },
	{ href: '#build-options', label: 'Build Options' },
	{ href: '#cli', label: 'CLI Commands' }
];

type BuildManifestListProps = {
	items: Array<{
		label: ReactNode;
		text: string;
	}>;
};

const BuildManifestList = ({ items }: BuildManifestListProps) => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		{items.map((item, index) => (
			<li key={index} style={listItemStyle}>
				{item.label}: {item.text}
			</li>
		))}
	</ul>
);

export const BuildManifestView = ({
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
					<h1
						id="build-and-manifest"
						style={h1Style(isMobileOrTablet)}
					>
						Build &amp; Manifest
					</h1>
					<p style={paragraphLargeStyle}>
						The build system that bundles your frontend code and
						creates the asset manifest.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="config-file"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Configuration File
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS uses an <code>absolute.config.ts</code> file
						at the root of your project to configure the build. Use{' '}
						<code>defineConfig()</code> for type-safe configuration:
					</p>
					<BuildPipelineDiagram themeSprings={themeSprings} />
					<PrismPlus
						codeString={configFile}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="prepare"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The prepare() Function
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>prepare()</code> function loads your config,
						builds the app, and returns an Elysia plugin with HMR
						support plus the asset manifest:
					</p>
					<PrismPlus
						codeString={prepareFunction}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<BuildManifestList
						items={[
							{
								label: (
									<strong style={strongStyle}>
										absolutejs
									</strong>
								),
								text: 'An Elysia plugin that adds HMR routes in development'
							},
							{
								label: (
									<strong style={strongStyle}>
										manifest
									</strong>
								),
								text: 'Maps entry point names to their bundled asset paths'
							}
						]}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="configuration"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Configuration Examples
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For a simple React app, you only need to specify the
						React directory:
					</p>
					<PrismPlus
						codeString={simpleReactConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						For multi-framework apps, specify multiple directories:
					</p>
					<PrismPlus
						codeString={multiFrameworkConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="manifest"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The Manifest
					</AnchorHeading>
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
					<BuildManifestList
						items={[
							{
								label: (
									<strong style={strongStyle}>
										Entry point names
									</strong>
								),
								text: 'Derived from your component file names (e.g., Home.tsx -> HomeIndex)'
							},
							{
								label: (
									<strong style={strongStyle}>
										Hashed paths
									</strong>
								),
								text: 'Include content hashes for cache busting'
							}
						]}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="asset-lookup"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Asset Lookup with asset()
					</AnchorHeading>
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
					<AnchorHeading
						id="tailwind"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Tailwind CSS Integration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Enable Tailwind CSS by providing the input and output
						paths in your config:
					</p>
					<PrismPlus
						codeString={tailwindConfig}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="build-options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Build Options
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Additional build options can be set in your config:
					</p>
					<PrismPlus
						codeString={buildOptions}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="cli"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CLI Commands
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS provides a CLI for development and
						production:
					</p>
					<PrismPlus
						codeString={cliCommands}
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
