import { AnimatedProps, SpringValue } from '@react-spring/web';
import { CSSProperties, ReactNode } from 'react';
import { DatabaseType } from '../../db/schema';

export type AnimatedCSSProperties = AnimatedProps<CSSProperties>;

export type NavbarLink = {
	href: string;
	label: string;
	icon?: ReactNode;
};

type NavbarDropdown = {
	label: string;
	href: string;
	links: NavbarLink[];
	icon?: ReactNode;
};

export const isNavbarDropdown = (
	element: NavbarElement
): element is NavbarDropdown => 'links' in element;

export type NavbarElement = NavbarLink | NavbarDropdown;

export type UserFunctionProps = {
	authProvider: string;
	userIdentity: Record<string, unknown>;
	db: DatabaseType;
};

export type ThemeColors = {
	themePrimary: SpringValue<string>;
	themeSecondary: SpringValue<string>;
	themeTertiary: SpringValue<string>;
	contrastPrimary: SpringValue<string>;
	contrastSecondary: SpringValue<string>;
};
