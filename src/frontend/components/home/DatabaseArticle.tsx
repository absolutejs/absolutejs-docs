import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const DatabaseArticle = () => (
	<article style={featureCard}>
		<h2 style={headingStyle}>Databases & ORMs</h2>
		<p style={paragraphStyle}>
			Built-in adapters for Drizzle & Prisma alongside Postgres, MySQL,
			and SQLite drivers.
		</p>
	</article>
);
