type PropsHoverTooltipProps = {
	accentSecondaryColor: string;
	backgroundColor: string;
	label: string;
	tooltipTransform: string;
	tooltipWidth: number;
};

export const PropsHoverTooltip = ({
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
			x={-8}
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
