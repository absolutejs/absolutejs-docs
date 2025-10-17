import { animated, useSprings } from '@react-spring/web';
import { DocsView, isMenuDropdown, ThemeSprings } from '../../../types/types';
import { sidebarData } from '../../data/sidebarData';
import { lightTertiaryColor, primaryColor } from '../../styles/colors';
import { SidebarDropdown } from './SidebarDropdown';
import { SidebarLink } from './SidebarLink';

type SidebarProps = {
	view: DocsView;
	themeSprings: ThemeSprings;
	navigateToView: (newView: DocsView) => void;
};

type Acc = {
	counts: number[];
	offset: number;
	totalButtons: number;
	selectedIndex: number;
};

export const Sidebar = ({
	view,
	themeSprings,
	navigateToView
}: SidebarProps) => {
	const {
		counts: dropdownButtonCounts,
		totalButtons,
		selectedIndex
	} = sidebarData.reduce<Acc>(
		(acc, item) => {
			if (isMenuDropdown(item)) {
				const count = item.buttons.length;
				const idx = item.buttons.findIndex((b) => b.id === view);
				if (idx !== -1) acc.selectedIndex = acc.offset + idx;
				acc.counts.push(count);
				acc.offset += count;
				acc.totalButtons += count;

				return acc;
			}
			acc.counts.push(1);
			if (item.id === view) acc.selectedIndex = acc.offset;
			acc.offset += 1;
			acc.totalButtons += 1;

			return acc;
		},
		{ counts: [], offset: 0, selectedIndex: -1, totalButtons: 0 }
	);

	const [linksSprings, linksApi] = useSprings(totalButtons, (index) => ({
		borderColor:
			index === selectedIndex ? primaryColor : lightTertiaryColor,
		config: { duration: 150, friction: 30, tension: 250 }
	}));

	const startIndexForDropdown = (dropdownIndex: number) =>
		dropdownButtonCounts
			.slice(0, dropdownIndex)
			.reduce((sum, count) => sum + count, 0);

	return (
		<animated.aside
			style={{
				borderColor: themeSprings.themeTertiary,
				borderRight: '2px solid',
				flexShrink: 0,
				height: '100%',
				maxHeight: '100%',
				overflowY: 'auto',
				padding: '1rem'
			}}
		>
			{sidebarData.map((element, index) => {
				if (isMenuDropdown(element)) {
					return (
						<SidebarDropdown
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
