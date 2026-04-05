import { CSSProperties } from 'react';
import { AnimatedCSSProperties, ThemeSprings } from '../../types/springTypes';

export const codeBlock: CSSProperties = {
	background: 'rgba(99, 102, 241, 0.06)',
	borderRadius: '8px',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.875rem',
	marginTop: '1rem',
	overflowX: 'auto',
	padding: '1rem'
};
export const ctaCardStyle: AnimatedCSSProperties = {
	alignItems: 'center',
	background: 'linear-gradient(135deg, #6366f1, #818CF8)',
	borderRadius: '20px',
	boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
	display: 'flex',
	flexDirection: 'column',
	marginTop: '2rem',
	maxWidth: '900px',
	padding: '3rem 2rem',
	textAlign: 'center',
	width: '100%'
};
export const featureIconStyle: CSSProperties = {
	alignItems: 'center',
	background: 'linear-gradient(135deg, #6366f1, #818CF8)',
	borderRadius: '10px',
	color: '#fff',
	display: 'flex',
	fontSize: '1.25rem',
	height: '2.75rem',
	justifyContent: 'center',
	marginBottom: '1.25rem',
	width: '2.75rem'
};
export const featuresGridStyle: CSSProperties = {
	display: 'grid',
	gap: '1.5rem',
	gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
	maxWidth: '1200px',
	padding: '2rem',
	width: '100%'
};
export const heroStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'column',
	padding: '6rem 2rem 2rem',
	textAlign: 'center'
};
export const logoImageStyle: CSSProperties = {
	height: '1.75rem',
	width: '1.75rem'
};
export const navContainerStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
	justifyContent: 'center',
	padding: '1.5rem 0'
};
export const navStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
	justifyContent: 'center',
	marginTop: '2rem'
};
export const primaryButtonStyle: CSSProperties = {
	alignItems: 'center',
	background: 'linear-gradient(135deg, #6366f1, #818CF8)',
	border: 'none',
	borderRadius: '10px',
	boxShadow: '0 4px 16px rgba(99, 102, 241, 0.25)',
	color: '#fff',
	display: 'inline-flex',
	fontSize: '1rem',
	fontWeight: 600,
	justifyContent: 'center',
	padding: '0.875rem 1.75rem',
	textDecoration: 'none',
	transition: 'transform 0.15s ease, box-shadow 0.15s ease'
};
export const sectionStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',
	padding: '2.5rem 2rem',
	width: '100%'
};
export const featureCard = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	backdropFilter: 'blur(12px)',
	background: themeSprings.theme.to((t) =>
		t.endsWith('dark')
			? 'rgba(255, 255, 255, 0.04)'
			: 'rgba(255, 255, 255, 0.6)'
	),
	border: '1px solid rgba(99, 102, 241, 0.1)',
	borderRadius: '16px',
	display: 'flex',
	flexDirection: 'column',
	padding: '2rem',
	transition: 'border-color 0.2s ease'
});
export const featureDescStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastSecondary,
	fontSize: '0.9375rem',
	lineHeight: 1.6
});
export const featureTitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastPrimary,
	fontSize: '1.125rem',
	fontWeight: 600,
	letterSpacing: '-0.01em',
	marginBottom: '0.5rem'
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
export const heroTitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastPrimary,
	fontSize: 'clamp(2.5rem, 5vw, 4rem)',
	fontWeight: 700,
	letterSpacing: '-0.03em',
	lineHeight: 1.1,
	marginBottom: '1.5rem',
	maxWidth: '800px'
});
export const linkContainerStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	background: themeSprings.theme.to((t) =>
		t.endsWith('dark') ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'
	),
	border: '1px solid rgba(99, 102, 241, 0.15)',
	borderRadius: '10px',
	color: themeSprings.contrastPrimary,
	display: 'inline-flex',
	fontWeight: 500,
	gap: '0.5rem',
	padding: '0.75rem 1.25rem',
	textDecoration: 'none'
});
export const secondaryButtonStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	background: themeSprings.theme.to((t) =>
		t.endsWith('dark') ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'
	),
	border: '1px solid rgba(99, 102, 241, 0.2)',
	borderRadius: '10px',
	color: themeSprings.contrastPrimary,
	display: 'inline-flex',
	fontSize: '1rem',
	fontWeight: 500,
	justifyContent: 'center',
	padding: '0.875rem 1.75rem',
	textDecoration: 'none'
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
export const sectionTitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastPrimary,
	fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
	fontWeight: 700,
	letterSpacing: '-0.025em',
	marginBottom: '1rem',
	textAlign: 'center'
});
export const showcaseCardStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	backdropFilter: 'blur(12px)',
	background: themeSprings.theme.to((t) =>
		t.endsWith('dark')
			? 'rgba(255, 255, 255, 0.04)'
			: 'rgba(255, 255, 255, 0.6)'
	),
	border: '1px solid rgba(99, 102, 241, 0.1)',
	borderRadius: '20px',
	display: 'flex',
	flexDirection: 'column',
	maxWidth: '1200px',
	overflow: 'hidden',
	padding: '2.5rem',
	width: '100%'
});
