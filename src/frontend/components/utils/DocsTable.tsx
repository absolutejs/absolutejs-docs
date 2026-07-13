import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import {
	tableCellStyle,
	tableCodeStyle,
	tableContainerStyle,
	tableHeaderStyle,
	tableStyle
} from '../../styles/docsStyles';

export type DocsTableCell =
	| string
	| {
			code: string;
			suffix?: string;
	  };

type DocsTableRowProps = {
	cells: DocsTableCell[];
	themeSprings: ThemeSprings;
};

const DocsTableCellContent = ({
	cell,
	themeSprings
}: {
	cell: DocsTableCell;
	themeSprings: ThemeSprings;
}) => {
	if (typeof cell === 'string') return cell;

	return (
		<>
			<code style={tableCodeStyle}>{cell.code}</code>
			{cell.suffix ? (
				<animated.span
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: '0.75rem',
						marginLeft: '0.5rem'
					}}
				>
					{cell.suffix}
				</animated.span>
			) : null}
		</>
	);
};

const DocsTableRow = ({ cells, themeSprings }: DocsTableRowProps) => (
	<tr>
		{cells.map((cell, cellIndex) => (
			<animated.td
				key={cellIndex}
				style={{
					...tableCellStyle(themeSprings),
					color: themeSprings.contrastPrimary,
					fontSize: '0.9rem'
				}}
			>
				<DocsTableCellContent cell={cell} themeSprings={themeSprings} />
			</animated.td>
		))}
	</tr>
);

type DocsTableProps = {
	columns: string[];
	rows: DocsTableCell[][];
	themeSprings: ThemeSprings;
};

export const DocsTable = ({ columns, rows, themeSprings }: DocsTableProps) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					{columns.map((column) => (
						<animated.th
							key={column}
							style={tableHeaderStyle(themeSprings)}
						>
							{column}
						</animated.th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((cells, rowIndex) => (
					<DocsTableRow
						cells={cells}
						key={rowIndex}
						themeSprings={themeSprings}
					/>
				))}
			</tbody>
		</animated.table>
	</div>
);
