import { animated } from '@react-spring/web';
import {
	FaChartBar,
	FaExclamationTriangle,
	FaHammer,
	FaBolt,
	FaUsers,
	FaClock
} from 'react-icons/fa';
import { MenuItem } from '../../types/types';

export const telemetryViewIds = [
	'overview',
	'error-rates',
	'build-errors',
	'server-crashes',
	'hmr-errors',
	'build-duration',
	'build-empty',
	'missing-manifest',
	'hmr-reliability',
	'hmr-rebuilds',
	'hmr-rebuild-errors',
	'framework-popularity',
	'version-adoption',
	'platform-breakdown',
	'cli-commands',
	'dev-sessions',
	'dev-starts'
] as const;

export type TelemetryView = (typeof telemetryViewIds)[number];

const AnimatedChartBar = animated(FaChartBar);
const AnimatedExclamation = animated(FaExclamationTriangle);
const AnimatedHammer = animated(FaHammer);
const AnimatedBolt = animated(FaBolt);
const AnimatedUsers = animated(FaUsers);
const AnimatedClock = animated(FaClock);

export const telemetrySidebarData: MenuItem<TelemetryView>[] = [
	{
		id: 'overview',
		label: 'Overview',
		icon: AnimatedChartBar
	},
	{
		label: 'Errors & Crashes',
		icon: AnimatedExclamation,
		buttons: [
			{ id: 'error-rates', label: 'Error Rates' },
			{ id: 'build-errors', label: 'Build Errors' },
			{ id: 'server-crashes', label: 'Server Crashes' },
			{ id: 'hmr-errors', label: 'HMR Errors' }
		]
	},
	{
		label: 'Build Performance',
		icon: AnimatedHammer,
		buttons: [
			{ id: 'build-duration', label: 'Build Duration' },
			{ id: 'build-empty', label: 'Empty Builds' },
			{ id: 'missing-manifest', label: 'Missing Manifest' }
		]
	},
	{
		label: 'HMR Performance',
		icon: AnimatedBolt,
		buttons: [
			{ id: 'hmr-reliability', label: 'HMR Reliability' },
			{ id: 'hmr-rebuilds', label: 'HMR Rebuilds' },
			{ id: 'hmr-rebuild-errors', label: 'HMR Rebuild Errors' }
		]
	},
	{
		label: 'Usage & Adoption',
		icon: AnimatedUsers,
		buttons: [
			{ id: 'framework-popularity', label: 'Framework Popularity' },
			{ id: 'version-adoption', label: 'Version Adoption' },
			{ id: 'platform-breakdown', label: 'Platform Breakdown' },
			{ id: 'cli-commands', label: 'CLI Commands' }
		]
	},
	{
		label: 'Dev Sessions',
		icon: AnimatedClock,
		buttons: [
			{ id: 'dev-sessions', label: 'Session Duration' },
			{ id: 'dev-starts', label: 'Dev Server Starts' }
		]
	}
];

export const findSectionForTelemetryView = (
	view: TelemetryView
): string | null => {
	for (const section of telemetrySidebarData) {
		if ('buttons' in section) {
			if (section.buttons.some((btn) => btn.id === view)) {
				return section.label;
			}
		}
	}
	return null;
};
