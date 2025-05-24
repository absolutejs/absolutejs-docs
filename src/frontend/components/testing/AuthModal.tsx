import { Dispatch, SetStateAction } from 'react';
import { ProviderInfo } from '../../data/providerData';
import { Modal } from '../utils/Modal';

type AuthModalProps = {
	modalContent: ProviderInfo | null;
	setModalContent: Dispatch<SetStateAction<ProviderInfo | null>>;
};

export const AuthModal = ({
	modalContent,
	setModalContent
}: AuthModalProps) => (
	<Modal
		style={{
			border: `4px solid ${modalContent?.primaryColor}`,
			borderRadius: '8px'
		}}
		isOpen={modalContent !== null}
		onClose={() => setModalContent(null)}
	>
		<h2>{modalContent?.name}</h2>
		<img
			src={modalContent?.logoUrl}
			alt={`${modalContent?.name} logo`}
			style={{
				borderRadius: '8px',
				height: '100px',
				margin: '0 auto',
				width: '100px'
			}}
		/>
	</Modal>
);
