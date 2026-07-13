import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../types/springTypes';
import { diagramColors } from './diagramStyles';

type PropsHoverablePropProps = {
	isHovered: boolean;
	label: string;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	themeSprings: ThemeSprings;
	tooltipLabel: string;
};

const wrapperStyle: CSSProperties = {
	cursor: 'pointer',
	display: 'inline-block',
	position: 'relative'
};

const themedAccentSecondary = (themeSprings: ThemeSprings) =>
	themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? diagramColors.dark.accentSecondary
			: diagramColors.light.accentSecondary
	);

const labelStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	color: themedAccentSecondary(themeSprings),
	fontWeight: 600,
	textDecorationLine: 'underline',
	textDecorationStyle: 'dotted',
	textUnderlineOffset: '3px'
});

const tooltipStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? diagramColors.dark.background
			: diagramColors.light.background
	),
	border: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? `1.5px solid ${diagramColors.dark.accentSecondary}`
			: `1.5px solid ${diagramColors.light.accentSecondary}`
	),
	borderRadius: '0.375rem',
	bottom: 'calc(100% + 0.375rem)',
	color: themedAccentSecondary(themeSprings),
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.8125rem',
	fontWeight: 500,
	left: '50%',
	padding: '0.25rem 0.625rem',
	position: 'absolute',
	transform: 'translateX(-50%)',
	whiteSpace: 'nowrap',
	zIndex: 1
});

export const PropsHoverableProp = ({
	isHovered,
	label,
	onMouseEnter,
	onMouseLeave,
	themeSprings,
	tooltipLabel
}: PropsHoverablePropProps) => (
	<span
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		style={wrapperStyle}
	>
		<animated.span style={labelStyle(themeSprings)}>{label}</animated.span>
		{isHovered && (
			<animated.span role="tooltip" style={tooltipStyle(themeSprings)}>
				{tooltipLabel}
			</animated.span>
		)}
	</span>
);
