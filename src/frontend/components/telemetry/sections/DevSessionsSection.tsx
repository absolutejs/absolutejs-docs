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

const sessionDurationOrder = ['<1m', '1-5m', '5-15m', '15-60m', '>60m'];

export const DevSessionsSection = ({
	data,
	versions,
	themeSprings,
	onVersionChange
}: TelemetrySectionProps) => {
	// Aggregate session duration buckets
	const sessionRows = data['dev-sessions'] ?? [];
	const bucketCounts = new Map<string, number>();

	for (const row of sessionRows) {
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
						Session Duration Distribution
					</div>
					<BarChart
						data={barData}
						themeSprings={themeSprings}
						order={sessionDurationOrder}
					/>
				</div>
			)}

			<TelemetryTable
				queryKey="dev-sessions"
				title="Dev Session Duration"
				columns={['duration_bucket', 'entry', 'count']}
				rows={sessionRows}
				themeSprings={themeSprings}
			/>

			<TelemetryTable
				queryKey="dev-starts"
				title="Dev Server Starts"
				columns={['entry', 'users']}
				rows={data['dev-starts'] ?? []}
				themeSprings={themeSprings}
			/>

			<TelemetryTable
				queryKey="dev-restarts"
				title="Dev Server Restarts"
				columns={['entry', 'count']}
				columnsWithVersion={['entry', 'version', 'count']}
				rows={data['dev-restarts'] ?? []}
				themeSprings={themeSprings}
				versions={versions}
				onVersionChange={onVersionChange}
			/>
		</div>
	);
};
