import { CSSProperties } from 'react';
import { AnimatedCSSProperties, ThemeSprings } from '../../types/springTypes';

export const heroStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'column',
	padding: '6rem 2rem 4rem',
	textAlign: 'center'
};

export const heroTitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastPrimary,
	fontSize: 'clamp(2.5rem, 5vw, 4rem)',
	fontWeight: 700,
	letterSpacing: '-0.02em',
	lineHeight: 1.1,
	marginBottom: '1.5rem',
	maxWidth: '800px'
});

export const heroSubtitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastSecondary,
	fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
	lineHeight: 1.6,
	marginBottom: '2.5rem',
	maxWidth: '600px'
});

export const navStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
	justifyContent: 'center',
	marginTop: '2rem'
};

export const primaryButtonStyle: CSSProperties = {
	alignItems: 'center',
	background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
	border: 'none',
	borderRadius: '12px',
	color: '#fff',
	display: 'inline-flex',
	fontSize: '1rem',
	fontWeight: 600,
	justifyContent: 'center',
	padding: '0.875rem 1.75rem',
	textDecoration: 'none',
	transition: 'transform 0.15s ease, box-shadow 0.15s ease'
};

export const secondaryButtonStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	background: 'transparent',
	border: '2px solid',
	borderColor: themeSprings.contrastSecondary,
	borderRadius: '12px',
	color: themeSprings.contrastPrimary,
	display: 'inline-flex',
	fontSize: '1rem',
	fontWeight: 600,
	justifyContent: 'center',
	padding: '0.875rem 1.75rem',
	textDecoration: 'none'
});

export const featuresGridStyle: CSSProperties = {
	display: 'grid',
	gap: '1.5rem',
	gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
	maxWidth: '1200px',
	padding: '2rem',
	width: '100%'
};

export const featureCard = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.themeTertiary,
	borderRadius: '16px',
	boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
	display: 'flex',
	flexDirection: 'column',
	padding: '2rem'
});

export const featureIconStyle: CSSProperties = {
	alignItems: 'center',
	background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
	borderRadius: '12px',
	color: '#fff',
	display: 'flex',
	fontSize: '1.5rem',
	height: '3rem',
	justifyContent: 'center',
	marginBottom: '1.25rem',
	width: '3rem'
};

export const featureTitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastPrimary,
	fontSize: '1.25rem',
	fontWeight: 600,
	marginBottom: '0.75rem'
});

export const featureDescStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastSecondary,
	fontSize: '1rem',
	lineHeight: 1.6
});

export const sectionStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'column',
	padding: '4rem 1rem',
	width: '100%'
};

export const sectionTitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastPrimary,
	fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
	fontWeight: 700,
	marginBottom: '1rem',
	textAlign: 'center'
});

export const sectionSubtitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastSecondary,
	fontSize: '1.1rem',
	marginBottom: '3rem',
	maxWidth: '600px',
	textAlign: 'center'
});

export const showcaseCardStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	background: themeSprings.themeTertiary,
	borderRadius: '20px',
	boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
	display: 'flex',
	flexDirection: 'column',
	maxWidth: '900px',
	padding: '2.5rem',
	width: '100%'
});

export const codeBlock: CSSProperties = {
	background: '#f5f5f5',
	borderRadius: '4px',
	fontFamily: 'monospace',
	marginTop: '1rem',
	overflowX: 'auto',
	padding: '1rem'
};

export const navContainerStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
	justifyContent: 'center',
	padding: '1.5rem 0'
};

export const linkContainerStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	backgroundColor: themeSprings.themePrimary,
	borderRadius: '10px',
	color: themeSprings.contrastPrimary,
	display: 'inline-flex',
	fontWeight: 500,
	gap: '0.5rem',
	padding: '0.75rem 1.25rem',
	textDecoration: 'none'
});

export const logoImageStyle: CSSProperties = {
	height: '1.75rem',
	width: '1.75rem'
};

export const ctaCardStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
	borderRadius: '20px',
	display: 'flex',
	flexDirection: 'column',
	marginTop: '2rem',
	maxWidth: '900px',
	padding: '3rem 2rem',
	textAlign: 'center',
	width: '100%'
});
