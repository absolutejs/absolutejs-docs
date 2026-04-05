import { TelemetryEventRow } from './eventLogTypes';
import { CopyableCell } from './CopyableCell';
import {
	checkboxStyle,
	columns,
	deleteButtonStyle,
	EventLogColumn,
	expandedPayloadStyle,
	tdStyle
} from './eventLogStyles';

type EventLogTableRowProps = {
	row: TelemetryEventRow;
	isSelected: boolean;
	isExpanded: boolean;
	copiedCells: Set<string>;
	onToggleSelect: (id: string) => void;
	onToggleExpand: (id: string) => void;
	onDelete: (row: TelemetryEventRow) => void;
	onCellCopy: (key: string, text: string) => void;
	formatCell: (row: TelemetryEventRow, col: EventLogColumn) => string;
};

export const EventLogTableRow = ({
	row,
	isSelected,
	isExpanded,
	copiedCells,
	onToggleSelect,
	onToggleExpand,
	onDelete,
	onCellCopy,
	formatCell
}: EventLogTableRowProps) => (
	<tbody>
		<tr
			onClick={() => onToggleExpand(row.id)}
			style={{ cursor: 'pointer' }}
		>
			<td style={tdStyle}>
				<input
					checked={isSelected}
					onChange={() => onToggleSelect(row.id)}
					onClick={(event) => event.stopPropagation()}
					style={checkboxStyle}
					type="checkbox"
				/>
			</td>
			{columns.map((col) => {
				const isCopyable = col === 'event' || col === 'anonymous_id';

				return (
					<td key={col} style={tdStyle}>
						{isCopyable ? (
							<CopyableCell
								copyKey={`${row.id}-${col}`}
								isCopied={copiedCells.has(`${row.id}-${col}`)}
								label={col}
								onCopy={onCellCopy}
								text={String(row[col] ?? '')}
							/>
						) : (
							formatCell(row, col)
						)}
					</td>
				);
			})}
			<td style={tdStyle}>
				<button
					onClick={(event) => {
						event.stopPropagation();
						onDelete(row);
					}}
					style={deleteButtonStyle}
				>
					Delete
				</button>
			</td>
		</tr>
		{isExpanded && (
			<tr key={`${row.id}-expanded`}>
				<td colSpan={columns.length + 2} style={expandedPayloadStyle}>
					{JSON.stringify(row.payload, null, 2)}
				</td>
			</tr>
		)}
	</tbody>
);
