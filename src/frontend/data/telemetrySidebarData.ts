import { animated, AnimatedComponent } from '@react-spring/web';
import {
	FaChartBar,
	FaExclamationTriangle,
	FaHammer,
	FaBolt,
	FaUsers,
	FaClock
} from 'react-icons/fa';
import { IconType } from 'react-icons';

export const telemetryViewIds = [
	'overview',
	'errors-crashes',
	'build-performance',
	'hmr-performance',
	'usage-adoption',
	'dev-sessions'
] as const;

export type TelemetryView = (typeof telemetryViewIds)[number];

const AnimatedChartBar = animated(FaChartBar);
const AnimatedExclamation = animated(FaExclamationTriangle);
const AnimatedHammer = animated(FaHammer);
const AnimatedBolt = animated(FaBolt);
const AnimatedUsers = animated(FaUsers);
const AnimatedClock = animated(FaClock);

export type TelemetrySidebarItem = {
	id: TelemetryView;
	label: string;
	icon: AnimatedComponent<IconType>;
};

export const telemetrySidebarData: TelemetrySidebarItem[] = [
	{ id: 'overview', label: 'Overview', icon: AnimatedChartBar },
	{
		id: 'errors-crashes',
		label: 'Errors & Crashes',
		icon: AnimatedExclamation
	},
	{
		id: 'build-performance',
		label: 'Build Performance',
		icon: AnimatedHammer
	},
	{
		id: 'hmr-performance',
		label: 'HMR Performance',
		icon: AnimatedBolt
	},
	{ id: 'usage-adoption', label: 'Usage & Adoption', icon: AnimatedUsers },
	{ id: 'dev-sessions', label: 'Dev Sessions', icon: AnimatedClock }
];
