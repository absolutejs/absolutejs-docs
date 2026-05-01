import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	bunBuildMultiService,
	bunBuildPassKeys,
	bunBuildPerPass,
	bunBuildReservedFields,
	bunBuildShorthand,
	bunBuildSingleService
} from '../../../data/documentation/configDocsCode';
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#overview', label: 'Overview' },
	{ href: '#single-service', label: 'Single-Service Config' },
	{ href: '#multi-service', label: 'Multi-Service Config' },
	{ href: '#shorthand', label: 'Shorthand Defaults' },
	{ href: '#per-pass', label: 'Per-Pass Overrides' },
	{ href: '#pass-keys', label: 'Pass Keys' },
	{ href: '#allowed-options', label: 'Allowed Options' },
	{ href: '#reserved-fields', label: 'Reserved Fields' }
];

const allowedOptionGroups = [
	'minify',
	'sourcemap',
	'drop',
	'ignoreDCEAnnotations',
	'loader',
	'conditions',
	'env',
	'banner',
	'footer',
	'metafile',
	'splitting',
	'naming',
	'tsconfig',
	'plugins',
	'external',
	'define'
];

type PassKey = {
	description: string;
	name: string;
};

const passKeys: PassKey[] = [
	{
		description: 'compiled Svelte, Vue, and Angular server modules.',
		name: 'server'
	},
	{
		description: 'React page and generated index client entries.',
		name: 'reactClient'
	},
	{
		description:
			'Svelte, Vue, Angular, HTML, HTMX, island bootstrap, and URL-referenced client entries.',
		name: 'nonReactClient'
	},
	{
		description: 'generated island client entries.',
		name: 'islandClient'
	},
	{ description: 'global CSS entry points.', name: 'globalCss' },
	{ description: 'CSS emitted by Vue compilation.', name: 'vueCss' }
];

const AllowedOptionsList = () => (
	<ul style={listStyle}>
		{allowedOptionGroups.map((option) => (
			<li key={option} style={listItemStyle}>
				<code>{option}</code>
			</li>
		))}
	</ul>
);

const PassKeysList = () => (
	<ul style={listStyle}>
		{passKeys.map(({ description, name }) => (
			<li key={name} style={listItemStyle}>
				<strong style={strongStyle}>{name}</strong>: {description}
			</li>
		))}
	</ul>
);

export const BunBuildOptionsView = ({
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
						id="bun-build-options"
						style={h1Style(isMobileOrTablet)}
					>
						Bun Build Options
					</h1>
					<p style={paragraphLargeStyle}>
						Customize selected Bun <code>BuildConfig</code> options
						for AbsoluteJS&apos;s generated app bundles without
						overriding framework-owned build behavior.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="overview"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Overview
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Add a <code>bunBuild</code> field to{' '}
						<code>absolute.config.ts</code> when a project needs to
						tune Bun&apos;s build behavior. It accepts Bun&apos;s
						own build options where they are safe for AbsoluteJS to
						expose.
					</p>
					<p style={paragraphSpacedStyle}>
						The option supports both valid config shapes:
						single-service configs where service fields live at the
						root, and multi-service workspace configs where each
						named Absolute service has its own service object.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="single-service"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Single-Service Config
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For the common one-service shape, put{' '}
						<code>bunBuild</code> at the root of the config:
					</p>
					<PrismPlus
						codeString={bunBuildSingleService}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="multi-service"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Multi-Service Config
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For workspace configs, put <code>bunBuild</code> inside
						the named Absolute service. Command services do not use
						Absolute&apos;s Bun build pipeline.
					</p>
					<PrismPlus
						codeString={bunBuildMultiService}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="shorthand"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Shorthand Defaults
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Passing a Bun build options object directly applies it
						as the default override for every Absolute Bun build
						pass.
					</p>
					<PrismPlus
						codeString={bunBuildShorthand}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="per-pass"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Per-Pass Overrides
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>default</code> plus pass keys when different
						bundles need different Bun settings. Pass-specific
						values override <code>default</code>.
					</p>
					<PrismPlus
						codeString={bunBuildPerPass}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pass-keys"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Pass Keys
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Each key maps to one internal <code>Bun.build()</code>{' '}
						pass:
					</p>
					<PrismPlus
						codeString={bunBuildPassKeys}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<PassKeysList />
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="allowed-options"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Allowed Options
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The type is derived from Bun&apos;s public{' '}
						<code>BuildConfig</code>, so new compatible Bun fields
						can be exposed without AbsoluteJS redefining Bun&apos;s
						API. Common options include:
					</p>
					<AllowedOptionsList />
					<p style={paragraphSpacedStyle}>
						<code>plugins</code>, <code>external</code>, and{' '}
						<code>define</code> merge with AbsoluteJS&apos;s
						internal values instead of replacing them.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="reserved-fields"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Reserved Fields
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						AbsoluteJS owns fields that affect routing, output
						layout, runtime target, and build error handling. These
						fields are rejected by TypeScript and ignored at runtime
						if forced through with an unsafe cast.
					</p>
					<PrismPlus
						codeString={bunBuildReservedFields}
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
