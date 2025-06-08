import { animated } from '@react-spring/web';
import { ArticleProps } from '../../../types/types';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const PerformanceArticle = ({ themeSprings }: ArticleProps) => (
	<animated.article style={featureCard(themeSprings)}>
		<h2 style={headingStyle}>21x Faster Than Express</h2>
		<p style={paragraphStyle}>
			Harness Bun's JIT performance with Elysia's minimal core for
			ultrafast SSR.
		</p>
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
