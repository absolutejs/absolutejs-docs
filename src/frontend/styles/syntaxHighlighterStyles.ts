import { CSSProperties } from 'react';

export const highlighterContainerStyle: CSSProperties = {
	border: '1px solid #e1e1e8',
	borderRadius: '5px',
	overflow: 'hidden',
	position: 'relative',
	width: '100%'
};

export const highlighterHeaderStyle: CSSProperties = {
	alignItems: 'center',
	backgroundColor: '#f5f5f5',
	borderBottom: '1px solid #e1e1e8',
	display: 'flex',
	justifyContent: 'space-between',
	padding: '5px 10px'
};

export const highlighterCopyButtonStyle: CSSProperties = {
	alignItems: 'center',
	backgroundColor: 'transparent',
	border: 'none',
	color: '#333',
	cursor: 'pointer',
	display: 'flex',
	fontSize: '0.9em'
};

export const highlighterSelectContainerStyle: CSSProperties = {
	display: 'inline-block',
	marginLeft: '10px',
	position: 'relative'
};

export const highlighterSelectStyle: CSSProperties = {
	appearance: 'none',
	background: 'transparent',
	border: 'none',
	color: '#333',
	cursor: 'pointer',
	fontSize: '0.9em',
	MozAppearance: 'none',
	outline: 'none',
	paddingLeft: '0',
	paddingRight: '20px',
	WebkitAppearance: 'none'
};

export const selectArrowStyle: CSSProperties = {
	pointerEvents: 'none',
	position: 'absolute',
	right: '5px',
	top: '50%',
	transform: 'translateY(-50%)'
};
