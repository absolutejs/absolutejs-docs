import { animated, useSpring } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { User } from '../../../../db/schema';
import { ThemeSprings, SetTheme } from '../../../types/springTypes';
import { navbarData } from '../../data/navbarData';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import {
	navbarContainerStyle,
	hamburgerButtonStyle
} from '../../styles/navbarStyles';
import { HamburgerMenu } from '../hamburger/HamburgerMenu';
import { NavbarLinks } from './NavbarLinks';
import { NavbarUserButtons } from './NavbarUserButtons';
import { ThemeButton } from './ThemeButton';

type NavbarProps = {
	user: User | null;
	themeSprings: ThemeSprings;
	setTheme: SetTheme;
};

export const Navbar = ({ user, themeSprings, setTheme }: NavbarProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navRef = useRef<HTMLDivElement>(null);

	const [hamburgerMenuSpring, hamburgerMenuApi] = useSpring(() => ({
		config: { friction: 40, tension: 275 },
		opacity: 0,
		transform: 'scale(0.985)'
	}));

	const setMenuOpen = (open: boolean) => {
		setIsMenuOpen(open);
		document.body.style.overflow = open ? 'hidden' : '';
		void hamburgerMenuApi.start({
			opacity: open ? 1 : 0,
			transform: open ? 'scale(1)' : 'scale(0.985)'
		});
	};

	useEffect(
		() => () => {
			document.body.style.overflow = '';
		},
		[]
	);

	return (
		<animated.header
			ref={navRef}
			style={{
				...navbarContainerStyle(themeSprings),
				padding: isMobile ? '0.625rem 1rem' : '0.75rem 1.5rem'
			}}
		>
			<animated.a
				href="/"
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '1.25rem',
					fontWeight: 700,
					letterSpacing: '-0.025em',
					textDecoration: 'none'
				}}
			>
				AbsoluteJS
			</animated.a>

			<div
				style={{
					alignItems: 'center',
					display: 'flex',
					gap: '0.25rem'
				}}
			>
				{!isMobile && (
					<NavbarLinks
						navbarData={navbarData}
						themeSprings={themeSprings}
					/>
				)}

				{isMobile ? (
					<ThemeButton
						setTheme={setTheme}
						themeSprings={themeSprings}
					/>
				) : (
					<NavbarUserButtons
						setTheme={setTheme}
						themeSprings={themeSprings}
						user={user}
					/>
				)}

				{isMobile === true && (
					<button
						aria-expanded={isMenuOpen}
						aria-label="Open navigation menu"
						onClick={() => setMenuOpen(true)}
						style={hamburgerButtonStyle}
					>
						<RxHamburgerMenu size={36} />
					</button>
				)}
			</div>

			<HamburgerMenu
				isOpen={isMenuOpen}
				onClose={() => setMenuOpen(false)}
				spring={hamburgerMenuSpring}
				themeSprings={themeSprings}
				user={user}
			/>
		</animated.header>
	);
};
