import { providerOptions } from '@absolutejs/auth';
import { useState } from 'react';
import { ProviderInfo } from '../../data/providerData';
import { OAuthButton } from '../auth/OAuthButton';
import { AuthModal } from './AuthModal';
import { AuthorizationResults } from '../../../types/types';

export const AuthGrid = () => {
	const [modalContent, setModalContent] = useState<ProviderInfo | null>(null);

	const [authorizationResults, setAuthorizationResults] = useState<
		Record<string, AuthorizationResults>
	>({});

	const updateAuthorizationResults = (
		providerName: string,
		data: Partial<AuthorizationResults>
	) => {
		setAuthorizationResults((prev) => ({
			...prev,
			[providerName]: {
				...prev[providerName],
				...data
			}
		}));
	};

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
				authorizationResults={
					modalContent
						? authorizationResults[modalContent.name]
						: undefined
				}
				updateAuthorizationResults={updateAuthorizationResults}
			/>
		</section>
	);
};
