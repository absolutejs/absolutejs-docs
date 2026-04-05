import { animated, SpringValue } from '@react-spring/web';

type BuildPipelineCssLineProps = {
	accentColor: SpringValue<string>;
	accentSecondaryColor: SpringValue<string>;
	textColor: SpringValue<string>;
};

export const BuildPipelineCssLine = ({
	accentColor,
	accentSecondaryColor,
	textColor
}: BuildPipelineCssLineProps) => (
	<animated.text
		fill={textColor}
		fontFamily="monospace"
		fontSize={14}
		x={44}
		y={72}
	>
		{'{ '}
		<animated.tspan fill={accentColor}>cssPath</animated.tspan>
		{': '}
		<animated.tspan fill={accentSecondaryColor} fontWeight={600}>
			asset(manifest, &apos;HomeCSS&apos;)
		</animated.tspan>
		{' }'}
	</animated.text>
);
