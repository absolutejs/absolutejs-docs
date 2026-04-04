import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { htmxIslandsPage } from '../../../data/documentation/islandsDocsCode';
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
	{ href: '#custom-element', label: 'Custom Element' },
	{ href: '#notes', label: 'Notes' }
];

export const HTMXIslandsView = ({
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
					<h1 style={h1Style(isMobileOrTablet)} id="htmx-islands">
						HTMX Islands
					</h1>
					<p style={paragraphLargeStyle}>
						HTMX hosts use the same{' '}
						<code>&lt;absolute-island&gt;</code> custom element as
						plain HTML. HTMX remains the host transport layer while
						islands handle selective framework interactivity.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="custom-element"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Custom Element
					</AnchorHeading>
					<PrismPlus
						codeString={htmxIslandsPage}
						language="html"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="notes"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Notes
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use HTMX for host-page partial updates and islands for
						selective client framework behavior. The island model,
						hydration modes, and Zustand-backed stores are identical
						to the HTML host path.
					</p>
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
