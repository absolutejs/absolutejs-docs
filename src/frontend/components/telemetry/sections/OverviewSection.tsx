import { CSSProperties } from 'react';
import { TelemetrySectionProps } from '../../../../types/telemetryTypes';
import { TelemetryCard } from '../TelemetryCard';
import { TelemetryTable } from '../TelemetryTable';
import { BarChart } from '../charts/BarChart';

const kpiRowStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
	marginBottom: '1.5rem'
};

const sectionTitleStyle: CSSProperties = {
	fontSize: '1.25rem',
	fontWeight: 600,
	marginBottom: '1rem',
	marginTop: '1.5rem'
};

const buildDurationOrder = ['<1s', '1-5s', '5-15s', '>15s'];

export const OverviewSection = ({
	data,
	versions,
	themeSprings,
	onVersionChange,
	kpi
}: TelemetrySectionProps) => {
	const buildDurationData = (data['build-duration'] ?? []).reduce<
		Record<string, number>
	>((acc, row) => {
		const bucket = String(row['duration_bucket'] ?? '');
		const count = Number(row['count'] ?? 0);
		acc[bucket] = (acc[bucket] ?? 0) + count;
		return acc;
	}, {});

	const barData = Object.entries(buildDurationData).map(([label, value]) => ({
		label,
		value
	}));

	return (
		<div>
			<div style={kpiRowStyle}>
				<TelemetryCard
					title="Total Events"
					value={kpi?.totalEvents?.toLocaleString() ?? '-'}
					themeSprings={themeSprings}
				/>
				<TelemetryCard
					title="Error Rate"
					value={kpi?.errorRate != null ? `${kpi.errorRate}%` : '-'}
					themeSprings={themeSprings}
				/>
				<TelemetryCard
					title="Avg Build Time"
					value={
						kpi?.avgBuildMs != null
							? `${(kpi.avgBuildMs / 1000).toFixed(1)}s`
							: '-'
					}
					themeSprings={themeSprings}
				/>
				<TelemetryCard
					title="Top Framework"
					value={kpi?.topFramework ?? '-'}
					themeSprings={themeSprings}
				/>
			</div>

			<TelemetryTable
				queryKey="error-rates"
				title="Error Rates by Event"
				columns={['event', 'count']}
				columnsWithVersion={['event', 'version', 'count']}
				rows={(data['error-rates'] ?? []).slice(0, 5)}
				themeSprings={themeSprings}
				versions={versions}
				onVersionChange={onVersionChange}
			/>

			{barData.length > 0 && (
				<>
					<div style={sectionTitleStyle}>
						Build Duration Distribution
					</div>
					<BarChart
						data={barData}
						themeSprings={themeSprings}
						order={buildDurationOrder}
					/>
				</>
			)}
		</div>
	);
};
