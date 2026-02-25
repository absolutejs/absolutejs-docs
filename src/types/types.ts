import { AnimatedComponent } from '@react-spring/web';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { DatabaseType } from '../../db/schema';
import { docsViews } from '../frontend/data/sidebarData';

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

export type MenuDropdown<V extends string = DocsView> = {
	label: string;
	buttons: MenuButton<V>[];
	icon: AnimatedComponent<IconType>;
};

export type MenuButton<V extends string = DocsView> = {
	id: V;
	label: string;
	icon?: AnimatedComponent<IconType>;
};

export type MenuItem<V extends string = DocsView> =
	| MenuDropdown<V>
	| MenuButton<V>;

export const isMenuDropdown = <V extends string>(
	element: MenuItem<V>
): element is MenuDropdown<V> => 'buttons' in element;

export type DocsView = keyof typeof docsViews;

export type UserFunctionProps = {
	authProvider: string;
	userIdentity: Record<string, unknown>;
	db: DatabaseType;
};
