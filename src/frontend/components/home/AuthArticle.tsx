import { animated } from '@react-spring/web';
import { ArticleProps } from '../../../types/types';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const AuthArticle = ({ themeSprings }: ArticleProps) => (
	<animated.article style={featureCard(themeSprings)}>
		<h2 style={headingStyle}>Absolute Auth</h2>
		<p style={paragraphStyle}>
			Secure your app instantly with 66 preconfigured OAuth2 providers.
		</p>
	</animated.article>
);
