import { HALF, SIDEBAR_LINK_LAYOUT } from '../../../constants';
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
		config: { friction: 26, tension: 300 },
		opacity: isActive ? 1 : 0
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
			onMouseEnter={() => {
				if (isActive) return;
				if (isOverview) {
					void springApi.start({ opacity: 1 });

					return;
				}

				linksApi?.start((itemIndex) => {
					if (itemIndex !== index || view === id) return undefined;

					return { opacity: 1 };
				});
			}}
			onMouseLeave={() => {
				if (isActive) return;
				if (isOverview) {
					void springApi.start({ opacity: 0 });

					return;
				}

				linksApi?.start((itemIndex) => {
					if (itemIndex !== index || view === id) return undefined;

					return { opacity: 0 };
				});
			}}
			style={{
				alignItems: 'center',
				backgroundColor: 'transparent',
				border: 'none',
				borderRadius: '6px',
				color: themeSprings.contrastSecondary,
				cursor: 'pointer',
				display: 'flex',
				padding: '0.375rem 0.5rem 0.375rem 0.75rem',
				position: 'relative',
				width: '100%'
			}}
		>
			<animated.div
				style={{
					background: themeSprings.theme.to((t) =>
						t.endsWith('dark')
							? 'rgba(255, 255, 255, 0.06)'
							: 'rgba(0, 0, 0, 0.04)'
					),
					borderRadius: '6px',
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
					width: '2px'
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
						opacity: HALF
					}}
				>
					<Icon />
				</animated.div>
			)}
			<animated.span
				style={{
					color: themeSprings.contrastSecondary,
					fontSize: '0.875rem',
					fontWeight: isOverview
						? SIDEBAR_LINK_LAYOUT.activeFontWeight
						: SIDEBAR_LINK_LAYOUT.inactiveFontWeight,
					letterSpacing: '-0.01em',
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
