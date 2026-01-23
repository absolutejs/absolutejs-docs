import { animated, AnimatedComponent, useSpring } from '@react-spring/web';
import { useEffect } from 'react';
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
	themeSprings
}: SidebarDropdownProps) => {
	const {
		ref,
		dimensions: { scrollHeight }
	} = useContainerQuery<HTMLDivElement>();
	const [dropdownSprings, dropdownApi] = useSpring(() => ({
		config: { tension: 300, friction: 26 },
		height: 0,
		opacity: 0,
		transform: 'rotate(-90deg)'
	}));

	// TODO: Update the rule to handle icons or other components someone doesnt control

	const toggleDropdown = () => {
		if (ref === null) return;

		const isOpen = dropdownSprings.opacity.get() > 0;

		void dropdownApi.start({
			height: isOpen ? 0 : scrollHeight,
			opacity: isOpen ? 0 : 1,
			transform: isOpen ? 'rotate(-90deg)' : 'rotate(0deg)'
		});
	};

	useEffect(() => {
		const buttonIds = buttons.map((button) => button.id);
		if (buttonIds.includes(view)) {
			void dropdownApi.start({
				height: scrollHeight,
				opacity: 1,
				transform: 'rotate(0deg)'
			});
		}
	}, [scrollHeight]);

	const Icon = icon;

	return (
		<div style={{ marginTop: '0.5rem', width: '100%' }}>
			<animated.button
				onClick={toggleDropdown}
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
					height: dropdownSprings.height,
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
