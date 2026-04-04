import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	angularIslandsHost,
	angularIslandsStore
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

export const AngularIslandsView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="angular-islands">
						Angular Islands
					</h1>
					<p style={paragraphLargeStyle}>
						Angular hosts import the standalone <code>Island</code>{' '}
						component and use the{' '}
						<code>&lt;absolute-island&gt;</code> element in
						templates. Angular islands consume shared state through
						the injected <code>IslandStore</code> service.
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
						Angular templates stay declarative. Import{' '}
						<code>Island</code> into the component and use{' '}
						<code>&lt;absolute-island&gt;</code> where you want the
						island.
					</p>
					<PrismPlus
						codeString={angularIslandsHost}
						language="typescript"
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
						Use the injected <code>IslandStore</code> service to
						read and subscribe to selectors from a shared island
						store. This keeps the state model store-first, not
						prop-key-first.
					</p>
					<PrismPlus
						codeString={angularIslandsStore}
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
