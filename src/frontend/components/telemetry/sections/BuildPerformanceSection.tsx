import { CSSProperties } from 'react';
import { TelemetrySectionProps } from '../../../../types/telemetryTypes';
import { TelemetryTable } from '../TelemetryTable';

const gapStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem'
};

export const BuildPerformanceSection = ({
	data,
	versions,
	themeSprings,
	onVersionChange
}: TelemetrySectionProps) => {
	const byModeRows = data['build-duration-by-mode'] ?? [];
	const devRows = byModeRows.filter(
		(r) => String(r['mode']) === 'development'
	);
	const prodRows = byModeRows.filter(
		(r) => String(r['mode']) === 'production'
	);

	return (
		<div style={gapStyle}>
			<TelemetryTable
				queryKey="build-duration-by-mode"
				title="Development Build Duration Details"
				columns={['frameworks', 'version', 'duration_bucket', 'count']}
				rows={devRows}
				themeSprings={themeSprings}
			/>

			<TelemetryTable
				queryKey="build-duration-by-mode"
				title="Production Build Duration Details"
				columns={['frameworks', 'version', 'duration_bucket', 'count']}
				rows={prodRows}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
