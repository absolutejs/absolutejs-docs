import { NavbarElement } from '../../types/types';

export const navbarData: NavbarElement[] = [
	{
		href: '/documentation',
		label: 'Documentation'
	},
	{
		href: '/packages',
		label: 'Packages',
		links: [
			{
				href: '/create',
				label: 'Create Abs'
			},
			{
				href: '/citra',
				label: 'Citra'
			},
			{
				href: '/auth',
				label: 'Abs Auth'
			},
			{
				href: '/eslint',
				label: 'Eslint Rules'
			}
		]
	},
	{
		href: '/testing',
		label: 'Testing',
		links: [
			{
				href: '/testing/auth',
				label: 'Authentication'
			}
		]
	}
];
