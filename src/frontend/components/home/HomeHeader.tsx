import { animated } from '@react-spring/web';
import { headingStyle, paragraphStyle } from '../../styles/styles';
import { ArticleProps } from '../../../types/types';

export const HomeHeader = ({ themeSprings }: ArticleProps) => (
	<section
		style={{
			alignItems: 'center',
			display: 'flex',
			flexDirection: 'column',
			textAlign: 'center'
		}}
	>
		<animated.h1 style={headingStyle(themeSprings)}>
			The Last Fullstack JavaScript Meta-Framework You'll Ever Need
		</animated.h1>
		<animated.p style={paragraphStyle(themeSprings)}>
			AbsoluteJS brings together every aspect of modern web development.
			It covers user interfaces, data handling, code quality, and
			authentication.
		</animated.p>
		<animated.p style={paragraphStyle(themeSprings)}>
			Powered by Bun & Elysia, it delivers blazing server side rendered
			performance and full TypeScript support all the way through, so you
			can focus on building great apps instead of configuring tools.
		</animated.p>
	</section>
);
