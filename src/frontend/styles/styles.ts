import { SpringValue } from '@react-spring/web';
import { CSSProperties } from 'react';
import { HALF } from '../../constants';
import { AnimatedCSSProperties, ThemeSprings } from '../../types/types';

export const styleReset = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-weight: inherit;
    }
`;

export const bodyDefault = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	backgroundColor: themeSprings.themeSecondary,
	color: themeSprings.contrastPrimary,
	display: 'flex',
	flexDirection: 'column',
	fontFamily: 'Poppins, sans-serif',
	height: '100%',
	lineHeight: '1.4',
	margin: 0,
	width: '100%',
	overflowX: 'hidden'
});

export const mainDefault: CSSProperties = {
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	width: '100%'
};

export const htmlDefault: CSSProperties = {
	height: '100%',
	width: '100%',
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
	borderRadius: '0.3125rem',
	color,
	cursor: 'pointer',
	display: 'flex',
	fontSize: '1rem',
	fontWeight: 'bold',
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

export const h2Style = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastPrimary,
	fontSize: '1.8rem',
	fontWeight: '600',
	marginBottom: '20px',
	marginTop: '0px',
	paddingBottom: '16px',
	borderBottom: `3px solid ${themeSprings.themeTertiary.get()}`,
	position: 'relative',
	display: 'inline-block',
	background: `linear-gradient(135deg, ${themeSprings.themeTertiary.get()}20, transparent)`,
	padding: '12px 20px',
	borderRadius: '8px 8px 0 0',
	borderBottom: `3px solid ${themeSprings.themeTertiary.get()}`
});

export const h3Style = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastSecondary,
	fontSize: '1.2rem',
	fontWeight: '500',
	marginBottom: '8px',
	marginTop: '16px'
});

export const beforeAfterContainerStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
	marginBottom: '40px',
	marginTop: '20px'
};

export const beforeAfterColumnStyle: CSSProperties = {
	flex: 1,
	minWidth: 0
};

export const beforeAfterHeadingStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastSecondary,
	fontSize: '1.1rem',
	fontWeight: '600',
	marginBottom: '16px',
	marginTop: '8px',
	textAlign: 'center',
	textTransform: 'uppercase',
	letterSpacing: '0.5px',
	background: `linear-gradient(135deg, ${themeSprings.themeTertiary.get()}30, transparent)`,
	padding: '8px 16px',
	borderRadius: '6px',
	border: `1px solid ${themeSprings.themeTertiary.get()}40`
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

export const sectionStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	backgroundColor: themeSprings.themePrimary,
	borderRadius: '16px',
	padding: '40px',
	marginBottom: '40px',
	boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
	border: `1px solid ${themeSprings.themeTertiary.get()}`,
	transition: 'all 0.3s ease',
	position: 'relative',
	overflow: 'hidden',
	zIndex: 0
});

export const tableOfContentsStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	backgroundColor: themeSprings.themePrimary,
	borderRadius: '16px',
	padding: '32px',
	marginBottom: '40px',
	boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
	border: `1px solid ${themeSprings.themeTertiary.get()}`,
	position: 'sticky',
	top: '20px'
});

export const ruleDescriptionStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastSecondary,
	fontSize: '1.1rem',
	lineHeight: '1.6',
	marginBottom: '24px',
	fontWeight: '400'
});

export const introStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.contrastSecondary,
	fontSize: '1.2rem',
	lineHeight: '1.7',
	marginBottom: '48px',
	maxWidth: '800px',
	margin: '0 auto 48px auto',
	textAlign: 'center',
	fontWeight: '400'
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
