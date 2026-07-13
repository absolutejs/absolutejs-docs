import { ReactNode } from 'react';
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

export type SidebarStatus = 'alpha' | 'beta';

export type SidebarPage = {
	id: DocsView;
	label: string;
};

export type SidebarEntry = {
	id?: DocsView;
	label: string;
	pages?: SidebarPage[];
	status?: SidebarStatus;
};

export type SidebarCategory = {
	entries: SidebarEntry[];
	label: string;
};

export const isExpandableEntry = (
	entry: SidebarEntry
): entry is SidebarEntry & { pages: SidebarPage[] } =>
	Array.isArray(entry.pages) && entry.pages.length > 0;

export const sidebarEntryKey = (category: string, entry: SidebarEntry) =>
	`${category}/${entry.label}`;

export type DocsView = keyof typeof docsViews;

export type UserFunctionProps = {
	authProvider: string;
	userIdentity: Record<string, unknown>;
	db: DatabaseType;
};
