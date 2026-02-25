import { animated } from '@react-spring/web';
import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { Head } from '../components/page/Head';
import { Navbar } from '../components/navbar/Navbar';
import { TelemetryTable } from '../components/telemetry/TelemetryTable';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';
import { User } from '../../../db/schema';

type TelemetryDashboardProps = {
	user: User;
	theme: ThemeMode | undefined;
};

type QueryConfig = {
	key: string;
	title: string;
	columns: string[];
	columnsWithVersion?: string[];
};

const queries: QueryConfig[] = [
	{
		key: 'error-rates',
		title: 'Error Rates by Event',
		columns: ['event', 'count'],
		columnsWithVersion: ['event', 'version', 'count']
	},
	{
		key: 'build-errors',
		title: 'Build Errors by Pass',
		columns: ['pass', 'count'],
		columnsWithVersion: ['pass', 'version', 'count']
	},
	{
		key: 'framework-popularity',
		title: 'Framework Popularity',
		columns: ['framework', 'count']
	},
	{
		key: 'hmr-reliability',
		title: 'HMR Reliability',
		columns: ['event', 'count'],
		columnsWithVersion: ['event', 'version', 'count']
	},
	{
		key: 'build-duration',
		title: 'Build Duration Distribution',
		columns: ['duration_bucket', 'count'],
		columnsWithVersion: ['duration_bucket', 'version', 'count']
	},
	{
		key: 'version-adoption',
		title: 'Version Adoption',
		columns: ['version', 'count']
	},
	{
		key: 'platform-breakdown',
		title: 'Platform Breakdown',
		columns: ['os', 'arch', 'count']
	},
	{
		key: 'server-crashes',
		title: 'Server Crash Frequency',
		columns: ['date', 'count'],
		columnsWithVersion: ['date', 'version', 'count']
	},
	{
		key: 'cli-commands',
		title: 'CLI Command Usage',
		columns: ['command', 'count']
	},
	{
		key: 'hmr-rebuilds',
		title: 'HMR Rebuild Stats',
		columns: ['framework', 'avg_duration_ms', 'avg_file_count', 'count'],
		columnsWithVersion: [
			'framework',
			'version',
			'avg_duration_ms',
			'avg_file_count',
			'count'
		]
	},
	{
		key: 'dev-sessions',
		title: 'Dev Session Duration',
		columns: ['duration_bucket', 'count']
	}
];

const containerStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
	maxWidth: '1200px',
	padding: '2rem',
	width: '100%'
};

const headerStyle: CSSProperties = {
	fontSize: '2rem',
	fontWeight: 600,
	marginBottom: '0.5rem'
};

const errorStyle: CSSProperties = {
	color: '#ef4444',
	padding: '2rem',
	textAlign: 'center'
};

export const TelemetryDashboard = ({
	user,
	theme
}: TelemetryDashboardProps) => {
	const [themeSprings, setTheme] = useTheme(theme);
	const [data, setData] = useState<Record<string, Record<string, unknown>[]>>(
		{}
	);
	const [error, setError] = useState<string>();
	const [versions, setVersions] = useState<string[]>([]);

	useEffect(() => {
		fetch('/api/v1/telemetry/versions')
			.then((res) => (res.ok ? res.json() : []))
			.then((json) => setVersions(json))
			.catch(() => {});
	}, []);

	const fetchQuery = useCallback(async (key: string, version?: string) => {
		try {
			const params = version
				? `?version=${encodeURIComponent(version)}`
				: '';
			const res = await fetch(`/api/v1/telemetry/${key}${params}`);
			if (res.status === 403) {
				setError('Access denied. Admin privileges required.');
				return;
			}
			if (res.ok) {
				const json = await res.json();
				setData((prev) => ({ ...prev, [key]: json }));
			}
		} catch {
			// individual query failure is non-fatal
		}
	}, []);

	useEffect(() => {
		for (const queryConfig of queries) {
			fetchQuery(queryConfig.key);
		}
	}, [fetchQuery]);

	const handleVersionChange = useCallback(
		(queryKey: string, version: string) => {
			fetchQuery(queryKey, version || undefined);
		},
		[fetchQuery]
	);

	return (
		<html lang="en" style={htmlDefault}>
			<Head title="Telemetry Dashboard - AbsoluteJS" />
			<animated.body style={bodyDefault(themeSprings)}>
				<Navbar
					themeSprings={themeSprings}
					user={user}
					setTheme={setTheme}
				/>
				<main style={mainDefault()}>
					<div style={containerStyle}>
						<div style={headerStyle}>Telemetry Dashboard</div>
						{error ? (
							<div style={errorStyle}>{error}</div>
						) : (
							queries.map((queryConfig) => (
								<TelemetryTable
									key={queryConfig.key}
									queryKey={queryConfig.key}
									title={queryConfig.title}
									columns={queryConfig.columns}
									columnsWithVersion={
										queryConfig.columnsWithVersion
									}
									rows={data[queryConfig.key] ?? []}
									themeSprings={themeSprings}
									versions={
										queryConfig.columnsWithVersion
											? versions
											: undefined
									}
									onVersionChange={
										queryConfig.columnsWithVersion
											? handleVersionChange
											: undefined
									}
								/>
							))
						)}
					</div>
				</main>
			</animated.body>
		</html>
	);
};
