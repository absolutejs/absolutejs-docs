import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import {
	TelemetryView,
	telemetrySidebarData
} from '../../data/telemetrySidebarData';
import { primaryColor, secondaryColor } from '../../styles/colors';

type TelemetrySidebarProps = {
	view: TelemetryView;
	themeSprings: ThemeSprings;
	navigateToView: (newView: TelemetryView) => void;
	compact: boolean;
};

const sidebarFullWidth = '220px';
const sidebarCompactWidth = '60px';

const linkBaseStyle: CSSProperties = {
	alignItems: 'center',
	background: 'none',
	border: 'none',
	borderRadius: '0.375rem',
	cursor: 'pointer',
	display: 'flex',
	fontSize: '0.8rem',
	fontWeight: 400,
	gap: '0.5rem',
	padding: '0.4rem 0.75rem',
	position: 'relative',
	textAlign: 'left',
	transition: 'background-color 0.15s ease',
	width: '100%'
};

const linkCompactStyle: CSSProperties = {
	...linkBaseStyle,
	fontSize: '0',
	justifyContent: 'center',
	padding: '0.5rem'
};

const iconStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexShrink: 0,
	fontSize: '0.875rem'
};

export const TelemetrySidebar = ({
	view,
	themeSprings,
	navigateToView,
	compact
}: TelemetrySidebarProps) => (
	<animated.aside
		style={{
			backdropFilter: 'blur(12px)',
			backgroundColor: themeSprings.theme.to((t) =>
				t.endsWith('dark')
					? 'rgba(17, 17, 22, 0.7)'
					: 'rgba(255, 255, 254, 0.7)'
			),
			borderRight: themeSprings.theme.to((t) =>
				t.endsWith('dark')
					? '1px solid rgba(255, 255, 255, 0.05)'
					: '1px solid rgba(0, 0, 0, 0.05)'
			),
			display: 'flex',
			flexDirection: 'column',
			flexShrink: 0,
			height: '100%',
			maxHeight: '100%',
			overflowX: 'hidden',
			overflowY: 'auto',
			padding: compact ? '0.5rem 0.25rem' : '0.5rem',
			width: compact ? sidebarCompactWidth : sidebarFullWidth
		}}
	>
		<nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
			{telemetrySidebarData.map((item) => {
				const isActive = view === item.id;
				const Icon = item.icon;

				return (
					<animated.button
						key={item.id}
						onClick={() => navigateToView(item.id)}
						title={compact ? item.label : undefined}
						style={{
							...(compact ? linkCompactStyle : linkBaseStyle),
							background: isActive
								? `linear-gradient(135deg, ${primaryColor}22, ${secondaryColor}18)`
								: 'transparent',
							boxShadow: isActive
								? `inset 0 0 12px ${primaryColor}15, 0 0 8px ${primaryColor}10`
								: 'none',
							color: themeSprings.contrastSecondary,
							fontWeight: isActive ? 500 : 400
						}}
					>
						<animated.div
							style={{
								...iconStyle,
								color: isActive
									? primaryColor
									: themeSprings.contrastSecondary,
								opacity: isActive ? 1 : 0.5
							}}
						>
							<Icon />
						</animated.div>
						{!compact && <span>{item.label}</span>}
						{isActive && (
							<div
								style={{
									background: `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor})`,
									borderRadius: '2px',
									height: '100%',
									left: 0,
									position: 'absolute',
									top: 0,
									width: '3px'
								}}
							/>
						)}
					</animated.button>
				);
			})}
		</nav>
	</animated.aside>
);
