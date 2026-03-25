import { SpringValue } from '@react-spring/web';
import { CSSProperties } from 'react';
import { HALF } from '../../constants';
import { AnimatedCSSProperties, ThemeSprings } from '../../types/springTypes';

export const styleReset = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }

	button {
		cursor: pointer;
		background: none;
		border: none;
	}

	@keyframes aurora {
		0% { background-position: 0% 50%, 100% 50%, 50% 0%; }
		25% { background-position: 100% 0%, 0% 100%, 50% 50%; }
		50% { background-position: 50% 100%, 50% 0%, 0% 50%; }
		75% { background-position: 0% 0%, 100% 100%, 100% 50%; }
		100% { background-position: 0% 50%, 100% 50%, 50% 0%; }
	}
`;

export const bodyDefault = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	backgroundColor: themeSprings.themeSecondary,
	color: themeSprings.contrastPrimary,
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	lineHeight: '1.6',
	margin: 0
});

export const mainDefault = (
	overflow?: CSSProperties['overflow']
): CSSProperties => ({
	alignItems: 'center',
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	overflow
});

export const htmlDefault: CSSProperties = {
	colorScheme: 'light dark',
	fontFamily:
		'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
	height: '100%',
	overflowX: 'hidden'
};

type ButtonStyleProps<
	BG extends string = string,
	FG extends string = string
> = {
	backgroundColor?: string | SpringValue<BG>;
	color?: string | SpringValue<FG>;
	width?: string;
};

export const buttonStyle = <
	BG extends string = string,
	FG extends string = string
>({
	backgroundColor,
	color,
	width
}: ButtonStyleProps<BG, FG>): AnimatedCSSProperties => ({
	alignItems: 'center',
	backgroundColor,
	border: 'none',
	borderRadius: '8px',
	color,
	cursor: 'pointer',
	display: 'flex',
	fontSize: '0.875rem',
	fontWeight: 600,
	justifyContent: 'center',
	margin: '0.3125rem',
	padding: '0.625rem 1rem',
	textDecoration: 'none',
	textWrap: 'nowrap',
	width
});

export const formStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	padding: '16px',
	width: '300px'
};

export const formButtonStyle = (isFullOpacity?: boolean): CSSProperties => ({
	backgroundColor: '#007bff',
	border: 'none',
	borderRadius: '4px',
	color: '#fff',
	cursor: isFullOpacity ? 'pointer' : 'not-allowed',
	fontSize: '14px',
	opacity: isFullOpacity ? 1 : HALF,
	padding: '8px 16px'
});

export const headingStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastPrimary,
	fontSize: '2.5rem',
	marginBottom: '20px',
	textAlign: 'center'
});

export const paragraphStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastSecondary,
	fontSize: '1.2rem',
	lineHeight: '1.5',
	marginBottom: '20px',
	maxWidth: '1200px',
	textAlign: 'center'
});

export const linkStyle: CSSProperties = {
	color: '#fff',
	fontSize: '1.2rem',
	fontWeight: 'bold',
	textDecoration: 'none'
};

export const contentStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
	justifyContent: 'center'
};
