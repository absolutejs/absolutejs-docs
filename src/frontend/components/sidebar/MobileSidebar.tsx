import { animated, SpringRef, SpringValue } from '@react-spring/web';
import { FaTimes } from 'react-icons/fa';
import { ThemeSprings } from '../../../types/springTypes';
import { DocsView, isMenuDropdown } from '../../../types/types';
import { sidebarData } from '../../data/sidebarData';
import { useSidebarSprings } from '../../hooks/springs/useSidebarSprings';
import { SidebarDropdown } from './SidebarDropdown';
import { SidebarLink } from './SidebarLink';

type MobileSidebarProps = {
	spring: {
		overlayOpacity: SpringValue<number>;
		transform: SpringValue<string>;
	};
	springApi: SpringRef<{ overlayOpacity: number; transform: string }>;
	view: DocsView;
	themeSprings: ThemeSprings;
	navigateToView: (newView: DocsView) => void;
};

export const MobileSidebar = ({
	spring,
	springApi,
	view,
	themeSprings,
	navigateToView
}: MobileSidebarProps) => {
	const { linksSprings, linksApi, startIndexForDropdown } =
		useSidebarSprings(view);

	const handleClose = () => {
		void springApi.start({
			overlayOpacity: 0,
			transform: 'translateX(-100%)'
		});
	};

	const handleNavigate = (newView: DocsView) => {
		navigateToView(newView);
		handleClose();
	};

	return (
		<>
			<animated.div
				onClick={handleClose}
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					height: '100%',
					left: 0,
					opacity: spring.overlayOpacity,
					pointerEvents: spring.overlayOpacity.to((opacity) =>
						opacity > 0.1 ? 'auto' : 'none'
					),
					position: 'fixed',
					top: 0,
					width: '100%',
					zIndex: 9999
				}}
			/>
			<animated.aside
				style={{
					backgroundColor: themeSprings.themeSecondary,
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					left: 0,
					maxWidth: '280px',
					overflowY: 'auto',
					padding: '1rem',
					position: 'fixed',
					top: 0,
					transform: spring.transform,
					width: '80%',
					zIndex: 10000
				}}
			>
				<animated.div
					style={{
						alignItems: 'center',
						borderBottom: themeSprings.themeTertiary.to(
							(color) => `1px solid ${color}`
						),
						display: 'flex',
						justifyContent: 'space-between',
						marginBottom: '0.75rem',
						paddingBottom: '0.75rem'
					}}
				>
					<animated.span
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: '1rem',
							fontWeight: 600
						}}
					>
						Documentation
					</animated.span>
					<animated.button
						onClick={handleClose}
						style={{
							alignItems: 'center',
							backgroundColor: 'transparent',
							border: 'none',
							color: themeSprings.contrastSecondary,
							cursor: 'pointer',
							display: 'flex',
							fontSize: '1rem',
							justifyContent: 'center',
							padding: '0.25rem'
						}}
					>
						<FaTimes />
					</animated.button>
				</animated.div>

				<nav style={{ display: 'flex', flexDirection: 'column' }}>
					{sidebarData.map((element, index) => {
						if (isMenuDropdown(element)) {
							return (
								<SidebarDropdown
									view={view}
									linksSprings={linksSprings}
									linksApi={linksApi}
									startIndex={startIndexForDropdown(index)}
									navigateToView={handleNavigate}
									key={element.label}
									label={element.label}
									buttons={element.buttons}
									icon={element.icon}
									themeSprings={themeSprings}
								/>
							);
						}

						const linkSprings = linksSprings[index];
						if (linkSprings === undefined) {
							throw new Error(
								'Internal index error in MobileSidebar component'
							);
						}

						return (
							<SidebarLink
								view={view}
								index={-1}
								icon={element.icon}
								linksApi={linksApi}
								id={element.id}
								key={element.label}
								navigateToView={handleNavigate}
								label={element.label}
								themeSprings={themeSprings}
							/>
						);
					})}
				</nav>
			</animated.aside>
		</>
	);
};
