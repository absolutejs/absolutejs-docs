import { animated } from '@react-spring/web';
import { CSSProperties, ComponentType, useState } from 'react';
import {
	QueryClient,
	QueryClientProvider,
	useQueries,
	useQuery
} from '@tanstack/react-query';
import { User } from '../../../db/schema';
import { TelemetrySectionProps } from '../../types/telemetryTypes';
import { server } from '../utils/edenTreaty';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { TelemetrySidebar } from '../components/telemetry/TelemetrySidebar';
import { BuildPerformanceSection } from '../components/telemetry/sections/BuildPerformanceSection';
import { DevSessionsSection } from '../components/telemetry/sections/DevSessionsSection';
import { ErrorsCrashesSection } from '../components/telemetry/sections/ErrorsCrashesSection';
import { HmrPerformanceSection } from '../components/telemetry/sections/HmrPerformanceSection';
import { OverviewSection } from '../components/telemetry/sections/OverviewSection';
import { UsageAdoptionSection } from '../components/telemetry/sections/UsageAdoptionSection';
import { EventLogSection } from '../components/telemetry/sections/EventLogSection';
import { UniqueUsersSection } from '../components/telemetry/sections/UniqueUsersSection';
import { TelemetryView } from '../data/telemetrySidebarData';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useTelemetryNavigation } from '../hooks/useTelemetryNavigation';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';

type TelemetryDashboardProps = {
	initialView: TelemetryView;
	user: User;
	theme: ThemeMode | undefined;
};

const queryKeys = [
	'error-rates',
	'build-errors',
	'framework-popularity',
	'hmr-reliability',
	'build-duration',
	'version-adoption',
	'platform-breakdown',
	'server-crashes',
	'cli-commands',
	'hmr-rebuilds',
	'dev-sessions',
	'build-empty',
	'missing-manifest',
	'dev-starts',
	'hmr-errors',
	'hmr-rebuild-errors'
];

const viewToSection: Partial<
	Record<TelemetryView, ComponentType<TelemetrySectionProps>>
> = {
	overview: OverviewSection,
	'errors-crashes': ErrorsCrashesSection,
	'build-performance': BuildPerformanceSection,
	'hmr-performance': HmrPerformanceSection,
	'usage-adoption': UsageAdoptionSection,
	'dev-sessions': DevSessionsSection
};

const errorStyle: CSSProperties = {
	color: '#ef4444',
	padding: '2rem',
	textAlign: 'center'
};

const contentStyle: CSSProperties = {
	flex: 1,
	maxWidth: '1200px',
	overflowY: 'auto',
	padding: '2rem'
};

const queryClient = new QueryClient();

const TelemetryDashboardInner = ({
	initialView,
	user,
	theme
}: TelemetryDashboardProps) => {
	const [themeSprings, setTheme] = useTheme(theme);
	const [view, navigateToView] = useTelemetryNavigation(initialView);
	const { isSizeOrLess } = useMediaQuery();
	const isCompact = isSizeOrLess('md');
	const [versionByKey, setVersionByKey] = useState<Record<string, string>>(
		{}
	);

	const kpiQuery = useQuery({
		queryKey: ['telemetry', 'kpi-summary'],
		queryFn: async () => {
			const { data, error } =
				await server.api.v1.telemetry['kpi-summary'].get();
			if (error) throw new Error('Failed to fetch KPI summary');
			if (!('totalEvents' in data))
				throw new Error('Invalid KPI response');
			return data;
		}
	});

	const versionsQuery = useQuery({
		queryKey: ['telemetry', 'versions'],
		queryFn: async () => {
			const { data, error } =
				await server.api.v1.telemetry.versions.get();
			if (error) throw new Error('Failed to fetch versions');
			if (!Array.isArray(data))
				throw new Error('Invalid versions response');
			return data;
		}
	});

	const bunVersionsQuery = useQuery({
		queryKey: ['telemetry', 'bun-versions'],
		queryFn: async () => {
			const { data, error } =
				await server.api.v1.telemetry['bun-versions'].get();
			if (error) throw new Error('Failed to fetch bun versions');
			if (!Array.isArray(data))
				throw new Error('Invalid bun versions response');
			return data;
		}
	});

	const dataQueries = useQueries({
		queries: queryKeys.map((key) => ({
			queryKey: ['telemetry', key, versionByKey[key] ?? ''],
			queryFn: async () => {
				const version = versionByKey[key] || undefined;
				const { data, error } = await server.api.v1
					.telemetry({ key })
					.get({ query: { version } });
				if (error) throw new Error(`Failed to fetch ${key}`);
				if (!Array.isArray(data))
					throw new Error(`Invalid response for ${key}`);
				return data;
			}
		}))
	});

	const data: Record<string, Record<string, unknown>[]> = {};
	queryKeys.forEach((key, i) => {
		const qData = dataQueries[i]?.data;
		if (qData) data[key] = qData;
	});

	const handleVersionChange = (queryKey: string, version: string) => {
		setVersionByKey((prev) => ({ ...prev, [queryKey]: version }));
	};

	const hasNoData =
		kpiQuery.isPending && dataQueries.every((q) => !q.data);
	const accessDenied = dataQueries.some(
		(q) => q.error && String(q.error).includes('403')
	);

	const ActiveSection = viewToSection[view];

	const renderSection = () => {
		if (accessDenied)
			return (
				<div style={errorStyle}>
					Access denied. Admin privileges required.
				</div>
			);
		if (view === 'event-log')
			return (
				<EventLogSection
					themeSprings={themeSprings}
					versions={versionsQuery.data ?? []}
					bunVersions={bunVersionsQuery.data ?? []}
				/>
			);
		if (view === 'unique-users')
			return <UniqueUsersSection themeSprings={themeSprings} />;
		if (hasNoData)
			return (
				<div
					style={{
						opacity: 0.5,
						padding: '2rem',
						textAlign: 'center'
					}}
				>
					Loading...
				</div>
			);
		if (ActiveSection)
			return (
				<ActiveSection
					data={data}
					kpi={kpiQuery.data ?? null}
					versions={versionsQuery.data ?? []}
					themeSprings={themeSprings}
					onVersionChange={handleVersionChange}
				/>
			);
		return null;
	};

	return (
		<html lang="en" style={htmlDefault}>
			<Head title="Telemetry Dashboard - AbsoluteJS" />
			<animated.body style={bodyDefault(themeSprings)}>
				<Navbar
					themeSprings={themeSprings}
					user={user}
					setTheme={setTheme}
				/>
				<main
					style={{
						...mainDefault('hidden'),
						alignItems: 'stretch'
					}}
				>
					<div
						style={{
							display: 'flex',
							flex: 1,
							minHeight: 0,
							overflow: 'hidden'
						}}
					>
						<TelemetrySidebar
							view={view}
							themeSprings={themeSprings}
							navigateToView={navigateToView}
							compact={isCompact}
						/>
						<animated.div
							style={{
								...contentStyle,
								background: themeSprings.theme.to((t) =>
									t.endsWith('dark')
										? 'radial-gradient(ellipse at 20% 0%, rgba(160, 231, 229, 0.04) 0%, transparent 60%)'
										: 'radial-gradient(ellipse at 20% 0%, rgba(160, 231, 229, 0.06) 0%, transparent 60%)'
								)
							}}
						>
							{renderSection()}
						</animated.div>
					</div>
				</main>
			</animated.body>
		</html>
	);
};

export const TelemetryDashboard = (props: TelemetryDashboardProps) => (
	<QueryClientProvider client={queryClient}>
		<TelemetryDashboardInner {...props} />
	</QueryClientProvider>
);
