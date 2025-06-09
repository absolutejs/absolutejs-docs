import { animated } from '@react-spring/web';
import { ArticleProps } from '../../../types/types';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const PerformanceArticle = ({ themeSprings }: ArticleProps) => (
	<animated.article style={featureCard(themeSprings)}>
		<animated.h2 style={headingStyle(themeSprings)}>
			21x Faster Than Express
		</animated.h2>
		<animated.p style={paragraphStyle(themeSprings)}>
			Harness Bun's JIT performance with Elysia's minimal core for
			ultrafast SSR.
		</animated.p>
		<a
			href="https://bun.sh"
			target="_blank"
			rel="noopener noreferrer"
			style={{
				color: '#0070f3',
				marginTop: 'auto',
				textDecoration: 'none'
			}}
		>
			Learn more
		</a>
	</animated.article>
);
