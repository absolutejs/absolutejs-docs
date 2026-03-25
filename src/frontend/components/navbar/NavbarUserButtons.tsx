import { animated, useSpring } from '@react-spring/web';
import { useRef, useState } from 'react';
import { User } from '../../../../db/schema';
import { ThemeSprings, SetTheme } from '../../../types/springTypes';
import { providerData } from '../../data/providerData';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { DARK_LOGO_PROVIDERS } from '../../styles/authModalStyles';
import { buttonStyle } from '../../styles/styles';
import { AuthContainer } from '../auth/AuthContainer';
import { ProfilePicture } from '../utils/ProfilePicture';
import { Modal } from '../utils/Modal';
import { DropdownContainer } from './DropdownContainer';
import { ThemeButton } from './ThemeButton';
import { handleSignOut } from '../../utils/authFunctions';

type NavbarUserButtonsProps = {
	user: User | null;
	themeSprings: ThemeSprings;
	setTheme: SetTheme;
};

const deriveInitials = (user: User | null): string => {
	if (!user) return '?';

	const name =
		typeof user.metadata?.name === 'string'
			? user.metadata.name
			: typeof user.metadata?.display_name === 'string'
				? user.metadata.display_name
				: typeof user.metadata?.given_name === 'string'
					? user.metadata.given_name
					: undefined;

	if (name) {
		const parts = name.trim().split(/\s+/);
		if (parts.length >= 2) {
			return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
		}
		return name.slice(0, 2).toUpperCase();
	}

	const sub = user.auth_sub;
	if (sub.includes('|')) {
		const provider = sub.split('|')[0]!.toLowerCase();
		const providerInitials: Record<string, string> = {
			google: 'G',
			github: 'GH',
			discord: 'D',
			twitter: 'X',
			facebook: 'FB',
			apple: 'A',
			microsoft: 'MS',
			linkedin: 'LI',
			spotify: 'SP'
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
		scale: 0.95,
		y: -10
	}));

	const openDropdown = () => {
		setIsDropdownOpen(true);
		void dropdownApi.start({ opacity: 1, scale: 1, y: 0 });
	};

	const closeDropdown = () => {
		void dropdownApi.start({
			config: { friction: 26, tension: 350 },
			opacity: 0,
			scale: 0.95,
			y: -10
		});
		setTimeout(() => setIsDropdownOpen(false), 150);
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
					ref={triggerRef}
					onClick={handleToggleDropdown}
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
						themeSprings={themeSprings}
						userImage={
							typeof user.metadata?.profile_picture === 'string'
								? user.metadata.profile_picture
								: undefined
						}
						initials={initials}
						width="2.25rem"
						height="2.25rem"
					/>
				</button>
			) : (
				<animated.button
					ref={triggerRef}
					onClick={handleToggleDropdown}
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

			<ThemeButton themeSprings={themeSprings} setTheme={setTheme} />

			{isDropdownOpen && !isMobile && (
				<DropdownContainer
					themeSprings={themeSprings}
					spring={dropdownSpring}
					springApi={dropdownApi}
					onClose={closeDropdown}
					ignoredElements={[triggerRef]}
				>
					{user ? (
						<ProfileDropdown
							user={user}
							initials={initials}
							themeSprings={themeSprings}
						/>
					) : (
						<AuthContainer themeSprings={themeSprings} />
					)}
				</DropdownContainer>
			)}

			{isDropdownOpen && isMobile && (
				<Modal
					style={{
						backgroundColor: themeSprings.themeSecondary,
						borderRadius: '0.75rem'
					}}
					isOpen={isDropdownOpen}
					onClose={() => setIsDropdownOpen(false)}
				>
					{user ? (
						<ProfileDropdown
							user={user}
							initials={initials}
							themeSprings={themeSprings}
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
	const displayName =
		typeof user.metadata?.name === 'string'
			? user.metadata.name
			: typeof user.metadata?.display_name === 'string'
				? user.metadata.display_name
				: typeof user.metadata?.given_name === 'string'
					? user.metadata.given_name
					: undefined;

	const email =
		typeof user.metadata?.email === 'string'
			? user.metadata.email
			: undefined;

	const providerKey = user.auth_sub.includes('|')
		? user.auth_sub.split('|')[0]!.toLowerCase()
		: undefined;
	const provider = providerKey
		? providerData[providerKey as keyof typeof providerData]
		: undefined;
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
					themeSprings={themeSprings}
					userImage={
						typeof user.metadata?.profile_picture === 'string'
							? user.metadata.profile_picture
							: undefined
					}
					initials={initials}
					width="2.5rem"
					height="2.5rem"
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
						src={provider.logoUrl}
						alt={`${providerDisplay} logo`}
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
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor =
							'rgba(128, 128, 128, 0.08)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = 'transparent';
					}}
				>
					Profile
				</animated.a>
				<animated.button
					onClick={() => handleSignOut()}
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
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor =
							'rgba(128, 128, 128, 0.08)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = 'transparent';
					}}
				>
					Sign out
				</animated.button>
			</animated.div>
		</div>
	);
};
