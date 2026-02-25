import { animated } from '@react-spring/web';
import { CSSProperties, useState } from 'react';
import { ThemeSprings } from '../../../types/springTypes';

type TelemetryTableProps = {
	queryKey: string;
	title: string;
	columns: string[];
	columnsWithVersion?: string[];
	rows: Record<string, unknown>[];
	themeSprings: ThemeSprings;
	versions?: string[];
	onVersionChange?: (queryKey: string, version: string) => void;
};

const sectionStyle = (themeSprings: ThemeSprings) => ({
	backgroundColor: themeSprings.themeTertiary,
	borderRadius: '0.5rem',
	padding: '1.5rem',
	width: '100%'
});

const headerRowStyle: CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginBottom: '1rem'
};

const titleStyle: CSSProperties = {
	fontSize: '1.125rem',
	fontWeight: 600
};

const selectStyle = (themeSprings: ThemeSprings) => ({
	padding: '0.3rem 0.6rem',
	borderRadius: '0.375rem',
	border: '1px solid rgba(128, 128, 128, 0.3)',
	backgroundColor: themeSprings.themeSecondary,
	color: themeSprings.contrastPrimary,
	fontSize: '0.8rem',
	fontFamily: 'inherit',
	cursor: 'pointer',
	minWidth: '8rem'
});

const optionStyle = (themeSprings: ThemeSprings) => ({
	backgroundColor: themeSprings.themeSecondary,
	color: themeSprings.contrastPrimary
});

const tableStyle: CSSProperties = {
	width: '100%',
	borderCollapse: 'collapse',
	fontSize: '0.875rem'
};

const thStyle: CSSProperties = {
	textAlign: 'left',
	padding: '0.5rem 1rem',
	borderBottom: '1px solid rgba(128, 128, 128, 0.3)',
	opacity: 0.7,
	textTransform: 'uppercase',
	fontSize: '0.75rem',
	letterSpacing: '0.05rem'
};

const tdStyle: CSSProperties = {
	padding: '0.5rem 1rem',
	borderBottom: '1px solid rgba(128, 128, 128, 0.15)'
};

const emptyStyle: CSSProperties = {
	textAlign: 'center',
	padding: '2rem',
	opacity: 0.5
};

export const TelemetryTable = ({
	queryKey,
	title,
	columns,
	columnsWithVersion,
	rows,
	themeSprings,
	versions,
	onVersionChange
}: TelemetryTableProps) => {
	const [selectedVersion, setSelectedVersion] = useState('');

	const handleVersionChange = (version: string) => {
		setSelectedVersion(version);
		onVersionChange?.(queryKey, version);
	};

	const activeColumns =
		selectedVersion || !columnsWithVersion ? columns : columnsWithVersion;

	return (
		<animated.div style={sectionStyle(themeSprings)}>
			<div style={headerRowStyle}>
				<div style={titleStyle}>{title}</div>
				{versions && onVersionChange && (
					<animated.select
						style={selectStyle(themeSprings)}
						value={selectedVersion}
						onChange={(evt) =>
							handleVersionChange(evt.target.value)
						}
					>
						<animated.option
							value=""
							style={optionStyle(themeSprings)}
						>
							All versions
						</animated.option>
						{versions.map((ver) => (
							<animated.option
								key={ver}
								value={ver}
								style={optionStyle(themeSprings)}
							>
								{ver}
							</animated.option>
						))}
					</animated.select>
				)}
			</div>
			<table style={tableStyle}>
				<thead>
					<tr>
						{activeColumns.map((col) => (
							<th key={col} style={thStyle}>
								{col}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.length === 0 ? (
						<tr>
							<td
								style={emptyStyle}
								colSpan={activeColumns.length}
							>
								No data yet
							</td>
						</tr>
					) : (
						rows.map((row, i) => (
							<tr key={i}>
								{activeColumns.map((col) => {
									const val = row[col];
									const num = Number(val);
									const isNumeric =
										val != null &&
										val !== '' &&
										!isNaN(num);
									const display =
										val == null
											? '-'
											: isNumeric &&
												  String(val).includes('.')
												? num.toFixed(3)
												: String(val);
									return (
										<td key={col} style={tdStyle}>
											{display}
										</td>
									);
								})}
							</tr>
						))
					)}
				</tbody>
			</table>
		</animated.div>
	);
};
