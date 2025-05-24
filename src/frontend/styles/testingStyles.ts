import { CSSProperties } from 'react';

export const legendWrapperStyle: CSSProperties = {
	backgroundColor: '#fff',
	border: '1px solid #ddd',
	borderRadius: '8px',
	boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
	margin: '0 auto 2rem',
	maxWidth: '800px',
	padding: '20px',
	width: '100%'
};

export const legendTitleStyle: CSSProperties = {
	fontSize: '1.25rem',
	fontWeight: 600,
	margin: '0 0 16px',
	textAlign: 'center'
};

export const legendGridStyle: CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	columnGap: '12px',
	rowGap: '12px',
	alignItems: 'center',
	margin: '0 auto',
	width: 'max-content'
};

export const legendFooterStyle: CSSProperties = {
	margin: '16px 0 0',
	textAlign: 'center'
};

export const badgeStyle = (
	backgroundColor: string,
	textColor = '#fff'
): CSSProperties => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor,
	color: textColor,
	width: '2rem',
	height: '2rem',
	borderRadius: '50%',
	fontSize: '1.2rem'
});

export const legendTextStyle: CSSProperties = {
	fontSize: '1rem',
	lineHeight: 1.6,
	margin: 0,
	textAlign: 'left'
};
