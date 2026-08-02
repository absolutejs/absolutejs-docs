import { ReactNode } from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import { mainContentStyle } from '../../styles/docsStyles';
import { MobileTableOfContents } from '../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../utils/TableOfContents';

type DocumentationViewLayoutProps = {
	children: ReactNode;
	isMobileOrTablet?: boolean;
	items: TocItem[];
	onTocToggle?: () => void;
	themeSprings: ThemeSprings;
	tocOpen?: boolean;
};

export const DocumentationViewLayout = ({
	children,
	isMobileOrTablet,
	items,
	onTocToggle,
	themeSprings,
	tocOpen
}: DocumentationViewLayoutProps) => (
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
		<div style={mainContentStyle(isMobileOrTablet)}>{children}</div>
		{!isMobileOrTablet ? (
			<TableOfContents items={items} themeSprings={themeSprings} />
		) : null}
		<MobileTableOfContents
			isOpen={tocOpen ?? false}
			items={items}
			onToggle={onTocToggle ?? (() => undefined)}
			themeSprings={themeSprings}
		/>
	</div>
);
