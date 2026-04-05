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
		if (!crashByExitCode.has(exitCode)) crashByExitCode.set(exitCode, []);
		crashByExitCode.get(exitCode)?.push({ date, value: count });
	}

	const crashSeries = [...crashByExitCode.entries()].map(
		([label, seriesData]) => ({
			data: seriesData,
			label: `Exit ${label}`
		})
	);

	return (
		<div style={gapStyle}>
			<TelemetryTable
				columns={['event', 'count']}
				columnsWithVersion={['event', 'version', 'count']}
				onVersionChange={onVersionChange}
				queryKey="error-rates"
				rows={data['error-rates'] ?? []}
				themeSprings={themeSprings}
				title="Error Rates by Event"
				versions={versions}
			/>

			<TelemetryTable
				columns={['pass', 'incremental', 'message', 'count']}
				columnsWithVersion={[
					'pass',
					'incremental',
					'message',
					'version',
					'count'
				]}
				onVersionChange={onVersionChange}
				queryKey="build-errors"
				rows={data['build-errors'] ?? []}
				themeSprings={themeSprings}
				title="Build Errors by Pass"
				versions={versions}
			/>

			<TelemetryTable
				columns={[
					'frameworks',
					'mode',
					'incremental',
					'configured_dirs',
					'scanned_entries',
					'users'
				]}
				queryKey="build-empty"
				rows={data['build-empty'] ?? []}
				themeSprings={themeSprings}
				title="Empty Builds"
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
				columns={['date', 'exit_code', 'count']}
				columnsWithVersion={['date', 'exit_code', 'version', 'count']}
				onVersionChange={onVersionChange}
				queryKey="server-crashes"
				rows={data['server-crashes'] ?? []}
				themeSprings={themeSprings}
				title="Server Crash Frequency"
				versions={versions}
			/>

			<TelemetryTable
				columns={['event', 'framework_or_operation', 'count']}
				queryKey="hmr-errors"
				rows={data['hmr-errors'] ?? []}
				themeSprings={themeSprings}
				title="HMR Errors"
			/>

			<TelemetryTable
				columns={['asset_name', 'asset_type', 'html_file', 'count']}
				queryKey="missing-manifest"
				rows={data['missing-manifest'] ?? []}
				themeSprings={themeSprings}
				title="Missing Manifest Entries"
			/>
		</div>
	);
};
