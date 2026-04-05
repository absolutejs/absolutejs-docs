import { PROPS_HOVERABLE_PROP_LAYOUT } from '../../../constants';

type PropsHoverablePropProps = {
	accentSecondaryColor: string;
	backgroundColor: string;
	isHovered: boolean;
	label: string;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	textX: number;
	textY: number;
	tooltipLabel: string;
	tooltipTransform: string;
	tooltipWidth: number;
};

export const PropsHoverableProp = ({
	accentSecondaryColor,
	backgroundColor,
	isHovered,
	label,
	onMouseEnter,
	onMouseLeave,
	textX,
	textY,
	tooltipLabel,
	tooltipTransform,
	tooltipWidth
}: PropsHoverablePropProps) => (
	<g
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		style={{ cursor: 'pointer' }}
	>
		<rect
			fill="transparent"
			height={20}
			width={
				label.length *
					PROPS_HOVERABLE_PROP_LAYOUT.hitAreaCharacterWidth +
				PROPS_HOVERABLE_PROP_LAYOUT.hitAreaPaddingWidth
			}
			x={textX}
			y={textY - PROPS_HOVERABLE_PROP_LAYOUT.hitAreaOffsetY}
		/>
		<text
			fill={accentSecondaryColor}
			fontFamily="monospace"
			fontSize={13}
			fontWeight={600}
			x={textX}
			y={textY}
		>
			{label}
		</text>
		{isHovered && (
			<PropsHoverTooltip
				accentSecondaryColor={accentSecondaryColor}
				backgroundColor={backgroundColor}
				label={tooltipLabel}
				tooltipTransform={tooltipTransform}
				tooltipWidth={tooltipWidth}
			/>
		)}
	</g>
);

type PropsHoverTooltipProps = {
	accentSecondaryColor: string;
	backgroundColor: string;
	label: string;
	tooltipTransform: string;
	tooltipWidth: number;
};

const PropsHoverTooltip = ({
	accentSecondaryColor,
	backgroundColor,
	label,
	tooltipTransform,
	tooltipWidth
}: PropsHoverTooltipProps) => (
	<g transform={tooltipTransform}>
		<rect
			fill={backgroundColor}
			height={34}
			rx={5}
			stroke={accentSecondaryColor}
			strokeWidth={1.5}
			width={tooltipWidth}
			x={-PROPS_HOVERABLE_PROP_LAYOUT.tooltipOffsetX}
			y={0}
		/>
		<text
			fill={accentSecondaryColor}
			fontFamily="monospace"
			fontSize={14}
			fontWeight={500}
			x={5}
			y={22}
		>
			{label}
		</text>
	</g>
);
