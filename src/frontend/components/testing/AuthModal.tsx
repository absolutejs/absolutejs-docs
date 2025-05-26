import {
	isRefreshableProviderOption,
	isRevocableProviderOption,
	ProviderOption
} from '@absolutejs/auth';
import { Dispatch, SetStateAction, CSSProperties, useState } from 'react';
import { User } from '../../../../db/schema';
import { ProviderInfo } from '../../data/providerData';
import { getContrastColor, opButtonStyle } from '../../styles/authModalStyles';
import { linkStyle } from '../../styles/styles';
import { Modal } from '../utils/Modal';
import { useToast } from '../utils/ToastProvider';

type AuthModalProps = {
	user: User | undefined;
	handleSignOut: () => Promise<void>;
	modalContent: (ProviderInfo & { providerOption: ProviderOption }) | null;
	setModalContent: Dispatch<
		SetStateAction<
			(ProviderInfo & { providerOption: ProviderOption }) | null
		>
	>;
};

export const AuthModal = ({
	modalContent,
	user,
	handleSignOut,
	setModalContent
}: AuthModalProps) => {
	const { addToast, registerHost } = useToast();
	const [profile, setProfile] = useState<Record<string, unknown>>();

	const primaryColor = modalContent?.primaryColor ?? '#000';
	const provider = user?.auth_sub?.split('|')[0]?.toLocaleLowerCase();

	const isAuthorized =
		provider !== undefined && modalContent?.providerOption === provider;
	const isRefreshable = isAuthorized && isRefreshableProviderOption(provider);
	const isRevokeable = isAuthorized && isRevocableProviderOption(provider);
	const helpMessage = isAuthorized
		? 'Fetch your profile to see your data.'
		: 'Authorize with this provider for this session to test.';

	const handleRefresh = async () => {
		const response = await fetch('/oauth2/tokens', {
			method: 'POST'
		});

		if (!response.ok) {
			const errorText = await response.text();
			addToast({
				duration: 0,
				message: `${errorText}`,
				style: { background: '#f8d7da', color: '#721c24' }
			});

			return;
		}
		addToast({
			message: 'Token refreshed successfully!',
			style: { background: '#d4edda', color: '#155724' }
		});
	};

	const handleRevocation = async () => {
		const response = await fetch('/oauth2/revocation', {
			method: 'POST'
		});

		if (!response.ok) {
			const errorText = await response.text();
			addToast({
				duration: 0,
				message: `${errorText}`,
				style: { background: '#f8d7da', color: '#721c24' }
			});

			return;
		}
		addToast({
			message: 'Token revoked successfully!',
			style: { background: '#d4edda', color: '#155724' }
		});
		handleSignOut();
		setProfile(undefined);
	};

	const fetchProfile = async () => {
		const response = await fetch('/oauth2/profile');

		if (!response.ok) {
			const errorText = await response.text();
			addToast({
				duration: 0,
				message: `${errorText}`,
				style: { background: '#f8d7da', color: '#721c24' }
			});

			return;
		}
		const data = await response.json();
		setProfile(data);
		addToast({
			message: 'Profile fetched successfully!',
			style: { background: '#d4edda', color: '#155724' }
		});
	};

	return (
		<Modal
			style={{
				alignItems: 'stretch',
				backgroundColor: '#fff',
				border: `3px solid ${primaryColor}`,
				borderRadius: '8px',
				display: 'flex',
				flexDirection: 'column',
				gap: '24px',
				maxWidth: '95vw',
				padding: '32px',
				width: '500px'
			}}
			onOpen={(dialogRef) => {
				registerHost(dialogRef);
			}}
			isOpen={modalContent !== null}
			onClose={() => {
				setModalContent(null);
				registerHost(null);
			}}
		>
			<h2
				style={{
					fontSize: '1.75rem',
					fontWeight: 'bold',
					margin: 0,
					textAlign: 'center'
				}}
			>
				{modalContent?.name}
			</h2>

			<img
				src={modalContent?.logoUrl}
				alt={`${modalContent?.name} logo`}
				style={{
					alignSelf: 'center',
					height: '120px',
					width: '120px'
				}}
			/>

			<nav style={{ display: 'flex', gap: '16px' }}>
				<a
					href={modalContent?.manageCredentialsUrl}
					style={linkStyle}
					target="_blank"
					rel="noopener noreferrer"
				>
					Manage Credentials
				</a>
				<a
					href={modalContent?.createNewCredentialsUrl}
					style={linkStyle}
					target="_blank"
					rel="noopener noreferrer"
				>
					Create New Credentials
				</a>
			</nav>

			<p
				style={{
					border: `2px solid ${primaryColor}`,
					borderRadius: '4px',
					height: '250px',
					margin: '0 0 8px',
					overflow: 'auto',
					padding: '16px'
				}}
			>
				Profile:
				<p
					style={{
						fontFamily: 'monospace',
						whiteSpace: 'pre-wrap'
					}}
				>
					{profile ? JSON.stringify(profile, null, 2) : helpMessage}
				</p>
			</p>

			<nav
				style={{
					display: 'grid',
					gap: '12px',
					gridTemplateColumns: '1fr 1fr'
				}}
			>
				<a
					href={`/oauth2/${modalContent?.providerOption}/authorization`}
					style={opButtonStyle(false, modalContent?.primaryColor)}
				>
					Authorize User
				</a>
				<button
					disabled={!isAuthorized}
					onClick={() => {
						addToast({
							message: 'Fetching profile...',
							style: {
								background: modalContent?.primaryColor,
								color: getContrastColor(
									modalContent?.primaryColor ?? '#333'
								)
							}
						});
						fetchProfile();
					}}
					style={opButtonStyle(
						!isAuthorized,
						modalContent?.primaryColor
					)}
				>
					Fetch Profile
				</button>
				<button
					disabled={!isRefreshable}
					onClick={() => {
						addToast({
							message: 'Refreshing token...',
							style: {
								background: modalContent?.primaryColor,
								color: getContrastColor(
									modalContent?.primaryColor ?? '#333'
								)
							}
						});
						handleRefresh();
					}}
					style={opButtonStyle(
						!isRefreshable,
						modalContent?.primaryColor
					)}
				>
					Refresh Token
				</button>
				<button
					disabled={!isRevokeable}
					onClick={() => {
						addToast({
							message: 'Revoking token...',
							style: {
								background: modalContent?.primaryColor,
								color: getContrastColor(
									modalContent?.primaryColor ?? '#333'
								)
							}
						});
						handleRevocation();
					}}
					style={opButtonStyle(
						!isRevokeable,
						modalContent?.primaryColor
					)}
				>
					Revoke Token
				</button>
			</nav>
		</Modal>
	);
};
