import { CSSProperties } from 'react';

export const heroStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'column',
	padding: '4rem 2rem',
	textAlign: 'center'
};

export const navStyle: CSSProperties = {
	display: 'flex',
	gap: '1rem',
	marginTop: '1rem'
};

export const featureWrapper: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '2rem',
	justifyContent: 'center',
	padding: '3rem 1rem'
};

export const featureCard: CSSProperties = {
	background: '#faf9f5',
	border: '1px solid rgba(0,0,0,0.05)',
	borderRadius: '8px',
	boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
	display: 'flex',
	flexDirection: 'column',
	padding: '1rem'
};

export const codeBlock: CSSProperties = {
	background: '#f5f5f5',
	borderRadius: '4px',
	fontFamily: 'monospace',
	marginTop: '1rem',
	overflowX: 'auto',
	padding: '1rem'
};
