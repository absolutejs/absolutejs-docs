import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../types/springTypes';

type TelemetryCardProps = {
	title: string;
	value: string | number;
	subtitle?: string;
	themeSprings: ThemeSprings;
};

const cardStyle = (themeSprings: ThemeSprings) => ({
	backgroundColor: themeSprings.themeTertiary,
	borderRadius: '0.5rem',
	padding: '1.5rem',
	minWidth: '200px',
	flex: '1 1 200px'
});

const titleStyle: CSSProperties = {
	fontSize: '0.875rem',
	opacity: 0.7,
	marginBottom: '0.5rem',
	textTransform: 'uppercase',
	letterSpacing: '0.05rem'
};

const valueStyle: CSSProperties = {
	fontSize: '2rem',
	fontWeight: 600
};

const subtitleStyle: CSSProperties = {
	fontSize: '0.75rem',
	opacity: 0.5,
	marginTop: '0.25rem'
};

export const TelemetryCard = ({
	title,
	value,
	subtitle,
	themeSprings
}: TelemetryCardProps) => (
	<animated.div style={cardStyle(themeSprings)}>
		<div style={titleStyle}>{title}</div>
		<div style={valueStyle}>{value}</div>
		{subtitle && <div style={subtitleStyle}>{subtitle}</div>}
	</animated.div>
);
