import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	vueIslandsStore,
	vueIslandsTyped
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

export const VueIslandsView = ({
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
					<h1 id="vue-islands" style={h1Style(isMobileOrTablet)}>
						Vue Islands
					</h1>
					<p style={paragraphLargeStyle}>
						Vue hosts can use the loose <code>Island</code> export
						or a typed wrapper from{' '}
						<code>createTypedIsland(registry)</code> when they want
						exact registry-driven inference.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="authoring"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Authoring
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Typed Vue islands infer the full prop object from the
						target component. The built-in <code>Island</code>{' '}
						remains available when you want a looser API.
					</p>
					<PrismPlus
						codeString={vueIslandsTyped}
						language="vue"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="stores"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Stores
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Vue islands read and react to shared state through{' '}
						<code>useIslandStore</code>, which returns a Vue{' '}
						<code>Ref</code> over the shared Zustand-backed store.
					</p>
					<PrismPlus
						codeString={vueIslandsStore}
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
