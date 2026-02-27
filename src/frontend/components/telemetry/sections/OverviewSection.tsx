import { CSSProperties } from 'react';
import { TelemetrySectionProps } from '../../../../types/telemetryTypes';
import { TelemetryCard } from '../TelemetryCard';
import { TelemetryTable } from '../TelemetryTable';

const kpiRowStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
	marginBottom: '1.5rem'
};

export const OverviewSection = ({
	data,
	versions,
	themeSprings,
	onVersionChange,
	kpi
}: TelemetrySectionProps) => {
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
		</div>
	);
};
