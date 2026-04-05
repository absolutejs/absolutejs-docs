import { ECOSYSTEM_FRAMEWORK_NODE_LAYOUT, HALF } from '../../../constants';
import { IconType } from 'react-icons';

type EcosystemFrameworkNodeProps = {
	backgroundColor: string;
	color: string;
	icon: IconType;
	isComingSoon: boolean;
	isHovered: boolean;
	nodeX: number;
	nodeY: number;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
};

export const EcosystemFrameworkNode = ({
	backgroundColor,
	color,
	icon: IconComponent,
	isComingSoon,
	isHovered,
	nodeX,
	nodeY,
	onMouseEnter,
	onMouseLeave
}: EcosystemFrameworkNodeProps) => {
	const nodeRadius = isHovered
		? ECOSYSTEM_FRAMEWORK_NODE_LAYOUT.hoverNodeRadius
		: ECOSYSTEM_FRAMEWORK_NODE_LAYOUT.idleNodeRadius;

	return (
		<g
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			opacity={isComingSoon ? HALF : 1}
			style={{ cursor: 'pointer' }}
		>
			{isHovered && (
				<circle
					cx={nodeX}
					cy={nodeY}
					fill={color}
					filter="url(#hover-glow)"
					opacity={0.3}
					r={
						nodeRadius +
						ECOSYSTEM_FRAMEWORK_NODE_LAYOUT.hoverHaloPadding
					}
				/>
			)}
			<circle
				cx={nodeX}
				cy={nodeY}
				fill={backgroundColor}
				r={nodeRadius}
				stroke={color}
				strokeWidth={
					isHovered
						? ECOSYSTEM_FRAMEWORK_NODE_LAYOUT.hoverStrokeWidth
						: ECOSYSTEM_FRAMEWORK_NODE_LAYOUT.idleStrokeWidth
				}
				style={{ transition: 'all 0.2s ease-out' }}
			/>
			<FrameworkNodeIcon
				color={color}
				icon={IconComponent}
				isHovered={isHovered}
				nodeX={nodeX}
				nodeY={nodeY}
			/>
		</g>
	);
};

type FrameworkNodeIconProps = {
	color: string;
	icon: IconType;
	isHovered: boolean;
	nodeX: number;
	nodeY: number;
};

const FrameworkNodeIcon = ({
	color,
	icon: IconComponent,
	isHovered,
	nodeX,
	nodeY
}: FrameworkNodeIconProps) => {
	const iconSize = isHovered
		? ECOSYSTEM_FRAMEWORK_NODE_LAYOUT.hoverIconSize
		: ECOSYSTEM_FRAMEWORK_NODE_LAYOUT.idleIconSize;

	return (
		<foreignObject
			height={iconSize}
			width={iconSize}
			x={nodeX - iconSize / 2}
			y={nodeY - iconSize / 2}
		>
			<div
				style={{
					alignItems: 'center',
					color,
					display: 'flex',
					fontSize: iconSize,
					height: '100%',
					justifyContent: 'center',
					transition: 'all 0.2s ease-out',
					width: '100%'
				}}
			>
				<IconComponent />
			</div>
		</foreignObject>
	);
};
