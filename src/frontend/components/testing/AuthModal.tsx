import {
	isRefreshableProviderOption,
	isRevocableProviderOption,
	ProviderOption
} from '@absolutejs/auth';
import { CSSProperties, Dispatch, SetStateAction, useState } from 'react';
import { User } from '../../../../db/schema';
import { ProviderInfo } from '../../data/providerData';
import { useAuthModalData } from '../../hooks/useAuthModalData';
import {
	credentialLinkStyle,
	getContrastColor,
	opButtonStyle
} from '../../styles/authModalStyles';
import { HighlightedJson } from '../utils/HighlightedJson';
import { Modal } from '../utils/Modal';
import { useToast } from '../utils/ToastProvider';
import { AuthTestButtons } from './AuthTestButtons';
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
	const primaryColor = modalContent?.primaryColor ?? '#000';
	const provider = user?.auth_sub?.split('|')[0]?.toLocaleLowerCase();

	const isAuthorized =
		provider !== undefined && modalContent?.providerOption === provider;

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

			<AuthTestButtons
				providerStatuses={providerStatuses}
				modalContent={modalContent}
				provider={provider}
				fetchProfile={fetchProfile}
				handleRefresh={handleRefresh}
				handleRevocation={handleRevocation}
			/>
		</Modal>
	);
};
