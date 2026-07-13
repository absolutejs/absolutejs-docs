import { animated } from '@react-spring/web';
import { FaCheck, FaMinus, FaTimes } from 'react-icons/fa';
import { ThemeSprings } from '../../../types/springTypes';
import {
	tableCellStyle,
	tableContainerStyle,
	tableHeaderStyle,
	tableStyle
} from '../../styles/docsStyles';

export type ComparisonValue = boolean | 'partial' | string;

export type ComparisonRow = {
	feature: string;
	note?: string;
	values: ComparisonValue[];
};

type ComparisonTableProps = {
	columns: string[];
	firstColumnLabel?: string;
	rows: ComparisonRow[];
	themeSprings: ThemeSprings;
};

const ComparisonCell = ({ value }: { value: ComparisonValue }) => {
	if (value === true) {
		return (
			<span
				aria-label="Supported"
				style={{ color: '#10B981', fontSize: '0.95rem' }}
			>
				<FaCheck />
			</span>
		);
	}
	if (value === false) {
		return (
			<span
				aria-label="Not supported"
				style={{ color: '#EF4444', fontSize: '0.95rem', opacity: 0.75 }}
			>
				<FaTimes />
			</span>
		);
	}
	if (value === 'partial') {
		return (
			<span
				aria-label="Partial"
				style={{ color: '#F59E0B', fontSize: '0.95rem' }}
			>
				<FaMinus />
			</span>
		);
	}

	return <span style={{ fontSize: '0.9rem' }}>{value}</span>;
};

type ComparisonTableRowProps = {
	columns: string[];
	row: ComparisonRow;
	themeSprings: ThemeSprings;
};

const ComparisonTableRow = ({
	columns,
	row,
	themeSprings
}: ComparisonTableRowProps) => (
	<tr>
		<animated.td
			style={{
				...tableCellStyle(themeSprings),
				color: themeSprings.contrastPrimary,
				fontWeight: 500
			}}
		>
			{row.feature}
			{row.note ? (
				<animated.div
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: '0.8rem',
						fontWeight: 400,
						marginTop: '0.2rem'
					}}
				>
					{row.note}
				</animated.div>
			) : null}
		</animated.td>
		{row.values.map((value, valueIndex) => (
			<animated.td
				key={`${row.feature}-${columns[valueIndex] ?? valueIndex}`}
				style={{
					...tableCellStyle(themeSprings),
					color: themeSprings.contrastPrimary,
					textAlign: 'center'
				}}
			>
				<ComparisonCell value={value} />
			</animated.td>
		))}
	</tr>
);

export const ComparisonTable = ({
	columns,
	firstColumnLabel = 'Feature',
	rows,
	themeSprings
}: ComparisonTableProps) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						{firstColumnLabel}
					</animated.th>
					{columns.map((column) => (
						<animated.th
							key={column}
							style={{
								...tableHeaderStyle(themeSprings),
								textAlign: 'center'
							}}
						>
							{column}
						</animated.th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => (
					<ComparisonTableRow
						columns={columns}
						key={row.feature}
						row={row}
						themeSprings={themeSprings}
					/>
				))}
			</tbody>
		</animated.table>
	</div>
);
