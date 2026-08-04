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
			padding: '1.25rem 1rem 2.5rem',
			scrollbarColor: 'rgba(128, 128, 128, 0.35) transparent',
			scrollbarWidth: 'thin',
			width: '280px'
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
