import { CSSProperties } from 'react';
import { TelemetrySectionProps } from '../../../../types/telemetryTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { TelemetryCard } from '../TelemetryCard';
import { TelemetryTable } from '../TelemetryTable';

export const OverviewSection = ({
	data,
	versions,
	themeSprings,
	onVersionChange,
	kpi
}: TelemetrySectionProps) => {
	const { isSizeOrLess } = useMediaQuery();

	const columns = isSizeOrLess('sm') ? 1 : isSizeOrLess('md') ? 2 : 5;

	const kpiGridStyle: CSSProperties = {
		display: 'grid',
		gap: '1rem',
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		marginBottom: '1.5rem'
	};

	return (
		<div>
			<div style={kpiGridStyle}>
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
					title="Avg Dev Build"
					value={
						kpi?.avgDevBuildMs != null
							? `${(kpi.avgDevBuildMs / 1000).toFixed(1)}s`
							: '-'
					}
					themeSprings={themeSprings}
				/>
				<TelemetryCard
					title="Avg Prod Build"
					value={
						kpi?.avgProdBuildMs != null
							? `${(kpi.avgProdBuildMs / 1000).toFixed(1)}s`
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
