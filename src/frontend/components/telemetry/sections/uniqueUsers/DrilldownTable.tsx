import { Fragment, useState } from 'react';
import { UserEvent } from './uniqueUsersTypes';
import {
	EventColumn,
	HALF,
	eventColumns,
	tableStyle,
	tdStyle,
	thStyle
} from './uniqueUsersStyles';

type DrilldownTableProps = {
	rows: UserEvent[];
	formatCell: (row: UserEvent, col: EventColumn) => string;
};

const DrilldownTableBody = ({ rows, formatCell }: DrilldownTableProps) => {
	const [expandedRow, setExpandedRow] = useState<string | null>(null);

	if (rows.length === 0) {
		return (
			<tr>
				<td
					colSpan={eventColumns.length}
					style={{
						opacity: HALF,
						padding: '1rem',
						textAlign: 'center'
					}}
				>
					No events
				</td>
			</tr>
		);
	}

	return rows.map((row) => (
		<Fragment key={row.id}>
			<tr
				onClick={() =>
					setExpandedRow(expandedRow === row.id ? null : row.id)
				}
				style={{ cursor: 'pointer' }}
			>
				{eventColumns.map((col) => (
					<td key={col} style={tdStyle}>
						{formatCell(row, col)}
					</td>
				))}
			</tr>
			{expandedRow === row.id && (
				<tr>
					<td
						colSpan={eventColumns.length}
						style={{
							fontSize: '0.75rem',
							maxHeight: '200px',
							overflowY: 'auto',
							padding: '0.75rem',
							whiteSpace: 'pre-wrap',
							wordBreak: 'break-all'
						}}
					>
						{JSON.stringify(row.payload, null, 2)}
					</td>
				</tr>
			)}
		</Fragment>
	));
};

export const DrilldownTable = ({ rows, formatCell }: DrilldownTableProps) => (
	<div style={{ overflowX: 'auto' }}>
		<table style={tableStyle}>
			<thead>
				<tr>
					{eventColumns.map((col) => (
						<th key={col} style={thStyle}>
							{col}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				<DrilldownTableBody formatCell={formatCell} rows={rows} />
			</tbody>
		</table>
	</div>
);
