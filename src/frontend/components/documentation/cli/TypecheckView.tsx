import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	typecheckCommand,
	typecheckOutput,
	typecheckConfig
} from '../../../data/documentation/cliUtilityDocsCode';
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
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#usage', label: 'Usage' },
	{ href: '#how-it-works', label: 'How It Works' },
	{ href: '#configuration', label: 'Configuration' }
];

export const TypecheckView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="typecheck">
						Typecheck
					</h1>
					<p style={paragraphLargeStyle}>
						Run the correct type checker for each framework in your
						project — automatically detected from your config.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="usage"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Usage
					</AnchorHeading>
					<PrismPlus
						codeString={typecheckCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
					<PrismPlus
						codeString={typecheckOutput}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="how-it-works"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						How It Works
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>typecheck</code> command reads your{' '}
						<code>absolute.config.ts</code> and runs the right
						checker for each framework directory:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Vue directories</strong>{' '}
							→ <code>vue-tsc</code> (checks <code>.ts</code>,{' '}
							<code>.tsx</code>, and <code>.vue</code> files)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>
								Svelte directories
							</strong>{' '}
							→ <code>svelte-check</code> (checks{' '}
							<code>.svelte</code> files, scoped to the Svelte
							directory)
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>Everything else</strong>{' '}
							→ <code>tsc</code> (when no Vue directory is
							configured)
						</li>
					</ul>
					<p style={paragraphSpacedStyle}>
						Since <code>vue-tsc</code> is a superset of{' '}
						<code>tsc</code> (it checks all <code>.ts</code> files
						plus <code>.vue</code> files), it replaces{' '}
						<code>tsc</code> when a Vue directory is present to
						avoid double-checking <code>.ts</code> files.
					</p>
					<p style={paragraphSpacedStyle}>
						All checkers run in parallel for speed. Incremental
						compilation is used where supported, with build info
						cached in <code>.absolutejs/</code>.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="configuration"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Configuration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						No extra configuration is needed — the command
						automatically detects which frameworks are in use from
						your <code>absolute.config.ts</code>. Just make sure the
						relevant dev dependencies are installed:
					</p>
					<ul style={listStyle}>
						<li style={listItemStyle}>
							<code>vue-tsc</code> — required if you have a Vue
							directory
						</li>
						<li style={listItemStyle}>
							<code>svelte-check</code> — required if you have a
							Svelte directory
						</li>
						<li style={listItemStyle}>
							<code>typescript</code> — always required
						</li>
					</ul>
					<PrismPlus
						codeString={typecheckConfig}
						language="typescript"
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
