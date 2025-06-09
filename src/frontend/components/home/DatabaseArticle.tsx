import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../types/types';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const DatabaseArticle = ({ themeSprings }: ThemeProps) => (
	<animated.article style={featureCard(themeSprings)}>
		<animated.h2 style={headingStyle(themeSprings)}>
			Databases & ORMs
		</animated.h2>
		<animated.p style={paragraphStyle(themeSprings)}>
			Built-in adapters for Drizzle & Prisma alongside Postgres, MySQL,
			and SQLite drivers.
		</animated.p>
	</animated.article>
);
