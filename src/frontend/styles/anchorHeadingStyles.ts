import { CSSProperties } from 'react';
import { ThemeSprings, AnimatedCSSProperties } from '../../types/springTypes';

export const anchorHeadingContainerStyle: CSSProperties = {
	alignItems: 'center',
	color: 'inherit',
	cursor: 'pointer',
	display: 'flex',
	position: 'relative',
	textDecoration: 'none'
};

export const anchorIconStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	color: themeSprings.contrastPrimary,
	display: 'flex',
	fontSize: '1.25em',
	fontWeight: 400,
	height: '100%',
	left: '-1.75rem',
	opacity: 0,
	position: 'absolute',
	top: 0,
	transition: 'opacity 0.15s ease'
});

export const anchorIconVisibleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	...anchorIconStyle(themeSprings),
	opacity: 0.5
});
