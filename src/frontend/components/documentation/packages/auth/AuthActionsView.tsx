import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import { actionsPipeline } from '../../../../data/documentation/authActionsDocsCode';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { PrismPlus } from '../../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { DocsNavigation } from '../../DocsNavigation';

const tocItems: TocItem[] = [
	{ href: '#pipeline', label: 'Composable pipeline' }
];

export const AuthActionsView = ({
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
					<h1 id="auth-actions" style={h1Style(isMobileOrTablet)}>
						Actions Pipeline
					</h1>
					<p style={paragraphLargeStyle}>
						Auth0 Actions / Better Auth plugins from raw primitives
						— an ordered, composable middleware over the auth
						lifecycle, built from the same callable shapes as
						everything else in this package.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="pipeline"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Composable pipeline
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						<code>createActionPipeline</code> runs registered
						actions in order for a given event. Each action returns{' '}
						<code>
							{'{ kind: '}&apos;pass&apos;{' }'}
						</code>
						,{' '}
						<code>
							{'{ kind: '}&apos;deny&apos;, reason{' }'}
						</code>
						, or{' '}
						<code>
							{'{ kind: '}&apos;redirect&apos;, url{' }'}
						</code>{' '}
						— the first non-pass short-circuits the chain. Actions
						can target a single event or a list of events. Wire it
						into your existing lifecycle hooks; it doesn&apos;t
						replace hooks, it composes on top of them.
					</p>
					<PrismPlus
						codeString={actionsPipeline}
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
