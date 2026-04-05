import { TELEMETRY_LABEL_EDIT_LAYOUT } from '../../../../../constants';
import { Ref } from 'react';
import {
	buttonStyle,
	labelCellStyle,
	labelInputStyle
} from './uniqueUsersStyles';

type LabelEditCellProps = {
	anonymousId: string;
	isEditing: boolean;
	editValue: string;
	currentLabel: string | undefined;
	labelInputRef: Ref<HTMLInputElement>;
	onStartEdit: (anonymousId: string, currentLabel: string) => void;
	onEditValueChange: (value: string) => void;
	onSave: (anonymousId: string, value: string) => void;
	onCancelEdit: () => void;
	onBlur: (anonymousId: string) => void;
};

export const LabelEditCell = ({
	anonymousId,
	isEditing,
	editValue,
	currentLabel,
	labelInputRef,
	onStartEdit,
	onEditValueChange,
	onSave,
	onCancelEdit,
	onBlur
}: LabelEditCellProps) => {
	const labelText = currentLabel ?? '';
	const isSaveDisabled = editValue.trim() === labelText;

	return (
		<td
			onClick={(event) => {
				event.stopPropagation();
				onStartEdit(anonymousId, labelText);
			}}
			style={labelCellStyle}
		>
			{isEditing ? (
				<div
					style={{
						alignItems: 'center',
						display: 'flex',
						gap: '0.25rem'
					}}
				>
					<input
						onBlur={() => onBlur(anonymousId)}
						onChange={(event) =>
							onEditValueChange(event.target.value)
						}
						onClick={(event) => event.stopPropagation()}
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								onSave(anonymousId, editValue);
							} else if (event.key === 'Escape') {
								onCancelEdit();
							}
						}}
						ref={labelInputRef}
						style={labelInputStyle}
						type="text"
						value={editValue}
					/>
					<button
						disabled={isSaveDisabled}
						onClick={(event) => {
							event.stopPropagation();
							onSave(anonymousId, editValue);
						}}
						style={{
							...buttonStyle,
							cursor: isSaveDisabled ? 'default' : 'pointer',
							fontSize: '0.7rem',
							opacity: isSaveDisabled
								? TELEMETRY_LABEL_EDIT_LAYOUT.emptyLabelOpacity
								: 1,
							padding: '0.2rem 0.5rem',
							whiteSpace: 'nowrap'
						}}
					>
						Save
					</button>
				</div>
			) : (
				<span
					style={{
						opacity: currentLabel
							? 1
							: TELEMETRY_LABEL_EDIT_LAYOUT.emptyLabelOpacity
					}}
				>
					{currentLabel || 'click to label'}
				</span>
			)}
		</td>
	);
};
