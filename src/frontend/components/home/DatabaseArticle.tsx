import { animated } from '@react-spring/web';
import { ArticleProps } from '../../../types/types';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const DatabaseArticle = ({ themeSprings }: ArticleProps) => (
	<animated.article style={featureCard(themeSprings)}>
		<h2 style={headingStyle}>Databases & ORMs</h2>
		<p style={paragraphStyle}>
			Built-in adapters for Drizzle & Prisma alongside Postgres, MySQL,
			and SQLite drivers.
		</p>
	</animated.article>
);
