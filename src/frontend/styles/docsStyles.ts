import { CSSProperties } from 'react';
import { ThemeSprings, AnimatedCSSProperties } from '../../types/springTypes';

export const listItemStyle: CSSProperties = {
	fontSize: '1.0625rem',
	marginBottom: '0.5rem'
};
export const listStyle: CSSProperties = {
	listStyleType: 'disc',
	marginTop: '0.75rem',
	paddingLeft: '2rem'
};
export const paragraphLargeStyle: CSSProperties = {
	fontSize: '1.125rem',
	marginBottom: '1rem'
};
export const paragraphSpacedStyle: CSSProperties = {
	fontSize: '1.0625rem',
	marginBottom: '1.5rem'
};
export const paragraphStyle: CSSProperties = {
	fontSize: '1.0625rem',
	marginBottom: '1rem'
};
export const sectionStyle: CSSProperties = {
	backdropFilter: 'blur(12px)',
	background: 'rgba(128, 128, 128, 0.04)',
	borderRadius: '12px',
	marginBottom: '1.5rem',
	padding: '1.25rem 1.5rem'
};
export const strongStyle: CSSProperties = {
	fontWeight: '600'
};
export const tableCodeStyle: CSSProperties = {
	background: 'rgba(99, 102, 241, 0.08)',
	borderRadius: '0.25rem',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.8125rem',
	padding: '0.2rem 0.5rem'
};
export const tableContainerStyle: CSSProperties = {
	marginBottom: '1.5rem',
	marginTop: '1rem',
	overflowX: 'auto',
	width: '100%'
};
export const tocListStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '0.75rem',
	listStyle: 'none',
	margin: 0,
	padding: 0
};
export const tocNavStyle: AnimatedCSSProperties = {
	borderLeft: '1px solid rgba(128, 128, 128, 0.15)',
	height: 'fit-content',
	maxHeight: 'calc(100vh - 4rem)',
	minWidth: '220px',
	overflowY: 'auto',
	padding: '0 1.5rem',
	position: 'sticky',
	right: '4rem',
	top: '4rem',
	width: '20%'
};
export const githubButtonStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	background: themeSprings.themeTertiary,
	border: '1px solid rgba(128, 128, 128, 0.15)',
	borderRadius: '8px',
	color: themeSprings.contrastPrimary,
	display: 'inline-flex',
	fontSize: '0.875rem',
	fontWeight: 500,
	gap: '0.5rem',
	marginTop: '1rem',
	padding: '0.625rem 1rem',
	textDecoration: 'none',
	transition: 'transform 0.15s ease, box-shadow 0.15s ease'
});
export const h1Style = (isMobileOrTablet?: boolean): CSSProperties => ({
	fontSize: isMobileOrTablet ? '2rem' : '3rem',
	letterSpacing: '-0.03em',
	marginBottom: '1rem'
});
export const headingStyle = (
	themeSprings: ThemeSprings,
	subheading: boolean = false
): AnimatedCSSProperties => ({
	color: themeSprings.contrastPrimary,
	fontSize: subheading ? '1.5rem' : '1.875rem',
	fontWeight: subheading ? '600' : '700',
	letterSpacing: '-0.025em',
	marginBottom: '1.25rem',
	paddingTop: subheading ? '1.5rem' : '2rem'
});
export const mainContentStyle = (
	isMobileOrTablet?: boolean
): CSSProperties => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	lineHeight: '1.75',
	margin: '0 auto',
	maxWidth: isMobileOrTablet ? '100%' : '800px',
	minWidth: 0,
	padding: isMobileOrTablet ? '1.5rem 1.25rem' : '2rem 0',
	paddingRight: isMobileOrTablet ? '1.25rem' : '3rem'
});
export const tableCellStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	borderBottom: themeSprings.themeTertiary.to(
		(color) => `1px solid ${color}`
	),
	padding: '0.875rem 1rem',
	verticalAlign: 'top'
});
export const tableHeaderStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'rgba(128, 128, 128, 0.08)'
			: 'rgba(128, 128, 128, 0.06)'
	),
	borderBottom: themeSprings.themeTertiary.to(
		(color) => `2px solid ${color}`
	),
	color: themeSprings.contrastPrimary,
	fontSize: '0.8125rem',
	fontWeight: '600',
	letterSpacing: '0.025em',
	padding: '0.875rem 1rem',
	textAlign: 'left',
	textTransform: 'uppercase'
});
export const tableStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark') ? 'rgba(30,30,46,0.5)' : 'rgba(255,255,255,0.8)'
	),
	border: themeSprings.themeTertiary.to((color) => `1px solid ${color}`),
	borderCollapse: 'collapse',
	borderRadius: '0.5rem',
	fontSize: '0.95rem',
	overflow: 'hidden',
	width: '100%'
});
export const tocLinkStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastSecondary,
	fontSize: '0.8125rem',
	textDecoration: 'none',
	wordBreak: 'break-word'
});
export const tocTitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastSecondary,
	fontSize: '0.6875rem',
	fontWeight: '600',
	letterSpacing: '0.08em',
	marginBottom: '1rem',
	opacity: 0.5,
	textTransform: 'uppercase'
});
