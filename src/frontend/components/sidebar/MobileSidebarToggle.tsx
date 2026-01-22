import { animated, useSpring } from '@react-spring/web';
import { FiMenu } from 'react-icons/fi';
import { ThemeSprings } from '../../../types/springTypes';

type MobileSidebarToggleProps = {
	onToggle: () => void;
	themeSprings: ThemeSprings;
};

export const MobileSidebarToggle = ({
	onToggle,
	themeSprings
}: MobileSidebarToggleProps) => {
	const [hoverSpring, hoverApi] = useSpring(() => ({
		config: { tension: 400, friction: 26 },
		opacity: 0.85
	}));

	return (
		<animated.button
			onClick={onToggle}
			onMouseEnter={() => hoverApi.start({ opacity: 1 })}
			onMouseLeave={() => hoverApi.start({ opacity: 0.85 })}
			style={{
				alignItems: 'center',
				backgroundColor: themeSprings.themeTertiary,
				border: 'none',
				borderRadius: '2rem',
				boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
				color: themeSprings.contrastPrimary,
				cursor: 'pointer',
				display: 'flex',
				fontSize: '0.8125rem',
				fontWeight: 500,
				gap: '0.375rem',
				left: '1.5rem',
				opacity: hoverSpring.opacity,
				padding: '0.5rem 0.875rem',
				position: 'fixed',
				top: '5.5rem',
				zIndex: 9999
			}}
		>
			<FiMenu size={16} />
			<span>Menu</span>
		</animated.button>
	);
};
