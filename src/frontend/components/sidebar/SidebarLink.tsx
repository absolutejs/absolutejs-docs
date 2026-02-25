import { animated, AnimatedComponent, useSpring } from '@react-spring/web';
import { useEffect } from 'react';
import { IconType } from 'react-icons';
import {
	SidebarLinksApi,
	SidebarLinksSprings,
	ThemeSprings
} from '../../../types/springTypes';
import { primaryColor } from '../../styles/colors';

type SidebarLinkProps<V extends string> = {
	icon?: AnimatedComponent<IconType>;
	label: string;
	themeSprings: ThemeSprings;
	linkSprings?: SidebarLinksSprings[number];
	linksApi?: SidebarLinksApi;
	id: V;
	view: V;
	index: number;
	navigateToView: (newView: V) => void;
};

export const SidebarLink = <V extends string>({
	icon,
	linkSprings,
	linksApi,
	index,
	view,
	id,
	navigateToView,
	label,
	themeSprings
}: SidebarLinkProps<V>) => {
	const Icon = icon;
	const isOverview = id === 'overview';
	const isActive = view === id;

	const [springStyles, springApi] = useSpring(() => ({
		backgroundColor: isActive ? primaryColor : 'transparent',
		opacity: isActive ? 1 : 0,
		config: { tension: 300, friction: 26 }
	}));

	useEffect(() => {
		if (isOverview) {
			void springApi.start({
				backgroundColor: isActive ? primaryColor : 'transparent',
				opacity: isActive ? 1 : 0
			});
		}
	}, [isActive, isOverview, springApi]);

	return (
		<animated.button
			style={{
				alignItems: 'center',
				backgroundColor: 'transparent',
				border: 'none',
				borderRadius: '4px',
				color: themeSprings.contrastSecondary,
				cursor: 'pointer',
				display: 'flex',
				padding: '0 0.5rem',
				position: 'relative',
				width: '100%'
			}}
			onMouseEnter={() => {
				if (!isActive) {
					if (isOverview) {
						void springApi.start({ opacity: 1 });
					} else {
						linksApi?.start((i) => {
							if (i !== index || view === id) return undefined;
							return { opacity: 1 };
						});
					}
				}
			}}
			onMouseLeave={() => {
				if (!isActive) {
					if (isOverview) {
						void springApi.start({ opacity: 0 });
					} else {
						linksApi?.start((i) => {
							if (i !== index || view === id) return undefined;
							return { opacity: 0 };
						});
					}
				}
			}}
			onClick={() => {
				navigateToView(id);
				if (isOverview) {
					void springApi.start({
						backgroundColor: primaryColor,
						opacity: 1
					});
				} else {
					linksApi?.start((i) => {
						if (i === index) {
							return {
								backgroundColor: primaryColor,
								borderColor: primaryColor,
								opacity: 1
							};
						}
						return {
							backgroundColor: 'transparent',
							borderColor: 'transparent',
							opacity: 0
						};
					});
				}
			}}
		>
			<animated.div
				style={{
					background: themeSprings.theme.to((t) =>
						t.endsWith('dark')
							? 'rgba(255, 255, 255, 0.06)'
							: 'rgba(0, 0, 0, 0.04)'
					),
					borderRadius: '4px',
					inset: 0,
					opacity: isOverview
						? springStyles.opacity
						: linkSprings?.opacity,
					pointerEvents: 'none',
					position: 'absolute',
					zIndex: -1
				}}
			/>
			<animated.div
				style={{
					backgroundColor: isOverview
						? springStyles.backgroundColor
						: linkSprings?.backgroundColor,
					borderRadius: '2px',
					height: '100%',
					left: 0,
					position: 'absolute',
					top: 0,
					width: '3px'
				}}
			/>
			{Icon && (
				<animated.div
					style={{
						alignItems: 'center',
						color: themeSprings.contrastSecondary,
						display: 'flex',
						fontSize: '0.875rem',
						marginLeft: '0.5rem',
						opacity: 0.5
					}}
				>
					<Icon />
				</animated.div>
			)}
			<animated.span
				style={{
					color: themeSprings.contrastSecondary,
					fontSize: '0.875rem',
					fontWeight: isOverview ? 500 : 400,
					marginLeft: icon ? '0.5rem' : '0.75rem',
					padding: '0.4rem 0',
					textDecoration: 'none'
				}}
			>
				{label}
			</animated.span>
		</animated.button>
	);
};
