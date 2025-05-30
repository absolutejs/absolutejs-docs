import { CSSProperties } from 'react';

export const highlighterContainerStyle: CSSProperties = {
	position: 'relative',
	borderRadius: '5px',
	overflow: 'hidden',
	border: '1px solid #e1e1e8'
};

export const highlighterHeaderStyle: CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	backgroundColor: '#f5f5f5',
	padding: '5px 10px',
	borderBottom: '1px solid #e1e1e8'
};

export const highlighterCopyButtonStyle: CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	backgroundColor: 'transparent',
	color: '#333',
	border: 'none',
	cursor: 'pointer',
	fontSize: '0.9em'
};

export const highlighterSelectContainerStyle: CSSProperties = {
	position: 'relative',
	display: 'inline-block',
	marginLeft: '10px'
};

export const highlighterSelectStyle: CSSProperties = {
	fontSize: '0.9em',
	background: 'transparent',
	border: 'none',
	color: '#333',
	appearance: 'none',
	WebkitAppearance: 'none',
	MozAppearance: 'none',
	paddingRight: '20px',
	paddingLeft: '0',
	outline: 'none',
	cursor: 'pointer'
};

export const selectArrowStyle: CSSProperties = {
	position: 'absolute',
	top: '50%',
	right: '5px',
	pointerEvents: 'none',
	transform: 'translateY(-50%)'
};
