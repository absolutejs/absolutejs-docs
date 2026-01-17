import { animated } from '@react-spring/web';
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

	return (
		<>
			<animated.button
				onClick={onToggle}
				style={{
					alignItems: 'center',
					backgroundColor: themeSprings.themeTertiary,
					border: 'none',
					borderRadius: '50%',
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
					color: themeSprings.contrastPrimary,
					cursor: 'pointer',
					display: 'flex',
					height: '56px',
					justifyContent: 'center',
					position: 'fixed',
					right: '1.5rem',
					top: '6rem',
					width: '56px',
					zIndex: 9998
				}}
			>
				<FiList size={24} />
			</animated.button>

			{isOpen && (
				<animated.div
					style={{
						backgroundColor: themeSprings.themeSecondary,
						border: themeSprings.themeTertiary.to(
							(color) => `1px solid ${color}`
						),
						borderRadius: '0.75rem',
						boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
						maxHeight: '60vh',
						maxWidth: '280px',
						overflowY: 'auto',
						padding: '1rem',
						position: 'fixed',
						right: '1.5rem',
						top: '11rem',
						width: 'calc(100vw - 3rem)',
						zIndex: 9999
					}}
				>
					<animated.h3
						style={{
							borderBottom: themeSprings.themeTertiary.to(
								(color) => `1px solid ${color}`
							),
							color: themeSprings.contrastPrimary,
							fontSize: '0.875rem',
							fontWeight: 600,
							letterSpacing: '0.05em',
							marginBottom: '0.75rem',
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
							gap: '0.5rem'
						}}
					>
						{items.map((item) => (
							<animated.a
								key={item.href}
								href={item.href}
								onClick={handleItemClick}
								style={{
									color: themeSprings.contrastPrimary,
									fontSize: '0.9375rem',
									padding: '0.375rem 0',
									textDecoration: 'none',
									wordBreak: 'break-word'
								}}
							>
								{item.label}
							</animated.a>
						))}
					</nav>
				</animated.div>
			)}
		</>
	);
};
