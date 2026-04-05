import { ECOSYSTEM_CENTER_HUB_LAYOUT } from '../../../constants';
import { CenterHubLogo } from './CenterHubLogo';

type EcosystemCenterHubProps = {
	accentColor: string;
	backgroundColor: string;
	centerHovered: boolean;
	centerX: number;
	centerY: number;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
};

export const EcosystemCenterHub = ({
	accentColor,
	backgroundColor,
	centerHovered,
	centerX,
	centerY,
	onMouseEnter,
	onMouseLeave
}: EcosystemCenterHubProps) => (
	<g
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		style={{ cursor: 'pointer' }}
	>
		<circle
			cx={centerX}
			cy={centerY}
			fill={accentColor}
			filter={centerHovered ? 'url(#hover-glow)' : 'url(#glow)'}
			opacity={
				centerHovered
					? ECOSYSTEM_CENTER_HUB_LAYOUT.hoverGlowOpacity
					: ECOSYSTEM_CENTER_HUB_LAYOUT.idleGlowOpacity
			}
			r={
				centerHovered
					? ECOSYSTEM_CENTER_HUB_LAYOUT.hoverOuterRadius
					: ECOSYSTEM_CENTER_HUB_LAYOUT.idleOuterRadius
			}
			style={{ transition: 'all 0.2s ease-out' }}
		/>
		<circle
			cx={centerX}
			cy={centerY}
			fill={backgroundColor}
			r={
				centerHovered
					? ECOSYSTEM_CENTER_HUB_LAYOUT.hoverInnerRadius
					: ECOSYSTEM_CENTER_HUB_LAYOUT.idleInnerRadius
			}
			stroke="url(#eco-gradient)"
			strokeWidth={
				centerHovered
					? ECOSYSTEM_CENTER_HUB_LAYOUT.hoverStrokeWidth
					: ECOSYSTEM_CENTER_HUB_LAYOUT.idleStrokeWidth
			}
			style={{ transition: 'all 0.2s ease-out' }}
		/>
		<CenterHubLogo centerX={centerX} centerY={centerY} />
	</g>
);
