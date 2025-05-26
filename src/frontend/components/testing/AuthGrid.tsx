import { ProviderOption, providerOptions } from '@absolutejs/auth';
import { useState } from 'react';
import { User } from '../../../../db/schema';
import { ProviderInfo } from '../../data/providerData';
import { OAuthButton } from '../auth/OAuthButton';
import { AuthModal } from './AuthModal';

type AuthGridProps = {
	user: User | undefined;
	handleSignOut: () => Promise<void>;
};

export const AuthGrid = ({ user, handleSignOut }: AuthGridProps) => {
	const [modalContent, setModalContent] = useState<
		(ProviderInfo & { providerOption: ProviderOption }) | null
	>(null);

	return (
		<section>
			<div
				style={{
					display: 'grid',
					gap: '12px',
					gridTemplateColumns:
						'repeat(auto-fill, minmax(180px, 1fr))',
					margin: '0 auto 2rem',
					maxWidth: '800px',
					width: '100%'
				}}
			>
				{providerOptions.map((provider) => (
					<OAuthButton
						key={provider}
						provider={provider}
						setModalContent={setModalContent}
					/>
				))}
			</div>

			<AuthModal
				handleSignOut={handleSignOut}
				user={user}
				modalContent={modalContent}
				setModalContent={setModalContent}
			/>
		</section>
	);
};
