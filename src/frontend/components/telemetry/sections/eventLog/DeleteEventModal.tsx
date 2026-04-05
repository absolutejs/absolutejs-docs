import { TELEMETRY_MODAL_LAYOUT } from '../../../../../constants';
import { TelemetryEventRow } from './eventLogTypes';
import { ConfirmTypeInput } from './ConfirmTypeInput';
import { Modal } from '../../../utils/Modal';
import {
	cancelButtonStyle,
	confirmDeleteButtonStyle,
	modalButtonRowStyle,
	modalDescStyle,
	modalEventInfoStyle,
	modalEventLabelStyle,
	modalStyle,
	modalTitleStyle
} from './eventLogStyles';

type DeleteEventModalProps = {
	deleteTarget: TelemetryEventRow | null;
	confirmText: string;
	isPending: boolean;
	onConfirmTextChange: (value: string) => void;
	onClose: () => void;
	onDelete: () => void;
};

export const DeleteEventModal = ({
	deleteTarget,
	confirmText,
	isPending,
	onConfirmTextChange,
	onClose,
	onDelete
}: DeleteEventModalProps) => (
	<Modal isOpen={deleteTarget !== null} onClose={onClose} style={modalStyle}>
		<div style={modalTitleStyle}>Delete Event</div>
		<div style={modalDescStyle}>
			This action is permanent and cannot be undone.
		</div>
		{deleteTarget && (
			<>
				<div style={modalEventInfoStyle}>
					<div style={modalEventLabelStyle}>Event</div>
					<div style={{ fontWeight: 500, marginBottom: '0.5rem' }}>
						{deleteTarget.event}
					</div>
					<div style={modalEventLabelStyle}>Anonymous ID</div>
					<div
						style={{
							fontFamily: 'monospace',
							fontSize: '0.75rem',
							opacity: 0.8
						}}
					>
						{deleteTarget.anonymous_id}
					</div>
				</div>
				<ConfirmTypeInput
					expectedText={deleteTarget.event}
					onChange={onConfirmTextChange}
					placeholder={deleteTarget.event}
					value={confirmText}
				/>
			</>
		)}
		<div style={modalButtonRowStyle}>
			<button onClick={onClose} style={cancelButtonStyle}>
				Cancel
			</button>
			<button
				disabled={isPending || confirmText !== deleteTarget?.event}
				onClick={onDelete}
				style={{
					...confirmDeleteButtonStyle,
					cursor:
						confirmText !== deleteTarget?.event
							? 'not-allowed'
							: 'pointer',
					opacity:
						isPending || confirmText !== deleteTarget?.event
							? TELEMETRY_MODAL_LAYOUT.disabledButtonOpacity
							: 1
				}}
			>
				{isPending ? 'Deleting...' : 'Delete Event'}
			</button>
		</div>
	</Modal>
);
