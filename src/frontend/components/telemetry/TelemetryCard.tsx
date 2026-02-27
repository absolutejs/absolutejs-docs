import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import { primaryColor, secondaryColor } from '../../styles/colors';

type TelemetryCardProps = {
	title: string;
	value: string | number;
	subtitle?: string;
	themeSprings: ThemeSprings;
};

const cardStyle = (themeSprings: ThemeSprings) => ({
	backdropFilter: 'blur(16px)',
	backgroundColor: themeSprings.theme.to((t: string) =>
		t.endsWith('dark')
			? 'rgba(17, 17, 22, 0.7)'
			: 'rgba(255, 255, 254, 0.7)'
	),
	border: themeSprings.theme.to((t: string) =>
		t.endsWith('dark')
			? '1px solid rgba(255, 255, 255, 0.05)'
			: '1px solid rgba(0, 0, 0, 0.05)'
	),
	borderRadius: '0.75rem',
	boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
	minWidth: 0,
	overflow: 'hidden',
	padding: '1.5rem',
	position: 'relative' as const
});

const accentStripStyle: CSSProperties = {
	background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
	height: '3px',
	left: 0,
	position: 'absolute',
	right: 0,
	top: 0
};

const titleStyle: CSSProperties = {
	fontSize: '0.875rem',
	letterSpacing: '0.05rem',
	marginBottom: '0.5rem',
	opacity: 0.7,
	textTransform: 'uppercase'
};

const valueStyle: CSSProperties = {
	fontSize: '2rem',
	fontWeight: 600
};

const subtitleStyle: CSSProperties = {
	fontSize: '0.75rem',
	marginTop: '0.25rem',
	opacity: 0.5
};

export const TelemetryCard = ({
	title,
	value,
	subtitle,
	themeSprings
}: TelemetryCardProps) => (
	<animated.div style={cardStyle(themeSprings)}>
		<div style={accentStripStyle} />
		<div style={titleStyle}>{title}</div>
		<div style={valueStyle}>{value}</div>
		{subtitle && <div style={subtitleStyle}>{subtitle}</div>}
	</animated.div>
);
