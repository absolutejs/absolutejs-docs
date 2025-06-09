import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../types/types';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const CodeQualityArticle = ({ themeSprings }: ThemeProps) => (
	<animated.article style={featureCard(themeSprings)}>
		<animated.h2 style={headingStyle(themeSprings)}>
			Code Quality Tools
		</animated.h2>
		<animated.p style={paragraphStyle(themeSprings)}>
			Ships with ESLint, Prettier, and Biome configurations for zero-setup
			code quality.
		</animated.p>
	</animated.article>
);
