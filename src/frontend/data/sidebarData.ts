import { NavbarElement } from '../../types/types';

export const sidebarData: NavbarElement[] = [
	{
		href: '/documentation',
		label: 'Overview'
	},
	{
		href: '/documentation/getting-started',
		label: 'Getting Started',
		links: [
			{
				href: '/documentation/getting-started/installation',
				label: 'Installation'
			},
			{
				href: '/documentation/getting-started/quickstart',
				label: 'Quickstart'
			}
		]
	},
	{
		href: '/documentation/packages',
		label: 'Packages',
		links: [
			{
				href: '/documentation/packages/create',
				label: 'Create'
			},
			{
				href: '/documentation/packages/citra',
				label: 'Citra'
			},
			{
				href: '/documentation/packages/auth',
				label: 'Auth'
			},
			{
				href: '/documentation/packages/eslint',
				label: 'Eslint'
			},
		]
	},
	{
		href: '/documentation/databases',
		label: 'Databases',
	}
];
