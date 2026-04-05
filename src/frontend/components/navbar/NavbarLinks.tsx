import { ThemeSprings } from '../../../types/springTypes';
import { isNavbarDropdown, NavbarElement } from '../../../types/types';
import { NavbarDropdown } from './NavbarDropdown';
import { NavbarLink } from './NavbarLink';

type NavbarLinksProps = {
	navbarData: NavbarElement[];
	themeSprings: ThemeSprings;
};

export const NavbarLinks = ({ navbarData, themeSprings }: NavbarLinksProps) => (
	<nav
		style={{
			alignItems: 'center',
			display: 'flex',
			gap: '10px',
			justifyContent: 'center'
		}}
	>
		{navbarData.map((element) => {
			if (isNavbarDropdown(element)) {
				return (
					<NavbarDropdown
						href={element.href}
						key={element.label}
						label={element.label}
						links={element.links}
						themeSprings={themeSprings}
					/>
				);
			}

			return (
				<NavbarLink
					href={element.href}
					icon={element.icon}
					key={element.label}
					label={element.label}
					themeSprings={themeSprings}
				/>
			);
		})}
	</nav>
);
