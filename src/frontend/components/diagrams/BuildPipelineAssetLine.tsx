import { animated, SpringValue } from '@react-spring/web';

type BuildPipelineAssetLineProps = {
	accentSecondaryColor: SpringValue<string>;
	textColor: SpringValue<string>;
};

export const BuildPipelineAssetLine = ({
	accentSecondaryColor,
	textColor
}: BuildPipelineAssetLineProps) => (
	<animated.text
		fill={accentSecondaryColor}
		fontFamily="monospace"
		fontSize={14}
		fontWeight={600}
		x={44}
		y={54}
	>
		asset(manifest, &apos;HomeIndex&apos;)
		<animated.tspan fill={textColor} fontWeight={400}>
			,
		</animated.tspan>
	</animated.text>
);
