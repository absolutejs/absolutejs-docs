import { animated, useSpring } from '@react-spring/web';
import { useRef, useState } from 'react';
import { User } from '../../../../db/schema';
import { ThemeColors } from '../../../types/types';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useThemeStore } from '../../hooks/useThemeStore';
import { profileButtonStyle } from '../../styles/navbarStyles';
import { buttonStyle } from '../../styles/styles';
import { AuthContainer } from '../auth/AuthContainer';
import { Modal } from '../utils/Modal';
import { ProfilePicture } from '../utils/ProfilePicture';
import { DropdownContainer } from './DropdownContainer';
import { ThemeButton } from './ThemeButton';

type NavbarUserButtonsProps = {
	user: User | undefined;
	handleSignOut: () => Promise<void>;
	themeSprings: ThemeColors;
};

export const NavbarUserButtons = ({
	user,
	handleSignOut,
	themeSprings
}: NavbarUserButtonsProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');
	const theme = useThemeStore((state) => state.theme);

	const openDropdown = () => {
		setIsDropdownOpen(true);
		void loginDropdownApi.start({ opacity: 1, scale: 1 });
	};

	const closeDropdown = () => {
		setIsDropdownOpen(false);
		void loginDropdownApi.start({ opacity: 0, scale: 0 });
	};

	const handleLoginClick = () => {
		if (isDropdownOpen) {
			closeDropdown();
		} else {
			openDropdown();
		}
	};

	const [loginDropdownSpring, loginDropdownApi] = useSpring(() => ({
		config: { friction: 20, tension: 250 },
		opacity: 0,
		scale: 0
	}));

	const userButtonRef = useRef<HTMLButtonElement>(null);

	return (
		<div
			style={{
				display: 'flex',
				marginLeft: '1rem',
				position: 'relative'
			}}
		>
			<animated.button
				ref={userButtonRef}
				onClick={user ? () => handleSignOut() : handleLoginClick}
				style={buttonStyle({
					backgroundColor: themeSprings.themeTertiary,
					color: themeSprings.contrastPrimary
				})}
			>
				{user ? 'Sign Out' : 'Login'}
			</animated.button>
			{user !== undefined && !isMobile && (
				<animated.a style={profileButtonStyle} href="/protected">
					<ProfilePicture
						themeSprings={themeSprings}
						userImage={
							typeof user.metadata?.profile_picture === 'string'
								? user.metadata.profile_picture
								: undefined
						}
						backupImage={
							theme === 'dark'
								? '/assets/svg/default-profile-icon-light.svg'
								: '/assets/svg/default-profile-icon.svg'
						}
						width="2.5rem"
						height="2.5rem"
					/>
				</animated.a>
			)}
			<ThemeButton themeSprings={themeSprings} />
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
