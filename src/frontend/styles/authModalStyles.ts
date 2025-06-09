import { CSSProperties } from 'react';
import { HALF } from '../../constants';
import { AnimatedCSSProperties, ThemeColors } from '../../types/types';
import { tertiaryColor } from './colors';

export const confirmInputStyle: CSSProperties = {
	border: '1px solid #ccc',
	borderRadius: '4px',
	marginBottom: '20px',
	padding: '10px',
	width: '100%'
};
export const containerStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	justifyContent: 'center',
	margin: '0 auto',
	minWidth: '400px',
	padding: '20px'
};

export const boxStyle = (primaryColor: string): CSSProperties => ({
	border: `2px solid ${primaryColor}`,
	borderRadius: '4px',
	fontFamily: 'monospace',
	height: '250px',
	margin: '0 0 8px',
	overflow: 'auto',
	padding: '16px',
	whiteSpace: 'pre-wrap'
});

export const buttonContainerStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	gap: '0.5rem'
};

export const oauthButtonContentStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	justifyContent: 'center',
	paddingLeft: '12px',
	paddingRight: '12px',
	width: '100%'
};

export const oauthButtonStyle = ({
	isProviderSelected = false,
	providerPrimaryColor = '#747775'
}): CSSProperties => ({
	alignItems: 'center',
	backgroundColor: '#FFFFFF',
	border: `1px solid ${providerPrimaryColor}`,
	borderRadius: '4px',
	boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
	color: '#1f1f1f',
	cursor: isProviderSelected ? 'pointer' : 'not-allowed',
	display: 'flex',
	fontSize: '14px',
	justifyContent: 'center',
	marginBottom: '10px',
	padding: '10px',
	textDecoration: 'none',
	textWrap: 'nowrap',
	width: '100%'
});

export const oauthButtonTextStyle: CSSProperties = {
	overflow: 'hidden',
	textAlign: 'center',
	textOverflow: 'ellipsis'
};
export const oauthIconStyle: CSSProperties = {
	height: '24px',
	marginRight: '10px',
	objectFit: 'contain',
	width: '24px'
};
export const headingStyle: CSSProperties = {
	fontSize: '1.5rem',
	marginBottom: '20px',
	textAlign: 'center'
};

export const labelStyle = (
	themeSprings: ThemeColors
): AnimatedCSSProperties => ({
	color: themeSprings.contrastSecondary,
	fontSize: '1.5rem',
	marginBottom: '-2px',
	textAlign: 'left',
	textDecoration: 'none'
});

export const loginLinkTextStyle: CSSProperties = {
	backgroundColor: 'transparent',
	border: 'none',
	color: tertiaryColor,
	cursor: 'pointer',
	fontSize: '14px',
	fontWeight: 'bold',
	textAlign: 'center'
};
export const loginTextStyle: CSSProperties = {
	color: '#151414',
	textAlign: 'center'
};

export const separatorStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	justifyContent: 'center',
	margin: '20px 0',
	width: '100%'
};
export const separatorTextStyle: CSSProperties = {
	color: '#747775',
	fontSize: '14px',
	padding: '0 10px'
};

export const separatorLineStyle = ({
	color = '#DDDDDD',
	height = '1px'
} = {}): CSSProperties => ({
	backgroundColor: color,
	flexGrow: 1,
	height: height
});

/* eslint-disable no-magic-numbers */
export const getContrastColor = (hex: string) => {
	const red = parseInt(hex.slice(1, 3), 16);
	const green = parseInt(hex.slice(3, 5), 16);
	const blue = parseInt(hex.slice(5, 7), 16);
	const yiq = (red * 299 + green * 587 + blue * 114) / 1000;

	return yiq >= 128 ? '#000' : '#fff';
};
/* eslint-enable no-magic-numbers */

export const credentialLinkStyle = (
	companyColor = '#747775'
): CSSProperties => ({
	border: `2px solid ${companyColor}`,
	borderRadius: '4px',
	color: 'black',
	flex: '1',
	padding: '12px 0',
	textAlign: 'center',
	textDecoration: 'none'
});

export const opButtonStyle = (
	disabled: boolean,
	providerPrimaryColor = '#747775'
): CSSProperties => ({
	backgroundColor: providerPrimaryColor,
	border: `2px solid ${providerPrimaryColor}`,
	borderRadius: '4px',
	color: getContrastColor(providerPrimaryColor),
	cursor: disabled ? 'not-allowed' : 'pointer',
	fontSize: '1rem',
	lineHeight: '1.2rem',
	opacity: disabled ? HALF : 1,
	padding: '12px 0',
	textAlign: 'center',
	textDecoration: 'none',
	width: '100%'
});
