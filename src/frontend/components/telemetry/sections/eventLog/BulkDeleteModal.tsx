import { TELEMETRY_MODAL_LAYOUT } from '../../../../../constants';
import { ConfirmTypeInput } from './ConfirmTypeInput';
import { Modal } from '../../../utils/Modal';
import {
	cancelButtonStyle,
	confirmDeleteButtonStyle,
	modalButtonRowStyle,
	modalDescStyle,
	modalStyle,
	modalTitleStyle
} from './eventLogStyles';

type BulkDeleteModalProps = {
	isOpen: boolean;
	selectedCount: number;
	confirmText: string;
	bulkDeleteConfirmText: string;
	isPending: boolean;
	onConfirmTextChange: (value: string) => void;
	onClose: () => void;
	onDelete: () => void;
};

export const BulkDeleteModal = ({
	isOpen,
	selectedCount,
	confirmText,
	bulkDeleteConfirmText,
	isPending,
	onConfirmTextChange,
	onClose,
	onDelete
}: BulkDeleteModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose} style={modalStyle}>
		<div style={modalTitleStyle}>Delete Multiple Events</div>
		<div style={modalDescStyle}>
			You are about to permanently delete {selectedCount} event
			{selectedCount === 1 ? '' : 's'}. This action cannot be undone.
		</div>
		<ConfirmTypeInput
			expectedText={bulkDeleteConfirmText}
			onChange={onConfirmTextChange}
			placeholder={bulkDeleteConfirmText}
			value={confirmText}
		/>
		<div style={modalButtonRowStyle}>
			<button onClick={onClose} style={cancelButtonStyle}>
				Cancel
			</button>
			<button
				disabled={isPending || confirmText !== bulkDeleteConfirmText}
				onClick={onDelete}
				style={{
					...confirmDeleteButtonStyle,
					cursor:
						confirmText !== bulkDeleteConfirmText
							? 'not-allowed'
							: 'pointer',
					opacity:
						isPending || confirmText !== bulkDeleteConfirmText
							? TELEMETRY_MODAL_LAYOUT.disabledButtonOpacity
							: 1
				}}
			>
				{isPending
					? 'Deleting...'
					: `Delete ${selectedCount} Event${selectedCount === 1 ? '' : 's'}`}
			</button>
		</div>
	</Modal>
);
