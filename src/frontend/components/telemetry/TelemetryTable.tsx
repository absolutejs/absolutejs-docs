import { animated } from '@react-spring/web';
import { CSSProperties, useState } from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import { primaryColor, secondaryColor } from '../../styles/colors';
import { VersionSelect } from './VersionSelect';

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
	backdropFilter: 'blur(12px)',
	backgroundColor: themeSprings.theme.to((t: string) =>
		t.endsWith('dark')
			? 'rgba(17, 17, 22, 0.7)'
			: 'rgba(255, 255, 254, 0.7)'
	),
	border: themeSprings.theme.to((t: string) =>
		t.endsWith('dark')
			? '1px solid rgba(255, 255, 255, 0.05)'
			: '1px solid rgba(0, 0, 0, 0.05)'
	),
	borderRadius: '0.75rem',
	boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
	overflow: 'hidden',
	padding: '1.5rem',
	width: '100%'
});

const headerRowStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: '1rem'
};

const titleStyle: CSSProperties = {
	fontSize: '1.125rem',
	fontWeight: 600
};

const tableStyle: CSSProperties = {
	borderCollapse: 'collapse',
	fontSize: '0.875rem',
	width: '100%'
};

const thStyle: CSSProperties = {
	borderBottom: `2px solid transparent`,
	borderImage: `linear-gradient(to right, ${primaryColor}40, ${secondaryColor}40) 1`,
	fontSize: '0.75rem',
	letterSpacing: '0.05rem',
	opacity: 0.7,
	padding: '0.5rem 1rem',
	textAlign: 'left',
	textTransform: 'uppercase'
};

const tdStyle: CSSProperties = {
	borderBottom: '1px solid rgba(128, 128, 128, 0.1)',
	padding: '0.6rem 1rem'
};

const emptyStyle: CSSProperties = {
	opacity: 0.5,
	padding: '2rem',
	textAlign: 'center'
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
					<VersionSelect
						versions={versions}
						value={selectedVersion}
						onChange={handleVersionChange}
						themeSprings={themeSprings}
					/>
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
