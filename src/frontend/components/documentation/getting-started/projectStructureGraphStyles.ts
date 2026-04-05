import { CSSProperties } from 'react';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../../types/springTypes';

type ThemeColorPair = {
	dark: string;
	light: string;
};

export const descriptionColor: ThemeColorPair = {
	dark: 'rgba(232,232,236,0.5)',
	light: 'rgba(42,42,50,0.5)'
};
export const fileIconColor: ThemeColorPair = {
	dark: '#A5B4FC',
	light: '#4F46E5'
};
export const folderIconColor: ThemeColorPair = {
	dark: '#818CF8',
	light: '#6366F1'
};
export const hoverBgColor: ThemeColorPair = {
	dark: 'rgba(99,102,241,0.1)',
	light: 'rgba(99,102,241,0.1)'
};
export const lineColor: ThemeColorPair = {
	dark: 'rgba(99,102,241,0.3)',
	light: 'rgba(99,102,241,0.25)'
};
export const specialFileColor: ThemeColorPair = {
	dark: '#FFD93D',
	light: '#E6A700'
};
export const svgStyle: CSSProperties = {
	display: 'block',
	height: 'auto',
	maxWidth: '100%',
	width: '100%'
};
export const textColor: ThemeColorPair = {
	dark: '#E8E8EC',
	light: '#2A2A32'
};
export const containerStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark') ? 'rgba(20,20,30,0.6)' : 'rgba(250,250,248,0.9)'
	),
	border: themeSprings.themeTertiary.to((color) => `1px solid ${color}`),
	borderRadius: '0.75rem',
	marginBottom: '1.5rem',
	marginTop: '1rem',
	overflow: 'hidden',
	padding: '1.5rem'
});
