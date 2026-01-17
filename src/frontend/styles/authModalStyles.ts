import { CSSProperties } from 'react';
import { HALF } from '../../constants';
import { AnimatedCSSProperties, ThemeSprings } from '../../types/springTypes';

export const confirmInputStyle: CSSProperties = {
	border: '1px solid #ccc',
	borderRadius: '4px',
	marginBottom: '20px',
	padding: '10px',
	width: '100%'
};
export const containerStyle = (isMobile: boolean): CSSProperties => ({
	alignItems: 'center',
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	justifyContent: 'center',
	margin: '0 auto',
	minWidth: isMobile ? '300px' : '340px',
	padding: '24px 28px'
});

/* eslint-disable no-magic-numbers */
const ensureMinimumBrightness = (hex: string, minBrightness = 80): string => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	if (brightness < minBrightness) {
		return '#808080';
	}

	return hex;
};
/* eslint-enable no-magic-numbers */

export const boxStyle = (
	primaryColor: string,
	isMobile: boolean
): CSSProperties => {
	const safeColor = ensureMinimumBrightness(primaryColor);

	return {
		alignItems: 'center',
		backgroundColor: `${safeColor}12`,
		border: `1px solid ${safeColor}40`,
		borderRadius: '12px',
		display: 'flex',
		fontFamily:
			'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
		fontSize: '0.875rem',
		height: isMobile ? '180px' : '260px',
		justifyContent: 'center',
		lineHeight: 1.6,
		margin: 0,
		overflow: 'auto',
		padding: '20px 24px',
		textAlign: 'center',
		whiteSpace: 'pre-wrap'
	};
};

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

type OAuthButtonStyleProps = {
	isProviderSelected?: boolean;
	providerPrimaryColor?: string;
	themeSprings: ThemeSprings;
};

export const oauthButtonStyle = ({
	isProviderSelected = false,
	themeSprings
}: OAuthButtonStyleProps): AnimatedCSSProperties => ({
	alignItems: 'center',
	backgroundColor: themeSprings.themeTertiary,
	border: '1px solid rgba(128, 128, 128, 0.12)',
	borderRadius: '12px',
	boxShadow:
		'0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
	color: themeSprings.contrastPrimary,
	cursor: isProviderSelected ? 'pointer' : 'not-allowed',
	display: 'flex',
	fontSize: '0.9rem',
	fontWeight: 500,
	justifyContent: 'center',
	opacity: isProviderSelected ? 1 : HALF,
	padding: '16px 20px',
	textDecoration: 'none',
	textWrap: 'nowrap',
	width: '100%'
});

export const oauthButtonTextStyle: CSSProperties = {
	overflow: 'hidden',
	textAlign: 'center',
	textOverflow: 'ellipsis'
};

// Providers with dark/black logos that need inversion in dark mode
export const DARK_LOGO_PROVIDERS = new Set([
	'42',
	'amazon',
	'anilist',
	'apple',
	'atlassian',
	'auth0',
	'authentik',
	'autodesk',
	'battlenet',
	'bitbucket',
	'box',
	'bungie',
	'coinbase',
	'discord',
	'dribbble',
	'dropbox',
	'epicgames',
	'gitea',
	'gitlab',
	'kakao',
	'keycloak',
	'kick',
	'lichess',
	'linear',
	'myanimelist',
	'notion',
	'okta',
	'patreon',
	'polar',
	'roblox',
	'salesforce',
	'shikimori',
	'strava',
	'tiktok',
	'vk',
	'withings'
]);

export const oauthIconStyle = (): CSSProperties => ({
	height: '24px',
	marginRight: '10px',
	objectFit: 'contain',
	width: '24px'
});
export const headingStyle: CSSProperties = {
	fontSize: '1.25rem',
	fontWeight: 600,
	marginBottom: '24px',
	marginTop: '8px',
	textAlign: 'center'
};

export const labelStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	backgroundColor: 'transparent',
	border: 'none',
	color: themeSprings.contrastSecondary,
	display: 'flex',
	fontSize: '1rem',
	fontWeight: 'bold',
	textAlign: 'left',
	textDecoration: 'none'
});

export const loginLinkTextStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	backgroundColor: 'transparent',
	border: 'none',
	color: themeSprings.contrastSecondary,
	cursor: 'pointer',
	fontSize: '14px',
	fontWeight: 'bold',
	textAlign: 'center'
});

export const loginTextStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastPrimary,
	textAlign: 'center'
});

export const separatorStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	justifyContent: 'center',
	margin: '24px 0',
	width: '100%'
};
export const separatorTextStyle: CSSProperties = {
	color: '#888',
	fontSize: '0.8rem',
	fontWeight: 500,
	padding: '0 16px',
	textTransform: 'uppercase'
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
	backgroundColor: `${companyColor}10`,
	border: `1px solid ${companyColor}40`,
	borderRadius: '10px',
	color: 'inherit',
	flex: '1',
	fontSize: '0.875rem',
	fontWeight: 500,
	padding: '12px 16px',
	textAlign: 'center',
	textDecoration: 'none'
});

export const opButtonStyle = (
	disabled: boolean,
	providerPrimaryColor = '#747775'
): CSSProperties => ({
	backgroundColor: disabled
		? 'rgba(128, 128, 128, 0.15)'
		: providerPrimaryColor,
	border: disabled
		? '1px solid rgba(128, 128, 128, 0.2)'
		: `1px solid ${providerPrimaryColor}`,
	borderRadius: '10px',
	color: disabled
		? 'rgba(128, 128, 128, 0.6)'
		: getContrastColor(providerPrimaryColor),
	cursor: disabled ? 'not-allowed' : 'pointer',
	fontSize: '0.875rem',
	fontWeight: 500,
	lineHeight: '1.4',
	padding: '12px 16px',
	textAlign: 'center',
	textDecoration: 'none',
	width: '100%'
});
