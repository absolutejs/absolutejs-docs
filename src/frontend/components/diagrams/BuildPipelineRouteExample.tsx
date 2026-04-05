import { animated } from '@react-spring/web';
import type { FluidValue } from '@react-spring/shared';

type AnimatedColor = string | FluidValue<string>;

type BuildPipelineRouteExampleProps = {
	accentColor: AnimatedColor;
	accentSecondaryColor: AnimatedColor;
	borderColor: AnimatedColor;
	textColor: AnimatedColor;
};

export const BuildPipelineRouteExample = ({
	accentColor,
	accentSecondaryColor,
	borderColor,
	textColor
}: BuildPipelineRouteExampleProps) => (
	<g transform="translate(400, 42)">
		<animated.rect
			fill="transparent"
			height={100}
			rx={8}
			stroke={borderColor}
			strokeWidth={1.5}
			width={615}
		/>
		<animated.text
			fill={textColor}
			fontFamily="monospace"
			fontSize={14}
			x={20}
			y={18}
		>
			.get(&apos;/&apos;, () =&gt; handleReactPageRequest(
		</animated.text>
		<animated.text
			fill={textColor}
			fontFamily="monospace"
			fontSize={14}
			x={44}
			y={36}
		>
			Home,
		</animated.text>
		<BuildPipelineAssetLine
			accentSecondaryColor={accentSecondaryColor}
			textColor={textColor}
		/>
		<BuildPipelineCssLine
			accentColor={accentColor}
			accentSecondaryColor={accentSecondaryColor}
			textColor={textColor}
		/>
		<animated.text
			fill={textColor}
			fontFamily="monospace"
			fontSize={14}
			x={20}
			y={90}
		>
			))
		</animated.text>
	</g>
);

type BuildPipelineAssetLineProps = {
	accentSecondaryColor: AnimatedColor;
	textColor: AnimatedColor;
};

const BuildPipelineAssetLine = ({
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

type BuildPipelineCssLineProps = {
	accentColor: AnimatedColor;
	accentSecondaryColor: AnimatedColor;
	textColor: AnimatedColor;
};

const BuildPipelineCssLine = ({
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
