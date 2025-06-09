import { animated, useSpring } from '@react-spring/web';
import { useRef, useState } from 'react';
import { User } from '../../../../db/schema';
import { ThemeColors } from '../../../types/types';
import { profileButtonStyle } from '../../styles/navbarStyles';
import { buttonStyle } from '../../styles/styles';
import { AuthContainer } from '../auth/AuthContainer';
import { ProfilePicture } from '../utils/ProfilePicture';
import { DropdownContainer } from './DropdownContainer';
import { IoSunny } from 'react-icons/io5';
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
			{user !== undefined && (
				<animated.a style={profileButtonStyle} href="/protected">
					<ProfilePicture
						userImage={
							typeof user.metadata?.profile_picture === 'string'
								? user.metadata.profile_picture
								: undefined
						}
						backupImage={'/assets/svg/default-profile-icon.svg'}
						width="100%"
						height="100%"
					/>
				</animated.a>
			)}
			<ThemeButton themeSprings={themeSprings} />
			{isDropdownOpen === true && (
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
		</div>
	);
};
