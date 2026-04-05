import { CSSProperties } from 'react';
import { HALF } from '../../../../../constants';
import { ThemeSprings } from '../../../../../types/springTypes';
import { primaryColor, secondaryColor } from '../../../../styles/colors';

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
export const drilldownStyle: CSSProperties = {
	background: 'rgba(128, 128, 128, 0.05)',
	borderRadius: '0.5rem',
	margin: '0 0.5rem',
	padding: '1rem'
};
export const eventColumns = [
	'event',
	'version',
	'os',
	'arch',
	'client_timestamp',
	'payload'
] as const;

export type EventColumn = (typeof eventColumns)[number];
export const gapStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem'
};
export { HALF };
export const inputStyle: CSSProperties = {
	background: 'transparent',
	border: '1px solid rgba(128, 128, 128, 0.3)',
	borderRadius: '0.375rem',
	color: 'inherit',
	fontFamily: 'inherit',
	fontSize: '0.8rem',
	maxWidth: '400px',
	padding: '0.4rem 0.6rem',
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
export const labelCellStyle: CSSProperties = {
	...tdStyle,
	cursor: 'text',
	minWidth: '120px'
};
export const labelInputStyle: CSSProperties = {
	background: 'transparent',
	border: '1px solid rgba(128, 128, 128, 0.5)',
	borderRadius: '0.25rem',
	color: 'inherit',
	flex: 1,
	fontFamily: 'inherit',
	fontSize: '0.8rem',
	minWidth: '80px',
	padding: '0.2rem 0.4rem'
};
export const paginationStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	gap: '0.75rem',
	justifyContent: 'center',
	marginTop: '0.5rem'
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
export const userColumns = [
	'anonymous_id',
	'label',
	'total_events',
	'first_seen',
	'last_seen',
	'versions',
	'os_list'
] as const;

export type UserColumn = (typeof userColumns)[number];
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
