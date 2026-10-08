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
	/** Section of the page to scroll to, such as a category on the Packages page. */
	anchor?: string;
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

export type DocsView = Extract<keyof typeof docsViews, string>;

export type DocsSearchResult = {
	anchor: string | null;
	breadcrumb: string[];
	heading: string | null;
	snippet: string;
	title: string;
	view: string;
};

export type UserFunctionProps = {
	authProvider: string;
	userIdentity: Record<string, unknown>;
	db: DatabaseType;
};
