import {
	isRefreshableProviderOption,
	isRevocableProviderOption,
	ProviderOption
} from '@absolutejs/auth';
import { animated } from '@react-spring/web';
import { Dispatch, SetStateAction } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { User } from '../../../../db/schema';
import { ThemeSprings } from '../../../types/springTypes';
import { ProviderInfo } from '../../data/providerData';
import { useAuthModalData } from '../../hooks/useAuthModalData';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { boxStyle, DARK_LOGO_PROVIDERS } from '../../styles/authModalStyles';
import { HighlightedJson } from '../utils/HighlightedJson';
import { Modal } from '../utils/Modal';
import { ProviderAction } from './ProviderAction';

type AuthModalProps = {
	user: User | undefined;
	handleSignOut: () => Promise<void>;
	modalContent: (ProviderInfo & { providerOption: ProviderOption }) | null;
	setModalContent: Dispatch<
		SetStateAction<
			(ProviderInfo & { providerOption: ProviderOption }) | null
		>
	>;
	themeSprings: ThemeSprings;
};

export const AuthModal = ({
	modalContent,
	user,
	handleSignOut,
	setModalContent,
	themeSprings
}: AuthModalProps) => {
	if (!modalContent) return null;

	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	const primaryColor = modalContent?.primaryColor ?? '#000';
	const provider = user?.auth_sub?.split('|')[0]?.toLocaleLowerCase();

	const isAuthorized =
		provider !== undefined && modalContent?.providerOption === provider;
	const isRefreshable = isAuthorized && isRefreshableProviderOption(provider);
	const isRevocable = isAuthorized && isRevocableProviderOption(provider);

	const {
		fetchProfile,
		handleRefresh,
		handleRevocation,
		providerStatuses,
		profile,
		registerHost
	} = useAuthModalData({
		handleSignOut,
		modalContent
	});

	const actions: Array<{
		disabled: boolean;
		href?: string;
		keyName:
			| 'authorize_status'
			| 'profile_status'
			| 'refresh_status'
			| 'revoke_status';
		label: string;
		onClick?: () => Promise<void>;
	}> = [
		{
			disabled: false,
			href: `/oauth2/${modalContent.providerOption}/authorization`,
			keyName: 'authorize_status',
			label: 'Authorize User'
		},
		{
			disabled: !isAuthorized,
			keyName: 'profile_status',
			label: 'Fetch Profile',
			onClick: fetchProfile
		},
		{
			disabled: !isRefreshable,
			keyName: 'refresh_status',
			label: 'Refresh Token',
			onClick: handleRefresh
		},
		{
			disabled: !isRevocable,
			keyName: 'revoke_status',
			label: 'Revoke Token',
			onClick: handleRevocation
		}
	];

	return (
		<Modal
			style={{
				alignItems: 'stretch',
				backgroundColor: themeSprings.themeTertiary,
				border: '1px solid rgba(128, 128, 128, 0.2)',
				borderRadius: '16px',
				boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				display: 'flex',
				flexDirection: 'column',
				gap: '28px',
				maxWidth: '95vw',
				padding: isMobile ? '24px' : '40px',
				width: '680px'
			}}
			onOpen={(dialogRef) => registerHost(dialogRef)}
			isOpen={modalContent !== null}
			onClose={() => {
				const params = new URLSearchParams(window.location.search);
				params.delete('provider');

				const newQuery = params.toString();
				const newUrl = newQuery
					? `${window.location.pathname}?${newQuery}`
					: window.location.pathname;

				window.history.replaceState(null, '', newUrl);

				setModalContent(null);
				registerHost(null);
			}}
		>
			<header
				style={{
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					gap: '16px'
				}}
			>
				<div
					style={{
						alignItems: 'center',
						backgroundColor: `${primaryColor}15`,
						borderRadius: '16px',
						display: 'flex',
						height: isMobile ? '80px' : '100px',
						justifyContent: 'center',
						width: isMobile ? '80px' : '100px'
					}}
				>
					<animated.img
						src={modalContent?.logoUrl}
						alt={`${modalContent?.name} logo`}
						style={{
							filter: DARK_LOGO_PROVIDERS.has(
								modalContent.providerOption
							)
								? themeSprings.theme.to((t) =>
										t.endsWith('dark')
											? 'brightness(0) invert(1)'
											: 'none'
									)
								: 'none',
							height: isMobile ? '48px' : '60px',
							width: isMobile ? '48px' : '60px'
						}}
					/>
				</div>
				<h2
					style={{
						fontSize: isMobile ? '1.5rem' : '1.75rem',
						fontWeight: 600,
						letterSpacing: '-0.02em',
						margin: 0,
						textAlign: 'center'
					}}
				>
					{modalContent?.name}
				</h2>
			</header>

			<nav
				style={{
					display: 'grid',
					gap: '12px',
					gridTemplateColumns: '1fr 1fr'
				}}
			>
				<animated.a
					href={modalContent?.manageCredentialsUrl}
					target="_blank"
					rel="noopener noreferrer"
					style={{
						alignItems: 'center',
						backgroundColor: themeSprings.themeSecondary,
						border: '1px solid rgba(128, 128, 128, 0.15)',
						borderRadius: '10px',
						color: themeSprings.contrastPrimary,
						display: 'flex',
						fontSize: '0.875rem',
						fontWeight: 500,
						gap: '6px',
						justifyContent: 'center',
						padding: '12px 16px',
						textDecoration: 'none'
					}}
				>
					Manage Credentials
					<FiExternalLink size={14} />
				</animated.a>
				<animated.a
					href={modalContent?.createNewCredentialsUrl}
					target="_blank"
					rel="noopener noreferrer"
					style={{
						alignItems: 'center',
						backgroundColor: themeSprings.themeSecondary,
						border: '1px solid rgba(128, 128, 128, 0.15)',
						borderRadius: '10px',
						color: themeSprings.contrastPrimary,
						display: 'flex',
						fontSize: '0.875rem',
						fontWeight: 500,
						gap: '6px',
						justifyContent: 'center',
						padding: '12px 16px',
						textDecoration: 'none'
					}}
				>
					Create Credentials
					<FiExternalLink size={14} />
				</animated.a>
			</nav>

			<section>
				<h3
					style={{
						fontSize: '0.75rem',
						fontWeight: 600,
						letterSpacing: '0.05em',
						margin: '0 0 12px',
						opacity: 0.6,
						textTransform: 'uppercase'
					}}
				>
					Response Data
				</h3>
				{!isAuthorized && (
					<pre style={boxStyle(primaryColor, isMobile)}>
						<code style={{ opacity: 0.7 }}>
							Authorize with this provider to begin testing.
						</code>
					</pre>
				)}

				{isAuthorized && !profile && (
					<pre style={boxStyle(primaryColor, isMobile)}>
						<code style={{ opacity: 0.7 }}>
							Click "Fetch Profile" to retrieve your data.
						</code>
					</pre>
				)}

				{isAuthorized && profile && (
					<HighlightedJson
						themeSprings={themeSprings}
						data={profile}
						primaryColor={primaryColor}
					/>
				)}
			</section>

			<section>
				<h3
					style={{
						fontSize: '0.75rem',
						fontWeight: 600,
						letterSpacing: '0.05em',
						margin: '0 0 12px',
						opacity: 0.6,
						textTransform: 'uppercase'
					}}
				>
					OAuth Actions
				</h3>
				<nav
					style={{
						display: 'grid',
						gap: '10px',
						gridTemplateColumns: '1fr 1fr'
					}}
				>
					{actions.map((action) => (
						<ProviderAction
							key={action.keyName}
							providerStatuses={providerStatuses}
							keyName={action.keyName}
							type={action.href ? 'link' : 'button'}
							href={action.href}
							disabled={action.disabled}
							label={
								isMobile
									? (action.label.split(' ')[0] ?? '')
									: (action.label ?? '')
							}
							onClick={action.onClick}
							color={primaryColor}
						/>
					))}
				</nav>
			</section>
		</Modal>
	);
};
