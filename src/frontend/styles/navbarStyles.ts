import { SpringValue } from '@react-spring/web';
import { CSSProperties } from 'react';
import { AnimatedCSSProperties, ThemeSprings } from '../../types/springTypes';

export const dropdownStyle: CSSProperties = {
	alignItems: 'center',
	cursor: 'pointer',
	display: 'inline-flex',
	position: 'relative',
	zIndex: 1000
};
export const hamburgerButtonStyle: CSSProperties = {
	alignItems: 'center',
	background: 'transparent',
	border: 'none',
	color: 'inherit',
	cursor: 'pointer',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	height: '3.5rem',
	justifyContent: 'center',
	marginLeft: '0.5rem',
	padding: '0',
	width: '2.5rem'
};
export const optionStyle: CSSProperties = {
	alignItems: 'center',
	cursor: 'pointer',
	display: 'flex',
	textDecoration: 'none',
	whiteSpace: 'nowrap'
};
export const profileButtonStyle: CSSProperties = {
	alignItems: 'center',
	border: 'none',
	borderRadius: '50%',
	cursor: 'pointer',
	display: 'flex',
	height: '2.25rem',
	justifyContent: 'center',
	overflow: 'hidden',
	padding: '0',
	width: '2.25rem'
};
export const dropdownItemStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	backgroundColor: 'transparent',
	borderRadius: '8px',
	color: themeSprings.contrastPrimary,
	display: 'flex',
	fontSize: '0.875rem',
	fontWeight: 500,
	gap: '8px',
	padding: '10px 14px',
	textDecoration: 'none'
});
export const getNavbarDropdownListStyle = (
	dropdownSpring: {
		height: SpringValue<number>;
		opacity: SpringValue<number>;
		transform: SpringValue<string>;
	},
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	backdropFilter: 'blur(12px)',
	backgroundColor: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'rgba(9, 9, 11, 0.95)'
			: 'rgba(255, 255, 255, 0.95)'
	),
	border: '1px solid rgba(128, 128, 128, 0.12)',
	borderRadius: '12px',
	boxShadow: `0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)`,
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
	height: dropdownSpring.height,
	left: '50%',
	marginLeft: '-80px',
	minWidth: '160px',
	opacity: dropdownSpring.opacity,
	overflow: 'hidden',
	padding: '8px',
	pointerEvents: dropdownSpring.opacity.to((opacity) =>
		opacity > 0 ? 'auto' : 'none'
	),
	position: 'absolute',
	top: 'calc(100% + 8px)',
	whiteSpace: 'nowrap',
	width: 'auto'
});
export const navbarContainerStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	backdropFilter: 'blur(12px)',
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? 'rgba(9, 9, 11, 0.8)'
			: 'rgba(255, 255, 255, 0.8)'
	),
	borderBottom: '1px solid',
	borderImage:
		'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent) 1',
	boxShadow:
		'0 1px 3px rgba(99, 102, 241, 0.06), 0 1px 0 rgba(0, 0, 0, 0.03)',
	color: themeSprings.contrastPrimary,
	display: 'flex',
	justifyContent: 'space-between',
	left: 0,
	padding: '0.75rem 1.5rem',
	position: 'sticky',
	top: 0,
	WebkitBackdropFilter: 'blur(12px)',
	width: '100%',
	zIndex: 100
});
export const navbarDrowdownLinkStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	alignItems: 'center',
	background: 'none',
	border: 'none',
	color: themeSprings.contrastSecondary,
	display: 'flex',
	fontSize: '0.9375rem',
	textDecoration: 'none'
});
