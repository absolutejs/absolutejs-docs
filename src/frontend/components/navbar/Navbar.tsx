import { animated, useSpring } from '@react-spring/web';
import { useRef } from 'react';
import { User } from '../../../../db/schema';
import { ThemeColors } from '../../../types/types';
import { navbarData } from '../../data/navbarData';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { tertiaryColor } from '../../styles/colors';
import {
	navbarContainerStyle,
	hamburgerButtonStyle,
	hamburgerBarStyle
} from '../../styles/navbarStyles';
import { HamburgerMenu } from '../hamburger/HamburgerMenu';
import { NavbarLinks } from './NavbarLinks';
import { NavbarUserButtons } from './NavbarUserButtons';

type NavbarProps = {
	user: User | undefined;
	handleSignOut: () => Promise<void>;
	themeSprings: ThemeColors;
};

export const Navbar = ({ user, handleSignOut, themeSprings }: NavbarProps) => {
	const breakpoint = useMediaQuery();
	const isMobile = breakpoint === 'xs' || breakpoint === 'sm';

	const navRef = useRef<HTMLDivElement>(null);

	const [hamburgerMenuSpring, hamburgerMenuApi] = useSpring(() => ({
		config: { friction: 40, tension: 275 },
		transform: 'translateX(100%)',
		onRest: () => {
			if (hamburgerMenuSpring.transform.get() === 'translateX(100%)') {
				document.body.style.overflow = '';
			}
		},
		onStart: () => {
			document.body.style.overflow = 'hidden';
		}
	}));

	const toggleHamburgerMenu = () => {
		const isOpen =
			hamburgerMenuSpring.transform.get() === 'translateX(100%)';
		void hamburgerMenuApi.start({
			transform: isOpen ? 'translateX(0%)' : 'translateX(100%)'
		});
	};

	return (
		<animated.header
			ref={navRef}
			style={navbarContainerStyle(themeSprings)}
		>
			<a
				href="/"
				style={{
					color: tertiaryColor,
					fontSize: '1.5rem',
					fontWeight: 'bold',
					textDecoration: 'none'
				}}
			>
				AbsoluteJS
			</a>

			<div
				style={{
					alignItems: 'center',
					display: 'flex'
				}}
			>
				{!isMobile && <NavbarLinks navbarData={navbarData} />}

				<NavbarUserButtons user={user} handleSignOut={handleSignOut} />

				{isMobile === true && (
					<button
						style={hamburgerButtonStyle}
						onClick={toggleHamburgerMenu}
					>
						<div style={hamburgerBarStyle} />
						<div style={hamburgerBarStyle} />
						<div style={hamburgerBarStyle} />
					</button>
				)}
			</div>

			<HamburgerMenu
				spring={hamburgerMenuSpring}
				springApi={hamburgerMenuApi}
				user={user}
				handleSignOut={handleSignOut}
			/>
		</animated.header>
	);
};
