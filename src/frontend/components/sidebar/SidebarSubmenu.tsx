import { animated, useSpring } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { MenuButton } from '../../../types/types';
import { useContainerQuery } from '../../hooks/useContainerQuery';
import { AnimatedFaChevronDown } from '../utils/AnimatedComponents';
import { SidebarLink } from './SidebarLink';

type SidebarSubmenuProps<V extends string> = {
	button: MenuButton<V> & { buttons: MenuButton<V>[] };
	isOpen: boolean;
	navigateToView: (newView: V) => void;
	onToggle: () => void;
	themeSprings: ThemeSprings;
	view: V;
};

export const SidebarSubmenu = <V extends string>({
	button,
	isOpen,
	navigateToView,
	onToggle,
	themeSprings,
	view
}: SidebarSubmenuProps<V>) => {
	const {
		ref,
		dimensions: { scrollHeight }
	} = useContainerQuery<HTMLDivElement>();

	const submenuSprings = useSpring({
		config: { friction: 26, tension: 300 },
		height: isOpen ? scrollHeight : 0,
		opacity: isOpen ? 1 : 0,
		transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'
	});

	return (
		<div style={{ width: '100%' }}>
			<div
				style={{ alignItems: 'center', display: 'flex', width: '100%' }}
			>
				<div style={{ flex: 1, minWidth: 0 }}>
					<SidebarLink
						icon={button.icon}
						id={button.id}
						index={-1}
						label={button.label}
						navigateToView={navigateToView}
						themeSprings={themeSprings}
						view={view}
					/>
				</div>
				<animated.button
					aria-label={`Toggle ${button.label} rules`}
					onClick={onToggle}
					style={{
						alignItems: 'center',
						backgroundColor: 'transparent',
						border: 'none',
						color: themeSprings.contrastSecondary,
						cursor: 'pointer',
						display: 'flex',
						justifyContent: 'center',
						padding: '0.375rem'
					}}
					type="button"
				>
					<AnimatedFaChevronDown
						style={{
							fontSize: '0.5rem',
							opacity: 0.4,
							transform: submenuSprings.transform,
							transformOrigin: 'center'
						}}
					/>
				</animated.button>
			</div>
			<animated.nav
				ref={ref}
				style={{
					borderLeft: themeSprings.themeTertiary.to(
						(color) => `1px solid ${color}`
					),
					height: isOpen ? 'auto' : submenuSprings.height,
					marginLeft: '0.75rem',
					opacity: submenuSprings.opacity,
					overflow: isOpen ? 'visible' : 'hidden',
					paddingLeft: '0.25rem'
				}}
			>
				{button.buttons.map((subButton) => (
					<SidebarLink
						icon={subButton.icon}
						id={subButton.id}
						index={-1}
						key={subButton.id}
						label={subButton.label}
						navigateToView={navigateToView}
						themeSprings={themeSprings}
						view={view}
					/>
				))}
			</animated.nav>
		</div>
	);
};
