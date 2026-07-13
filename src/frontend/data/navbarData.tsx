import { NavbarElement } from '../../types/types';

export const navbarData: NavbarElement[] = [
	{
		href: '/documentation',
		label: 'Documentation'
	},
	{
		href: '/documentation/packages',
		label: 'Packages'
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
	},
	{
		href: '/blog',
		label: 'Blog'
	}
];
