import { CSSProperties } from 'react';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../../types/springTypes';

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

export const svgStyle: CSSProperties = {
	display: 'block',
	height: 'auto',
	maxWidth: '100%',
	width: '100%'
};

export const folderIconColor = {
	dark: '#A0E7E5',
	light: '#0A8A87'
};

export const fileIconColor = {
	dark: '#B4F8C8',
	light: '#2E7D32'
};

export const specialFileColor = {
	dark: '#FFD93D',
	light: '#E6A700'
};

export const lineColor = {
	dark: 'rgba(160,231,229,0.3)',
	light: 'rgba(10,138,135,0.25)'
};

export const textColor = {
	dark: '#E8E8EC',
	light: '#2A2A32'
};

export const descriptionColor = {
	dark: 'rgba(232,232,236,0.5)',
	light: 'rgba(42,42,50,0.5)'
};

export const hoverBgColor = {
	dark: 'rgba(160,231,229,0.1)',
	light: 'rgba(160,231,229,0.15)'
};
