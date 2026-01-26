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
				padding: '0.75rem 0.5rem'
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
							isOpen={openSections.has(element.label)}
							onToggle={() => onToggleSection(element.label)}
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
	);
};
