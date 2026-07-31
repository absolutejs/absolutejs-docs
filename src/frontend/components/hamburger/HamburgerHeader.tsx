import { animated } from '@react-spring/web';
import { FaTimes } from 'react-icons/fa';
import { ThemeSprings } from '../../../types/springTypes';

type HamburgerHeaderProps = {
	onClose: () => void;
	themeSprings: ThemeSprings;
};

export const HamburgerHeader = ({
	onClose,
	themeSprings
}: HamburgerHeaderProps) => (
	<animated.div
		style={{
			alignItems: 'center',
			backgroundColor: themeSprings.themePrimary,
			borderBottom: '1px solid rgba(128, 128, 128, 0.14)',
			boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
			display: 'flex',
			justifyContent: 'space-between',
			left: 0,
			padding: '1rem 1.25rem',
			position: 'fixed',
			top: 0,
			width: '100%'
		}}
	>
		<a
			href="/"
			style={{
				color: 'inherit',
				fontSize: '1.5rem',
				fontWeight: 'bold',
				textDecoration: 'none'
			}}
		>
			AbsoluteJS
		</a>
		<button
			aria-label="Close navigation menu"
			onClick={onClose}
			style={{
				alignItems: 'center',
				background: 'transparent',
				border: 'none',
				color: 'inherit',
				cursor: 'pointer',
				display: 'flex',
				height: '2.75rem',
				justifyContent: 'center',
				padding: 0,
				width: '2.75rem'
			}}
		>
			<FaTimes size={28} />
		</button>
	</animated.div>
);
