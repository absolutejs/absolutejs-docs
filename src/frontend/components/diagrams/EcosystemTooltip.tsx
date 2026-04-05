type EcosystemTooltipProps = {
	borderColor: string;
	description: string;
	name: string;
	tooltipHeight: number;
	tooltipWidth: number;
	tooltipX: number;
	tooltipY: number;
};

export const EcosystemTooltip = ({
	borderColor,
	description,
	name,
	tooltipHeight,
	tooltipWidth,
	tooltipX,
	tooltipY
}: EcosystemTooltipProps) => (
	<foreignObject
		height={tooltipHeight}
		style={{ overflow: 'visible' }}
		width={tooltipWidth}
		x={tooltipX}
		y={tooltipY}
	>
		<div
			style={{
				background: 'rgba(0, 0, 0, 0.95)',
				border: `2px solid ${borderColor}`,
				borderRadius: '6px',
				boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
				padding: '10px 14px',
				pointerEvents: 'none'
			}}
		>
			<p
				style={{
					color: borderColor,
					fontSize: '0.9rem',
					fontWeight: 600,
					margin: 0
				}}
			>
				{name}
			</p>
			<p
				style={{
					color: 'rgba(255, 255, 255, 0.7)',
					fontSize: '0.75rem',
					margin: 0,
					marginTop: '2px'
				}}
			>
				{description}
			</p>
		</div>
	</foreignObject>
);
