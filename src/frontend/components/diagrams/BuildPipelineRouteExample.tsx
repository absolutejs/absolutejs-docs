import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import {
	codeTokenStyle,
	routeExampleStyle
} from './buildPipelineDiagramStyles';

type BuildPipelineRouteExampleProps = {
	themeSprings: ThemeSprings;
};

export const BuildPipelineRouteExample = ({
	themeSprings
}: BuildPipelineRouteExampleProps) => (
	<animated.pre style={routeExampleStyle(themeSprings)}>
		{".get('/', () => handleReactPageRequest(\n  Home,\n  "}
		<animated.span
			style={codeTokenStyle(themeSprings, 'accentSecondary', true)}
		>
			{"asset(manifest, 'HomeIndex')"}
		</animated.span>
		{',\n  { '}
		<animated.span style={codeTokenStyle(themeSprings, 'accent')}>
			cssPath
		</animated.span>
		{': '}
		<animated.span
			style={codeTokenStyle(themeSprings, 'accentSecondary', true)}
		>
			{"asset(manifest, 'HomeCSS')"}
		</animated.span>
		{' }\n))'}
	</animated.pre>
);
