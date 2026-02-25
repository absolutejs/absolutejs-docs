import { CSSProperties } from 'react';
import { TelemetrySectionProps } from '../../../../types/telemetryTypes';
import { TelemetryTable } from '../TelemetryTable';
import { DonutChart } from '../charts/DonutChart';

const sectionTitleStyle: CSSProperties = {
	fontSize: '1.25rem',
	fontWeight: 600,
	marginBottom: '1rem',
	marginTop: '1.5rem'
};

const gapStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem'
};

const chartsRowStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1.5rem'
};

const chartWrapperStyle: CSSProperties = {
	flex: '1 1 350px',
	minWidth: 0
};

export const UsageAdoptionSection = ({
	data,
	themeSprings
}: TelemetrySectionProps) => {
	const frameworkData = (data['framework-popularity'] ?? []).map((row) => ({
		label: String(row['framework'] ?? 'unknown'),
		value: Number(row['count'] ?? 0)
	}));

	const versionData = (data['version-adoption'] ?? []).map((row) => ({
		label: String(row['version'] ?? 'unknown'),
		value: Number(row['count'] ?? 0)
	}));

	// Aggregate platform data by OS
	const osCounts = new Map<string, number>();
	for (const row of data['platform-breakdown'] ?? []) {
		const os = String(row['os'] ?? 'unknown');
		const count = Number(row['count'] ?? 0);
		osCounts.set(os, (osCounts.get(os) ?? 0) + count);
	}
	const platformData = [...osCounts.entries()].map(([label, value]) => ({
		label,
		value
	}));

	return (
		<div style={gapStyle}>
			<div style={chartsRowStyle}>
				{frameworkData.length > 0 && (
					<div style={chartWrapperStyle}>
						<div style={sectionTitleStyle}>
							Framework Popularity
						</div>
						<DonutChart
							data={frameworkData}
							themeSprings={themeSprings}
						/>
					</div>
				)}
				{versionData.length > 0 && (
					<div style={chartWrapperStyle}>
						<div style={sectionTitleStyle}>Version Adoption</div>
						<DonutChart
							data={versionData}
							themeSprings={themeSprings}
						/>
					</div>
				)}
			</div>

			{platformData.length > 0 && (
				<div>
					<div style={sectionTitleStyle}>Platform Breakdown</div>
					<DonutChart
						data={platformData}
						themeSprings={themeSprings}
					/>
				</div>
			)}

			<TelemetryTable
				queryKey="platform-breakdown"
				title="Platform Details"
				columns={['os', 'arch', 'count']}
				rows={data['platform-breakdown'] ?? []}
				themeSprings={themeSprings}
			/>

			<TelemetryTable
				queryKey="cli-commands"
				title="CLI Command Usage"
				columns={['command', 'count']}
				rows={data['cli-commands'] ?? []}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
