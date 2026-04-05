import { TELEMETRY_OVERVIEW_LAYOUT } from '../../../../constants';
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

	let columns: number = TELEMETRY_OVERVIEW_LAYOUT.largeScreenColumns;
	if (isSizeOrLess('sm')) {
		columns = TELEMETRY_OVERVIEW_LAYOUT.smallScreenColumns;
	} else if (isSizeOrLess('md')) {
		columns = TELEMETRY_OVERVIEW_LAYOUT.mediumScreenColumns;
	}

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
					themeSprings={themeSprings}
					title="Total Events"
					value={kpi?.totalEvents?.toLocaleString() ?? '-'}
				/>
				<TelemetryCard
					themeSprings={themeSprings}
					title="Error Rate"
					value={
						kpi?.errorRate !== null && kpi?.errorRate !== undefined
							? `${kpi.errorRate}%`
							: '-'
					}
				/>
				<TelemetryCard
					themeSprings={themeSprings}
					title="Avg Dev Build"
					value={
						kpi?.avgDevBuildMs !== null &&
						kpi?.avgDevBuildMs !== undefined
							? `${(kpi.avgDevBuildMs / TELEMETRY_OVERVIEW_LAYOUT.millisecondsPerSecond).toFixed(1)}s`
							: '-'
					}
				/>
				<TelemetryCard
					themeSprings={themeSprings}
					title="Avg Prod Build"
					value={
						kpi?.avgProdBuildMs !== null &&
						kpi?.avgProdBuildMs !== undefined
							? `${(kpi.avgProdBuildMs / TELEMETRY_OVERVIEW_LAYOUT.millisecondsPerSecond).toFixed(1)}s`
							: '-'
					}
				/>
				<TelemetryCard
					themeSprings={themeSprings}
					title="Top Framework"
					value={kpi?.topFramework ?? '-'}
				/>
			</div>

			<TelemetryTable
				columns={['event', 'count']}
				columnsWithVersion={['event', 'version', 'count']}
				onVersionChange={onVersionChange}
				queryKey="error-rates"
				rows={(data['error-rates'] ?? []).slice(
					0,
					TELEMETRY_OVERVIEW_LAYOUT.errorRatePreviewLimit
				)}
				themeSprings={themeSprings}
				title="Error Rates by Event"
				versions={versions}
			/>
		</div>
	);
};
