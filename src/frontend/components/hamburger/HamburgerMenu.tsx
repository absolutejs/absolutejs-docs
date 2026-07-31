import { animated, SpringValue } from '@react-spring/web';
import { useEffect, useState } from 'react';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { User } from '../../../../db/schema';
import { ThemeSprings } from '../../../types/springTypes';
import { isNavbarDropdown } from '../../../types/types';
import { navbarData } from '../../data/navbarData';
import { AuthContainer } from '../auth/AuthContainer';
import { NavbarLink } from '../navbar/NavbarLink';
import { Modal } from '../utils/Modal';
import { HamburgerDropdown } from './HamburgerDropdown';
import { HamburgerHeader } from './HamburgerHeader';
import { HamburgerUserButtons } from './HamburgerUserButtons';

type HamburgerMenuProps = {
	isOpen: boolean;
	onClose: () => void;
	spring: {
		opacity: SpringValue<number>;
		transform: SpringValue<string>;
	};
	user: User | null;
	themeSprings: ThemeSprings;
};

export const HamburgerMenu = ({
	isOpen,
	onClose,
	spring,
	user,
	themeSprings
}: HamburgerMenuProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (!isOpen) return undefined;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onClose]);

	return (
		<animated.div
			aria-hidden={!isOpen}
			aria-label="Mobile navigation"
			style={{
				backgroundColor: themeSprings.themeSecondary,
				boxShadow: '-12px 0 40px rgba(0, 0, 0, 0.18)',
				display: 'flex',
				flexDirection: 'column',
				inset: 0,
				justifyContent: 'flex-start',
				minHeight: '100dvh',
				opacity: spring.opacity,
				overflowX: 'hidden',
				overflowY: 'auto',
				overscrollBehavior: 'contain',
				pointerEvents: spring.opacity.to((value) =>
					value > 0 ? 'auto' : 'none'
				),
				position: 'fixed',
				transform: spring.transform,
				transformOrigin: 'top right',
				visibility: spring.opacity.to((value) =>
					value > 0 ? 'visible' : 'hidden'
				),
				width: '100vw',
				zIndex: 10000
			}}
		>
			<HamburgerHeader onClose={onClose} themeSprings={themeSprings} />

			<nav
				style={{
					display: 'flex',
					flexDirection: 'column',
					marginTop: '76px',
					padding: '1.5rem 1.25rem 2rem',
					width: '100%'
				}}
			>
				{navbarData.map((element) => {
					if (isNavbarDropdown(element)) {
						return (
							<HamburgerDropdown
								href={element.href}
								key={element.label}
								label={element.label}
								links={element.links}
								themeSprings={themeSprings}
							/>
						);
					}

					return (
						<NavbarLink
							href={element.href}
							icon={element.icon}
							key={element.label}
							label={element.label}
							themeSprings={themeSprings}
						/>
					);
				})}
				<div
					style={{
						display: 'flex',
						gap: '1rem',
						padding: '12px 16px'
					}}
				>
					<animated.a
						aria-label="GitHub"
						href="https://github.com/absolutejs/absolutejs"
						rel="noopener noreferrer"
						style={{
							color: themeSprings.contrastPrimary
						}}
						target="_blank"
					>
						<FaGithub size={22} />
					</animated.a>
					<animated.a
						aria-label="Discord"
						href="https://discord.gg/UBMw87Kj5r"
						rel="noopener noreferrer"
						style={{
							color: themeSprings.contrastPrimary
						}}
						target="_blank"
					>
						<FaDiscord size={22} />
					</animated.a>
				</div>
				<hr
					style={{
						border: '1px solid #ddd',
						margin: '20px 0',
						width: '100%'
					}}
				/>

				<HamburgerUserButtons
					openModal={() => {
						setIsModalOpen(true);
					}}
					themeSprings={themeSprings}
					user={user}
				/>
			</nav>
			<Modal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
				}}
				style={{
					backgroundColor: themeSprings.themeSecondary,
					borderRadius: '0.5rem'
				}}
			>
				<AuthContainer themeSprings={themeSprings} />
			</Modal>
		</animated.div>
	);
};
