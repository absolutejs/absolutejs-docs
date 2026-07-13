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
	buttons?: MenuButton<V>[];
};

export type MenuHeading = {
	heading: string;
};

export type MenuItem<V extends string = DocsView> =
	| MenuDropdown<V>
	| MenuButton<V>
	| MenuHeading;

export const isMenuDropdown = <V extends string>(
	element: MenuItem<V>
): element is MenuDropdown<V> => 'buttons' in element && !('id' in element);

export const isMenuHeading = <V extends string>(
	element: MenuItem<V>
): element is MenuHeading => 'heading' in element;

export const isSubmenuButton = <V extends string>(
	button: MenuButton<V>
): button is MenuButton<V> & { buttons: MenuButton<V>[] } =>
	Array.isArray(button.buttons) && button.buttons.length > 0;

export type DocsView = keyof typeof docsViews;

export type UserFunctionProps = {
	authProvider: string;
	userIdentity: Record<string, unknown>;
	db: DatabaseType;
};
