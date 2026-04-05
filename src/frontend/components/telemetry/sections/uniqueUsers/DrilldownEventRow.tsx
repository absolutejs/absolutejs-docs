import { UserEvent } from './uniqueUsersTypes';
import { tdStyle } from './uniqueUsersStyles';

type DrilldownEventRowProps = {
	row: UserEvent;
	isExpanded: boolean;
	eventColumns: string[];
	onToggleExpand: (id: string | null) => void;
	formatCell: (row: UserEvent, col: string) => string;
};

export const DrilldownEventRow = ({
	row,
	isExpanded,
	eventColumns,
	onToggleExpand,
	formatCell
}: DrilldownEventRowProps) => (
	<>
		<tr
			key={row.id}
			onClick={() => onToggleExpand(isExpanded ? null : row.id)}
			style={{ cursor: 'pointer' }}
		>
			{eventColumns.map((col) => (
				<td key={col} style={tdStyle}>
					{formatCell(row, col)}
				</td>
			))}
		</tr>
		{isExpanded && (
			<tr key={`${row.id}-expanded`}>
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
	</>
);
