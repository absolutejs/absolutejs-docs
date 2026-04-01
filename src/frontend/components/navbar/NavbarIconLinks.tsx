import { animated } from '@react-spring/web';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { ThemeSprings } from '../../../types/springTypes';

type NavbarIconLinksProps = {
	themeSprings: ThemeSprings;
};

export const NavbarIconLinks = ({ themeSprings }: NavbarIconLinksProps) => (
	<animated.div
		style={{
			alignItems: 'center',
			backgroundColor: themeSprings.themeTertiary,
			border: '1px solid rgba(128, 128, 128, 0.12)',
			borderRadius: '10px',
			display: 'flex',
			gap: '2px',
			height: '2.5rem',
			padding: '0 4px'
		}}
	>
		<animated.a
			href="https://github.com/absolutejs/absolutejs"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="GitHub"
			style={{
				alignItems: 'center',
				borderRadius: '7px',
				color: themeSprings.contrastPrimary,
				display: 'flex',
				height: '2rem',
				justifyContent: 'center',
				width: '2rem'
			}}
		>
			<FaGithub size={18} />
		</animated.a>
		<animated.a
			href="https://discord.gg/UBMw87Kj5r"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Discord"
			style={{
				alignItems: 'center',
				borderRadius: '7px',
				color: themeSprings.contrastPrimary,
				display: 'flex',
				height: '2rem',
				justifyContent: 'center',
				width: '2rem'
			}}
		>
			<FaDiscord size={18} />
		</animated.a>
	</animated.div>
);
