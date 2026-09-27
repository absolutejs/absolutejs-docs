import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../types/springTypes';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const DatabaseArticle = ({ themeSprings }: ThemeProps) => (
	<animated.article style={featureCard(themeSprings)}>
		<animated.h2 style={headingStyle(themeSprings)}>
			Flexible Database Connections
		</animated.h2>
		<animated.p style={paragraphStyle(themeSprings)}>
			create-absolutejs scaffolds Drizzle for PostgreSQL, MySQL, MariaDB,
			SQLite, Turso (libSQL), SingleStore, SQL Server and CockroachDB, and
			Prisma for the same engines except SingleStore, plus MongoDB on
			Prisma 6 — or no ORM at all. Every SQL scaffold ships a committed
			initial migration with db:generate and db:migrate scripts, checked
			against a real database. Once your app is running, absolute db backs
			up, restores and seeds any of those SQL databases.
		</animated.p>
	</animated.article>
);
