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
			queryKey="hmr-reliability"
			title="HMR Reliability"
			columns={['event', 'count']}
			columnsWithVersion={['event', 'version', 'count']}
			rows={data['hmr-reliability'] ?? []}
			themeSprings={themeSprings}
			versions={versions}
			onVersionChange={onVersionChange}
		/>

		<TelemetryTable
			queryKey="hmr-rebuilds"
			title="HMR Rebuild Stats"
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
			rows={data['hmr-rebuilds'] ?? []}
			themeSprings={themeSprings}
			versions={versions}
			onVersionChange={onVersionChange}
		/>

		<TelemetryTable
			queryKey="hmr-rebuild-errors"
			title="HMR Rebuild Errors"
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
			rows={data['hmr-rebuild-errors'] ?? []}
			themeSprings={themeSprings}
			versions={versions}
			onVersionChange={onVersionChange}
		/>
	</div>
);
