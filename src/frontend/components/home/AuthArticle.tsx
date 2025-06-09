import { animated } from '@react-spring/web';
import { ArticleProps } from '../../../types/types';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const AuthArticle = ({ themeSprings }: ArticleProps) => (
	<animated.article style={featureCard(themeSprings)}>
		<animated.h2 style={headingStyle(themeSprings)}>
			Absolute Auth
		</animated.h2>
		<animated.p style={paragraphStyle(themeSprings)}>
			Secure your app instantly with 66 preconfigured OAuth2 providers.
		</animated.p>
	</animated.article>
);
