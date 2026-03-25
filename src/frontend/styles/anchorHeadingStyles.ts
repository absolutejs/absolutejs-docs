import { CSSProperties } from 'react';

export const anchorHeadingContainerStyle: CSSProperties = {
	color: 'inherit',
	cursor: 'pointer',
	display: 'inline-flex',
	gap: '0.5rem',
	textDecoration: 'none'
};

export const anchorIconStyle: CSSProperties = {
	color: '#6366F1',
	flexShrink: 0,
	fontSize: 'inherit',
	fontWeight: 700,
	opacity: 0,
	transition: 'opacity 0.15s ease',
	userSelect: 'none'
};

export const anchorIconVisibleStyle: CSSProperties = {
	...anchorIconStyle,
	opacity: 0.8
};
