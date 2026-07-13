import { CSSProperties } from 'react';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../types/springTypes';
import { codeBlockGradientStyle } from '../../styles/gradientStyles';
import { diagramColors } from './diagramStyles';

type DiagramColorKey = keyof typeof diagramColors.dark;

const themeColor = (themeSprings: ThemeSprings, key: DiagramColorKey) =>
	themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? diagramColors.dark[key]
			: diagramColors.light[key]
	);

export const pillListStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem'
};
export const arrowStyle = (
	themeSprings: ThemeSprings,
	isStacked: boolean
): AnimatedCSSProperties => ({
	alignItems: 'center',
	alignSelf: 'center',
	color: themeColor(themeSprings, 'arrow'),
	display: 'flex',
	flex: '0 0 auto',
	fontSize: '1.75rem',
	fontWeight: 700,
	justifyContent: 'center',
	lineHeight: 1,
	transform: isStacked ? 'rotate(90deg)' : 'none'
});
export const assetCardStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'rgba(165,180,252,0.08)'
			: 'rgba(79,70,229,0.06)'
	),
	border: themeColor(themeSprings, 'accentSecondary').to(
		(color) => `2px solid ${color}`
	),
	borderRadius: '8px',
	display: 'flex',
	flex: '0 1 auto',
	flexDirection: 'column',
	gap: '0.35rem',
	minWidth: 0,
	padding: '0.85rem 1rem'
});
export const assetDescStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeColor(themeSprings, 'textMuted'),
	fontSize: '0.875rem',
	lineHeight: 1.5
});
export const assetTitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeColor(themeSprings, 'accentSecondary'),
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '1rem',
	fontWeight: 700
});
export const buildCardStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'rgba(129,140,248,0.1)'
			: 'rgba(99,102,241,0.08)'
	),
	border: themeColor(themeSprings, 'accent').to(
		(color) => `2px solid ${color}`
	),
	borderRadius: '12px',
	flex: '1 1 0',
	minWidth: 0,
	padding: '1rem',
	textAlign: 'center'
});
export const buildDividerStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	borderBottom: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? '1px solid rgba(129,140,248,0.3)'
			: '1px solid rgba(99,102,241,0.3)'
	),
	margin: '0.6rem auto',
	width: '85%'
});
export const buildStepStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeColor(themeSprings, 'textMuted'),
	fontSize: '0.875rem',
	lineHeight: 1.7
});
export const buildTitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeColor(themeSprings, 'accent'),
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '1.5rem',
	fontWeight: 700
});
export const codeTokenStyle = (
	themeSprings: ThemeSprings,
	colorKey: DiagramColorKey,
	isBold = false
): AnimatedCSSProperties => ({
	color: themeColor(themeSprings, colorKey),
	fontWeight: isBold ? '600' : '400'
});
export const diagramTitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeColor(themeSprings, 'text'),
	fontSize: '1.35rem',
	fontWeight: 600,
	marginBottom: '1.25rem',
	textAlign: 'center'
});
export const inputCardStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeColor(themeSprings, 'background'),
	border: themeColor(themeSprings, 'border').to(
		(color) => `1.5px solid ${color}`
	),
	borderRadius: '10px',
	display: 'flex',
	flex: '1 1 0',
	flexDirection: 'column',
	gap: '0.65rem',
	minWidth: 0,
	padding: '1rem'
});
export const manifestPreStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	...codeBlockGradientStyle(themeSprings),
	color: themeColor(themeSprings, 'textMuted'),
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.78rem',
	lineHeight: 1.7,
	margin: 0,
	overflowX: 'auto',
	padding: '0.75rem 0.85rem'
});
export const outputCardStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeColor(themeSprings, 'background'),
	border: themeColor(themeSprings, 'accentSecondary').to(
		(color) => `2px solid ${color}`
	),
	borderRadius: '10px',
	display: 'flex',
	flex: '1.2 1 0',
	flexDirection: 'column',
	gap: '0.65rem',
	minWidth: 0,
	padding: '1rem'
});
export const panelHeadingStyle = (
	themeSprings: ThemeSprings,
	colorKey: DiagramColorKey
): AnimatedCSSProperties => ({
	color: themeColor(themeSprings, colorKey),
	fontSize: '1rem',
	fontWeight: 600
});
export const pillStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'rgba(129,140,248,0.15)'
			: 'rgba(99,102,241,0.12)'
	),
	borderRadius: '6px',
	color: themeColor(themeSprings, 'accent'),
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.875rem',
	fontWeight: 600,
	padding: '0.5rem 0.75rem'
});
export const pipelineRowStyle = (isStacked: boolean): CSSProperties => ({
	alignItems: 'stretch',
	display: 'flex',
	flexDirection: isStacked ? 'column' : 'row',
	gap: '0.6rem',
	marginBottom: '1.25rem'
});
export const routeExampleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	...codeBlockGradientStyle(themeSprings),
	color: themeColor(themeSprings, 'text'),
	flex: '1 1 auto',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.8125rem',
	lineHeight: 1.7,
	margin: 0,
	minWidth: 0,
	overflowX: 'auto',
	padding: '0.85rem 1rem'
});
export const sectionLabelStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeColor(themeSprings, 'textMuted'),
	fontSize: '0.75rem',
	fontWeight: 600,
	letterSpacing: '0.05em',
	textTransform: 'uppercase'
});
export const usagePanelStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themeColor(themeSprings, 'backgroundAlt'),
	borderRadius: '10px',
	display: 'flex',
	flexDirection: 'column',
	gap: '0.75rem',
	padding: '1rem'
});
export const usageRowStyle = (isStacked: boolean): CSSProperties => ({
	alignItems: 'stretch',
	display: 'flex',
	flexDirection: isStacked ? 'column' : 'row',
	gap: '0.6rem'
});
