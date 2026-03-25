import { CSSProperties } from 'react';
import { AnimatedCSSProperties, ThemeSprings } from '../../types/springTypes';
import { primaryColor, secondaryColor } from './colors';

export const heroGradientStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(129,140,248,0.04) 30%, transparent 60%)'
			: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(129,140,248,0.03) 30%, transparent 60%)'
	),
	borderRadius: '1rem',
	marginBottom: '2rem',
	padding: '2rem'
});

export const gradientHeadingStyle = (
	themeSprings: ThemeSprings,
	subheading: boolean = false
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'linear-gradient(90deg, rgba(99,102,241,0.06) 0%, transparent 40%)'
			: 'linear-gradient(90deg, rgba(99,102,241,0.04) 0%, transparent 40%)'
	),
	borderLeft: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? `3px solid ${primaryColor}`
			: '3px solid #4F46E5'
	),
	borderTop: 'none',
	fontSize: subheading ? '1.5rem' : '1.875rem',
	fontWeight: '600',
	letterSpacing: '-0.025em',
	marginBottom: '1.25rem',
	marginTop: subheading ? '1.5rem' : '2rem',
	paddingBottom: '0.75rem',
	paddingLeft: '1rem',
	paddingTop: '0.75rem'
});

export const gradientTextStyle: CSSProperties = {
	background: `linear-gradient(135deg, #6366F1 0%, #818CF8 100%)`,
	backgroundClip: 'text',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent'
};

export const ctaGradientStyle: CSSProperties = {
	background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
	border: 'none',
	borderRadius: '0.5rem',
	boxShadow: '0 4px 15px rgba(99,102,241,0.25)',
	color: '#FFFFFF',
	cursor: 'pointer',
	fontWeight: 600,
	padding: '0.75rem 1.5rem',
	textDecoration: 'none',
	transition: 'transform 0.2s ease, box-shadow 0.2s ease'
};

export const cardGradientStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'linear-gradient(145deg, rgba(30,30,46,0.6) 0%, rgba(20,20,30,0.8) 100%)'
			: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(244,244,245,0.98) 100%)'
	),
	border: themeSprings.themeTertiary.to((color) => `1px solid ${color}`),
	borderRadius: '0.75rem',
	padding: '1.5rem'
});

export const codeBlockGradientStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'linear-gradient(180deg, rgba(30,30,46,0.9) 0%, rgba(20,20,30,0.95) 100%)'
			: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(244,244,245,0.96) 100%)'
	),
	border: themeSprings.themeTertiary.to((color) => `1px solid ${color}`),
	borderRadius: '0.5rem',
	overflow: 'hidden'
});

export const accentLineStyle: CSSProperties = {
	background: `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 50%, transparent 100%)`,
	borderRadius: '2px',
	height: '3px',
	marginBottom: '1rem'
};

export const featureCardStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'linear-gradient(145deg, rgba(99,102,241,0.05) 0%, rgba(30,30,46,0.8) 100%)'
			: 'linear-gradient(145deg, rgba(99,102,241,0.04) 0%, rgba(255,255,255,0.95) 100%)'
	),
	border: themeSprings.themeTertiary.to((color) => `1px solid ${color}`),
	borderRadius: '0.75rem',
	padding: '1.25rem',
	transition: 'transform 0.2s ease'
});
