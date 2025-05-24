import { providerOptions } from '@absolutejs/auth';
import { useState } from 'react';
import { ProviderInfo } from '../../data/providerData';
import { OAuthButton } from '../auth/OAuthButton';
import { Modal } from '../utils/Modal';
import { AuthModal } from './AuthModal';

export const AuthGrid = () => {
	const [modalContent, setModalContent] = useState<ProviderInfo | null>(null);

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
				modalContent={modalContent}
				setModalContent={setModalContent}
			/>
		</section>
	);
};
