import { HALF } from '../../../constants';
import { animated } from '@react-spring/web';
import { CSSProperties, useState } from 'react';
import { FaAngular, FaHtml5, FaReact, FaVuejs } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { SiHtmx, SiSvelte } from 'react-icons/si';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../types/springTypes';
import { gradientTextStyle } from '../../styles/gradientStyles';
import { diagramColors, diagramContainerStyle } from './diagramStyles';

type FrameworkNode = {
	color: string;
	description: string;
	icon: IconType;
	isComingSoon: boolean;
	name: string;
};

type EcosystemFeature = {
	desc: string;
	label: string;
};

const HUB_DESCRIPTION = 'The unified core that ties all frameworks together';
const HUB_LOGO_SIZE = 48;

const topRowFrameworks: FrameworkNode[] = [
	{
		color: '#61DAFB',
		description: 'Full SSR with streaming and hydration',
		icon: FaReact,
		isComingSoon: false,
		name: 'React'
	},
	{
		color: '#FF3E00',
		description: 'Component SSR with client-side hydration',
		icon: SiSvelte,
		isComingSoon: false,
		name: 'Svelte'
	},
	{
		color: '#42B883',
		description: 'SSR with props injection and hydration',
		icon: FaVuejs,
		isComingSoon: false,
		name: 'Vue'
	}
];

const bottomRowFrameworks: FrameworkNode[] = [
	{
		color: '#E34F26',
		description: 'HTML pages with optional JavaScript',
		icon: FaHtml5,
		isComingSoon: false,
		name: 'HTML'
	},
	{
		color: '#3366CC',
		description: 'HTMX-powered interactive templates',
		icon: SiHtmx,
		isComingSoon: false,
		name: 'HTMX'
	},
	{
		color: '#DD0031',
		description: 'Angular support coming soon',
		icon: FaAngular,
		isComingSoon: true,
		name: 'Angular'
	}
];

const features: EcosystemFeature[] = [
	{ desc: 'One build() for all frameworks', label: 'Single Build' },
	{ desc: 'Same pattern everywhere', label: 'Unified Handlers' },
	{ desc: 'End-to-end TypeScript', label: 'Type-Safe Props' }
];

const themedColor = (
	themeSprings: ThemeSprings,
	colorKey: keyof typeof diagramColors.dark
) =>
	themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? diagramColors.dark[colorKey]
			: diagramColors.light[colorKey]
	);

const themedAccentBorder = (themeSprings: ThemeSprings) =>
	themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? `2px solid ${diagramColors.dark.accent}`
			: `2px solid ${diagramColors.light.accent}`
	);

const headingStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'text'),
	fontSize: '1.1rem',
	fontWeight: 600,
	margin: '0 0 1.5rem',
	textAlign: 'center'
});

const orbitLayoutStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem'
};

const nodeRowStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
	justifyContent: 'center',
	width: '100%'
};

const featureRowStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
	justifyContent: 'center',
	marginTop: '1.5rem'
};

const nodeButtonStyle = (
	themeSprings: ThemeSprings,
	framework: FrameworkNode,
	isActive: boolean
): AnimatedCSSProperties => ({
	alignItems: 'center',
	background: themedColor(themeSprings, 'background'),
	border: `2px solid ${isActive ? framework.color : `${framework.color}66`}`,
	borderRadius: '0.75rem',
	boxShadow: isActive
		? `0 0 0 3px ${framework.color}40, 0 6px 18px ${framework.color}33`
		: 'none',
	cursor: 'pointer',
	display: 'flex',
	flex: '1 1 10.5rem',
	flexDirection: 'column',
	gap: '0.375rem',
	maxWidth: '13.5rem',
	opacity: framework.isComingSoon ? HALF : 1,
	outline: 'none',
	padding: '1rem 0.875rem',
	transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
});

const nodeIconStyle = (framework: FrameworkNode): CSSProperties => ({
	alignItems: 'center',
	color: framework.color,
	display: 'flex',
	fontSize: '1.875rem',
	height: '2.25rem',
	justifyContent: 'center'
});

const nodeNameStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'text'),
	fontSize: '0.9375rem',
	fontWeight: 600
});

const descriptionRevealStyle = (
	themeSprings: ThemeSprings,
	isActive: boolean
): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'textMuted'),
	display: 'block',
	fontSize: '0.75rem',
	lineHeight: 1.4,
	minHeight: '2.125rem',
	opacity: isActive ? 1 : 0,
	transition: 'opacity 0.2s ease'
});

const hubButtonStyle = (
	themeSprings: ThemeSprings,
	isActive: boolean
): AnimatedCSSProperties => ({
	alignItems: 'center',
	background: themedColor(themeSprings, 'background'),
	border: themedAccentBorder(themeSprings),
	borderRadius: '1rem',
	boxShadow: isActive
		? '0 0 0 3px rgba(99,102,241,0.35), 0 8px 32px rgba(99,102,241,0.4)'
		: '0 4px 24px rgba(99,102,241,0.25)',
	cursor: 'pointer',
	display: 'flex',
	flexDirection: 'column',
	gap: '0.375rem',
	maxWidth: '17rem',
	outline: 'none',
	padding: '1.25rem 1.75rem',
	transition: 'box-shadow 0.2s ease',
	width: '100%'
});

const hubNameStyle: CSSProperties = {
	...gradientTextStyle,
	fontSize: '1.25rem',
	fontWeight: 700,
	letterSpacing: '-0.01em'
};

const featureCardStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themedColor(themeSprings, 'highlight'),
	borderRadius: '0.5rem',
	flex: '1 1 200px',
	maxWidth: '240px',
	padding: '0.875rem 1rem',
	textAlign: 'center'
});

const featureLabelStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'text'),
	fontSize: '0.875rem',
	fontWeight: 600,
	margin: '0 0 0.25rem'
});

const featureDescriptionStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'textMuted'),
	fontSize: '0.75rem',
	margin: 0
});

type EcosystemNodeButtonProps = {
	framework: FrameworkNode;
	isActive: boolean;
	onActivate: () => void;
	onDeactivate: () => void;
	themeSprings: ThemeSprings;
};

const EcosystemNodeButton = ({
	framework,
	isActive,
	onActivate,
	onDeactivate,
	themeSprings
}: EcosystemNodeButtonProps) => {
	const { icon: IconComponent } = framework;

	return (
		<animated.button
			onBlur={onDeactivate}
			onFocus={onActivate}
			onMouseEnter={onActivate}
			onMouseLeave={onDeactivate}
			style={nodeButtonStyle(themeSprings, framework, isActive)}
			type="button"
		>
			<span aria-hidden="true" style={nodeIconStyle(framework)}>
				<IconComponent />
			</span>
			<animated.span style={nodeNameStyle(themeSprings)}>
				{framework.name}
			</animated.span>
			<animated.span
				style={descriptionRevealStyle(themeSprings, isActive)}
			>
				{framework.description}
			</animated.span>
		</animated.button>
	);
};

type EcosystemNodeRowProps = {
	activeName: string | null;
	nodes: FrameworkNode[];
	onActiveNameChange: (name: string | null) => void;
	themeSprings: ThemeSprings;
};

const EcosystemNodeRow = ({
	activeName,
	nodes,
	onActiveNameChange,
	themeSprings
}: EcosystemNodeRowProps) => (
	<div style={nodeRowStyle}>
		{nodes.map((framework) => (
			<EcosystemNodeButton
				framework={framework}
				isActive={activeName === framework.name}
				key={framework.name}
				onActivate={() => onActiveNameChange(framework.name)}
				onDeactivate={() => onActiveNameChange(null)}
				themeSprings={themeSprings}
			/>
		))}
	</div>
);

type EcosystemHubButtonProps = {
	isActive: boolean;
	onActivate: () => void;
	onDeactivate: () => void;
	themeSprings: ThemeSprings;
};

const EcosystemHubButton = ({
	isActive,
	onActivate,
	onDeactivate,
	themeSprings
}: EcosystemHubButtonProps) => (
	<animated.button
		onBlur={onDeactivate}
		onFocus={onActivate}
		onMouseEnter={onActivate}
		onMouseLeave={onDeactivate}
		style={hubButtonStyle(themeSprings, isActive)}
		type="button"
	>
		<img
			alt=""
			height={HUB_LOGO_SIZE}
			src="/assets/favicon.ico"
			width={HUB_LOGO_SIZE}
		/>
		<span style={hubNameStyle}>AbsoluteJS</span>
		<animated.span style={descriptionRevealStyle(themeSprings, isActive)}>
			{HUB_DESCRIPTION}
		</animated.span>
	</animated.button>
);

type EcosystemFeatureCardProps = {
	feature: EcosystemFeature;
	themeSprings: ThemeSprings;
};

const EcosystemFeatureCard = ({
	feature,
	themeSprings
}: EcosystemFeatureCardProps) => (
	<animated.div style={featureCardStyle(themeSprings)}>
		<animated.p style={featureLabelStyle(themeSprings)}>
			{feature.label}
		</animated.p>
		<animated.p style={featureDescriptionStyle(themeSprings)}>
			{feature.desc}
		</animated.p>
	</animated.div>
);

type FrameworkEcosystemDiagramProps = {
	themeSprings: ThemeSprings;
};

export const FrameworkEcosystemDiagram = ({
	themeSprings
}: FrameworkEcosystemDiagramProps) => {
	const [activeName, setActiveName] = useState<string | null>(null);

	return (
		<animated.div style={diagramContainerStyle(themeSprings)}>
			<animated.h3 style={headingStyle(themeSprings)}>
				One Framework, Any Frontend
			</animated.h3>
			<div style={orbitLayoutStyle}>
				<EcosystemNodeRow
					activeName={activeName}
					nodes={topRowFrameworks}
					onActiveNameChange={setActiveName}
					themeSprings={themeSprings}
				/>
				<EcosystemHubButton
					isActive={activeName === 'AbsoluteJS'}
					onActivate={() => setActiveName('AbsoluteJS')}
					onDeactivate={() => setActiveName(null)}
					themeSprings={themeSprings}
				/>
				<EcosystemNodeRow
					activeName={activeName}
					nodes={bottomRowFrameworks}
					onActiveNameChange={setActiveName}
					themeSprings={themeSprings}
				/>
			</div>
			<div style={featureRowStyle}>
				{features.map((feature) => (
					<EcosystemFeatureCard
						feature={feature}
						key={feature.label}
						themeSprings={themeSprings}
					/>
				))}
			</div>
		</animated.div>
	);
};
