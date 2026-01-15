import { animated, useSpring } from '@react-spring/web';
import { ReactNode, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { ThemeSprings } from '../../../types/springTypes';
import { NavbarLink as NavbarLinkType } from '../../../types/types';
import {
	dropdownItemStyle,
	dropdownStyle,
	getNavbarDropdownListStyle
} from '../../styles/navbarStyles';

type NavbarDropdownProps = {
	label: string;
	href: string;
	links: NavbarLinkType[];
	icon?: ReactNode;
	themeSprings: ThemeSprings;
};

const AnimatedFaChevronDown = animated(FaChevronDown);

export const NavbarDropdown = ({
	label,
	href,
	links,
	themeSprings
}: NavbarDropdownProps) => {
	const dropdownRef = useRef<HTMLUListElement>(null);

	const [dropdownSpring, dropdownApi] = useSpring(() => ({
		config: { friction: 26, tension: 300 },
		height: 0,
		opacity: 0,
		transform: 'rotate(-180deg)'
	}));

	const openDropdown = () => {
		if (!dropdownRef.current) return;

		void dropdownApi.start({
			height: dropdownRef.current.scrollHeight,
			opacity: 1,
			transform: 'rotate(0deg)'
		});
	};

	const closeDropdown = () => {
		void dropdownApi.start({
			height: 0,
			opacity: 0,
			transform: 'rotate(-180deg)'
		});
	};

	return (
		<div
			style={dropdownStyle}
			onMouseEnter={openDropdown}
			onMouseLeave={closeDropdown}
		>
			<animated.a
				href={href}
				style={{
					alignItems: 'center',
					color: themeSprings.contrastPrimary,
					display: 'flex',
					fontSize: '1.1rem',
					fontWeight: 500,
					gap: '6px',
					padding: '12px 16px',
					textDecoration: 'none'
				}}
			>
				{label}
				<AnimatedFaChevronDown
					style={{
						fontSize: '0.75rem',
						transform: dropdownSpring.transform,
						transformOrigin: 'center'
					}}
				/>
			</animated.a>

			<animated.nav
				ref={dropdownRef}
				style={getNavbarDropdownListStyle(dropdownSpring, themeSprings)}
			>
				{links.map((link, index) => (
					<animated.a
						key={index}
						href={link.href}
						style={dropdownItemStyle(themeSprings)}
					>
						{link.icon}
						{link.label}
					</animated.a>
				))}
			</animated.nav>
		</div>
	);
};
