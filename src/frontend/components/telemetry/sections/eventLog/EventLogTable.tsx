import type { ReactNode } from 'react';
import { HALF } from '../../../../../constants';
import { TelemetryEventRow } from './eventLogTypes';
import { EventLogTableRow } from './EventLogTableRow';
import {
	checkboxStyle,
	columns,
	EventLogColumn,
	tableStyle,
	thStyle
} from './eventLogStyles';

type EventLogTableProps = {
	rows: TelemetryEventRow[] | undefined;
	isPending: boolean;
	expandedRow: string | null;
	selectedIds: Set<string>;
	allMatchingSelected: boolean;
	copiedCells: Set<string>;
	allOnPageSelected: boolean;
	onToggleSelectAll: () => void;
	onToggleSelect: (id: string) => void;
	onToggleExpand: (id: string) => void;
	onDelete: (row: TelemetryEventRow) => void;
	onCellCopy: (key: string, text: string) => void;
	formatCell: (row: TelemetryEventRow, col: EventLogColumn) => string;
};

type EventLogTableShellProps = {
	allMatchingSelected: boolean;
	allOnPageSelected: boolean;
	onToggleSelectAll: EventLogTableProps['onToggleSelectAll'];
	children: ReactNode;
};

const renderSelectAllHeader = (
	allMatchingSelected: boolean,
	allOnPageSelected: boolean,
	onToggleSelectAll: EventLogTableProps['onToggleSelectAll']
) => (
	<th style={{ ...thStyle, width: '32px' }}>
		<input
			checked={allMatchingSelected || allOnPageSelected}
			onChange={onToggleSelectAll}
			style={checkboxStyle}
			type="checkbox"
		/>
	</th>
);

const EventLogTableShell = ({
	allMatchingSelected,
	allOnPageSelected,
	onToggleSelectAll,
	children
}: EventLogTableShellProps) => (
	<div style={{ marginTop: '1rem', overflowX: 'auto' }}>
		<table style={tableStyle}>
			<thead>
				<tr>
					{renderSelectAllHeader(
						allMatchingSelected,
						allOnPageSelected,
						onToggleSelectAll
					)}
					{columns.map((col) => (
						<th key={col} style={thStyle}>
							{col}
						</th>
					))}
					<th style={thStyle} />
				</tr>
			</thead>
			{children}
		</table>
	</div>
);

export const EventLogTable = ({
	rows,
	isPending,
	expandedRow,
	selectedIds,
	allMatchingSelected,
	copiedCells,
	allOnPageSelected,
	onToggleSelectAll,
	onToggleSelect,
	onToggleExpand,
	onDelete,
	onCellCopy,
	formatCell
}: EventLogTableProps) => {
	let body;
	if (isPending) {
		body = (
			<tbody>
				<tr>
					<td
						colSpan={columns.length + 2}
						style={{
							opacity: HALF,
							padding: '2rem',
							textAlign: 'center'
						}}
					>
						Loading events...
					</td>
				</tr>
			</tbody>
		);
	} else if (!rows || rows.length === 0) {
		body = (
			<tbody>
				<tr>
					<td
						colSpan={columns.length + 2}
						style={{
							opacity: HALF,
							padding: '2rem',
							textAlign: 'center'
						}}
					>
						No events found
					</td>
				</tr>
			</tbody>
		);
	} else {
		body = rows.map((row) => (
			<EventLogTableRow
				copiedCells={copiedCells}
				formatCell={formatCell}
				isExpanded={expandedRow === row.id}
				isSelected={allMatchingSelected || selectedIds.has(row.id)}
				key={row.id}
				onCellCopy={onCellCopy}
				onDelete={onDelete}
				onToggleExpand={onToggleExpand}
				onToggleSelect={onToggleSelect}
				row={row}
			/>
		));
	}

	return (
		<EventLogTableShell
			allMatchingSelected={allMatchingSelected}
			allOnPageSelected={allOnPageSelected}
			onToggleSelectAll={onToggleSelectAll}
		>
			{body}
		</EventLogTableShell>
	);
};
