import { CSSProperties } from 'react';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../types/springTypes';

type DiagramColorSet = {
	accent: string;
	accentSecondary: string;
	accentTertiary: string;
	arrow: string;
	background: string;
	backgroundAlt: string;
	border: string;
	borderAccent: string;
	highlight: string;
	pillBg: string;
	text: string;
	textMuted: string;
};

type DiagramColors = {
	dark: DiagramColorSet;
	light: DiagramColorSet;
};

export const diagramColors: DiagramColors = {
	dark: {
		accent: '#818CF8',
		accentSecondary: '#A5B4FC',
		accentTertiary: '#FFD93D',
		arrow: 'rgba(99,102,241,0.6)',
		background: 'rgba(30,30,46,0.95)',
		backgroundAlt: 'rgba(45,45,65,0.95)',
		border: 'rgba(99,102,241,0.4)',
		borderAccent: 'rgba(99,102,241,0.6)',
		highlight: 'rgba(99,102,241,0.15)',
		pillBg: 'rgba(35,35,55,0.95)',
		text: '#E8E8EC',
		textMuted: 'rgba(232,232,236,0.6)'
	},
	light: {
		accent: '#6366F1',
		accentSecondary: '#4F46E5',
		accentTertiary: '#D97706',
		arrow: 'rgba(99,102,241,0.6)',
		background: 'rgba(255,255,255,0.95)',
		backgroundAlt: 'rgba(248,250,252,0.95)',
		border: 'rgba(99,102,241,0.3)',
		borderAccent: 'rgba(99,102,241,0.5)',
		highlight: 'rgba(99,102,241,0.1)',
		pillBg: 'rgba(238,242,255,0.95)',
		text: '#1E293B',
		textMuted: '#64748B'
	}
};
export const diagramSvgWrapperStyle: CSSProperties = {
	minWidth: '600px'
};
export const svgContainerStyle: CSSProperties = {
	display: 'block',
	height: 'auto',
	maxWidth: '100%',
	width: '100%'
};
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
export const getColors = (isDark: boolean) =>
	isDark ? diagramColors.dark : diagramColors.light;
