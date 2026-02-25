import { animated, useSpring } from '@react-spring/web';
import {
	CSSProperties,
	ComponentType,
	useCallback,
	useEffect,
	useState
} from 'react';
import { User } from '../../../db/schema';
import { KpiSummary, TelemetrySectionProps } from '../../types/telemetryTypes';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { MobileSidebarToggle } from '../components/sidebar/MobileSidebarToggle';
import { TelemetryMobileSidebar } from '../components/telemetry/TelemetryMobileSidebar';
import { TelemetrySidebar } from '../components/telemetry/TelemetrySidebar';
import { BuildPerformanceSection } from '../components/telemetry/sections/BuildPerformanceSection';
import { DevSessionsSection } from '../components/telemetry/sections/DevSessionsSection';
import { ErrorsCrashesSection } from '../components/telemetry/sections/ErrorsCrashesSection';
import { HmrPerformanceSection } from '../components/telemetry/sections/HmrPerformanceSection';
import { OverviewSection } from '../components/telemetry/sections/OverviewSection';
import { UsageAdoptionSection } from '../components/telemetry/sections/UsageAdoptionSection';
import {
	TelemetryView,
	findSectionForTelemetryView
} from '../data/telemetrySidebarData';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useTelemetryNavigation } from '../hooks/useTelemetryNavigation';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';

type TelemetryDashboardProps = {
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

// Map each sidebar view ID to its section component
const viewToSection: Record<
	TelemetryView,
	ComponentType<TelemetrySectionProps>
> = {
	overview: OverviewSection,
	'error-rates': ErrorsCrashesSection,
	'build-errors': ErrorsCrashesSection,
	'server-crashes': ErrorsCrashesSection,
	'hmr-errors': ErrorsCrashesSection,
	'build-duration': BuildPerformanceSection,
	'build-empty': BuildPerformanceSection,
	'missing-manifest': BuildPerformanceSection,
	'hmr-reliability': HmrPerformanceSection,
	'hmr-rebuilds': HmrPerformanceSection,
	'hmr-rebuild-errors': HmrPerformanceSection,
	'framework-popularity': UsageAdoptionSection,
	'version-adoption': UsageAdoptionSection,
	'platform-breakdown': UsageAdoptionSection,
	'cli-commands': UsageAdoptionSection,
	'dev-sessions': DevSessionsSection,
	'dev-starts': DevSessionsSection
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

export const TelemetryDashboard = ({
	user,
	theme
}: TelemetryDashboardProps) => {
	const [themeSprings, setTheme] = useTheme(theme);
	const [view, navigateToView] = useTelemetryNavigation('overview');
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('lg');

	const [openSections, setOpenSections] = useState<Set<string>>(() => {
		const initial = findSectionForTelemetryView('overview');
		return initial ? new Set([initial]) : new Set();
	});

	const [sidebarSpring, sidebarSpringApi] = useSpring(() => ({
		config: { friction: 40, tension: 275 },
		overlayOpacity: 0,
		transform: 'translateX(-100%)'
	}));

	const [data, setData] = useState<Record<string, Record<string, unknown>[]>>(
		{}
	);
	const [kpi, setKpi] = useState<KpiSummary | null>(null);
	const [error, setError] = useState<string>();
	const [versions, setVersions] = useState<string[]>([]);

	// Fetch KPI summary
	useEffect(() => {
		fetch('/api/v1/telemetry/kpi-summary')
			.then((res) => (res.ok ? res.json() : null))
			.then((json) => {
				if (json) setKpi(json);
			})
			.catch(() => {});
	}, []);

	// Fetch versions
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

	// Fetch all queries on mount
	useEffect(() => {
		for (const key of queryKeys) {
			fetchQuery(key);
		}
	}, [fetchQuery]);

	const handleVersionChange = useCallback(
		(queryKey: string, version: string) => {
			fetchQuery(queryKey, version || undefined);
		},
		[fetchQuery]
	);

	const handleNavigate = (newView: TelemetryView) => {
		navigateToView(newView);
		const section = findSectionForTelemetryView(newView);
		if (section) {
			setOpenSections((current) => new Set([...current, section]));
		}
	};

	const handleToggleSection = (label: string) => {
		setOpenSections((current) => {
			const next = new Set(current);
			if (next.has(label)) {
				next.delete(label);
			} else {
				next.add(label);
			}
			return next;
		});
	};

	const toggleSidebar = () => {
		void sidebarSpringApi.start({
			overlayOpacity: 1,
			transform: 'translateX(0%)'
		});
	};

	const ActiveSection = viewToSection[view];

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
						{isMobile ? (
							<>
								<MobileSidebarToggle
									onToggle={toggleSidebar}
									themeSprings={themeSprings}
								/>
								<TelemetryMobileSidebar
									spring={sidebarSpring}
									springApi={sidebarSpringApi}
									view={view}
									themeSprings={themeSprings}
									navigateToView={handleNavigate}
									openSections={openSections}
									onToggleSection={handleToggleSection}
								/>
							</>
						) : (
							<TelemetrySidebar
								view={view}
								themeSprings={themeSprings}
								navigateToView={handleNavigate}
								openSections={openSections}
								onToggleSection={handleToggleSection}
							/>
						)}
						<div style={contentStyle}>
							{error ? (
								<div style={errorStyle}>{error}</div>
							) : (
								<ActiveSection
									data={data}
									kpi={kpi}
									versions={versions}
									themeSprings={themeSprings}
									onVersionChange={handleVersionChange}
								/>
							)}
						</div>
					</div>
				</main>
			</animated.body>
		</html>
	);
};
