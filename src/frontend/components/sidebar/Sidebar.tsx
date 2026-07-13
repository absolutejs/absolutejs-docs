import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { DocsView } from '../../../types/types';
import { SidebarNav } from './SidebarNav';

type SidebarProps = {
	view: DocsView;
	themeSprings: ThemeSprings;
	navigateToView: (newView: DocsView) => void;
	openSections: Set<string>;
	onToggleSection: (key: string) => void;
};

export const Sidebar = ({
	view,
	themeSprings,
	navigateToView,
	openSections,
	onToggleSection
}: SidebarProps) => (
	<animated.aside
		style={{
			borderRight: themeSprings.themeTertiary.to(
				(color) => `1px solid ${color}`
			),
			flexShrink: 0,
			height: '100%',
			maxHeight: '100%',
			overflowY: 'auto',
			padding: '1.1rem 0.9rem',
			width: '256px'
		}}
	>
		<SidebarNav
			navigateToView={navigateToView}
			onToggleSection={onToggleSection}
			openSections={openSections}
			themeSprings={themeSprings}
			view={view}
		/>
	</animated.aside>
);
