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
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import { TypecheckDependenciesList } from './TypecheckDependenciesList';
import { TypecheckFrameworkList } from './TypecheckFrameworkList';
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
					<h1 id="typecheck" style={h1Style(isMobileOrTablet)}>
						Typecheck
					</h1>
					<p style={paragraphLargeStyle}>
						Run the correct type checker for each framework in your
						project: automatically detected from your config.
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
						id="how-it-works"
						level="h2"
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
					<TypecheckFrameworkList />
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
						id="configuration"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Configuration
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						No extra configuration is needed: the command
						automatically detects which frameworks are in use from
						your <code>absolute.config.ts</code>. Just make sure the
						relevant dev dependencies are installed:
					</p>
					<TypecheckDependenciesList />
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
