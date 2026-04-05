import { SpringRef, SpringValue } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { DocsView } from '../../../types/types';
import { MobileSidebar } from './MobileSidebar';
import { MobileSidebarToggle } from './MobileSidebarToggle';
import { Sidebar } from './Sidebar';

type SidebarSectionProps = {
	isMobile: boolean;
	navigateToView: (view: DocsView) => void;
	onToggleSection: (label: string) => void;
	openSections: Set<string>;
	spring: {
		overlayOpacity: SpringValue<number>;
		transform: SpringValue<string>;
	};
	springApi: SpringRef<{ overlayOpacity: number; transform: string }>;
	themeSprings: ThemeSprings;
	toggleSidebar: () => void;
	view: DocsView;
};

export const SidebarSection = ({
	isMobile,
	navigateToView,
	onToggleSection,
	openSections,
	spring,
	springApi,
	themeSprings,
	toggleSidebar,
	view
}: SidebarSectionProps) =>
	isMobile ? (
		<>
			<MobileSidebarToggle
				onToggle={toggleSidebar}
				themeSprings={themeSprings}
			/>
			<MobileSidebar
				navigateToView={navigateToView}
				onToggleSection={onToggleSection}
				openSections={openSections}
				spring={spring}
				springApi={springApi}
				themeSprings={themeSprings}
				view={view}
			/>
		</>
	) : (
		<Sidebar
			navigateToView={navigateToView}
			onToggleSection={onToggleSection}
			openSections={openSections}
			themeSprings={themeSprings}
			view={view}
		/>
	);
