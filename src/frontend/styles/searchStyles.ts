import { CSSProperties } from 'react';
import { AnimatedCSSProperties, ThemeSprings } from '../../types/springTypes';
import { primaryColor, secondaryColor } from './colors';

const isDark = (mode: string) => mode.endsWith('dark');

export const searchAccent = (themeSprings: ThemeSprings) =>
	themeSprings.theme.to((mode) =>
		isDark(mode) ? secondaryColor : primaryColor
	);

const mutedColor = (themeSprings: ThemeSprings) =>
	themeSprings.theme.to((mode) => (isDark(mode) ? '#A1A1AA' : '#71717A'));

export const searchInputStyle: CSSProperties = {
	background: 'transparent',
	border: 'none',
	color: 'inherit',
	flex: 1,
	fontSize: '1.05rem',
	minWidth: 0,
	outline: 'none'
};
export const searchResultsStyle: CSSProperties = {
	listStyle: 'none',
	margin: 0,
	overflowY: 'auto',
	padding: '0.4rem'
};
export const searchTitleStyle: CSSProperties = {
	fontSize: '0.95rem',
	fontWeight: 600
};
export const searchBreadcrumbStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: mutedColor(themeSprings),
	fontSize: '0.75rem',
	letterSpacing: '0.02em'
});
export const searchFooterStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	borderTop: themeSprings.themeTertiary.to((color) => `1px solid ${color}`),
	color: mutedColor(themeSprings),
	display: 'flex',
	fontSize: '0.75rem',
	gap: '1rem',
	justifyContent: 'space-between',
	padding: '0.55rem 1rem'
});
export const searchInputRowStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	borderBottom: themeSprings.themeTertiary.to(
		(color) => `1px solid ${color}`
	),
	display: 'flex',
	gap: '0.65rem',
	padding: '0.9rem 1rem'
});
export const searchKeyStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	border: themeSprings.themeTertiary.to((color) => `1px solid ${color}`),
	borderRadius: '0.35rem',
	color: mutedColor(themeSprings),
	fontFamily: 'inherit',
	fontSize: '0.75rem',
	padding: '0.1rem 0.4rem',
	whiteSpace: 'nowrap'
});
export const searchMarkStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: 'transparent',
	color: searchAccent(themeSprings),
	fontWeight: 600
});
export const searchMessageStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: mutedColor(themeSprings),
	fontSize: '0.9rem',
	padding: '1.5rem 1rem',
	textAlign: 'center'
});
export const searchPanelStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.themePrimary,
	border: themeSprings.themeTertiary.to((color) => `1px solid ${color}`),
	borderRadius: '0.85rem',
	boxShadow: '0 24px 64px rgba(0, 0, 0, 0.35)',
	color: themeSprings.contrastPrimary,
	display: 'flex',
	flexDirection: 'column',
	maxHeight: 'min(70vh, 640px)',
	overflow: 'hidden',
	width: 'min(680px, calc(100vw - 2rem))'
});
export const searchResultStyle = (
	themeSprings: ThemeSprings,
	active: boolean
): AnimatedCSSProperties => ({
	background: active
		? themeSprings.theme.to((mode) =>
				isDark(mode)
					? 'rgba(129, 140, 248, 0.14)'
					: 'rgba(99, 102, 241, 0.09)'
			)
		: 'transparent',
	borderRadius: '0.55rem',
	cursor: 'pointer',
	display: 'flex',
	flexDirection: 'column',
	gap: '0.2rem',
	padding: '0.6rem 0.75rem'
});
export const searchSnippetStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: mutedColor(themeSprings),
	display: '-webkit-box',
	fontSize: '0.85rem',
	lineHeight: 1.45,
	overflow: 'hidden',
	WebkitBoxOrient: 'vertical',
	WebkitLineClamp: 2
});
