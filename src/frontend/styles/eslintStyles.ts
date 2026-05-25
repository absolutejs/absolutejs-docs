import { CSSProperties } from 'react';
import { EslintRuleCategory } from '../data/documentation/eslintRulesData';

export const correctColor = '#22C55E';
export const eslintCategoryColors: Record<EslintRuleCategory, string> = {
	Angular: '#DD0031',
	'Code Quality': '#0D9488',
	'Imports & Exports': '#F59E0B',
	'React & JSX': '#0EA5E9',
	'react-spring': '#8B5CF6',
	Styling: '#EC4899',
	TypeScript: '#3178C6'
};
export const exampleCaptionStyle: CSSProperties = {
	fontSize: '0.9rem',
	marginBottom: '0.5rem',
	opacity: 0.85
};
export const fixableColor = '#10B981';
export const incorrectColor = '#EF4444';
export const problemColor = '#EF4444';
export const ruleBadgeRowStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexWrap: 'wrap',
	gap: '0.5rem',
	marginTop: '1rem'
};
export const suggestionColor = '#F59E0B';
export const typeAwareColor = '#3B82F6';

export const exampleLabelStyle = (
	kind: 'correct' | 'incorrect'
): CSSProperties => ({
	alignItems: 'center',
	color: kind === 'correct' ? correctColor : incorrectColor,
	display: 'flex',
	fontSize: '0.8rem',
	fontWeight: 700,
	gap: '0.4rem',
	letterSpacing: '0.05em',
	marginBottom: '0.6rem',
	marginTop: '1.5rem',
	textTransform: 'uppercase'
});
export const exampleWrapperStyle = (
	kind: 'correct' | 'incorrect'
): CSSProperties => ({
	borderLeft: `3px solid ${kind === 'correct' ? correctColor : incorrectColor}`,
	marginBottom: '1rem',
	paddingLeft: '0.75rem'
});
export const ruleBadgeStyle = (color: string): CSSProperties => ({
	alignItems: 'center',
	background: `${color}1F`,
	border: `1px solid ${color}59`,
	borderRadius: '2rem',
	color,
	display: 'inline-flex',
	fontSize: '0.75rem',
	fontWeight: 600,
	gap: '0.35rem',
	letterSpacing: '0.02em',
	lineHeight: 1.4,
	padding: '0.25rem 0.7rem',
	whiteSpace: 'nowrap'
});
