import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { paragraphSpacedStyle, strongStyle } from '../../../styles/docsStyles';
import { featureCardStyle } from '../../../styles/gradientStyles';

type MiddlewareComparisonGridProps = {
	themeSprings: ThemeSprings;
};

export const MiddlewareComparisonGrid = ({
	themeSprings
}: MiddlewareComparisonGridProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'grid',
				gap: '1rem',
				gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
				marginBottom: '1.5rem',
				marginTop: '1rem'
			}}
		>
			<animated.div style={featureCardStyle(themeSprings)}>
				<p
					style={{
						...paragraphSpacedStyle,
						marginBottom: '0.5rem'
					}}
				>
					<strong style={strongStyle}>Next.js middleware.ts</strong>
				</p>
				<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
					Single file, runs before every request on the edge. Can
					redirect, rewrite, set headers, check auth.
				</p>
			</animated.div>
			<animated.div style={featureCardStyle(themeSprings)}>
				<p
					style={{
						...paragraphSpacedStyle,
						marginBottom: '0.5rem'
					}}
				>
					<strong style={strongStyle}>Elysia Lifecycle Hooks</strong>
				</p>
				<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
					Multiple hooks at specific phases. <code>onRequest</code>,{' '}
					<code>onBeforeHandle</code>, <code>guard</code>, and more.
					Runs on Bun, not edge.
				</p>
			</animated.div>
		</div>
	);
};
