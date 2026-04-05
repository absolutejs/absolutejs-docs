import {
	DROPDOWN_CLOSE_DELAY_MS,
	DROPDOWN_CLOSE_Y_OFFSET,
	DROPDOWN_HIDDEN_SCALE
} from '../../../constants';
import { animated, useSpring } from '@react-spring/web';
import { useRef, useState } from 'react';
import { User } from '../../../../db/schema';
import { ThemeSprings, SetTheme } from '../../../types/springTypes';
import { isProviderKey, providerData } from '../../data/providerData';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { DARK_LOGO_PROVIDERS } from '../../styles/authModalStyles';
import { buttonStyle } from '../../styles/styles';
import { AuthContainer } from '../auth/AuthContainer';
import { ProfilePicture } from '../utils/ProfilePicture';
import { Modal } from '../utils/Modal';
import { DropdownContainer } from './DropdownContainer';
import { NavbarIconLinks } from './NavbarIconLinks';
import { ThemeButton } from './ThemeButton';
import { handleSignOut } from '../../utils/authFunctions';

type NavbarUserButtonsProps = {
	user: User | null;
	themeSprings: ThemeSprings;
	setTheme: SetTheme;
};

const getNameParts = (name: string) =>
	name
		.trim()
		.split(/\s+/)
		.filter((part) => part.length > 0);

const getAuthProviderKey = (authSub: string) => {
	const [providerKey] = authSub.split('|');
	if (!providerKey || !authSub.includes('|')) return undefined;

	return providerKey.toLowerCase();
};

const getMetadataDisplayName = (user: User) => {
	if (typeof user.metadata?.name === 'string') return user.metadata.name;
	if (typeof user.metadata?.display_name === 'string')
		return user.metadata.display_name;
	if (typeof user.metadata?.given_name === 'string')
		return user.metadata.given_name;

	return undefined;
};

const deriveInitials = (user: User | null) => {
	if (!user) return '?';

	const name = getMetadataDisplayName(user);

	if (name) {
		const parts = getNameParts(name);
		const firstInitial = parts[0]?.[0];
		const lastPartIndex = parts.length - 1;
		const lastInitial = parts[lastPartIndex]?.[0];
		const hasTwoParts = parts.length >= 2;
		if (hasTwoParts && firstInitial && lastInitial) {
			return `${firstInitial}${lastInitial}`.toUpperCase();
		}

		return name.slice(0, 2).toUpperCase();
	}

	const provider = getAuthProviderKey(user.auth_sub);
	if (provider) {
		const providerInitials: Record<string, string> = {
			apple: 'A',
			discord: 'D',
			facebook: 'FB',
			github: 'GH',
			google: 'G',
			linkedin: 'LI',
			microsoft: 'MS',
			spotify: 'SP',
			twitter: 'X'
		};

		return providerInitials[provider] ?? provider.slice(0, 2).toUpperCase();
	}

	return '?';
};

export const NavbarUserButtons = ({
	user,
	themeSprings,
	setTheme
}: NavbarUserButtonsProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	const [dropdownSpring, dropdownApi] = useSpring(() => ({
		config: { friction: 22, tension: 280 },
		opacity: 0,
		scale: DROPDOWN_HIDDEN_SCALE,
		y: DROPDOWN_CLOSE_Y_OFFSET
	}));

	const openDropdown = () => {
		setIsDropdownOpen(true);
		void dropdownApi.start({ opacity: 1, scale: 1, y: 0 });
	};

	const closeDropdown = () => {
		void dropdownApi.start({
			config: { friction: 26, tension: 350 },
			opacity: 0,
			scale: DROPDOWN_HIDDEN_SCALE,
			y: DROPDOWN_CLOSE_Y_OFFSET
		});
		setTimeout(() => setIsDropdownOpen(false), DROPDOWN_CLOSE_DELAY_MS);
	};

	const handleToggleDropdown = () => {
		if (isDropdownOpen) {
			closeDropdown();
		} else {
			openDropdown();
		}
	};

	const triggerRef = useRef<HTMLButtonElement>(null);
	const initials = deriveInitials(user);

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
			{user ? (
				<button
					onClick={handleToggleDropdown}
					ref={triggerRef}
					style={{
						alignItems: 'center',
						background: 'none',
						border: 'none',
						borderRadius: '50%',
						cursor: 'pointer',
						display: 'flex',
						height: '2.25rem',
						justifyContent: 'center',
						overflow: 'hidden',
						padding: 0,
						width: '2.25rem'
					}}
				>
					<ProfilePicture
						height="2.25rem"
						initials={initials}
						themeSprings={themeSprings}
						userImage={
							typeof user.metadata?.profile_picture === 'string'
								? user.metadata.profile_picture
								: undefined
						}
						width="2.25rem"
					/>
				</button>
			) : (
				<animated.button
					onClick={handleToggleDropdown}
					ref={triggerRef}
					style={{
						...buttonStyle({
							backgroundColor: themeSprings.themeTertiary,
							color: themeSprings.contrastPrimary
						}),
						border: '1px solid rgba(128, 128, 128, 0.12)',
						borderRadius: '8px',
						fontSize: '0.875rem',
						margin: 0,
						padding: '0.4375rem 0.875rem'
					}}
				>
					Login
				</animated.button>
			)}

			<NavbarIconLinks themeSprings={themeSprings} />
			<ThemeButton setTheme={setTheme} themeSprings={themeSprings} />

			{isDropdownOpen && !isMobile && (
				<DropdownContainer
					ignoredElements={[triggerRef]}
					onClose={closeDropdown}
					spring={dropdownSpring}
					springApi={dropdownApi}
					themeSprings={themeSprings}
				>
					{user ? (
						<ProfileDropdown
							initials={initials}
							themeSprings={themeSprings}
							user={user}
						/>
					) : (
						<AuthContainer themeSprings={themeSprings} />
					)}
				</DropdownContainer>
			)}

			{isDropdownOpen && isMobile && (
				<Modal
					isOpen={isDropdownOpen}
					onClose={() => setIsDropdownOpen(false)}
					style={{
						backgroundColor: themeSprings.themeSecondary,
						borderRadius: '0.75rem'
					}}
				>
					{user ? (
						<ProfileDropdown
							initials={initials}
							themeSprings={themeSprings}
							user={user}
						/>
					) : (
						<AuthContainer themeSprings={themeSprings} />
					)}
				</Modal>
			)}
		</div>
	);
};

type ProfileDropdownProps = {
	user: User;
	initials: string;
	themeSprings: ThemeSprings;
};

const ProfileDropdown = ({
	user,
	initials,
	themeSprings
}: ProfileDropdownProps) => {
	const displayName = getMetadataDisplayName(user);

	const email =
		typeof user.metadata?.email === 'string'
			? user.metadata.email
			: undefined;

	const providerKey = getAuthProviderKey(user.auth_sub);
	let provider;
	if (providerKey && isProviderKey(providerKey)) {
		provider = providerData[providerKey];
	}
	const providerDisplay = providerKey
		? providerKey.charAt(0).toUpperCase() + providerKey.slice(1)
		: undefined;
	const isDarkLogo = providerKey
		? DARK_LOGO_PROVIDERS.has(providerKey)
		: false;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				padding: '16px',
				width: '280px'
			}}
		>
			<div
				style={{
					alignItems: 'center',
					display: 'flex',
					gap: '12px',
					marginBottom: '12px',
					padding: '4px 0'
				}}
			>
				<ProfilePicture
					height="2.5rem"
					initials={initials}
					themeSprings={themeSprings}
					userImage={
						typeof user.metadata?.profile_picture === 'string'
							? user.metadata.profile_picture
							: undefined
					}
					width="2.5rem"
				/>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						minWidth: 0
					}}
				>
					{displayName && (
						<animated.span
							style={{
								color: themeSprings.contrastPrimary,
								fontSize: '0.875rem',
								fontWeight: 600,
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap'
							}}
						>
							{displayName}
						</animated.span>
					)}
					{email && (
						<animated.span
							style={{
								color: themeSprings.contrastSecondary,
								fontSize: '0.75rem',
								opacity: 0.7,
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap'
							}}
						>
							{email}
						</animated.span>
					)}
				</div>
			</div>

			{/* Provider badge */}
			{provider && providerDisplay && (
				<animated.div
					style={{
						alignItems: 'center',
						background: themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? 'rgba(99, 102, 241, 0.08)'
								: 'rgba(99, 102, 241, 0.05)'
						),
						borderRadius: '6px',
						display: 'flex',
						gap: '8px',
						marginBottom: '12px',
						padding: '8px 10px'
					}}
				>
					<animated.img
						alt={`${providerDisplay} logo`}
						src={provider.logoUrl}
						style={{
							filter: isDarkLogo
								? themeSprings.theme.to((t) =>
										t.endsWith('dark')
											? 'brightness(0) invert(1)'
											: 'none'
									)
								: 'none',
							height: '1rem',
							objectFit: 'contain',
							width: '1rem'
						}}
					/>
					<animated.span
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: '0.75rem',
							fontWeight: 500
						}}
					>
						Signed in with {providerDisplay}
					</animated.span>
				</animated.div>
			)}

			<animated.div
				style={{
					borderTop: '1px solid',
					borderTopColor: themeSprings.themeTertiary,
					display: 'flex',
					flexDirection: 'column',
					gap: '2px',
					paddingTop: '8px'
				}}
			>
				<animated.a
					href="/profile"
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor =
							'rgba(128, 128, 128, 0.08)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = 'transparent';
					}}
					style={{
						alignItems: 'center',
						borderRadius: '6px',
						color: themeSprings.contrastPrimary,
						display: 'flex',
						fontSize: '0.875rem',
						fontWeight: 500,
						gap: '8px',
						padding: '8px 10px',
						textDecoration: 'none',
						transition: 'background-color 0.15s ease'
					}}
				>
					Profile
				</animated.a>
				<animated.button
					onClick={() => handleSignOut()}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor =
							'rgba(128, 128, 128, 0.08)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = 'transparent';
					}}
					style={{
						alignItems: 'center',
						background: 'none',
						border: 'none',
						borderRadius: '6px',
						color: themeSprings.contrastPrimary,
						cursor: 'pointer',
						display: 'flex',
						fontSize: '0.875rem',
						fontWeight: 500,
						gap: '8px',
						padding: '8px 10px',
						textAlign: 'left',
						transition: 'background-color 0.15s ease',
						width: '100%'
					}}
				>
					Sign out
				</animated.button>
			</animated.div>
		</div>
	);
};
