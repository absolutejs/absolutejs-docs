import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { DocsView, isMenuDropdown } from '../../../types/types';
import { sidebarData } from '../../data/sidebarData';
import { useSidebarSprings } from '../../hooks/springs/useSidebarSprings';
import { SidebarDropdown } from './SidebarDropdown';
import { SidebarLink } from './SidebarLink';

type SidebarProps = {
	view: DocsView;
	themeSprings: ThemeSprings;
	navigateToView: (newView: DocsView) => void;
	openSections: Set<string>;
	onToggleSection: (label: string) => void;
};

export const Sidebar = ({
	view,
	themeSprings,
	navigateToView,
	openSections,
	onToggleSection
}: SidebarProps) => {
	const { linksSprings, linksApi, startIndexForDropdown } =
		useSidebarSprings(view);

	return (
		<animated.aside
			style={{
				borderColor: themeSprings.themeTertiary,
				borderRight: '1px solid',
				flexShrink: 0,
				height: '100%',
				maxHeight: '100%',
				overflowY: 'auto',
				padding: '1rem 0.75rem'
			}}
		>
			{sidebarData.map((element, index) => {
				if (isMenuDropdown(element)) {
					return (
						<SidebarDropdown
							buttons={element.buttons}
							icon={element.icon}
							isOpen={openSections.has(element.label)}
							key={element.label}
							label={element.label}
							linksApi={linksApi}
							linksSprings={linksSprings}
							navigateToView={navigateToView}
							onToggle={() => onToggleSection(element.label)}
							startIndex={startIndexForDropdown(index)}
							themeSprings={themeSprings}
							view={view}
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
						icon={element.icon}
						id={element.id}
						index={-1}
						key={element.label}
						label={element.label}
						linksApi={linksApi}
						navigateToView={navigateToView}
						themeSprings={themeSprings}
						view={view}
					/>
				);
			})}
		</animated.aside>
	);
};
