import { CSSProperties } from 'react';
import { HALF } from '../../../../../constants';
import { ThemeSprings } from '../../../../../types/springTypes';
import { primaryColor, secondaryColor } from '../../../../styles/colors';

export const bulkDeleteBarStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	gap: '0.75rem',
	marginTop: '0.75rem'
};
export const buttonStyle: CSSProperties = {
	background: 'transparent',
	border: '1px solid rgba(128, 128, 128, 0.3)',
	borderRadius: '0.375rem',
	color: 'inherit',
	cursor: 'pointer',
	fontFamily: 'inherit',
	fontSize: '0.8rem',
	padding: '0.3rem 0.8rem'
};
export const cancelButtonStyle: CSSProperties = {
	background: 'rgba(255, 255, 255, 0.04)',
	border: '1px solid rgba(255, 255, 255, 0.08)',
	borderRadius: '0.5rem',
	color: '#a1a1aa',
	cursor: 'pointer',
	fontFamily: 'inherit',
	fontSize: '0.85rem',
	fontWeight: 500,
	padding: '0.45rem 1rem'
};
export const cellCopyButtonStyle: CSSProperties = {
	alignItems: 'center',
	background: 'transparent',
	border: 'none',
	color: '#71717a',
	cursor: 'pointer',
	display: 'inline-flex',
	flexShrink: 0,
	fontSize: '0.65rem',
	opacity: HALF,
	padding: '0.1rem',
	transition: 'opacity 0.15s ease'
};
export const cellWithCopyStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	gap: '0.3rem'
};
export const checkboxStyle: CSSProperties = {
	accentColor: primaryColor,
	cursor: 'pointer',
	height: '14px',
	width: '14px'
};
export const columns = [
	'event',
	'anonymous_id',
	'version',
	'os',
	'arch',
	'bun_version',
	'client_timestamp',
	'payload'
] as const;

export type EventLogColumn = (typeof columns)[number];
export const confirmDeleteButtonStyle: CSSProperties = {
	background: '#dc2626',
	border: '1px solid #ef4444',
	borderRadius: '0.5rem',
	color: '#fff',
	cursor: 'pointer',
	fontFamily: 'inherit',
	fontSize: '0.85rem',
	fontWeight: 500,
	padding: '0.45rem 1rem'
};
export const confirmHintTextStyle: CSSProperties = {
	color: primaryColor,
	fontFamily: 'monospace',
	fontSize: '0.85rem'
};
export const confirmHintWrapperStyle: CSSProperties = {
	alignItems: 'center',
	background: `rgba(160, 231, 229, 0.08)`,
	border: `1px solid rgba(160, 231, 229, 0.12)`,
	borderRadius: '0.375rem',
	display: 'inline-flex',
	gap: '0.35rem',
	padding: '0.15rem 0.5rem',
	verticalAlign: 'middle'
};
export const confirmInputStyle: CSSProperties = {
	background: 'rgba(255, 255, 255, 0.04)',
	border: '1px solid rgba(255, 255, 255, 0.08)',
	borderRadius: '0.5rem',
	color: '#fafafa',
	fontFamily: 'monospace',
	fontSize: '0.85rem',
	outline: 'none',
	padding: '0.5rem 0.75rem',
	width: '100%'
};
export const confirmLabelStyle: CSSProperties = {
	color: '#a1a1aa',
	fontSize: '0.85rem',
	lineHeight: 1.6,
	marginBottom: '0.5rem'
};
export const copyButtonStyle: CSSProperties = {
	alignItems: 'center',
	background: 'transparent',
	border: 'none',
	color: '#71717a',
	cursor: 'pointer',
	display: 'inline-flex',
	fontSize: '0.75rem',
	padding: '0.1rem'
};
export const deleteButtonStyle: CSSProperties = {
	background: 'transparent',
	border: '1px solid rgba(239, 68, 68, 0.4)',
	borderRadius: '0.375rem',
	color: '#ef4444',
	cursor: 'pointer',
	fontFamily: 'inherit',
	fontSize: '0.7rem',
	padding: '0.2rem 0.5rem',
	transition: 'all 0.15s ease'
};
export const expandedPayloadStyle: CSSProperties = {
	fontSize: '0.75rem',
	maxHeight: '200px',
	overflowY: 'auto',
	padding: '0.75rem',
	whiteSpace: 'pre-wrap',
	wordBreak: 'break-all'
};
export const filterLabelStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	fontSize: '0.75rem',
	gap: '0.3rem',
	opacity: 0.7
};
export const filterRowStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexWrap: 'wrap',
	gap: '0.5rem'
};
export const gapStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem'
};
export const inputStyle: CSSProperties = {
	background: 'transparent',
	border: '1px solid rgba(128, 128, 128, 0.3)',
	borderRadius: '0.375rem',
	color: 'inherit',
	fontFamily: 'inherit',
	fontSize: '0.8rem',
	padding: '0.4rem 0.6rem'
};
export const modalButtonRowStyle: CSSProperties = {
	display: 'flex',
	gap: '0.5rem',
	justifyContent: 'flex-end'
};
export const modalDescStyle: CSSProperties = {
	color: '#a1a1aa',
	fontSize: '0.85rem',
	lineHeight: 1.5,
	marginBottom: '1rem'
};
export const modalEventInfoStyle: CSSProperties = {
	background: `linear-gradient(135deg, rgba(160, 231, 229, 0.04), rgba(180, 248, 200, 0.02))`,
	border: `1px solid rgba(160, 231, 229, 0.08)`,
	borderRadius: '0.5rem',
	fontSize: '0.8rem',
	marginBottom: '1.25rem',
	padding: '0.75rem 1rem'
};
export const modalEventLabelStyle: CSSProperties = {
	color: '#71717a',
	fontSize: '0.7rem',
	letterSpacing: '0.04em',
	marginBottom: '0.15rem',
	textTransform: 'uppercase'
};
export const modalStyle: CSSProperties = {
	background: `linear-gradient(160deg, #1a1a24 0%, #18181b 40%, #1c1820 100%)`,
	border: `1px solid rgba(160, 231, 229, 0.1)`,
	borderRadius: '0.75rem',
	boxShadow: `0 20px 48px rgba(0, 0, 0, 0.5), 0 0 80px rgba(160, 231, 229, 0.03)`,
	color: '#fafafa',
	maxWidth: '440px',
	padding: '1.5rem',
	width: '90vw'
};
export const modalTitleStyle: CSSProperties = {
	background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
	backgroundClip: 'text',
	fontSize: '1rem',
	fontWeight: 600,
	marginBottom: '0.5rem',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent'
};
export const paginationStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	gap: '0.75rem',
	justifyContent: 'center'
};
export const sectionTitleStyle: CSSProperties = {
	background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
	backgroundClip: 'text',
	fontSize: '1.25rem',
	fontWeight: 600,
	marginBottom: '1rem',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent'
};
export const tableStyle: CSSProperties = {
	borderCollapse: 'collapse',
	fontSize: '0.8rem',
	width: '100%'
};
export const tdStyle: CSSProperties = {
	borderBottom: '1px solid rgba(128, 128, 128, 0.1)',
	maxWidth: '200px',
	overflow: 'hidden',
	padding: '0.5rem 0.75rem',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap'
};
export const thStyle: CSSProperties = {
	borderBottom: `2px solid transparent`,
	borderImage: `linear-gradient(to right, ${primaryColor}40, ${secondaryColor}40) 1`,
	fontSize: '0.7rem',
	letterSpacing: '0.05rem',
	opacity: 0.7,
	padding: '0.5rem 0.75rem',
	textAlign: 'left',
	textTransform: 'uppercase'
};
export const sectionStyle = (themeSprings: ThemeSprings) => ({
	backdropFilter: 'blur(12px)',
	backgroundColor: themeSprings.theme.to((t: string) =>
		t.endsWith('dark')
			? 'rgba(17, 17, 22, 0.7)'
			: 'rgba(255, 255, 254, 0.7)'
	),
	border: themeSprings.theme.to((t: string) =>
		t.endsWith('dark')
			? '1px solid rgba(255, 255, 255, 0.05)'
			: '1px solid rgba(0, 0, 0, 0.05)'
	),
	borderRadius: '0.75rem',
	boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
	overflow: 'hidden',
	padding: '1.5rem',
	width: '100%'
});
