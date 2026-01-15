import { animated } from '@react-spring/web';
import { RxHamburgerMenu } from 'react-icons/rx';
import { ThemeSprings } from '../../../types/springTypes';

type MobileSidebarToggleProps = {
	onToggle: () => void;
	themeSprings: ThemeSprings;
};

export const MobileSidebarToggle = ({
	onToggle,
	themeSprings
}: MobileSidebarToggleProps) => (
	<animated.button
		onClick={onToggle}
		style={{
			alignItems: 'center',
			backgroundColor: themeSprings.themeTertiary,
			border: 'none',
			borderRadius: '50%',
			bottom: '1.5rem',
			boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
			color: themeSprings.contrastPrimary,
			cursor: 'pointer',
			display: 'flex',
			height: '56px',
			justifyContent: 'center',
			left: '1.5rem',
			position: 'fixed',
			width: '56px',
			zIndex: 9999
		}}
	>
		<RxHamburgerMenu size={24} />
	</animated.button>
);
