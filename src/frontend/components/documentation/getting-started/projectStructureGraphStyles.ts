import { CSSProperties } from 'react';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../../types/springTypes';

export type ThemeColorPair = {
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
	padding: '1rem 1.25rem'
});
export const descriptionStyle = (
	themeSprings: ThemeSprings,
	indent: number,
	isMobile: boolean
): AnimatedCSSProperties => ({
	color: themeSprings.theme.to((theme) =>
		theme.endsWith('dark') ? descriptionColor.dark : descriptionColor.light
	),
	flex: isMobile ? '1 0 100%' : '1 1 auto',
	fontSize: '0.8125rem',
	lineHeight: 1.4,
	minWidth: 0,
	paddingBottom: isMobile ? '0.4rem' : 0,
	paddingLeft: isMobile ? `calc(${indent} * 1.5rem + 1.6rem)` : 0
});
export const guideStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignSelf: 'stretch',
	borderLeft: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? `1px dashed ${lineColor.dark}`
			: `1px dashed ${lineColor.light}`
	),
	flex: '0 0 auto',
	width: '1.5rem'
});
export const iconWrapStyle = (
	themeSprings: ThemeSprings,
	colorPair: ThemeColorPair
): AnimatedCSSProperties => ({
	alignItems: 'center',
	color: themeSprings.theme.to((theme) =>
		theme.endsWith('dark') ? colorPair.dark : colorPair.light
	),
	display: 'flex',
	flex: '0 0 auto',
	fontSize: '0.95rem',
	marginRight: '0.65rem'
});
export const labelCellStyle = (isMobile: boolean): CSSProperties => ({
	alignItems: 'center',
	alignSelf: 'stretch',
	display: 'flex',
	flex: isMobile ? '1 1 auto' : '0 0 auto',
	minWidth: isMobile ? 0 : '21rem'
});
export const nameStyle = (
	themeSprings: ThemeSprings,
	isRoot: boolean
): AnimatedCSSProperties => ({
	color: themeSprings.theme.to((theme) =>
		theme.endsWith('dark') ? textColor.dark : textColor.light
	),
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.875rem',
	fontWeight: isRoot ? '600' : '400',
	whiteSpace: 'nowrap'
});
export const rowStyle = (isMobile: boolean): CSSProperties => ({
	alignItems: 'center',
	borderRadius: '6px',
	cursor: 'default',
	display: 'flex',
	flexWrap: isMobile ? 'wrap' : 'nowrap',
	minHeight: '2.25rem',
	padding: '0.1rem 0.5rem'
});
