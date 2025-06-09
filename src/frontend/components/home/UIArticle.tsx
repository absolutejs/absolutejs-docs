import { animated } from '@react-spring/web';
import { ArticleProps } from '../../../types/types';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const UIArticle = ({ themeSprings }: ArticleProps) => (
	<animated.article style={featureCard(themeSprings)}>
		<animated.h2 style={headingStyle(themeSprings)}>
			Seamless UI Integration
		</animated.h2>
		<animated.p style={paragraphStyle(themeSprings)}>
			Keep using React, Vue, Svelte, HTML, or HTMX—AbsoluteJS just plugs
			them in.
		</animated.p>
	</animated.article>
);
