import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../../types/springTypes';
import { DocsNavigation } from '../../DocsNavigation';
import { eslintDocsData } from '../../../../data/documentation/eslintDocsData';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';
import {
	mainContentStyle,
	h1Style,
	paragraphLargeStyle
} from '../../../../styles/docsStyles';
import { heroGradientStyle } from '../../../../styles/gradientStyles';
import { MobileTableOfContents } from '../../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../../utils/TableOfContents';
import { EslintSection } from './EslintSection';

const tocItems: TocItem[] = eslintDocsData.map((section) => ({
	href: section.href,
	label: section.title.replace('absolute/', '')
}));

export const EslintView = ({
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
					<h1 style={h1Style} id="eslint">
						ESLint
					</h1>
					<p style={paragraphLargeStyle}>
						ESLint rules for AbsoluteJS applications. Identify and
						fix problems in your code with static analysis that
						enforces coding standards and best practices.
					</p>
				</animated.div>

				{eslintDocsData.map((section) => (
					<EslintSection
						key={section.href}
						section={section}
						themeSprings={themeSprings}
					/>
				))}

				<DocsNavigation
					currentPageId={currentPageId}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
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
