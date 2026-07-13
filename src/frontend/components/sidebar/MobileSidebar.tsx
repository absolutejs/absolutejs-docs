import { MOBILE_SIDEBAR_LAYOUT } from '../../../constants';
import { animated, SpringRef, SpringValue } from '@react-spring/web';
import { FaTimes } from 'react-icons/fa';
import { ThemeSprings } from '../../../types/springTypes';
import { DocsView } from '../../../types/types';
import { SidebarNav } from './SidebarNav';

type MobileSidebarProps = {
	spring: {
		overlayOpacity: SpringValue<number>;
		transform: SpringValue<string>;
	};
	springApi: SpringRef<{ overlayOpacity: number; transform: string }>;
	view: DocsView;
	themeSprings: ThemeSprings;
	navigateToView: (newView: DocsView) => void;
	openSections: Set<string>;
	onToggleSection: (key: string) => void;
};

export const MobileSidebar = ({
	spring,
	springApi,
	view,
	themeSprings,
	navigateToView,
	openSections,
	onToggleSection
}: MobileSidebarProps) => {
	const handleClose = () => {
		void springApi.start({
			overlayOpacity: 0,
			transform: 'translateX(-100%)'
		});
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
						opacity >
						MOBILE_SIDEBAR_LAYOUT.overlayInteractionThreshold
							? 'auto'
							: 'none'
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
					maxWidth: '300px',
					overflowY: 'auto',
					padding: '1rem',
					position: 'fixed',
					top: 0,
					transform: spring.transform,
					width: '84%',
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
				<SidebarNav
					navigateToView={(newView: DocsView) => {
						navigateToView(newView);
						handleClose();
					}}
					onToggleSection={onToggleSection}
					openSections={openSections}
					themeSprings={themeSprings}
					view={view}
				/>
			</animated.aside>
		</>
	);
};
