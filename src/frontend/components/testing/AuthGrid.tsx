import { ProviderOption, providerOptions } from '@absolutejs/auth';
import { useState } from 'react';
import { User } from '../../../../db/schema';
import { ThemeSprings } from '../../../types/springTypes';
import { providerData, ProviderInfo } from '../../data/providerData';
import { OAuthButton } from '../auth/OAuthButton';
import { ToastProvider } from '../utils/ToastProvider';
import { AuthModal } from './AuthModal';

type AuthGridProps = {
	user: User | undefined;
	handleSignOut: () => Promise<void>;
	themeSprings: ThemeSprings;
	initialProvider: ProviderOption | undefined;
};

export const AuthGrid = ({
	user,
	handleSignOut,
	themeSprings,
	initialProvider
}: AuthGridProps) => {
	const [modalContent, setModalContent] = useState<
		(ProviderInfo & { providerOption: ProviderOption }) | null
	>(() => {
		if (!initialProvider) return null;
		const data = providerData[initialProvider];
		return {
			createNewCredentialsUrl: data.createNewCredentialsUrl,
			logoUrl: data.logoUrl,
			manageCredentialsUrl: data.manageCredentialsUrl,
			name: data.name,
			primaryColor: data.primaryColor,
			providerOption: initialProvider
		};
	});

	return (
		<ToastProvider>
			<div
				style={{
					display: 'grid',
					gap: '16px',
					gridTemplateColumns:
						'repeat(auto-fill, minmax(180px, 1fr))',
					margin: '0 auto 3rem',
					maxWidth: '1200px',
					width: '90%'
				}}
			>
				{providerOptions.map((provider) => (
					<OAuthButton
						themeSprings={themeSprings}
						key={provider}
						provider={provider}
						setModalContent={setModalContent}
					/>
				))}
			</div>

			<AuthModal
				themeSprings={themeSprings}
				handleSignOut={handleSignOut}
				user={user}
				modalContent={modalContent}
				setModalContent={setModalContent}
			/>
		</ToastProvider>
	);
};
