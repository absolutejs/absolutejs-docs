import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const CodeQualityArticle = () => (
	<article style={featureCard}>
		<h2 style={headingStyle}>Code Quality Tools</h2>
		<p style={paragraphStyle}>
			Ships with ESLint, Prettier, and Biome configurations for zero-setup
			code quality.
		</p>
	</article>
);
