import { CSSProperties } from 'react';
import { TelemetrySectionProps } from '../../../../types/telemetryTypes';
import { TelemetryTable } from '../TelemetryTable';

const gapStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem'
};

export const BuildPerformanceSection = (props: TelemetrySectionProps) => {
	const { data, themeSprings } = props;
	const byModeRows = data['build-duration-by-mode'] ?? [];
	const devRows = byModeRows.filter(
		(row) => String(row['mode']) === 'development'
	);
	const prodRows = byModeRows.filter(
		(row) => String(row['mode']) === 'production'
	);

	return (
		<div style={gapStyle}>
			<TelemetryTable
				columns={['frameworks', 'version', 'duration_bucket', 'count']}
				queryKey="build-duration-by-mode"
				rows={devRows}
				themeSprings={themeSprings}
				title="Development Build Duration Details"
			/>

			<TelemetryTable
				columns={['frameworks', 'version', 'duration_bucket', 'count']}
				queryKey="build-duration-by-mode"
				rows={prodRows}
				themeSprings={themeSprings}
				title="Production Build Duration Details"
			/>
		</div>
	);
};
