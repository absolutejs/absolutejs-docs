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

export const BuildPerformanceSection = ({
	data,
	versions,
	themeSprings,
	onVersionChange
}: TelemetrySectionProps) => {
	// Aggregate build duration buckets
	const durationRows = data['build-duration'] ?? [];
	const bucketCounts = new Map<string, number>();

	for (const row of durationRows) {
		const bucket = String(row['duration_bucket'] ?? '');
		const count = Number(row['count'] ?? 0);
		bucketCounts.set(bucket, (bucketCounts.get(bucket) ?? 0) + count);
	}

	const barData = [...bucketCounts.entries()].map(([label, value]) => ({
		label,
		value
	}));

	return (
		<div style={gapStyle}>
			{barData.length > 0 && (
				<div>
					<div style={sectionTitleStyle}>
						Build Duration Distribution
					</div>
					<BarChart
						data={barData}
						themeSprings={themeSprings}
						order={buildDurationOrder}
					/>
				</div>
			)}

			<TelemetryTable
				queryKey="build-duration"
				title="Build Duration Details"
				columns={['duration_bucket', 'count']}
				columnsWithVersion={['duration_bucket', 'version', 'count']}
				rows={durationRows}
				themeSprings={themeSprings}
				versions={versions}
				onVersionChange={onVersionChange}
			/>

			<TelemetryTable
				queryKey="build-empty"
				title="Empty Builds"
				columns={['frameworks', 'users']}
				rows={data['build-empty'] ?? []}
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
