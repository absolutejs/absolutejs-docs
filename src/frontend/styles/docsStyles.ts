import { CSSProperties } from "react";
import { lightTertiaryColor } from "./colors";

export const titleStyle: CSSProperties = {
	fontSize: '3rem',
	fontWeight: '700',
	marginBottom: '1rem',
	letterSpacing: '-0.025em'
};

export const sectionStyle: CSSProperties = {
	marginBottom: '3rem'
};

export const headingStyle: CSSProperties = {
	fontSize: '1.875rem',
	fontWeight: '600',
	marginBottom: '1rem',
	borderTop: `2px solid ${lightTertiaryColor}`, 
	paddingTop: '1rem',
	scrollMarginTop: '2rem'
};

export const paragraphStyle: CSSProperties = {
	fontSize: '1.0625rem',
	marginBottom: '1rem'
};

export const paragraphLargeStyle: CSSProperties = {
	fontSize: '1.125rem',
	marginBottom: '1rem'
};

export const paragraphSpacedStyle: CSSProperties = {
	fontSize: '1.0625rem',
	marginBottom: '1.5rem'
};

export const strongStyle: CSSProperties = {
	fontWeight: '600'
};

export const codeWrapperStyle: CSSProperties = {
	background: '#011627', // NOTE: Background of night-owl
	borderRadius: '1rem',
	padding: '1rem',
	// width: 'fit-content', // For removing excess width
	// maxWidth: '100%',
	// overflowX: 'auto'
};

export const listStyle: CSSProperties = {
	listStyleType: 'disc',
	paddingLeft: '2rem',
	marginTop: '0.75rem'
};

export const listItemStyle: CSSProperties = {
	marginBottom: '0.5rem',
	fontSize: '1.0625rem'
};

export const h1Style: CSSProperties = {
	fontSize: '3rem',
	marginBottom: '1rem',
};