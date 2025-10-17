import { animated } from '@react-spring/web';
import { isNavbarDropdown, ThemeProps } from '../../../types/types';
import { sidebarData } from '../../data/sidebarData';
import { navbarDrowdownLinkStyle } from '../../styles/navbarStyles';
import { SidebarDropdown } from './SidebarDropdown';

export const Sidebar = ({ themeSprings }: ThemeProps) => (
	<animated.aside
		style={{
			borderColor: themeSprings.themeTertiary,
			borderRight: '2px solid',
			padding: '1rem',
			minWidth: '250px',
			width: '250px',
			flexShrink: 0
		}}
	>
		{sidebarData.map((element) => {
			if (isNavbarDropdown(element)) {
				return (
					<SidebarDropdown
						key={element.label}
						label={element.label}
						href={element.href}
						links={element.links}
						icon={element.icon}
						themeSprings={themeSprings}
					/>
				);
			}

			return (
				<animated.a
					href={element.href}
					key={element.label}
					style={navbarDrowdownLinkStyle(themeSprings)}
				>
					{element.label}
				</animated.a>
			);
		})}
	</animated.aside>
);
