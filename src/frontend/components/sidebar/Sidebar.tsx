import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { DocsView, isMenuDropdown } from '../../../types/types';
import { sidebarData } from '../../data/sidebarData';
import { useSidebarSprings } from '../../hooks/springs/useSidebarSprings';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { SidebarDropdown } from './SidebarDropdown';
import { SidebarLink } from './SidebarLink';

type SidebarProps = {
	view: DocsView;
	themeSprings: ThemeSprings;
	navigateToView: (newView: DocsView) => void;
};

export const Sidebar = ({
	view,
	themeSprings,
	navigateToView
}: SidebarProps) => {
	const { linksSprings, linksApi, startIndexForDropdown } =
		useSidebarSprings(view);
	const { isSizeOrLess } = useMediaQuery();

	// Responsive breakpoints
	const isTablet = isSizeOrLess('md'); // 768px and below
	const isMobile = isSizeOrLess('sm'); // 640px and below

	return (
		<>
			<style>
				{`.sidebar-scroll-container::-webkit-scrollbar {
					width: 8px;
				}
				.sidebar-scroll-container::-webkit-scrollbar-track {
					background: ${themeSprings.themeSecondary.get()};
				}
				.sidebar-scroll-container::-webkit-scrollbar-thumb {
					background: ${themeSprings.themeTertiary.get()};
					border-radius: 4px;
				}
				.sidebar-scroll-container::-webkit-scrollbar-thumb:hover {
					background: ${themeSprings.contrastSecondary.get()};
				}`}
			</style>
			<animated.aside
				className="sidebar-scroll-container"
				style={{
					borderColor: themeSprings.themeTertiary,
					borderRight: isMobile ? 'none' : '2px solid',
					borderBottom: isMobile ? '2px solid' : 'none',
					flexShrink: isTablet ? 1 : 0, // Allow shrinking on smaller screens
					height: isMobile ? 'auto' : '100%',
					maxHeight: isMobile ? '200px' : '100%',
					width: isMobile ? '100%' : (isTablet ? '200px' : '250px'), // Responsive width
					minWidth: isMobile ? 'auto' : (isTablet ? '180px' : '200px'),
					overflowY: 'auto',
					overflowX: 'hidden',
					padding: isMobile ? '0.5rem' : '1rem',
					scrollbarWidth: 'thin', // Firefox
					scrollbarColor: `${themeSprings.themeTertiary.get()} ${themeSprings.themeSecondary.get()}`, // Firefox
					msOverflowStyle: 'scrollbar' // IE/Edge
				}}
			>
			{sidebarData.map((element, index) => {
				if (isMenuDropdown(element)) {
					return (
						<SidebarDropdown
							view={view}
							linksSprings={linksSprings}
							linksApi={linksApi}
							startIndex={startIndexForDropdown(index)}
							navigateToView={navigateToView}
							key={element.label}
							label={element.label}
							buttons={element.buttons}
							icon={element.icon}
							themeSprings={themeSprings}
						/>
					);
				}

				const linkSprings = linksSprings[index];
				if (linkSprings === undefined) {
					throw new Error(
						'Internal index error in Sidebar component'
					);
				}

				return (
					<SidebarLink
						view={view}
						index={-1}
						icon={element.icon}
						linksApi={linksApi}
						id={element.id}
						key={element.label}
						navigateToView={navigateToView}
						label={element.label}
						themeSprings={themeSprings}
					/>
				);
			})}
		</animated.aside>
		</>
	);
};
