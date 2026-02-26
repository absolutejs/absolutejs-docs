import { CSSProperties } from 'react';
import { TelemetrySectionProps } from '../../../../types/telemetryTypes';
import { primaryColor, secondaryColor } from '../../../styles/colors';
import { TelemetryTable } from '../TelemetryTable';
import { LineChart } from '../charts/LineChart';

const sectionTitleStyle: CSSProperties = {
	background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
	backgroundClip: 'text',
	fontSize: '1.25rem',
	fontWeight: 600,
	marginBottom: '1rem',
	marginTop: '1.5rem',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent'
};

const gapStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem'
};

export const ErrorsCrashesSection = ({
	data,
	versions,
	themeSprings,
	onVersionChange
}: TelemetrySectionProps) => {
	// Build line chart series from server crash data
	const crashRows = data['server-crashes'] ?? [];
	const crashByExitCode = new Map<
		string,
		{ date: string; value: number }[]
	>();

	for (const row of crashRows) {
		const exitCode = String(row['exit_code'] ?? 'unknown');
		const date = String(row['date'] ?? '');
		const count = Number(row['count'] ?? 0);
		if (!crashByExitCode.has(exitCode)) {
			crashByExitCode.set(exitCode, []);
		}
		crashByExitCode.get(exitCode)?.push({ date, value: count });
	}

	const crashSeries = [...crashByExitCode.entries()].map(
		([label, seriesData]) => ({
			label: `Exit ${label}`,
			data: seriesData
		})
	);

	return (
		<div style={gapStyle}>
			<TelemetryTable
				queryKey="error-rates"
				title="Error Rates by Event"
				columns={['event', 'count']}
				columnsWithVersion={['event', 'version', 'count']}
				rows={data['error-rates'] ?? []}
				themeSprings={themeSprings}
				versions={versions}
				onVersionChange={onVersionChange}
			/>

			<TelemetryTable
				queryKey="build-errors"
				title="Build Errors by Pass"
				columns={['pass', 'incremental', 'message', 'count']}
				columnsWithVersion={[
					'pass',
					'incremental',
					'message',
					'version',
					'count'
				]}
				rows={data['build-errors'] ?? []}
				themeSprings={themeSprings}
				versions={versions}
				onVersionChange={onVersionChange}
			/>

			{crashSeries.length > 0 && (
				<>
					<div style={sectionTitleStyle}>Server Crash Trend</div>
					<LineChart
						series={crashSeries}
						themeSprings={themeSprings}
					/>
				</>
			)}

			<TelemetryTable
				queryKey="server-crashes"
				title="Server Crash Frequency"
				columns={['date', 'exit_code', 'count']}
				columnsWithVersion={['date', 'exit_code', 'version', 'count']}
				rows={data['server-crashes'] ?? []}
				themeSprings={themeSprings}
				versions={versions}
				onVersionChange={onVersionChange}
			/>

			<TelemetryTable
				queryKey="hmr-errors"
				title="HMR Errors"
				columns={['event', 'framework_or_operation', 'count']}
				rows={data['hmr-errors'] ?? []}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
