import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	reactIslandsStore,
	reactIslandsTyped
} from '../../../data/documentation/islandsDocsCode';
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
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#authoring', label: 'Authoring' },
	{ href: '#stores', label: 'Stores' }
];

export const ReactIslandsView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="react-islands">
						React Islands
					</h1>
					<p style={paragraphLargeStyle}>
						React hosts can use the loose <code>Island</code>{' '}
						primitive or a registry-bound{' '}
						<code>createTypedIsland(registry)</code> wrapper. Both
						lower to the same runtime.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="authoring"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Authoring
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use a typed wrapper when you want framework, component,
						and prop inference from the registry. Keep the built-in{' '}
						<code>Island</code>
						for dynamic or ad hoc cases.
					</p>
					<PrismPlus
						codeString={reactIslandsTyped}
						language="tsx"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="stores"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Stores
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						React islands consume cross-framework state with{' '}
						<code>useIslandStore</code>. Import the same store
						module anywhere you want shared state.
					</p>
					<PrismPlus
						codeString={reactIslandsStore}
						language="tsx"
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
