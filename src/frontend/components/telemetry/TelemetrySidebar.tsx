import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { isMenuDropdown } from '../../../types/types';
import {
	TelemetryView,
	telemetrySidebarData
} from '../../data/telemetrySidebarData';
import { useTelemetrySidebarSprings } from '../../hooks/springs/useTelemetrySidebarSprings';
import { SidebarDropdown } from '../sidebar/SidebarDropdown';
import { SidebarLink } from '../sidebar/SidebarLink';

type TelemetrySidebarProps = {
	view: TelemetryView;
	themeSprings: ThemeSprings;
	navigateToView: (newView: TelemetryView) => void;
	openSections: Set<string>;
	onToggleSection: (label: string) => void;
};

export const TelemetrySidebar = ({
	view,
	themeSprings,
	navigateToView,
	openSections,
	onToggleSection
}: TelemetrySidebarProps) => {
	const { linksSprings, linksApi, startIndexForDropdown } =
		useTelemetrySidebarSprings(view);

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
			{telemetrySidebarData.map((element, index) => {
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
						'Internal index error in TelemetrySidebar component'
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
