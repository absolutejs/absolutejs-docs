import { animated, AnimatedComponent, useSpring } from '@react-spring/web';
import { IconType } from 'react-icons';
import {
	SidebarLinksApi,
	SidebarLinksSprings,
	ThemeSprings
} from '../../../types/springTypes';
import { MenuButton, DocsView } from '../../../types/types';
import { useContainerQuery } from '../../hooks/useContainerQuery';
import { AnimatedFaChevronDown } from '../utils/AnimatedComponents';
import { SidebarLink } from './SidebarLink';

type SidebarDropdownProps = {
	label: string;
	linksSprings: SidebarLinksSprings;
	linksApi: SidebarLinksApi;
	buttons: MenuButton[];
	icon?: AnimatedComponent<IconType>;
	navigateToView: (newView: DocsView) => void;
	themeSprings: ThemeSprings;
	startIndex: number;
	view: DocsView;
	isOpen: boolean;
	onToggle: () => void;
};

export const SidebarDropdown = ({
	label,
	icon,
	view,
	linksSprings,
	linksApi,
	buttons,
	startIndex,
	navigateToView,
	themeSprings,
	isOpen,
	onToggle
}: SidebarDropdownProps) => {
	const {
		ref,
		dimensions: { scrollHeight }
	} = useContainerQuery<HTMLDivElement>();

	// TODO: Update the rule to handle icons or other components someone doesnt control

	// Only animate when we have a measured height, otherwise use auto
	const hasHeight = scrollHeight > 0;
	const dropdownSprings = useSpring({
		config: { tension: 300, friction: 26 },
		height: isOpen ? scrollHeight : 0,
		opacity: isOpen ? 1 : 0,
		transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'
	});

	// Use auto height until we have a measurement
	const heightStyle = !hasHeight && isOpen ? 'auto' : dropdownSprings.height;

	const Icon = icon;

	return (
		<div style={{ marginTop: '0.5rem', width: '100%' }}>
			<animated.button
				onClick={onToggle}
				style={{
					alignItems: 'center',
					backgroundColor: 'transparent',
					border: 'none',
					color: themeSprings.contrastSecondary,
					cursor: 'pointer',
					display: 'flex',
					justifyContent: 'space-between',
					padding: '0.5rem 0.25rem',
					width: '100%'
				}}
			>
				<animated.span
					style={{
						alignItems: 'center',
						color: themeSprings.contrastSecondary,
						display: 'flex',
						fontSize: '0.75rem',
						fontWeight: 600,
						letterSpacing: '0.03em',
						opacity: 0.6,
						textTransform: 'uppercase'
					}}
				>
					{Icon && (
						<Icon
							style={{
								fontSize: '0.75rem',
								marginRight: '0.4rem'
							}}
						/>
					)}
					<span>{label}</span>
				</animated.span>
				<AnimatedFaChevronDown
					style={{
						fontSize: '0.5rem',
						opacity: 0.4,
						transform: dropdownSprings.transform,
						transformOrigin: 'center'
					}}
				/>
			</animated.button>
			<animated.nav
				ref={ref}
				style={{
					height: heightStyle,
					opacity: dropdownSprings.opacity,
					overflow: 'hidden'
				}}
			>
				{buttons.map((button, index) => (
					<SidebarLink
						view={view}
						linkSprings={linksSprings[startIndex + index]}
						index={startIndex + index}
						linksApi={linksApi}
						navigateToView={navigateToView}
						themeSprings={themeSprings}
						key={index}
						icon={button.icon}
						id={button.id}
						label={button.label}
					/>
				))}
			</animated.nav>
		</div>
	);
};
