import { CONTEXT_PROPERTY_CARD_LAYOUT } from '../../../constants';

type ContextPropertyCardProps = {
	cardHeight: number;
	cardWidth: number;
	codeExample: string;
	color: string;
	descriptionLines: Array<string>;
	textColor: string;
	textMutedColor: string;
	title: string;
	transform?: string;
};

export const ContextPropertyCard = ({
	cardHeight,
	cardWidth,
	codeExample,
	color,
	descriptionLines,
	textColor,
	textMutedColor,
	title,
	transform
}: ContextPropertyCardProps) => (
	<g transform={transform}>
		<rect
			fill={color}
			height={cardHeight}
			opacity={0.12}
			rx={8}
			width={cardWidth}
		/>
		<text
			fill={color}
			fontFamily="monospace"
			fontSize={14}
			fontWeight={700}
			x={15}
			y={26}
		>
			{title}
		</text>
		{descriptionLines.map((line, lineIndex) => (
			<text
				fill={textMutedColor}
				fontSize={9}
				key={line}
				x={15}
				y={
					CONTEXT_PROPERTY_CARD_LAYOUT.descriptionLineStartY +
					lineIndex *
						CONTEXT_PROPERTY_CARD_LAYOUT.descriptionLineYStep
				}
			>
				{line}
			</text>
		))}
		<text
			fill={textColor}
			fontFamily="monospace"
			fontSize={10}
			x={15}
			y={122}
		>
			{codeExample}
		</text>
	</g>
);
