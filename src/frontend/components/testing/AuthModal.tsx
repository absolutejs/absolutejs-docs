import {
	isRefreshableProviderOption,
	isRevocableProviderOption,
	ProviderOption
} from '@absolutejs/auth';
import { CSSProperties, Dispatch, SetStateAction, useState } from 'react';
import { User } from '../../../../db/schema';
import { ProviderInfo } from '../../data/providerData';
import {
	credentialLinkStyle,
	getContrastColor,
	opButtonStyle
} from '../../styles/authModalStyles';
import { HighlightedJson } from '../utils/HighlightedJson';
import { Modal } from '../utils/Modal';
import { useToast } from '../utils/ToastProvider';
import { TestedBadge } from './badges/TestedBadge';

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

	const showToast = (message: string, type: 'info' | 'success' | 'error') => {
		let style;
		switch (type) {
			case 'error':
				style = { background: '#f8d7da', color: '#721c24' };
				break;
			case 'success':
				style = { background: '#d4edda', color: '#155724' };
				break;
			case 'info':
				style = {
					background: primaryColor,
					color: getContrastColor(primaryColor)
				};
				break;
		}
		addToast({
			duration: type === 'error' ? 0 : undefined,
			message,
			style
		});
	};

	const handleRefresh = async () => {
		showToast('Refreshing token...', 'info');
		try {
			const response = await fetch('/oauth2/tokens', { method: 'POST' });
			if (!response.ok) throw new Error(await response.text());
			showToast('Token refreshed successfully!', 'success');
		} catch (error: any) {
			showToast(error.message, 'error');
		}
	};

	const handleRevocation = async () => {
		showToast('Revoking token...', 'info');
		try {
			const response = await fetch('/oauth2/revocation', {
				method: 'POST'
			});
			if (!response.ok) throw new Error(await response.text());
			showToast('Token revoked successfully!', 'success');
			handleSignOut();
			setProfile(undefined);
		} catch (error: any) {
			showToast(error.message, 'error');
		}
	};

	const fetchProfile = async () => {
		showToast('Fetching profile...', 'info');
		try {
			const response = await fetch('/oauth2/profile');
			if (!response.ok) throw new Error(await response.text());
			const data = await response.json();
			setProfile(data);
			showToast('Profile fetched successfully!', 'success');
		} catch (error: any) {
			showToast(error.message, 'error');
		}
	};

	const boxStyle: CSSProperties = {
		border: `2px solid ${primaryColor}`,
		borderRadius: '4px',
		fontFamily: 'monospace',
		height: '250px',
		margin: '0 0 8px',
		overflow: 'auto',
		padding: '16px',
		whiteSpace: 'pre-wrap'
	};

	const containerStyle: CSSProperties = {
		alignItems: 'center',
		display: 'flex',
		gap: '0.5rem'
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
			onOpen={(dialogRef) => registerHost(dialogRef)}
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
				style={{ alignSelf: 'center', height: '120px', width: '120px' }}
			/>

			<nav style={{ display: 'flex', gap: '16px' }}>
				<a
					href={modalContent?.manageCredentialsUrl}
					style={credentialLinkStyle(primaryColor)}
					target="_blank"
					rel="noopener noreferrer"
				>
					Manage Credentials
				</a>
				<a
					href={modalContent?.createNewCredentialsUrl}
					style={credentialLinkStyle(primaryColor)}
					target="_blank"
					rel="noopener noreferrer"
				>
					Create New Credentials
				</a>
			</nav>

			{!isAuthorized ? (
				<pre style={boxStyle}>
					<code>
						Authorize with this provider for this session to test.
					</code>
				</pre>
			) : !profile ? (
				<pre style={boxStyle}>
					<code>Fetch your profile to see your data.</code>
				</pre>
			) : (
				<HighlightedJson data={profile} primaryColor={primaryColor} />
			)}

			<nav
				style={{
					display: 'grid',
					gap: '12px',
					gridTemplateColumns: '1fr 1fr'
				}}
			>
				<div style={containerStyle}>
					<TestedBadge />
					<a
						href={`/oauth2/${modalContent?.providerOption}/authorization`}
						style={opButtonStyle(false, primaryColor)}
					>
						Authorize User
					</a>
				</div>
				<div style={containerStyle}>
					<TestedBadge />
					<button
						disabled={!isAuthorized}
						onClick={fetchProfile}
						style={opButtonStyle(!isAuthorized, primaryColor)}
					>
						Fetch Profile
					</button>
				</div>
				<div style={containerStyle}>
					<TestedBadge />
					<button
						disabled={!isRefreshable}
						onClick={handleRefresh}
						style={opButtonStyle(!isRefreshable, primaryColor)}
					>
						Refresh Token
					</button>
				</div>
				<div style={containerStyle}>
					<TestedBadge />
					<button
						disabled={!isRevokeable}
						onClick={handleRevocation}
						style={opButtonStyle(!isRevokeable, primaryColor)}
					>
						Revoke Token
					</button>
				</div>
			</nav>
		</Modal>
	);
};
