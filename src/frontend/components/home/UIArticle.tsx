import { animated } from '@react-spring/web';
import { ArticleProps } from '../../../types/types';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const UIArticle = ({ themeSprings }: ArticleProps) => (
	<animated.article style={featureCard(themeSprings)}>
		<h2 style={headingStyle}>Seamless UI Integration</h2>
		<p style={paragraphStyle}>
			Keep using React, Vue, Svelte, HTML, or HTMX—AbsoluteJS just plugs
			them in.
		</p>
	</animated.article>
);
