import { CSSProperties } from 'react';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../types/springTypes';

export const diagramContainerStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark') ? 'rgba(20,20,30,0.6)' : 'rgba(250,250,248,0.9)'
	),
	border: themeSprings.themeTertiary.to((color) => `1px solid ${color}`),
	borderRadius: '0.75rem',
	marginBottom: '1.5rem',
	marginTop: '1rem',
	overflowX: 'auto',
	overflowY: 'hidden',
	padding: '1.5rem'
});

export const diagramSvgWrapperStyle: CSSProperties = {
	minWidth: '600px'
};

export const svgContainerStyle: CSSProperties = {
	display: 'block',
	height: 'auto',
	maxWidth: '100%',
	width: '100%'
};

// Color palettes for diagrams
export const diagramColors = {
	dark: {
		accent: '#A0E7E5',
		accentSecondary: '#B4F8C8',
		accentTertiary: '#FFD93D',
		arrow: 'rgba(160,231,229,0.6)',
		background: 'rgba(30,30,46,0.95)',
		backgroundAlt: 'rgba(45,45,65,0.95)',
		border: 'rgba(160,231,229,0.4)',
		borderAccent: 'rgba(160,231,229,0.6)',
		highlight: 'rgba(160,231,229,0.15)',
		pillBg: 'rgba(35,35,55,0.95)',
		text: '#E8E8EC',
		textMuted: 'rgba(232,232,236,0.6)'
	},
	light: {
		accent: '#0D9488',
		accentSecondary: '#059669',
		accentTertiary: '#D97706',
		arrow: 'rgba(13,148,136,0.6)',
		background: 'rgba(255,255,255,0.95)',
		backgroundAlt: 'rgba(248,250,252,0.95)',
		border: 'rgba(13,148,136,0.3)',
		borderAccent: 'rgba(13,148,136,0.5)',
		highlight: 'rgba(13,148,136,0.1)',
		pillBg: 'rgba(240,253,250,0.95)',
		text: '#1E293B',
		textMuted: '#64748B'
	}
};

export const getColors = (isDark: boolean) =>
	isDark ? diagramColors.dark : diagramColors.light;
