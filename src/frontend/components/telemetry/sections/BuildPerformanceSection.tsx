import { CSSProperties } from 'react';
import { TelemetrySectionProps } from '../../../../types/telemetryTypes';
import { primaryColor, secondaryColor } from '../../../styles/colors';
import { TelemetryTable } from '../TelemetryTable';
import { BarChart } from '../charts/BarChart';

const sectionTitleStyle: CSSProperties = {
	background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
	backgroundClip: 'text',
	fontSize: '1.25rem',
	fontWeight: 600,
	marginBottom: '1rem',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent'
};

const gapStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem'
};

const buildDurationOrder = ['<1s', '1-5s', '5-15s', '>15s'];

const aggregateBuckets = (rows: Record<string, unknown>[]) => {
	const bucketCounts = new Map<string, number>();
	for (const row of rows) {
		const bucket = String(row['duration_bucket'] ?? '');
		const count = Number(row['count'] ?? 0);
		bucketCounts.set(bucket, (bucketCounts.get(bucket) ?? 0) + count);
	}
	return [...bucketCounts.entries()].map(([label, value]) => ({
		label,
		value
	}));
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

	const devBarData = aggregateBuckets(devRows);
	const prodBarData = aggregateBuckets(prodRows);

	return (
		<div style={gapStyle}>
			{devBarData.length > 0 && (
				<div>
					<div style={sectionTitleStyle}>
						Development Build Duration Distribution
					</div>
					<BarChart
						data={devBarData}
						themeSprings={themeSprings}
						order={buildDurationOrder}
					/>
				</div>
			)}

			<TelemetryTable
				queryKey="build-duration-by-mode"
				title="Development Build Duration Details"
				columns={['duration_bucket', 'count']}
				rows={devRows}
				themeSprings={themeSprings}
			/>

			{prodBarData.length > 0 && (
				<div>
					<div style={sectionTitleStyle}>
						Production Build Duration Distribution
					</div>
					<BarChart
						data={prodBarData}
						themeSprings={themeSprings}
						order={buildDurationOrder}
					/>
				</div>
			)}

			<TelemetryTable
				queryKey="build-duration-by-mode"
				title="Production Build Duration Details"
				columns={['duration_bucket', 'count']}
				rows={prodRows}
				themeSprings={themeSprings}
			/>

			<TelemetryTable
				queryKey="missing-manifest"
				title="Missing Manifest Entries"
				columns={['asset_name', 'asset_type', 'html_file', 'count']}
				rows={data['missing-manifest'] ?? []}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
