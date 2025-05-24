import { NavbarElement } from '../../types/types';

export const navbarData: NavbarElement[] = [
	{
		href: '/documentation',
		label: 'Documentation'
	},
	{
		href: '/citra',
		label: 'Citra',
		links: [{ href: '/citra/documentation', label: 'Documentation' }]
	},
	{
		href: '/auth',
		label: 'Auth',
		links: [
			{ href: '/auth/documentation', label: 'Documentation' },
			{ href: '/auth/testing', label: 'Testing' }
		]
	},
	{
		href: '/CLI',
		label: 'CLI',
		links: [
			{ href: '/CLI/documentation', label: 'Documentation' },
			{ href: '/CLI/commands', label: 'Commands' }
		]
	},
	{
		href: '/blog',
		label: 'Blog'
	}
];
