import { CSSProperties } from 'react';
import { TelemetrySectionProps } from '../../../../types/telemetryTypes';

import { TelemetryTable } from '../TelemetryTable';

const gapStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem'
};

export const HmrPerformanceSection = ({
	data,
	versions,
	themeSprings,
	onVersionChange
}: TelemetrySectionProps) => (
	<div style={gapStyle}>
		<TelemetryTable
			columns={['event', 'count']}
			columnsWithVersion={['event', 'version', 'count']}
			onVersionChange={onVersionChange}
			queryKey="hmr-reliability"
			rows={data['hmr-reliability'] ?? []}
			themeSprings={themeSprings}
			title="HMR Reliability"
			versions={versions}
		/>

		<TelemetryTable
			columns={[
				'framework',
				'avg_duration_ms',
				'avg_file_count',
				'count'
			]}
			columnsWithVersion={[
				'framework',
				'version',
				'avg_duration_ms',
				'avg_file_count',
				'count'
			]}
			onVersionChange={onVersionChange}
			queryKey="hmr-rebuilds"
			rows={data['hmr-rebuilds'] ?? []}
			themeSprings={themeSprings}
			title="HMR Rebuild Stats"
			versions={versions}
		/>

		<TelemetryTable
			columns={[
				'framework',
				'frameworks',
				'avg_duration_ms',
				'avg_file_count',
				'count'
			]}
			columnsWithVersion={[
				'framework',
				'frameworks',
				'version',
				'avg_duration_ms',
				'avg_file_count',
				'count'
			]}
			onVersionChange={onVersionChange}
			queryKey="hmr-rebuild-errors"
			rows={data['hmr-rebuild-errors'] ?? []}
			themeSprings={themeSprings}
			title="HMR Rebuild Errors"
			versions={versions}
		/>
	</div>
);
