import { NavbarElement } from '../../types/types';

export const navbarData: NavbarElement[] = [
	{
		href: '/documentation',
		label: 'Documentation'
	},
	{
		href: '/citra',
		label: 'Citra',
		links: [
			{ href: '/citra/testing', label: 'Testing' },
			{ href: '/citra/documentation', label: 'Documentation' }
		]
	},
	{
		href: '/absolute-auth',
		label: 'Auth',
		links: [
			{ href: '/absolute-auth/testing', label: 'Testing' },
			{ href: '/absolute-auth/documentation', label: 'Documentation' }
		]
	},
	{
		href: '/blog',
		label: 'Blog'
	}
];
