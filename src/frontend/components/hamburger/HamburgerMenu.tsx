import { animated, SpringRef, SpringValue } from '@react-spring/web';
import { useState } from 'react';
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
	spring: { transform: SpringValue<string> };
	springApi: SpringRef<{ transform: string }>;
	user: User | null;
	themeSprings: ThemeSprings;
};

export const HamburgerMenu = ({
	spring,
	springApi,
	user,
	themeSprings
}: HamburgerMenuProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<animated.div
			style={{
				background: themeSprings.themeSecondary,
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				justifyContent: 'flex-start',
				padding: '20px',
				position: 'fixed',
				right: 0,
				top: 0,
				transform: spring.transform,
				width: '100%',
				zIndex: 10000
			}}
		>
			<HamburgerHeader
				onClose={() =>
					void springApi.start({ transform: 'translateX(100%)' })
				}
				themeSprings={themeSprings}
			/>

			<nav
				style={{
					display: 'flex',
					flexDirection: 'column',
					marginTop: '100px',
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
