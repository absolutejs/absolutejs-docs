import type { ReactNode } from 'react';

type DataTableProps = {
	columns: string[];
	rows: { cells: ReactNode[]; key: string }[];
};

export const DataTable = ({ columns, rows }: DataTableProps) => (
	<div className="cpr-table-wrap">
		<table>
			<thead>
				<tr>
					{columns.map((column) => (
						<th key={column}>{column}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => (
					<tr key={row.key}>
						{row.cells.map((cell, index) => (
							<td key={columns[index] ?? index}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</div>
);
