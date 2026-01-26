import { NavbarElement } from '../../types/types';

export const navbarData: NavbarElement[] = [
	{
		href: '/documentation',
		label: 'Documentation'
	},
	{
		href: '/documentation',
		label: 'Ecosystem',
		links: [
			{
				href: '/documentation/absolute-auth',
				label: 'Auth'
			},
			{
				href: '/documentation/citra',
				label: 'Citra'
			},
			{
				href: '/documentation/create-absolutejs',
				label: 'Create'
			},
			{
				href: '/documentation/eslint',
				label: 'ESLint'
			},
			{
				href: '/documentation/scoped-state',
				label: 'Scoped State'
			}
		]
	},
	{
		href: '/testing',
		label: 'Testing',
		links: [
			{
				href: '/testing/authentication',
				label: 'Authentication'
			}
		]
	}
];
