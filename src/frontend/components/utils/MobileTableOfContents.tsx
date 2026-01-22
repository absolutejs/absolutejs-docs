import { animated, useSpring, useTransition } from '@react-spring/web';
import { FiList } from 'react-icons/fi';
import { ThemeSprings } from '../../../types/springTypes';
import { TocItem } from './TableOfContents';

type MobileTableOfContentsProps = {
	themeSprings: ThemeSprings;
	items: TocItem[];
	isOpen: boolean;
	onToggle: () => void;
	title?: string;
};

export const MobileTableOfContents = ({
	themeSprings,
	items,
	isOpen,
	onToggle,
	title = 'On This Page'
}: MobileTableOfContentsProps) => {
	const handleItemClick = () => {
		onToggle();
	};

	const [hoverSpring, hoverApi] = useSpring(() => ({
		config: { tension: 400, friction: 26 },
		opacity: 0.85
	}));

	const panelTransition = useTransition(isOpen, {
		from: { opacity: 0, y: -8 },
		enter: { opacity: 1, y: 0 },
		leave: { opacity: 0, y: -8 },
		config: { tension: 300, friction: 22 }
	});

	return (
		<>
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
					opacity: hoverSpring.opacity,
					padding: '0.5rem 0.875rem',
					position: 'fixed',
					right: '1.5rem',
					top: '5.5rem',
					zIndex: 90
				}}
			>
				<FiList size={16} />
				<span>On this page</span>
			</animated.button>

			{/* Backdrop */}
			{isOpen && (
				<div
					onClick={onToggle}
					style={{
						height: '100vh',
						left: 0,
						position: 'fixed',
						top: 0,
						width: '100vw',
						zIndex: 89
					}}
				/>
			)}

			{panelTransition((style, show) =>
				show ? (
					<animated.div
						style={{
							backgroundColor: themeSprings.themeSecondary,
							border: themeSprings.themeTertiary.to(
								(color) => `1px solid ${color}`
							),
							borderRadius: '0.75rem',
							boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
							maxHeight: '60vh',
							maxWidth: '280px',
							opacity: style.opacity,
							overflowY: 'auto',
							padding: '1rem',
							position: 'fixed',
							right: '1.5rem',
							top: '8.5rem',
							transform: style.y.to((y) => `translateY(${y}px)`),
							width: 'calc(100vw - 3rem)',
							zIndex: 91
						}}
					>
						<animated.h3
							style={{
								borderBottom: themeSprings.themeTertiary.to(
									(color) => `1px solid ${color}`
								),
								color: themeSprings.contrastPrimary,
								fontSize: '0.75rem',
								fontWeight: 600,
								letterSpacing: '0.05em',
								marginBottom: '0.75rem',
								opacity: 0.6,
								paddingBottom: '0.75rem',
								textTransform: 'uppercase'
							}}
						>
							{title}
						</animated.h3>
						<nav
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '0.25rem'
							}}
						>
							{items.map((item) => (
								<TocLink
									key={item.href}
									item={item}
									themeSprings={themeSprings}
									onClick={handleItemClick}
								/>
							))}
						</nav>
					</animated.div>
				) : null
			)}
		</>
	);
};

type TocLinkProps = {
	item: TocItem;
	themeSprings: ThemeSprings;
	onClick: () => void;
};

const TocLink = ({ item, themeSprings, onClick }: TocLinkProps) => {
	const [hoverSpring, hoverApi] = useSpring(() => ({
		config: { tension: 400, friction: 26 },
		x: 0,
		opacity: 0.7
	}));

	return (
		<animated.a
			href={item.href}
			onClick={onClick}
			onMouseEnter={() => hoverApi.start({ x: 3, opacity: 1 })}
			onMouseLeave={() => hoverApi.start({ x: 0, opacity: 0.7 })}
			style={{
				borderRadius: '0.25rem',
				color: themeSprings.contrastPrimary,
				display: 'block',
				fontSize: '0.875rem',
				opacity: hoverSpring.opacity,
				padding: '0.4rem 0.5rem',
				textDecoration: 'none',
				transform: hoverSpring.x.to((x) => `translateX(${x}px)`),
				wordBreak: 'break-word'
			}}
		>
			{item.label}
		</animated.a>
	);
};
