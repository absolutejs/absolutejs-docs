import { animated } from '@react-spring/web';
import { ReactNode } from 'react';
import { ThemeSprings } from '../../../types/springTypes';

type NavbarLinkProps = {
	icon?: ReactNode;
	href: string;
	label: string;
	themeSprings: ThemeSprings;
};

export const NavbarLink = ({
	icon,
	href,
	label,
	themeSprings
}: NavbarLinkProps) => (
	<animated.a
		href={href}
		style={{
			alignItems: 'center',
			color: themeSprings.contrastPrimary,
			display: 'flex',
			fontSize: '1.1rem',
			fontWeight: 500,
			gap: '8px',
			padding: '12px 16px',
			textDecoration: 'none'
		}}
	>
		{icon}
		{label}
	</animated.a>
);
