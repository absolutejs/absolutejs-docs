import { animated, useSpring } from '@react-spring/web';
import { useRef, useState } from 'react';
import { User } from '../../../../db/schema';
import { ThemeSprings, SetTheme } from '../../../types/springTypes';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { profileButtonStyle } from '../../styles/navbarStyles';
import { buttonStyle } from '../../styles/styles';
import { AuthContainer } from '../auth/AuthContainer';
import { AnimatedProfilePicture } from '../utils/AnimatedComponents';
import { Modal } from '../utils/Modal';
import { DropdownContainer } from './DropdownContainer';
import { ThemeButton } from './ThemeButton';
import { handleSignOut } from '../../utils/authFunctions';

type NavbarUserButtonsProps = {
	user: User | null;
	themeSprings: ThemeSprings;
	setTheme: SetTheme;
};

export const NavbarUserButtons = ({
	user,
	themeSprings,
	setTheme
}: NavbarUserButtonsProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	const [loginDropdownSpring, loginDropdownApi] = useSpring(() => ({
		config: { friction: 22, tension: 280 },
		opacity: 0,
		scale: 0.95,
		y: -10
	}));

	const openDropdown = () => {
		setIsDropdownOpen(true);
		void loginDropdownApi.start({ opacity: 1, scale: 1, y: 0 });
	};

	const closeDropdown = () => {
		void loginDropdownApi.start({
			config: { friction: 26, tension: 350 },
			opacity: 0,
			scale: 0.95,
			y: -10
		});
		setTimeout(() => setIsDropdownOpen(false), 150);
	};

	const handleLoginClick = () => {
		if (isDropdownOpen) {
			closeDropdown();
		} else {
			openDropdown();
		}
	};

	const userButtonRef = useRef<HTMLButtonElement>(null);

	return (
		<div
			style={{
				alignItems: 'center',
				display: 'flex',
				gap: '0.5rem',
				marginLeft: '1rem',
				position: 'relative'
			}}
		>
			<animated.button
				ref={userButtonRef}
				onClick={user ? () => handleSignOut() : handleLoginClick}
				style={{
					...buttonStyle({
						backgroundColor: themeSprings.themeTertiary,
						color: themeSprings.contrastPrimary
					}),
					border: '1px solid rgba(128, 128, 128, 0.12)',
					borderRadius: '10px',
					margin: 0,
					padding: '0.5rem 1rem'
				}}
			>
				{user ? 'Sign Out' : 'Login'}
			</animated.button>
			{user !== undefined && !isMobile && (
				<animated.a style={profileButtonStyle} href="/protected">
					<AnimatedProfilePicture
						themeSprings={themeSprings}
						userImage={
							typeof user?.metadata?.profile_picture === 'string'
								? user.metadata.profile_picture
								: undefined
						}
						backupImage={themeSprings.theme.to((theme) =>
							theme.endsWith('dark')
								? '/assets/svg/default-profile-icon-light.svg'
								: '/assets/svg/default-profile-icon.svg'
						)}
						width="2.5rem"
						height="2.5rem"
					/>
				</animated.a>
			)}
			<ThemeButton themeSprings={themeSprings} setTheme={setTheme} />
			{isDropdownOpen === true && !isMobile && (
				<DropdownContainer
					themeSprings={themeSprings}
					spring={loginDropdownSpring}
					springApi={loginDropdownApi}
					onClose={closeDropdown}
					ignoredElements={[userButtonRef]}
				>
					<AuthContainer themeSprings={themeSprings} />
				</DropdownContainer>
			)}
			{isDropdownOpen === true && isMobile && (
				<Modal
					style={{
						backgroundColor: themeSprings.themeSecondary,
						borderRadius: '0.5rem'
					}}
					isOpen={isDropdownOpen}
					onClose={() => {
						setIsDropdownOpen(false);
					}}
				>
					<AuthContainer themeSprings={themeSprings} />
				</Modal>
			)}
		</div>
	);
};
